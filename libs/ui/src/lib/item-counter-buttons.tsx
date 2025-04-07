interface Props {
  currentAmount: number;
  onClickAdd: () => void;
  onClickRemove: () => void;
  min?: number;
  max?: number;
}

export function ItemCounterButtons({
  currentAmount,
  onClickAdd,
  onClickRemove,
  min = 1,
  max = 99,
}: Props) {
  const isMin = currentAmount <= min;
  const isMax = currentAmount >= max;

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        className={`bg-gray-100 text-black px-2 py-[0.5px] rounded-lg transition-colors ${
          isMin ? 'opacity-10 pointer-events-none' : 'hover:bg-primary-dark'
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (!isMin) onClickRemove();
        }}
      >
        -
      </button>
      <p className={`text-md font-semibold ${currentAmount > 0 && 'text-green-600'}`}>
        {currentAmount}
      </p>
      <button
        className={`bg-gray-100 text-black px-2 py-[0.5px] rounded-lg transition-colors ${
          isMax ? 'opacity-10 pointer-events-none' : 'hover:bg-primary-dark'
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (!isMax) onClickAdd();
        }}
      >
        +
      </button>
    </div>
  );
}
