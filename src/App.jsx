import { useState, useEffect } from "react";
import NameInput from "./components/NameInput";
import TimeWidget from "./components/TimeWidget";
import ButtonSection from "./components/ButtonSection";
import Uplist from "./components/Uplist";
function App() {
  const [uplist, setUplist] = useState([]);
  const [name, setName] = useState("");

  const URL = "https://jpatrick6420.pythonanywhere.com/";
  // const localURL = "http://127.0.0.1:5000/";

  const getData = async () => {
    const response = await fetch(URL, { method: "GET" });
    const data = await response.json();
    setUplist(data);
  };
  useEffect(function () {
    getData();
  }, []);

  return (
    <section className="flex justify-center items-center max-w-screen min-h-[100dvh] bg-blue-200 ">
      <section className="border-blue-200 border-2 p-2 relative bg-stone-100 shadow-lg shadow-gray-900">
        <TimeWidget />
        <NameInput handleChange={setName} inputValue={name} />
        <ButtonSection
          uplist={uplist}
          setUplist={setUplist}
          setName={setName}
          URL={URL}
          name={name}
          getData={getData}
        />

        <Uplist uplist={uplist} />
      </section>
    </section>
  );
}

export default App;
