const Tooltip = ({ x, y, label }) => {
  return (
    <div
      className="text-md bg-stone-700 px-1 border-stone-400 border rounded"
      style={{ position: "fixed", left: x, top: y, opacity: 1, zIndex: 9999 }}
    >
      {label}
    </div>
  );
};

export default Tooltip;
