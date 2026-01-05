'use client';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (overlayRef.current === e.target) onClose();
    };
    if (isOpen) document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] transition-opacity"
    >
      <div className="bg-gray-900 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          {title && <h2 className="text-xl font-bold font-russo text-white">{title}</h2>}
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}