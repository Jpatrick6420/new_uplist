/* eslint-disable react/prop-types */

import { useState } from "react";
import StaticButton from "./StaticButton";

function PositionInput({ label, handler, nameInput, toggleModal }) {
  const [position, setPosition] = useState("");
  return (
    <div className="mt-2 md:flex">
      <div>
        <label>{label}</label>
        <input
          className="outline-1 mx-4 px-1 py-0.5"
          type="number"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          className="bg-blue-500 hover:bg-blue-300 text-xs px-1 py-0.5 text-stone-100 block md:inline-block "
          onClick={() => {
            handler(nameInput, Number(position));
            setPosition("");
            toggleModal();
          }}
        >
          Insert
        </button>
        <StaticButton handleClick={toggleModal} color="red" label="X" />
      </div>
    </div>
  );
}

export default PositionInput;
