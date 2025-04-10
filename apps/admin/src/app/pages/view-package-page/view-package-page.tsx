import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { useParams } from 'react-router-dom';
import { PlanCard, Text } from '@magnetic/ui';
import { usePackage } from '../../hooks/usePackage';
import { FaCheck } from 'react-icons/fa6';
import { FaCircleCheck } from 'react-icons/fa6';

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
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">
        <div className="col-span-8 flex flex-col gap-[20px]">
          <div className="bg-base-100 listingSection__wrap">
            <h2 className="text-2xl font-semibold">{plan.name}</h2>
            <div className="w-14 border-b border-primary-700 dark:border-neutral-700"></div>
            {plan.description && (
              <div
                className="text-[14px] lg:text-[16px]"
                dangerouslySetInnerHTML={{ __html: plan.description }}
              />
            )}
          </div>
          <div className="bg-base-100 listingSection__wrap">
            <div>
              <h2 className="text-2xl font-semibold">Include </h2>
              <span className="block mt-2">Included in the price</span>
            </div>
            <div className="w-14 border-b border-primary-700 dark:border-neutral-700"></div>
            <div className="grid grid-cols-1 gap-4 text-md">
              {parsedFeatures.map((feature, index) => (
                <li className="flex items-center" key={index}>
                  <span className="mr-4 inline-flex flex-shrink-0">
                    <FaCircleCheck className="text-primary-700" />
                  </span>
                  <span className="text-[14px] lg:text-[16px]">{feature}</span>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <PlanCard
            title={plan.name}
            price={plan.priceInCents}
            features={plan.features}
          />
        </div>
      </div>
    </>
  );
}

export default ViewPackagePage;
