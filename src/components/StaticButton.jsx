/* eslint-disable react/prop-types */

function StaticButton({ label, handleClick, color }) {
  const colorClasses = {
    red: "bg-red-500 hover:bg-red-400",
    violet: "bg-violet-500 hover:bg-violet-400",
    emerald: "bg-emerald-500 hover:bg-emerald-400",
  };

  const buttonClass = `px-1 py-0.5 text-stone-100 w-full bg-green-500 hover:bg-green-400`;
  return (
    <div className="w-full">
      <button onClick={handleClick} className={buttonClass}>
        {label}
      </button>
    </div>
  );
}

export default StaticButton;
