import { useState, useEffect } from "react";
import ActionButton from "./components/ActionButton";
import { titleCase } from "./helper_functions/helpers";
import PositionInput from "./components/PositionInput";
import NameInput from "./components/NameInput";
import TimeWidget from "./components/TimeWidget";
function App() {
  const [uplist, setUplist] = useState([]);
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const URL = "https://jpatrick6420.pythonanywhere.com/";
  // const localURL = "http://127.0.0.1:5000/";
  useEffect(function () {
    const getData = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      setUplist(data);
    };
    getData();
  }, []);

  const handleAddToUplist = async (name) => {
    if (name == "") return;
    const newName = name.toLowerCase();

    const newList = [...uplist];
    if (!newList.includes(newName)) {
      const response = await fetch(`${URL}/add/${newName}`);
      const data = await response.json();

      setUplist(data);
    }
    setName("");
  };
  const handleSkip = async () => {
    const response = await fetch(`${URL}skip`);
    const data = await response.json();
    setUplist(data);
  };
  const handleRemoval = (name) => {
    const removeName = async (name) => {
      const response = await fetch(`${URL}delete/${name}`);
      const data = await response.json();
      setUplist(data);
    };
    removeName(name);

    setName("");
  };
  const handleInsert = (name, position) => {
    const insertPerson = async (userName, userPosition) => {
      const response = await fetch(`${URL}insert/${userName}/${userPosition}`);
      const data = await response.json();
      setUplist(data);
    };
    insertPerson(name, position);

    setName("");
  };

  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const handleUndo = () => {
    const undoRemoval = async () => {
      const response = await fetch(`${URL}undo`);
      const data = await response.json();
      setUplist(data);
    };
    undoRemoval();
  };
  const handleReset = async () => {
    const response = await fetch(`${URL}reset`);
    const data = await response.json();
    setUplist(data);
  };
  return (
    <section className="flex justify-center items-center min-w-full min-h-[100dvh]">
      <section className="border-blue-200 border-2 p-2 relative">
        <TimeWidget />
        <NameInput handleChange={setName} inputValue={name} />

        {modal && (
          <PositionInput
            label="Position"
            handler={handleInsert}
            nameInput={name}
            toggleModal={toggleModal}
          />
        )}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {!modal && (
            <ActionButton
              className="bg-blue-500 hover:bg-blue-400"
              handleClick={handleAddToUplist}
              label="Add"
              type="primary"
              item={name}
            />
          )}
          {!modal && (
            <ActionButton
              handleClick={handleSkip}
              label="Take Up"
              type="skip"
              item=""
            />
          )}

          {!modal && (
            <ActionButton
              handleClick={handleRemoval}
              label="Scratch"
              type="remove"
              item={name}
            />
          )}
          {!modal && (
            <ActionButton
              handleClick={handleUndo}
              label="Undo"
              type="undo"
              item=""
            />
          )}
          {!modal && (
            <ActionButton
              handleClick={handleReset}
              label="Reset"
              type="undo"
              item=""
            />
          )}
          {!modal && (
            <button
              onClick={() => {
                toggleModal();
              }}
              className="bg-teal-500 hover:bg-teal-300 px-1 py-0.5 text-stone-100"
            >
              Insert
            </button>
          )}
        </div>
        <ul>
          {uplist.length !== 0 &&
            uplist.map((item, idx) => {
              return <li key={idx + 1}>{`${idx + 1}) ${titleCase(item)}`}</li>;
            })}
        </ul>
      </section>
    </section>
  );
}

export default App;
