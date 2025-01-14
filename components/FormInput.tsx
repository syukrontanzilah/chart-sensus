import React, { HTMLInputTypeAttribute, InputHTMLAttributes,} from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; 
  placeholder?: string;
  className? : string;
  disabled? : boolean;
}

const FormInput: React.FC<FormInputProps> = ({ 
    // label, 
    name, 
    type,
    value, 
    onChange, 
    required = false, 
    placeholder,
    className,
    disabled = false,
    ...props 
}) => {

  return (
    <div className="w-full">
      {/* <label htmlFor={name} className="block text-xs font-bold text-gray-700">
        {label}
      </label> */}
      <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-primaryLight text-gray-700 focus:border-primary border-input   dark:bg-white ring-offset-background placeholder:text-gray-400 ${className}`}
        disabled={disabled}
        required={required} 
        placeholder={placeholder}
        {...props}  
      />
      </div>
    </div>
  );
};

export default FormInput;
