"use client";

export default function GameItem({
    game,
    isSelected,
    onSelect,
    onRemove
})
{
    const base = "mb-2 rounded-md px-4 py-3 cursor-pointer transition-colors duration-200 flex items-center justify-between";

    const startClasses = isSelected
        ? "bg-orange-600 text-white hover:bg-orange-500"
        : "bg-slate-800 text-slate-100 hover:bg-slate-600";

    return (
        <li onClick={onSelect} className={`${base} ${startClasses} `}>
            <div>
                <p className="font-semi-bold">{game.title}</p>
                <p className="text-sm">
                    Status: {game.status} - Platform: {game.platform}
                    </p>
                    </div>
                    <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="">
                    Remove
                    </button>
        </li>
    );
}