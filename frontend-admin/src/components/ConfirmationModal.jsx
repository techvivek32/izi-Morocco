import CancelButton from "./Button";
import SaveButton from "./Button";
import Modal from "./Modal";

export const ConfirmationModal = ({
  onClose,
  onConfirm,
  content,
  title,
  primaryButtonName,
}) => {
  return (
    <>
      <Modal open={true} onOpenChange={onClose} title={title}>
        <p className="text-gray-600 mb-6">{content}</p>
        <div className="flex justify-end space-x-3 pb-7">
        
          <SaveButton
            onClick={onConfirm}
            className={`px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors`}
          >
            {primaryButtonName || "submit"}
          </SaveButton>
        </div>
      </Modal>
    </>
  );
};
