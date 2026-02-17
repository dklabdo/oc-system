#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use std::net::TcpStream;
use tauri::command;

// ---------------- Commands ----------------

#[command]
fn ping_server(server: String) -> String {
    use std::net::{TcpStream, ToSocketAddrs};

    let port = 80; // adjust if your server uses 443 for HTTPS
    let addr = format!("{}:{}", server, port);

    // 1️⃣ Try connecting to the server
    if TcpStream::connect(&addr).is_ok() {
        return "connected".into();
    }

    // 2️⃣ If failed, check if VPN app is installed
    if is_vpn_installed() {
        return "vpn_needed".into();
    } else {
        return "vpn_missing".into();
    }
}
#[command]

fn launch_vpn() -> Result<(), String> {
    if cfg!(target_os = "windows") {
        let paths = [
            r"C:\Program Files\Fortinet\FortiClient\FortiClient.exe",
            r"C:\Program Files (x86)\Fortinet\FortiClient\FortiClient.exe",
        ];
        for path in paths {
            if std::path::Path::new(path).exists() {
                Command::new(path)
                    .spawn()
                    .map_err(|e| e.to_string())?;
                return Ok(());
            }
        }
        Err("FortiClient VPN app not found".into())
    } else if cfg!(target_os = "macos") {
        let vpn_path = "/Applications/FortiClient.app";
        if std::path::Path::new(vpn_path).exists() {
            Command::new("open")
                .arg(vpn_path)
                .spawn()
                .map_err(|e| e.to_string())?;
            Ok(())
        } else {
            Err("FortiClient VPN app not found".into())
        }
    } else if cfg!(target_os = "linux") {
        let vpn_path = "/usr/bin/forticlient";
        if std::path::Path::new(vpn_path).exists() {
            Command::new(vpn_path)
                .spawn()
                .map_err(|e| e.to_string())?;
            Ok(())
        } else {
            Err("FortiClient VPN app not found".into())
        }
    } else {
        Err("Unsupported OS".into())
    }
}



// ---------------- Helpers ----------------


fn is_vpn_installed() -> bool {
    if cfg!(target_os = "windows") {
        let paths = [
            r"C:\Program Files\Fortinet\FortiClient\FortiClient.exe",
            r"C:\Program Files (x86)\Fortinet\FortiClient\FortiClient.exe",
        ];
        paths.iter().any(|p| std::path::Path::new(p).exists())
    } else if cfg!(target_os = "macos") {
        std::path::Path::new("/Applications/FortiClient.app").exists()
    } else if cfg!(target_os = "linux") {
        std::path::Path::new("/usr/bin/forticlient").exists()
            || std::path::Path::new("/opt/forticlient-sslvpn/forticlientsslvpn_cli").exists()
    } else {
        false
    }
}



// ---------------- Main ----------------

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![ping_server, launch_vpn])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
