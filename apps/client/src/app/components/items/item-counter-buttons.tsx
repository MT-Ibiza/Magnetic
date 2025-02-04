import React from 'react';

interface Props {
  currentAmount: number;
  onClickAdd: (amount: number) => void;
  onClickRemove: (amount: number) => void;
}

function ItemCounterButtons(props: Props) {
  const { currentAmount, onClickAdd, onClickRemove } = props;

  return (
    <div className="flex items-center gap-4">
      <button
        className="bg-gray-100 text-black px-2 py-[0.5px] rounded-lg hover:bg-primary-dark transition-colors"
        onClick={() => {
          onClickRemove(currentAmount - 1);
        }}
      >
        -
      </button>
      <p
        className={`text-md font-semibold ${
          currentAmount > 0 && 'text-green-600'
        }`}
      >
        {currentAmount}
      </p>
      <button
        onClick={() => {
          onClickAdd(currentAmount + 1);
        }}
        className="bg-gray-100 text-black px-2 py-[0.5px] rounded-lg hover:bg-primary-dark transition-colors"
      >
        +
      </button>
    </div>
  );
}

export default ItemCounterButtons;
