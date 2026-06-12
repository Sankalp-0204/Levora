import React, { forwardRef } from "react";

/**
 * @file components/ui/Select.tsx
 * @description Luxury select primitive for forms.
 */

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = "", id, options, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const baseStyle: React.CSSProperties = {
      width: "100%",
      minHeight: "48px",
      padding: "0 1rem",
      backgroundColor: "rgba(10, 10, 10, 0.4)", // --color-void-500 with opacity
      border: "0.5px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "var(--radius-crystal, 4px)",
      color: "var(--color-text-primary, #ffffff)",
      outline: "none",
      transition: "border-color var(--duration-fast, 0.3s) ease, box-shadow var(--duration-fast, 0.3s) ease",
      fontFamily: "var(--font-sans)",
      fontSize: "0.875rem",
      letterSpacing: "0.02em",
      appearance: "none",
      cursor: "pointer",
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
        <div style={{ position: "relative" }}>
          <select
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
          >
            <option value="" disabled style={{ color: "var(--color-text-tertiary)" }}>
              Select an option
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value} style={{ backgroundColor: "#111", color: "#fff" }}>
                {option.label}
              </option>
            ))}
          </select>
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "var(--color-gold-400, #d4af37)",
            }}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {error && (
          <span style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
