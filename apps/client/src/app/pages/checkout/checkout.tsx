export function CheckoutPage() {
  return (
    <div className={`nc-CheckOutPagePageMain`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
          <div className="bg-base-100 w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
            <h2 className="text-lg lg:text-2xl font-semibold">
              Confirm and payment
            </h2>
            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          </div>
        </div>
        <div className=" hidden lg:block flex-grow">
          <div className="bg-base-100 w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-semibold">Price detail</h3>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>$19</span>
                <span>$57</span>
              </div>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>Service charge</span>
                <span>$0</span>
              </div>

              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$57</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;
