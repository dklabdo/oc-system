// useGoogleMeetLink.js
import { useEffect, useRef, useState, useCallback } from "react";

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const MEET_SCOPE = "https://www.googleapis.com/auth/meetings.space.created";

export function useGoogleMeetLink() {
  const clientId = "81593333430-2pldrqfirikb4n11pucctaeqh7hi3j3m.apps.googleusercontent.com"
  const tokenClientRef = useRef(null);
  const promiseHandlersRef = useRef({ resolve: null, reject: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function initTokenClient() {
      if (!window.google?.accounts?.oauth2) return;

      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: MEET_SCOPE,
        callback: async (tokenResponse) => {
          try {
            if (tokenResponse?.error) {
              throw new Error(tokenResponse.error);
            }

            const accessToken = tokenResponse.access_token;

            const res = await fetch("https://meet.googleapis.com/v2/spaces", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
            });

            if (!res.ok) {
              const text = await res.text();
              throw new Error(`Meet API error: ${res.status} ${text}`);
            }

            const data = await res.json();
            promiseHandlersRef.current.resolve?.(data.meetingUri);
          } catch (err) {
            promiseHandlersRef.current.reject?.(err);
          } finally {
            promiseHandlersRef.current = { resolve: null, reject: null };
          }
        },
      });

      if (!cancelled) setReady(true);
    }

    if (window.google?.accounts?.oauth2) {
      initTokenClient();
      return () => {
        cancelled = true;
      };
    }

    const existing = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);

    if (existing) {
      existing.addEventListener("load", initTokenClient, { once: true });
      return () => {
        cancelled = true;
      };
    }

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = initTokenClient;
    script.onerror = () => {
      promiseHandlersRef.current.reject?.(
        new Error("Failed to load Google Identity Services")
      );
      promiseHandlersRef.current = { resolve: null, reject: null };
    };

    document.body.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [clientId]);

  const createMeetLink = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!tokenClientRef.current) {
        reject(new Error("Google token client is not ready yet"));
        return;
      }

      promiseHandlersRef.current = { resolve, reject };

      tokenClientRef.current.requestAccessToken();
    });
  }, []);

  return { ready, createMeetLink };
}