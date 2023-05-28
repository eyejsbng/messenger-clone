"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal = ({isOpen, onClose, src} : ImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <div className="h-[30rem] w-auto">
        <Image alt="Image" src={src || ''} className="object-contain" fill/>
      </div>
    </Modal>
  )
}

export default ImageModal