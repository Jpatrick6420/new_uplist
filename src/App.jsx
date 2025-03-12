import { useState, useEffect } from "react";
import NameInput from "./components/NameInput";
import TimeWidget from "./components/TimeWidget";
import ButtonSection from "./components/ButtonSection";
import Uplist from "./components/Uplist";
function App() {
  const [uplist, setUplist] = useState([]);
  const [name, setName] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [modal, setModal] = useState(false);
  const BUTTONSTIMEOUT = 12;

  const URL = "https://jpatrick6420.pythonanywhere.com";
  // const localURL = "http://127.0.0.1:5000";

  const getData = async () => {
    try {
      const response = await fetch(URL, { method: "GET" });
      if (!response.ok) {
        throw new Error(
          `HTTP request error. Unable to retrieve updated information. ${response.status}`
        );
      }
      const data = await response.json();
      setUplist(data?.uplist);
    } catch (err) {
      console.error(` ${err.message}`);
    }
  };
  useEffect(function () {
    getData();
  }, []);

  const toggleUpdate = async () => {
    await getData();
    setIsUpdated(true);

    const uplistIsCurrent = () => {
      setIsUpdated(false);
      setModal(false);
    };

    setTimeout(uplistIsCurrent, 1000 * BUTTONSTIMEOUT);
  };

  return (
    <section className="flex justify-center items-center max-w-screen min-h-[100dvh] bg-blue-200 overflow-x-hidden ">
      <section className="border-blue-200 border-2 p-2 relative bg-stone-100 shadow-lg shadow-gray-900">
        <TimeWidget />
        <NameInput handleChange={setName} inputValue={name} />
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
        {isUpdated && (
          <ButtonSection
            uplist={uplist}
            setUplist={setUplist}
            setName={setName}
            URL={URL}
            name={name}
            getData={getData}
            modal={modal}
            setModal={setModal}
          />
        )}

        <Uplist uplist={uplist} />
      </section>
    </section>
  );
}

export default App;
