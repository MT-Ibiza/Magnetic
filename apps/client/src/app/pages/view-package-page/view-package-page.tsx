import { useParams } from 'react-router-dom';
import { Text, Button, SectionCard, Modal } from '@magnetic/ui';
import { FaCircleCheck } from 'react-icons/fa6';
import { usePackage } from '../../hooks/usePackage';
import FormCalendly from '../../components/form-calendly';
import { use, useState } from 'react';
import SkeletonPlan from '../../components/skeletons/skeleton-plan';
import { useAuth } from '../../hooks/useAuth';
import UpgradeButton from '../../components/upgrade-button';
import { centsToEuros } from '@magnetic/utils';

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
  const [openModal, setOpenModal] = useState(false);
  const { setCurrentUser, getCurrentUser } = useAuth();
  const user = getCurrentUser();
  function toggleOpeModal() {
    setOpenModal(!openModal);
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

  function getSubTitle(userPackage: string, planName: string, price: number) {
    if (planName === 'Diamond') {
      if (userPackage === 'Diamond') return 'Your Package';
      return '+10% Management Fee';
    }

    if (planName === 'Platinum') {
      if (userPackage === 'Platinum') return 'Your Package';
      if (userPackage === 'Diamond') return 'Included';
    }

    if (planName === 'Gold') {
      if (userPackage === 'Gold') return 'Your Package';
      if (userPackage === 'Platinum' || userPackage === 'Diamond')
        return 'Included';
    }

    return `${centsToEuros(price)}€ Per Week`;
  }

  function getSmallText(
    userPackage: string | undefined,
    planName: string,
    price: number
  ) {
    if (!userPackage) return `${centsToEuros(price)}€ Per Week`;

    if (userPackage === 'Gold') {
      if (planName === 'Gold') return 'Included';
      if (planName === 'Diamond')
        return 'Minimum spend €15,000 per week. - €1,800 flat fee for lower spend.';
    }

    if (userPackage === 'Platinum') {
      if (planName === 'Gold') return 'With your package';
      if (planName === 'Platinum') return 'Included';
      if (planName === 'Diamond')
        return 'Minimum spend €15,000 per week. - €1,800 flat fee for lower spend.';
    }

    if (userPackage === 'Diamond') {
      if (planName === 'Diamond') return 'Included';
      return 'With your package';
    }

    return ``;
  }

  return (
    <>
      {isLoading ? (
        <SkeletonPlan />
      ) : (
        <>
          {plan && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">
              <div className={`col-span-8 flex flex-col gap-[20px]`}>
                <SectionCard
                  title={plan.name}
                  subTitle={getSubTitle(
                    user?.package?.name ?? '',
                    plan.name,
                    plan.priceInCents
                  )}
                  smallText={getSmallText(
                    user?.package?.name ?? '',
                    plan.name,
                    plan.priceInCents
                  )}
                  subTitleClassName="lg:text-[20px] font-medium"
                >
                  <>
                    {plan.description && (
                      <div
                        className="lg:text-[16px] text-[14px]"
                        dangerouslySetInnerHTML={{ __html: plan.description }}
                      />
                    )}
                  </>
                </SectionCard>
                <SectionCard title="Included">
                  <div className="grid grid-cols-1 gap-4 lg:text-[16px] text-[14px]">
                    {parseFeaturesFromHtml(plan.features).map(
                      (feature, index) => (
                        <li className="flex items-center" key={index}>
                          <span className="mr-4 inline-flex flex-shrink-0">
                            <FaCircleCheck className="text-primary-700" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      )
                    )}
                  </div>
                </SectionCard>
              </div>
              <div className="col-span-4">
                {(user?.package?.name === 'Gold' &&
                  (plan.name === 'Platinum' || plan.name === 'Diamond')) ||
                (user?.package?.name === 'Platinum' &&
                  plan.name === 'Diamond') ? (
                  <div className="sticky bg-base-100 top-[90px] listingSection__wrap">
                    <h3 className="text-xl font-semibold">Elevate Your Stay</h3>
                    <p className="lg:text-[16px] text-[14px]">
                      Upgrade your package today for exclusive access, or chat
                      with our team to learn more.
                    </p>
                    <div className="space-y-4">
                      {plan.name !== 'Diamond' &&
                        user?.package?.name !== 'Platinum' && (
                          <UpgradeButton
                            amountInCents={plan.priceInCents}
                            packageId={plan.id}
                          />
                        )}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={toggleOpeModal}
                      >
                        Book a Call
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="sticky bg-base-100 top-[90px] listingSection__wrap">
                    <h3 className="text-xl font-semibold">
                      Discuss Your Package
                    </h3>
                    <p className="lg:text-[16px] text-[14px]">
                      Connect with our team to talk about your trip and the
                      services available.
                    </p>
                    <div className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={toggleOpeModal}
                      >
                        Book a Call
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
      <Modal open={openModal}>
        <FormCalendly onCancel={toggleOpeModal} />
      </Modal>
    </>
  );
}

export default ViewPackagePage;
