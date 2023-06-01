import React from "react";

function Input({ type, onChange, placeholder }) {
  return (
    <div>
      <input
        class="border-[5px]"
        type={type}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
