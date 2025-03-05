import { useReducer, useState } from "react";
import { titleCase } from "./helper_functions/helpers";
import "./index.css";
import ActionButton from "./components/ActionButton";
import Modal from "./components/Modal";

const init = { name: "", uplist: [], insertModal: false };

function reducer(state, action) {
  switch (action.type) {
    case "nameChange":
      return { ...state, name: action.payload };
    case "addToUplist":
      return {
        ...state,
        uplist: [...state.uplist, { name: action.payload }],
      };
    case "skipPerson":
      if (state.uplist.length > 0) {
        const newList = state.uplist.slice(1);
        return { ...state, uplist: newList };
      } else {
        return { ...state };
      }
    case "removePerson":
      const newList = state.uplist.filter(
        (item) => item.name !== action.payload
      );
      return { ...state, uplist: newList };
    case "insertPerson":
      const updatedList = [...state.uplist].splice(
        action.payload.number - 1,
        0,
        action.payload.name
      );
      return { ...state, uplist: updatedList };
    case "toggleModal":
      return { ...state, insertModal: !state.insertModal };
    default:
      return state;
  }
}

function App() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, init);

  const handleAddToUplist = (name) => {
    if (name == "") return;
    const names = state.uplist.map((item) => item.name);
    const uniqueNames = new Set(names);
    if (Array.from(uniqueNames).includes(name)) {
      setName("");
      return;
    }
    dispatch({ type: "addToUplist", payload: name });
    setName("");
  };
  const handleSkip = () => {
    dispatch({ type: "skipPerson" });
  };
  const handleRemoval = (name) => {
    dispatch({ type: "removePerson", payload: name });
    setName("");
  };
  const handleInsert = (name) => {
    dispatch({ type: "insertPerson", payload: name });
  };
  const toggleModal = () => {
    dispatch({ type: "toggleModal" });
  };
  return (
    <section className="flex justify-center items-center min-w-full min-h-[100dvh]">
      <section className="border-blue-200 border-2 p-2 relative">
        {state.insertModal && (
          <Modal list={state.uplist} name={name} dispatch={dispatch} />
        )}
        <label className="text-md mr-2">Name</label>
        <input
          type="text"
          className="outline-2 outline-gray-900 px-1 py-0.5 text-sm"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div className="flex justify-around gap-2 mt-2">
          <ActionButton
            className="bg-blue-500 hover:bg-blue-400"
            handleClick={handleAddToUplist}
            label="Add"
            type="primary"
            item={name}
          />
          <ActionButton
            handleClick={handleSkip}
            label="skip"
            type="skip"
            item=""
          />
          <ActionButton
            handleClick={handleRemoval}
            label="Scratch"
            type="remove"
            item={name}
          />
          <button
            onClick={() => {
              toggleModal();
            }}
            className="bg-teal-500 hover:bg-teal-300 px-1 py-0.5 text-stone-100"
          >
            Insert
          </button>
        </div>
        <ul>
          {state.uplist.length !== 0 &&
            state.uplist.map((item, idx) => {
              return (
                <li key={idx + 1}>{`${idx + 1}) ${titleCase(item.name)}`}</li>
              );
            })}
        </ul>
      </section>
    </section>
  );
}

export default App;
