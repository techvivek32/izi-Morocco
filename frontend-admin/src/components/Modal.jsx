import * as Dialog from "@radix-ui/react-dialog";
import CrossIcon from "./svgs/CrossIcon";
import { cn } from "../lib/utils";

/**
 * Generic Modal component.
 *
 * Props:
 * - open: boolean (controlled open state, optional)
 * - onOpenChange: function (controlled open handler, optional)
 * - trigger: ReactNode (optional, button or element to open modal)
 * - title: string or ReactNode (optional, modal title)
 * - children: ReactNode (modal body content)
 * - showClose: boolean (show close button, default true)
 * - contentClassName: string (extra classes for modal content)
 * - className: string (extra classes for modal body)
 */

const Modal = ({
  open,
  onOpenChange,
  trigger,
  title,
  children,
  showClose = true,
  contentClassName = "",
  headerClassName = "",
  className = "",
  stickyHeader = false,
  closeButtonClassName = "",
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
        <Dialog.Content
          className={cn(
            `fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] lg:max-w-md print:max-w-none rounded-lg bg-white px-6 shadow-xl focus:outline-none`,
            contentClassName
          )}
        >
          <div
            className={cn(
              `flex flex-col`,
              headerClassName,
              stickyHeader && "sticky top-0 bg-white z-[51]"
            )}
          >
            <div className="flex items-center print:items-start justify-between py-4 w-full">
              {title && (
                <Dialog.Title className={`text-lg font-medium text-gray-900`}>
                  {title}
                </Dialog.Title>
              )}
              {showClose && (
                <Dialog.Close asChild>
                  <button
                    className={cn(
                      "text-gray-500 hover:text-gray-800 hover:cursor-pointer p-1 rounded-md hover:bg-light-accent",
                      closeButtonClassName
                    )}
                  >
                    <CrossIcon className="h-6 w-6" />
                  </button>
                </Dialog.Close>
              )}
            </div>
            <div className="border-b border-light-accent mb-2" />
          </div>

          <div className={className}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
