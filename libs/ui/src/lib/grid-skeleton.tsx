interface Props {
  totalItems: number;
  classNameContent?: string;
  classNameCard?: string;
}

export function GridSkeleton(props: Props) {
  const { totalItems, classNameContent, classNameCard } = props;
  const elements = Array.from({ length: totalItems }, (_, index) => index);
  const classGrid =
    classNameContent ||
    'grid grid-cols-3 w-full md:gap-8 sm:grid-cols-2 lg:grid-cols-3';
  const classGridElement = classNameCard || 'w-full bg-gray-200 rounded-2xl';

  return (
    <div className={classGrid}>
      {elements.map((_, index) => (
        <div
          key={index}
          className={classGridElement}
          style={{ height: '20rem' }}
        ></div>
      ))}
    </div>
  );
}

export default GridSkeleton;
