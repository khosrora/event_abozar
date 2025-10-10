"use client";

interface SearchToolbarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  children?: React.ReactNode;
}

export default function SearchToolbar({ 
  value, 
  onChange, 
  onClear, 
  placeholder, 
  children 
}: SearchToolbarProps) {
  return (
    <div className="mb-6 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
      <label className="input input-bordered flex items-center gap-2 md:max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z" />
        </svg>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          className="grow"
          placeholder={placeholder}
        />
        {value && (
          <button 
            className="btn btn-xs" 
            onClick={onClear}
            type="button"
          >
            پاک‌سازی
          </button>
        )}
      </label>
      {children && (
        <div className="flex gap-2">
          {children}
        </div>
      )}
    </div>
  );
}