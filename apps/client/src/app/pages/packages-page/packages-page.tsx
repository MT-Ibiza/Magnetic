import { Button } from '@magnetic/ui';
import { PlanCard } from '@magnetic/ui';
import { usePackages } from '../../hooks/usePackages';
import { useAuth } from '../../hooks/useAuth';
import FormRequestCall from '../../components/form-request-call';
import { toast } from 'sonner';

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
              document.getElementById('modal-form-call').showModal();
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
      <dialog id="modal-form-call" className="modal">
        <div className="modal-box">
          <FormRequestCall
            onSave={() => {
              //@ts-ignore
              document.getElementById('modal-form-call').close();
              toast.success('Your call has been successfully scheduled! 🎉');
            }}
            onCancel={() => {
              //@ts-ignore
              document.getElementById('modal-form-call').close();
            }}
          />
        </div>
      </dialog>
    </>
  );
}

export default PackagePage;
