import { Button } from '@magnetic/ui';
import { PlanCard } from '@magnetic/ui';
import { usePackages } from '../../hooks/usePackages';
import { useAuth } from '../../hooks/useAuth';
import FormRequestCall from '../../components/form-request-call';
import { toast } from 'sonner';
import Modal from '../../components/modal';
import { useState } from 'react';

export function PackagePage() {
  const { isLoading, packages, error, isError } = usePackages();
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const [openModal, setOpenModal] = useState(false);

  function toggleOpeModal() {
    setOpenModal(!openModal);
  }

  const filteredPackages = packages.filter(
    (item) => item.id !== user?.package?.id
  );

  return (
    <>
      <div className="nc-PageSubcription pb-24 lg:pb-32 ${className}">
        <div className="text-center mb-10">
          <header className="text-center max-w-2xl mx-auto mt-12 mb-20">
            <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              Concierge Packages
            </h2>
            <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
              Explore the perfect package for your stay.
            </span>
            <Button className="mt-[15px]" onClick={toggleOpeModal}>
              Book a Call
            </Button>
          </header>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PlanCard
              key={pkg.id}
              maxFeatures={3}
              seeMoreLink={`/packages/${pkg.id}`}
              title={pkg.name}
              price={pkg.priceInCents}
              features={pkg.features}
              packageId={pkg.id}
              userPackageId={user?.package?.id}
              className={`${
                pkg.id === user?.package?.id
                  ? 'border-primary-500'
                  : 'border-neutral-100 dark:border-neutral-700'
              }`}
            />
          ))}
        </div>
      </div>
      <Modal open={openModal}>
        <FormRequestCall
          onSave={() => {
            toggleOpeModal();
            toast.success('Your call has been successfully scheduled! 🎉');
          }}
          onCancel={toggleOpeModal}
        />
      </Modal>
    </>
  );
}

export default PackagePage;
