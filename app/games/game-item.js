"use client";

export default function GameItem({ game, isSelected, onClick, onRemove }) {
  const base =
    "mb-2 rounded-md px-4 py-3 cursor-pointer transition-colors flex justify-between items-center gap-4";
  const selectedClasses = "bg-orange-600 text-white hover:bg-orange-500";
  const normalClasses = "bg-slate-800 text-slate-100 hover:bg-slate-600";

  return (
    <li
      className={`${base} ${isSelected ? selectedClasses : normalClasses}`}
      onClick={onClick}
    >
      <div>
        <p className="font-semibold">{game.title}</p>
        <p className="text-xs text-slate-200">
          {game.platform} • {game.status}
        </p>
      </div>
      <button
        type="button"
        className="text-xs bg-slate-900/40 hover:bg-slate-900 rounded-md px-2 py-1 border border-slate-600"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        Remove
      </button>
    </li>
  );
}