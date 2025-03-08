/* eslint-disable react/prop-types */

function StaticButton({ label, handleClick, color }) {
  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        className={`bg-${color}-500 hover:bg-${color}-300 px-1 py-0.5 text-stone-100 w-full`}
      >
        {label}
      </button>
    </div>
  );
}

export default StaticButton;
