import React from "react";

interface ButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  className?: string;
  title: string;
  bg?: string;
  bgHover?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  loading,
  disabled = false,
  title,
  className = "",
  bg = "bg-[#334faa]",
  bgHover = "bg-[#304592]",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-1 block w-full px-3 py-2  rounded-md text-white font-bold transition-all ${bg} hover:${bgHover} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
