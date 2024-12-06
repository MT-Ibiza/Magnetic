import React from 'react';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: '1' | '2' | '3' | '4' | '5';
  children: React.ReactElement | string;
  className?: string;
}

export function Text(props: Props) {
  const { size, className, children, ...rest } = props;

  const sizes = {
    1: 'text-sm',
    2: 'text-base',
    3: 'text-lg',
    4: 'text-xl',
    5: 'text-2xl',
  };

  const sizeSelected = size ? sizes[size] : sizes[2];

  return (
    <p className={`${sizeSelected} ${className || ''}`} {...rest}>
      {children}
    </p>
  );
}

const TextError = ({ text }: { text: string }) => (
  <Text size="1" className="mt-1 text-red-500">
    {text}
  </Text>
);

Text.TextInputError = TextError;

export default Text;
