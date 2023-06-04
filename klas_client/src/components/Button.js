import React from "react";
import { Link } from "react-router-dom";

function Button({ text, onClick }) {
  return (
    <div>
      <button class="border-[5px]" onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

export default Button;
