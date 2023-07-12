import React from "react";

type ButtonProps = {
  buttonType: string;
  onClick?: () => void; 
  text: string;
  icon?: string;
};

const Button = ({ buttonType, onClick, text, icon }: ButtonProps) => {
  return (
    <div className={`Button ${buttonType}`} onClick={onClick}>
      {icon && <span className={`${icon}`} />}
      <p className="f-Quicksand-light f-16 f-mobile-16 mb-0">{text}</p>
    </div>
  );
};

export default Button;
