import  { useState } from 'react';

interface SelectProps<T> {
  label: string;
  options: T[];
  optionLabel: string; // Property name to display as the option label
  optionValue: string; // Property name to use as the option value
  onChange: (value: string) => void;
  value: string;
}

const Select = <T,>({ label, options, optionLabel, optionValue, onChange, value }: SelectProps<T>) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (selectedValue: string) => {
    onChange(selectedValue);
    toggleDropdown();
  };

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <div className="relative z-20 bg-white dark:bg-form-input">
       
        <div
          className={`${
            isDropdownOpen ? 'block' : 'hidden'
          } absolute top-full left-0 w-full max-h-40 overflow-y-auto rounded-b-md border-t border-l border-r border-stroke bg-white dark:bg-form-input`}
        >
               <select
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          value={value}
          onChange={(e) => handleOptionSelect(e.target.value)}
        >
           <option key={0} value={""} />
          {options.map((option: any) => (
            <option key={option[optionValue]} value={option[optionValue]}>
              {option[optionLabel]}
            </option>
          ))}
        </select>
        </div>
        <select
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
           <option key={0} value={""} />
          {options.map((option: any) => (
            <option key={option[optionValue]} value={option[optionValue]}>
              {option[optionLabel]}
            </option>
          ))}
        </select>
        <span
          className={`absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          onClick={toggleDropdown}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Your SVG icon */}
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Select;
