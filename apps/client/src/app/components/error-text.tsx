export const ErrorText = ({ text = '' }: { text?: string }) => {
  return <div className="error-text">{text.toUpperCase()}</div>;
};
