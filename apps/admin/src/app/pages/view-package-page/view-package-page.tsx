import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { Link, useParams } from 'react-router-dom';
import { Button, Text } from '@magnetic/ui';
import { usePackage } from '../../hooks/usePackage';
import { FaCheck } from 'react-icons/fa6';

interface Props {}
export interface PricingItem {
  isPopular: boolean;
  name: string;
  pricing: string;
  desc: string;
  per: string;
  features: string[];
}

function ViewPackagePage(props: Props) {
  const {} = props;
  const params = useParams();
  const packageId = parseInt(params.id || '');
  const { isLoading, isError, plan, error } = usePackage(packageId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  if (!plan) {
    return <Text>Package Not Found</Text>;
  }

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

  const parsedFeatures = parseFeaturesFromHtml(plan.features);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 flex flex-col gap-[20px]">
          <div className="bg-base-100 listingSection__wrap">
            <h2 className="text-2xl font-semibold">{plan.name} Plan</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            {plan.description && (
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: plan.description }}
              />
            )}
          </div>
          <div className="bg-base-100 listingSection__wrap">
            <div>
              <h2 className="text-2xl font-semibold">Include </h2>
              <span className="block mt-2">
                Included in the price
              </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm dark:text-neutral-300 ">
              {parsedFeatures.map((feature, index) => (
                <li className="flex items-center" key={index}>
                  <span className="mr-4 inline-flex flex-shrink-0">
                    <FaCheck />
                  </span>
                  <span>
                    {feature}
                  </span>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div
            className={
              'bg-base-100  relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden border-primary-500'
            }
          >
            <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
              PLAN
            </span>
            <div className="mb-8">
              <h3 className="block text-sm uppercase tracking-widest  mb-2 font-medium">
                {plan.name}
              </h3>
              <h2 className="text-5xl leading-none flex items-center ">
                <span>{plan.priceInCents}</span>
                <span className="text-lg ml-1 font-normal text-neutral-500">
                  /mo
                </span>
              </h2>
            </div>
            <nav className="space-y-4 mb-8">
              {parsedFeatures.map((item, index) => (
                <li className="flex items-center" key={index}>
                  <span className="mr-4 inline-flex flex-shrink-0">
                    <FaCheck />
                  </span>
                  <span>
                    {item}
                  </span>
                </li>
              ))}
            </nav>
            <div className="flex flex-col mt-auto">
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPackagePage;
