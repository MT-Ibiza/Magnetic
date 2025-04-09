import { useParams } from 'react-router-dom';
import { Text, Button, SectionCard, Modal } from '@magnetic/ui';
import { FaCircleCheck } from 'react-icons/fa6';
import { usePackage } from '../../hooks/usePackage';
import FormCalendly from '../../components/form-calendly';
import { useState } from 'react';
import SkeletonPlan from '../../components/skeletons/skeleton-plan';

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

  return (
    <>
      {isLoading ? (
        <SkeletonPlan />
      ) : (
        <>
          {plan && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">
              <div className="col-span-8 flex flex-col gap-[20px]">
                <SectionCard title={plan.name}>
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
                <div className="sticky bg-base-100 top-[90px] listingSection__wrap">
                  <h3 className="text-xl font-semibold">Elevate Your Stay</h3>
                  <p className="lg:text-[16px] text-[14px]">
                    Upgrade your package today for exclusive access, or chat
                    with our team to learn more.
                  </p>
                  <div className="space-y-4">
                    {plan.name !== 'Diamond' && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {}}
                      >
                        Upgrade Now
                      </Button>
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
