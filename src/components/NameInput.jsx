function NameInput({ inputValue, handleChange }) {
  return (
    <div className="grid grid-cols-5">
      <label className="text-md mr-2">Name</label>
      <input
        type="text"
        className="col-span-4 outline-1 outline-gray-900 px-1 py-0.5 text-sm w-full"
        value={inputValue}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </div>
  );
}

export default NameInput;
