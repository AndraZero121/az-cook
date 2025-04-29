interface Props {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  hasSearch?: boolean;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  children, 
  hasSearch, 
  onSearch,
  searchPlaceholder = "Cari..."
}: Props) {
  return (
    <div className="w-full border-b border-gray-100">
      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-gray-600">{subtitle}</p>
            )}
          </div>

          <div className="flex w-full flex-col items-stretch gap-4 md:w-auto md:flex-row md:items-center">
            {hasSearch && (
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
                />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}