import React from "react";
import { Link } from "react-router-dom";

function Button({ text, onClick }) {
  return (
    <div>
      <button
        class="w-[100px] border-[3px] rounded-[7px] h-[30px] bg-white items-center flex justify-center text-center transition-all duration-200 hover:bg-slate-300"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
