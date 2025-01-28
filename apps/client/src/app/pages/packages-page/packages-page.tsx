import { Button, CardWrapper } from '@magnetic/ui';
import { PlanCard } from '@magnetic/ui';
import { usePackages } from '../../hooks/usePackages';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import FormRequestCall from '../../components/form-request-call';

interface Package {
  id: number;
  name: string;
  priceInCents: number;
  features: string;
}

export function PackagePage() {
  const { isLoading, packages, error, isError } = usePackages();
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const filteredPackages = packages.filter(
    (item) => item.id !== user?.package?.id
  );

  return (
    <>
      <div className="bg-base-100 listingSection__wrap">
        <div className="text-center mb-10">
          <h1 className="text-2xl lg:text-3xl font-semibold">
            Explore Our Packages
          </h1>
          <p className="text-base lg:text-lg mt-2">
            Find the perfect package for your needs. Choose the one that best
            fits your goals.
          </p>
          <Button
            className="mt-3"
            onClick={() => {
              //@ts-ignore
              document.getElementById('modal_form_call').showModal();
            }}
          >
            Request a call
          </Button>
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
              className={`${
                pkg.id === user?.package?.id ? 'opacity-50' : ''
              } transition-opacity duration-300`}
            />
          ))}
        </div>
      </div>
      <dialog id="modal_form_call" className="modal">
        <div className="modal-box">
          <FormRequestCall />
          <form method="dialog">
            <div className="flex px-3">
              <Button className="w-full" variant="outline" color="neutral">
                Close
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default PackagePage;
