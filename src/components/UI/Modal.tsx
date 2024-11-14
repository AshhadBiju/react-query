import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode; // The content inside the modal
  onClose: () => void; // Callback when the modal is closed
}

export default function Modal({ children, onClose }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (modal) {
      modal.showModal();
    }

    return () => {
      if (modal) {
        modal.close(); // needed to avoid error being thrown
      }
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}
