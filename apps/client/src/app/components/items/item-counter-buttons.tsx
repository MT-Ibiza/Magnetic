import React from 'react';

interface Props {
  currentAmount: number;
  onClickAdd: (amount: number) => void;
  onClickRemove: (amount: number) => void;
  children?: React.ReactElement;
}

function ItemCounterButtons(props: Props) {
  const { currentAmount, onClickAdd, onClickRemove, children } = props;

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col justify-end">{children}</div>
      <div className="flex items-center justify-center gap-4">
        <button
          className="bg-gray-100 text-black px-2 py-[0.5px] rounded-lg hover:bg-primary-dark transition-colors"
          onClick={(e) => {
            e.preventDefault();
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
          onClick={(e) => {
            e.preventDefault();
            onClickAdd(currentAmount + 1);
          }}
          className="bg-gray-100 text-black px-2 py-[0.5px] rounded-lg hover:bg-primary-dark transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ItemCounterButtons;
