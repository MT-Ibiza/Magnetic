interface Props {
  totalItems: number;
}

export function GridSkeleton(props: Props) {
  const { totalItems } = props;
  const elements = Array.from({ length: totalItems }, (_, index) => index);

  return (
    <div className="grid grid-cols-3 w-full gap-8">
      {elements.map((_, index) => (
        <div
          key={index}
          className="w-full bg-gray-200 rounded-2xl"
          style={{ height: '20rem' }}
        ></div>
      ))}
    </div>
  );
}

export default GridSkeleton;
