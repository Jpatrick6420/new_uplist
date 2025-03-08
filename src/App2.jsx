import { useState, useEffect } from "react";
import ActionButton from "./components/ActionButton";
import { titleCase } from "./helper_functions/helpers";
import PositionInput from "./components/PositionInput";
import NameInput from "./components/NameInput";
import TimeWidget from "./components/TimeWidget";
import StaticButton from "./components/StaticButton";
function App2() {
  const [uplist, setUplist] = useState([]);
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [uplistIsUpdated, setUplistIsUpdated] = useState(false);
  const URL = "https://jpatrick6420.pythonanywhere.com/";
  // const localURL = "http://127.0.0.1:5000/";

  const getData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setUplist(data);
  };

  useEffect(function () {
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

  const toggleUpdate = async () => {
    await getData();
    setUplistIsUpdated(true);
    const uplistIsCurrent = () => {
      setUplistIsUpdated(false);
    };

    setTimeout(uplistIsCurrent, 1000 * 8);
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

        {uplistIsUpdated && modal && (
          <PositionInput
            label="Position"
            handler={handleInsert}
            nameInput={name}
            toggleModal={toggleModal}
          />
        )}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {uplistIsUpdated && !modal && (
            <ActionButton
              color="blue"
              handleClick={handleAddToUplist}
              label="Add"
              item={name}
            />
          )}
          {uplistIsUpdated && !modal && (
            <StaticButton
              handleClick={handleSkip}
              label="Take Up"
              color="red"
            />
          )}

          {uplistIsUpdated && !modal && (
            <ActionButton
              handleClick={handleRemoval}
              label="Scratch"
              color="amber"
              item={name}
            />
          )}
          {uplistIsUpdated && !modal && (
            <StaticButton
              handleClick={handleUndo}
              label="Undo"
              color="violet"
            />
          )}
          {uplistIsUpdated && !modal && (
            <StaticButton
              handleClick={handleReset}
              label="Reset"
              color="emerald"
            />
          )}
          {uplistIsUpdated && !modal && (
            <button
              onClick={() => {
                toggleModal();
              }}
              className="bg-teal-500 hover:bg-teal-300 px-1 py-0.5 text-stone-100"
            >
              Insert
            </button>
          )}
          {!uplistIsUpdated && (
            <div className="w-full col-span-3 my-2">
              <button
                onClick={() => toggleUpdate()}
                className=" bg-green-500 hover:bg-green-300 px-1 py-0.5 text-stone-100 w-full"
              >
                Update
              </button>
            </div>
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

export default App2;
