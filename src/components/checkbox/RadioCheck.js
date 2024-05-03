import React from "react";

function RadioButton({ id, name, label, value, register, checked }) {
  return (
    <div className="relative inline-block cursor-pointer">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        ref={register}
        className="absolute opacity-0 w-0 h-0"
        defaultChecked={checked}
      />
      <label
        htmlFor={id}
        className="flex items-center gap-x-3 cursor-pointer select-none"
      >
        <span className="block w-5 h-5 rounded-full border-2 border-gray-400 transition-all duration-300 hover:border-green-500 hover:scale-110 hover:shadow-lg peer-checked:bg-green-500 peer-checked:border-transparent peer-checked:scale-90 peer-checked:shadow-xl"></span>
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
