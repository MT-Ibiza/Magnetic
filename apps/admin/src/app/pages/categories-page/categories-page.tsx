import { Button, CardWrapper, DrawerContent } from '@magnetic/ui';
import { CategoriesTable } from '../../components/categories/categories-table';
import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import FormCategory from '../../components/form-category';
import { Category } from '@magnetic/interfaces';

interface Props {}

function CategoriesPage(props: Props) {
  const {} = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const { refetch } = useCategories();

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const handleAddCategory = () => {
    setSelectedCategory(undefined);
    toggleDrawer();
  };

  return (
    <>
      <CardWrapper className="p-6">
        <div className="header flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
          <div>
            <h2 className="text-2xl font-semibold">Categories</h2>
            <p className="text-sm text-gray-500 mt-[8px]">
              Manage and view all your categories here.
            </p>
          </div>
          <div className="flex justify-end lg:w-auto w-full">
            <Button
              onClick={handleAddCategory}
              className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              + Add Category
            </Button>
          </div>
        </div>
        <CategoriesTable
          onClickEdit={(category) => {
            setSelectedCategory(category);
            toggleDrawer();
          }}
        />
      </CardWrapper>
      <DrawerContent
        title={selectedCategory ? 'Edit Category' : 'Add Category'}
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <FormCategory
          category={selectedCategory}
          onCancel={toggleDrawer}
          onSave={(category) => {
            toggleDrawer();
            refetch();
          }}
        />
      </DrawerContent>
    </>
  );
}

export default CategoriesPage;
