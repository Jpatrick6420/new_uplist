import { useState } from "react";
import ActionButton from "./ActionButton";

function PositionInput({ label, handler, nameInput, toggleModal }) {
  const [position, setPosition] = useState("");
  return (
    <div className="mt-2 flex">
      <div>
        <label>{label}</label>
        <input
          className="outline-1 mx-4 px-1 py-0.5"
          type="number"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-300 px-1 py-0.5 text-stone-100 "
          onClick={() => {
            handler(nameInput, Number(position));
            setPosition("");
            toggleModal();
          }}
        >
          Insert
        </button>
        <ActionButton handleClick={toggleModal} type="skip" label="X" />
      </div>
    </div>
  );
}

export default PositionInput;
