import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Item {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface Props {
  trigger?: React.ReactNode;
  items: Item[];
  value?: string;
  onChange?: (value: string) => void;
  align?: 'left' | 'right';
  className?: string;
}

export default function Dropdown({
  trigger,
  items,
  value,
  onChange,
  align = 'left',
  className = ''
}: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}>
        {trigger || (
          <>
            {value 
              ? items.find(item => item.value === value)?.label || 'Select...'
              : 'Select...'
            }
            <ChevronDown size={16} />
          </>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={cn(
          'absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          align === 'left' ? 'left-0' : 'right-0'
        )}>
          <div className="py-1">
            {items.map((item) => (
              <Menu.Item key={item.value} disabled={item.disabled}>
                {({ active }) => (
                  <button
                    onClick={() => onChange?.(item.value)}
                    className={cn(
                      'flex w-full items-center px-4 py-2 text-sm',
                      {
                        'bg-gray-100 text-gray-900': active,
                        'text-gray-700': !active,
                        'opacity-50 cursor-not-allowed': item.disabled
                      }
                    )}
                  >
                    {item.icon && (
                      <span className="mr-2">{item.icon}</span>
                    )}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}