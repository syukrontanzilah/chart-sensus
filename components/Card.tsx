import React from "react";

interface CardProps {
  children: React.ReactNode; 
  className?: string; 
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-lg shadow-sm bg-white ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;