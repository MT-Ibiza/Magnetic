'use client';

export interface CheckboxProps {
  url?: string;
  label?: string;
  subLabel?: string;
  className?: string;
  name: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({
  url,
  subLabel = '',
  label = '',
  name,
  className = '',
  defaultChecked,
  onChange,
}: CheckboxProps) {
  return (
    <div
      className={`flex text-sm sm:text-base ${className}`}
      style={{ width: 'fit-content' }}
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        className="cursor-pointer focus:ring-primary-700 h-5 w-5 text-primary-700 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700 dark:checked:text-primary-500 dark:focus:ring-primary-500"
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <label
          htmlFor={name}
          className="cursor-pointer ml-3.5 flex flex-col flex-1 justify-center hover:text-gray-600"
        >
          {url ? (
            <a href={url} target="_blank">
              {label}
            </a>
          ) : (
            <>{label}</>
          )}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
