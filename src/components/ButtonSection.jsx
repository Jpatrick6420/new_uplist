import { useState } from "react";
/* eslint-disable react/prop-types */

import PositionInput from "./PositionInput";
import ActionButton from "./ActionButton";
import StaticButton from "./StaticButton";
import { formatInput } from "../helper_functions/helpers";

const BUTTONSTIMEOUT = 10;

function ButtonSection({ getData, uplist, setUplist, setName, name, URL }) {
  const [modal, setModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const toggleUpdate = async () => {
    await getData();
    setIsUpdated(true);

    const uplistIsCurrent = () => {
      setIsUpdated(false);
      setModal(false);
    };

    setTimeout(uplistIsCurrent, 1000 * BUTTONSTIMEOUT);
  };
  const handleAddToUplist = async (name) => {
    if (name == "") return;
    const newName = formatInput(name);

    const newList = [...uplist];
    if (!newList.includes(newName)) {
      const response = await fetch(`${URL}/add/${newName}`, {
        method: "PATCH",
      });
      const data = await response.json();

      setUplist(data);
    }
    setName("");
  };
  const handleSkip = async () => {
    const response = await fetch(`${URL}skip`, { method: "PATCH" });
    const data = await response.json();
    setUplist(data);
  };
  const handleRemoval = (name) => {
    const removeName = async (name) => {
      const response = await fetch(`${URL}delete/${formatInput(name)}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setUplist(data);
    };
    removeName(name);

    setName("");
  };
  const handleInsert = (name, position) => {
    const insertPerson = async (userName, userPosition) => {
      const response = await fetch(
        `${URL}insert/${formatInput(userName)}/${userPosition}`,
        { method: "PATCH" }
      );
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
      const response = await fetch(`${URL}undo`, { method: "PATCH" });
      const data = await response.json();
      setUplist(data);
    };
    undoRemoval();
  };
  const handleReset = async () => {
    const response = await fetch(`${URL}reset`, { method: "PATCH" });
    const data = await response.json();
    setUplist(data);
  };
  return (
    <div className="my-4">
      {modal && isUpdated && (
        <PositionInput
          label="Position"
          handler={handleInsert}
          nameInput={name}
          toggleModal={toggleModal}
        />
      )}
      <div className="grid grid-cols-3 gap-2 mt-2">
        {isUpdated && !modal && (
          <ActionButton
            color={"blue"}
            handleClick={handleAddToUplist}
            label="Add"
            item={name}
          />
        )}
        {!modal && isUpdated && (
          <StaticButton handleClick={handleSkip} label="Take Up" type="red" />
        )}

        {!modal && isUpdated && (
          <ActionButton
            handleClick={handleRemoval}
            label="Scratch"
            color="amber"
            item={name}
          />
        )}
        {!modal && isUpdated && (
          <StaticButton handleClick={handleUndo} label="Undo" color="violet" />
        )}
        {!modal && isUpdated && (
          <ActionButton
            handleClick={handleReset}
            label="Reset"
            color="emerald"
          />
        )}
        {!modal && isUpdated && (
          <button
            onClick={() => {
              toggleModal();
            }}
            className="bg-teal-500 hover:bg-teal-300 px-1 py-0.5 text-stone-100"
          >
            Insert
          </button>
        )}
        {!isUpdated && (
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
    </div>
  );
}

export default ButtonSection;
