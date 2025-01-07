import { Button, CardWrapper, EmptyState } from '@magnetic/ui';
import { useCartStore } from '../../hooks/useCartStore';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export function CartPage() {
  const { cart, addItem, removeItem } = useCartStore();
  const total = cart.reduce(
    (sum, item) => sum + item.item.priceInCents * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) {
    return (
      <EmptyState title="Your cart is empty" description="Check our services">
        <Link to="/services">
          <Button>View Services</Button>
        </Link>
      </EmptyState>
    );
  }

  return (
    <div className="flex flex-col gap-[15px] lg:grid lg:grid-cols-12 lg:gap-x-[20px]">
      <CardWrapper className="col-span-9 p-4">
        <div className="flex flex-col gap-4">
          <p className="text-center lg:text-start text-2xl font-semibold pb-[15px] lg:pb-[0px]">
            My Cart
          </p>
          <div className="hidden lg:grid grid-cols-4 gap-4 text-center font-semibold border-b pb-2 mb-4 text-sm">
            <span className="text-left">Item</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          {cart.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 items-center border-b py-2 text-sm"
            >
              <div className="flex items-center justify-start">
                <div className="w-5 h-5 lg:w-20 lg:h-20">
                  <img
                    className="w-[20px] h-[20px] lg:w-full lg:h-full object-cover"
                    src={
                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAS1BMVEX///+hoaGdnZ3ExMTx8fGlpaXNzc2enp7i4uL4+PjIyMj19fWampr5+fn8/PzT09Pr6+u9vb2zs7OsrKzc3NzW1tapqam4uLjh4eFxahFAAAADCUlEQVR4nO3bDW+qMBiG4VKpRSlFwM39/196QBER+ZiDxLw995UtSxw260MpbytTCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC51Uab+rw6R69zxfa2ihqvleztmkm+XSX3nZoOr9FAF0Qx0936W1p/Web7USRFpmBPmSH5utq+POtX2T+qGWOA+e3a25PBgFk4JX36wKRn8F6ojOoz398LMti5d1ddgYqd02No8tVhZ7oDNSXM9caR5drpgTRGaT3WtG4fEVzojPIXVftViuaE51B8Vgz6P/1Wrg8MnDZ35sTncFedxmYFc2JzuDkbNTeGOY7kaZq5loRnYHadQMhnTu+sK7IplMQnYH3F3fbTzrNneeiTkpX0weIzqB2Lo35Ps6OgtsdVO8mD5CegfKHdGaYq2bSaO8cP2riOOkZzJcFdQXtv+3SnCE9gwW+ngxMV0tOvCfwDOpV1WP3eOoGGngG8dMWuk5Gr52wM/DV86cQdrSiDjkDr3YuelaOzaIhZ6DOwwii0X2GkDOIhwk0U8Lp9biAMvBJv391aVCOfST5/VpRhZNBbJzr7a16ddQjEUS2CDeDzOjI6Oox8Scvk8HUlBBIBl5drmddF/eJPx1PoBkJwykhkAy67VV3bl+4jF4J1wyGNXMgGZy6Huv4+kI+GUF/sNyEkIFXWTU4y8nsUyr1YAktg/6e2m1l5M1sBrYdLK0gMniuB13S33QfD6FSvQ/nQsggHl77+4nbYm+w7FRIGfh6cWiee7j8yJrV58e8KD+Dp8ng98xjSpCfwc+fIohs2TUnPoPpenCB6/otPoPqz8+runvNLD2D8cXh75h2s114BvP14AJ7ud0bZGeQzteDS9pltOwMpheHv3PbWROdQb5YDy4xzTOuUjNonj86rY6g2VmTOw7qDA6Rc067FXT97lx0BvFPsgXB18KGzUnNwO63Uwr9fyajm2e1N1EvtQVmkJlten9nVz3u/CHJblv5hv8RIhYZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIH7B0uwLlAhgDlaAAAAAElFTkSuQmCC'
                    }
                    alt={item.item.name}
                  />
                </div>
                <div className="ml-3 ">{item.item.name}</div>
              </div>
              <div className="text-center">
                {centsToEurosWithCurrency(item.item.priceInCents)}
              </div>
              <div className="flex justify-center items-center gap-2">
                <button
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300"
                  onClick={() => removeItem(item.id)}
                >
                  <FiMinus size={16} color="#6b7280" />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="bg-base-100 w-10 h-6 text-center text-sm outline-none border border-gray-300 rounded-sm"
                  readOnly
                />
                <button
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300"
                  onClick={() => addItem(item)}
                >
                  <FiPlus size={16} color="#6b7280" />
                </button>
              </div>
              <div className=" text-center">
                {centsToEurosWithCurrency(
                  item.item.priceInCents * item.quantity
                )}
              </div>
            </div>
          ))}
        </div>
      </CardWrapper>
      <div className="col-span-3 lg:block flex-grow lg:mt-0">
        <div className="sticky top-16">
          <div className="bg-base-100 listingSectionSidebar__wrap shadow-xl">
            <div className="flex justify-between">
              <span className="text-xl font-semibold">Order summary</span>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>{totalItems} items</span>
                <span>{centsToEurosWithCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>Service charge</span>
                <span>$0</span>
              </div>
              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{centsToEurosWithCurrency(total)}</span>
              </div>
            </div>
            <Button href={'/checkout'}>Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
