"use client";

import { useEffect } from "react";
import { MdCheckCircleOutline, MdClose, MdErrorOutline } from "react-icons/md";

type ToastProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  severity?: "error" | "success";
};

const Toast = ({ message, isOpen, onClose, severity = "error" }: ToastProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(onClose, 3000);
    return () => clearTimeout(timeout);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isError = severity === "error";

  return (
    <div
      role="alert"
      className="animate-toast-in fixed top-6 left-1/2 z-[9999] flex w-[min(90vw,400px)] -translate-x-1/2 items-center gap-3 rounded-[10px] border border-ds-border-subtle bg-[#262626] px-4 py-3 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]"
    >
      {isError ? (
        <MdErrorOutline className="shrink-0 text-xl text-red-400" />
      ) : (
        <MdCheckCircleOutline className="shrink-0 text-xl text-emerald-400" />
      )}
      <span className="grow text-sm">{message}</span>
      <button
        type="button"
        aria-label="Close notification"
        onClick={onClose}
        className="shrink-0 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
      >
        <MdClose />
      </button>
    </div>
  );
};

export default Toast;
