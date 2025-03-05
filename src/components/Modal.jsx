import { useState } from "react";
import { titleCase } from "../helper_functions/helpers";
function Modal({ list, name, dispatch }) {
  const [positionNumber, setPositionNumber] = useState(0);
  console.log("list", list);
  return (
    <form className="absolute  top-0 bottom-0 left-0 right-0 bg-white">
      <p>Desired Name:{titleCase(name)}</p>
      <p>list</p>
      <ul>
        {list.map((item, index) => {
          return <li key={index + 1}>{item.name}</li>;
        })}
      </ul>
      <label>position</label>
      <input
        type="number"
        id="position_number"
        value={positionNumber}
        onChange={(e) => {
          if (e.target.value > list.length || e.target.value < 1) return;
          setPositionNumber(e.target.value);
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-300 px-1 py-0.5 text-stone-100"
        onClick={(e) => {
          e.preventDefault();
          dispatch({
            type: "insertPerson",
            payload: { number: positionNumber, name: name },
          });
          setPositionNumber(0);
          dispatch({ type: "toggleModal" });
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default Modal;
