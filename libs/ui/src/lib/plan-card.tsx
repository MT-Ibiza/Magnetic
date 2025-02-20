import { FaCheck } from 'react-icons/fa';
import Button from './button';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  price: number;
  features?: string;
  maxFeatures?: number;
  seeMoreLink?: string;
  className?: string;
}

export function PlanCard(props: Props) {
  const { title, price, features, maxFeatures, seeMoreLink, className } = props;

  const parseFeaturesFromHtml = (
    featuresHtml: string | undefined
  ): string[] => {
    if (!featuresHtml) {
      return [];
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = featuresHtml;

    const featureList = tempDiv.querySelectorAll('li');
    return Array.from(featureList).map((li) => li.textContent?.trim() || '');
  };

  const parsedFeatures = parseFeaturesFromHtml(features);

  const truncatedFeatures =
    maxFeatures !== undefined
      ? parsedFeatures.slice(0, maxFeatures)
      : parsedFeatures;

  return (
    <div
      className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${className}`}
    >
      <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
        PLAN
      </span>
      <div className="mb-8">
        <h3 className="block text-sm uppercase tracking-widest  mb-2 font-medium">
          {title}
        </h3>
        <h2 className="text-5xl leading-none flex items-center ">
          <span className="text-3xl lg:text-5xl">{price}</span>
          <span className="text-base lg:text-lg ml-1 font-normal text-neutral-500">
            /per week
          </span>
        </h2>
      </div>
      <nav className="space-y-4 mb-8">
        {truncatedFeatures.map((item, index) => (
          <li className="flex items-center" key={index}>
            <span className="mr-4 inline-flex flex-shrink-0">
              <FaCheck className='text-[#5046e5]' />
            </span>
            <span className="text-[14px] lg:text-[16px]">{item}</span>
          </li>
        ))}
      </nav>
      <div className="flex flex-col mt-auto">
        <div className="flex justify-end pb-[15px]">
          {seeMoreLink &&
            maxFeatures !== undefined &&
            parsedFeatures.length > maxFeatures && (
              <Link
                to={seeMoreLink}
                className="text-primary-500 text-sm underline hover:text-primary-700 transition"
              >
                See more features
              </Link>
            )}
        </div>
        {/* <Link to={seeMoreLink || ''}> */}
        <Button className="w-full">Upgrade Now</Button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default PlanCard;
