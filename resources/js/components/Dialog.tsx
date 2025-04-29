import { Fragment } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  className?: string;
}

export default function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = 'md',
  showCloseButton = true,
  className = ''
}: Props) {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <Transition show={open} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel
                className={cn(
                  'w-full rounded-lg bg-white p-6 shadow-xl',
                  sizes[size],
                  className
                )}
              >
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  >
                    <X size={18} />
                  </button>
                )}

                {title && (
                  <HeadlessDialog.Title className="text-lg font-semibold leading-none tracking-tight">
                    {title}
                  </HeadlessDialog.Title>
                )}

                {description && (
                  <HeadlessDialog.Description className="mt-2 text-sm text-gray-500">
                    {description}
                  </HeadlessDialog.Description>
                )}

                <div className="mt-4">{children}</div>

                {actions && (
                  <div className="mt-6 flex justify-end space-x-4">
                    {actions}
                  </div>
                )}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'default';
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Konfirmasi',
  description = 'Apakah Anda yakin ingin melakukan tindakan ini?',
  confirmLabel = 'Ya',
  cancelLabel = 'Tidak',
  variant = 'default'
}: ConfirmDialogProps) {
  const variants = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    default: 'bg-blue-600 hover:bg-blue-700'
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      actions={
        <>
          <Button
            variant="outline"
            onClick={onClose}
          >
            {cancelLabel}
          </Button>
          <Button
            className={variants[variant]}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      {description}
    </Dialog>
  );
}