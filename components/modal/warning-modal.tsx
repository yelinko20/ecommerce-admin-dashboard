"use client";

import { Button } from "@/components/ui/button";

interface WarningModalProps {
  isOpen: boolean;
  loading: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  loading,
}) => {
  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 flex items-center justify-center z-50`}
    >
      <div className="fixed inset-0 bg-white backdrop-blur-md opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-10 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex justify-end">
          <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
