import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "md" | "lg" | "full";
  layout?: "centered" | "split";
  className?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  layout = "centered",
  className,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      data-size={size}
      data-layout={layout}
      data-component="modal"
      className={className}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}
