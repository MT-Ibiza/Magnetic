import { Theme } from "@radix-ui/themes";

interface Props {
  children: any;
  locale: "en" | "es" | "de";
}

async function App(props: Props) {
  const { children, locale } = props;

  return <Theme className="bg-page">{children}</Theme>;
}

export default App;
