function ActionButton({ label, handleClick, type, item }) {
  if (type == "primary") {
    return (
      <button
        onClick={() => handleClick(item)}
        className="bg-blue-500 hover:bg-blue-300 px-1 py-0.5 text-stone-100"
      >
        {label}
      </button>
    );
  }
  if (type == "skip") {
    return (
      <button
        onClick={handleClick}
        className="bg-red-500 hover:bg-red-300 px-1 py-0.5 text-stone-100"
      >
        {label}
      </button>
    );
  }
  if (type == "undo") {
    return (
      <button
        onClick={handleClick}
        className="bg-violet-500 hover:bg-violet-300 px-1 py-0.5 text-stone-100"
      >
        {label}
      </button>
    );
  }
  if (type == "remove") {
    return (
      <button
        onClick={() => handleClick(item)}
        className="bg-amber-500 hover:bg-amber-300 px-1 py-0.5 text-stone-100"
      >
        {label}
      </button>
    );
  }
  if (type == "insert") {
    return (
      <button
        onClick={handleClick}
        className="bg-teal-500 hover:bg-teal-300 px-1 py-0.5 text-stone-100"
      >
        {label}
      </button>
    );
  }
}

export default ActionButton;
