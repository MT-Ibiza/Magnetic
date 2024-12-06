interface Props {
  text: string;
}

async function HtmlText(props: Props) {
  const { text } = props;
  return (
    <div className="editor-text" dangerouslySetInnerHTML={{ __html: text }} />
  );
}

export default HtmlText;
