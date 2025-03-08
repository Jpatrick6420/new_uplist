/* eslint-disable react/prop-types */
function ActionButton({ label, handleClick, item, color }) {
  return (
    <button
      onClick={() => handleClick(item)}
      className={`bg-${color}-500 hover:bg-${color}-300 px-1 py-0.5 text-stone-100`}
    >
      {label}
    </button>
  );
}

export default ActionButton;
