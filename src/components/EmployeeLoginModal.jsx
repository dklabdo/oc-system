// src/components/EmployeeLoginModal.jsx
import React, { useState, useRef, useEffect } from "react";
import { useEmployee } from "../context/EmployeeContext";
import toast from "react-hot-toast";

export default function EmployeeLoginModal({ onClose }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const { loginEmployee } = useEmployee();

  useEffect(() => {
    refs[0].current?.focus();
  }, []);

  const handleInput = (i, val) => {
    const v = val.replace(/\D/, "").slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 3) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs[i - 1].current?.focus();
    }
    if (e.key === "Enter") handleSubmit();
  };

  const handleSubmit = async () => {
    const code = digits.join("");
    if (code.length < 4) return toast.error("Enter your 4-digit ID");
    setLoading(true);
    try {
      await loginEmployee(code);
      toast.success("Welcome back! 👋");
      onClose?.();
    } catch (err) {
      toast.error("ID not found. Please check with your admin.");
      setDigits(["", "", "", ""]);
      refs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      setDigits(pasted.split(""));
      refs[3].current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop bg-black/60">
      <div
        className="glass-strong rounded-2xl p-8 w-full max-w-sm mx-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="3" y="8" width="16" height="12" rx="2" stroke="#295EFF" strokeWidth="1.5"/>
              <path d="M8 8V6a3 3 0 016 0v2" stroke="#295EFF" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="11" cy="14" r="1.5" fill="#295EFF"/>
            </svg>
          </div>
          <h3 className="text-xl font-display font-semibold text-ink-50 mb-1">
            Enter your ID
          </h3>
          <p className="text-sm text-ink-300 leading-relaxed">
            Type your 4-digit employee ID to access your workspace.
          </p>
        </div>

        {/* Digit inputs */}
        <div className="flex gap-3 justify-center mb-8" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleInput(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`
                w-14 h-16 text-center text-2xl font-display font-bold
                bg-surface-raised border rounded-xl
                text-ink-50 focus:text-accent
                transition-all duration-200 outline-none
                ${d ? "border-accent/50 bg-accent/5" : "border-surface-border"}
                input-focus
              `}
            />
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || digits.some((d) => !d)}
          className="
            btn-shimmer w-full py-3.5 rounded-xl font-display font-semibold text-sm
            bg-accent text-white
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 hover:bg-accent-dark active:scale-[0.98]
            glow-accent-sm
          "
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Verifying...
            </span>
          ) : (
            "Access Workspace →"
          )}
        </button>

        <p className="text-center text-xs text-ink-500 mt-4">
          Don't have an ID? Contact your administrator.
        </p>
      </div>
    </div>
  );
}
