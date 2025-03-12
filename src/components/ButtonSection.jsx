// import { useState } from "react";
/* eslint-disable react/prop-types */

import PositionInput from "./PositionInput";
import ActionButton from "./ActionButton";
import StaticButton from "./StaticButton";
import { formatInput } from "../helper_functions/helpers";

// const BUTTONSTIMEOUT = 10;

function ButtonSection({
  uplist,
  setUplist,
  setName,
  name,
  URL,
  modal,
  setModal,
}) {
  // const [modal, setModal] = useState(false);
  // const [isUpdated, setIsUpdated] = useState(false);

  // const toggleUpdate = async () => {
  //   await getData();
  //   setIsUpdated(true);

  //   const uplistIsCurrent = () => {
  //     setIsUpdated(false);
  //     setModal(false);
  //   };

  //   setTimeout(uplistIsCurrent, 1000 * BUTTONSTIMEOUT);
  // };
  const handleAddToUplist = async (name) => {
    try {
      if (name == "") {
        throw new Error("Please provide a name");
      }
      const newName = formatInput(name);

      const newList = [...uplist];
      if (!newList.includes(newName)) {
        const response = await fetch(`${URL}/add/${newName}`, {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Error in retrieving uplist");
        }
        const data = await response.json();

        setUplist(data.uplist);
      }
      setName("");
    } catch (err) {
      console.error(`HTTP request error.  message: ${err.message}`);
    }
  };
  const handleSkip = async () => {
    try {
      const response = await fetch(`${URL}/skip`, { method: "PATCH" });
      if (!response.ok) {
        throw new Error(`HTTP Error. Status code is ${response.status}`);
      }
      const data = await response.json();
      setUplist(data.uplist);
    } catch (error) {
      console.error(`Error in skipping: Status code is ${error.message}`);
    }
  };
  const handleRemoval = async (name) => {
    try {
      const response = await fetch(`${URL}/delete/${formatInput(name)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No person was removed");
      }
      const data = await response.json();
      setUplist(data.uplist);

      setName("");
    } catch (err) {
      console.error(`HTTP request failed. ${err.message}`);
    }
  };
  const handleInsert = async (name, position) => {
    try {
      const response = await fetch(
        `${URL}/insert/${formatInput(name)}/${position}`,
        { method: "PATCH" }
      );
      if (!response.ok) {
        throw new Error(`Couldn't insert person.`);
      }
      const data = await response.json();
      setUplist(data.uplist);

      setName("");
    } catch (err) {
      console.error(
        `HTTP request error. status: ${err.status} message: ${err.message}`
      );
    }
  };

  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const handleUndo = async () => {
    try {
      const response = await fetch(`${URL}/undo`, { method: "PATCH" });
      if (!response.ok) {
        throw new Error(`Couldn't undo take up`);
      }
      const data = await response.json();
      setUplist(data.uplist);
    } catch (err) {
      console.error(`Status: ${err.status} message: ${err.message}`);
    }
  };
  const handleReset = async () => {
    try {
      const response = await fetch(`${URL}/reset`, { method: "PATCH" });
      if (!response.ok) {
        throw new Error(`Couldn't reset list`);
      }
      const data = await response.json();
      setUplist(data.uplist);
    } catch (err) {
      console.error(`Status: ${err.status} message: ${err.message}`);
    }
  };
  return (
    <div className="my-4">
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
            color={"blue"}
            handleClick={handleAddToUplist}
            label="Add"
            item={name}
          />
        )}
        {!modal && (
          <StaticButton handleClick={handleSkip} label="Take Up" type="red" />
        )}

        {!modal && (
          <ActionButton
            handleClick={handleRemoval}
            label="Scratch"
            color="amber"
            item={name}
          />
        )}
        {!modal && (
          <StaticButton handleClick={handleUndo} label="Undo" color="violet" />
        )}
        {!modal && (
          <ActionButton
            handleClick={handleReset}
            label="Reset"
            color="emerald"
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
        {/* {!isUpdated && (
          <div className="w-full col-span-3 my-2">
            <button
              onClick={() => toggleUpdate()}
              className=" bg-green-500 hover:bg-green-300 px-1 py-0.5 text-stone-100 w-full"
            >
              Update
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default ButtonSection;
