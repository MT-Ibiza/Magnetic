import { Text } from '@magnetic/ui';
interface Props {}

function Footer(props: Props) {
  const {} = props;

  return (
    <div className="bg-gray-800">
      <div className='container lg:px-[100px] p-5 flex flex-col lg:flex-row gap-[5px] lg:gap-[0px] lg:justify-between'>
        <Text className="text-white" size="1">
          © 2025 Magnetic Travel
        </Text>
        <div className="flex gap-3">
          <a
            href="/terms-conditions"
            target="_blank"
            className="hover:underline text-white"
          >
            <Text size="1">Terms & Conditions</Text>
          </a>
          <a
            href="/privacy-policy"
            target="_blank"
            className="hover:underline text-white"
          >
            <Text size="1">Privacy</Text>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
