import { Text } from '@magnetic/ui';
interface Props {}

function Footer(props: Props) {
  const {} = props;

  return (
    <div className="flex justify-between p-5 bg-gray-800">
      <Text className="text-white" size="1">
        © Magnetic Travel 2025 All rights reserved.
      </Text>
      <div className="flex gap-3">
        <a
          href="/terms-conditions"
          target="_blank"
          className="underline text-white"
        >
          <Text size="1">Terms & Conditions</Text>
        </a>
        <a
          href="/privacy-policy"
          target="_blank"
          className="underline text-white"
        >
          <Text size="1">Privacy Policy</Text>
        </a>
      </div>
    </div>
  );
}

export default Footer;
