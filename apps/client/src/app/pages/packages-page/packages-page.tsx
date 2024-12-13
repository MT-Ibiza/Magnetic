import { CardWrapper } from '@magnetic/ui';
import { PlanCard } from '@magnetic/ui';
import { usePackages } from '../../hooks/usePackages';
import { useAuth } from '../../hooks/useAuth';

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
    <div className="bg-base-100 min-h-screen flex flex-col py-10">
      <CardWrapper>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-800">
            Explore Our Packages
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Find the perfect package for your needs. Choose the one that best
            fits your goals.
          </p>
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
      </CardWrapper>
    </div>
  );
}

export default PackagePage;
