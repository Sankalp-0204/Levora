import React, { forwardRef } from "react";

/**
 * @file components/ui/Textarea.tsx
 * @description Luxury text area primitive for forms.
 */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const baseStyle: React.CSSProperties = {
      width: "100%",
      minHeight: "120px",
      padding: "1rem",
      backgroundColor: "rgba(10, 10, 10, 0.4)", // --color-void-500 with opacity
      border: "0.5px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "var(--radius-crystal, 4px)",
      color: "var(--color-text-primary, #ffffff)",
      outline: "none",
      transition: "border-color var(--duration-fast, 0.3s) ease, box-shadow var(--duration-fast, 0.3s) ease",
      fontFamily: "var(--font-sans)",
      fontSize: "0.875rem",
      letterSpacing: "0.02em",
      resize: "vertical",
    };

    return (
      <div className={`flex flex-col gap-2 ${className}`} style={{ width: "100%" }}>
        {label && (
          <label
            htmlFor={inputId}
            className="type-caption uppercase"
            style={{ color: "var(--color-text-secondary, #a0a0a0)", letterSpacing: "0.1em" }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          style={baseStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-gold-400, #d4af37)";
            e.currentTarget.style.boxShadow = "0 0 0 1px rgba(212, 175, 55, 0.2)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.boxShadow = "none";
          }}
          {...props}
        />
        {error && (
          <span style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
