import { User } from '@magnetic/interfaces';
import moment from 'moment';
import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

interface InformationProfileProps {
  user: User;
}

export const InformationProfile = ({ user }: InformationProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const openModal = (url: string) => {
    setImageUrl(url);
    setIsOpen(true);
  };

  return (
    <div className="p-4">
      <div>
        <ul className="space-y-6">
          <li className="flex justify-between">
            <strong className="text-neutral-800 text-sm font-semibold">
              Email:
            </strong>
            <span className="text-neutral-600 text-sm">{user.email}</span>
          </li>
          <li className="flex justify-between">
            <strong className="text-neutral-800 text-sm font-semibold">
              Phone:
            </strong>
            <span className="text-neutral-600 text-sm">{user.phone}</span>
          </li>
          <li className="flex justify-between">
            <strong className="text-neutral-800 text-sm font-semibold">
              Accommodation:
            </strong>
            <span className="text-neutral-600 text-sm">
              {user.accommodation || 'None'}
            </span>
          </li>
          <li className="flex justify-between">
            <strong className="text-neutral-800 text-sm font-semibold">
              Billing Address:
            </strong>
            <span className="text-neutral-600 text-sm">
              {user.billingAddress || 'None'}
            </span>
          </li>
          <li className="flex justify-between">
            <strong className="text-neutral-800 text-sm font-semibold">
              Arrival Date:
            </strong>
            <span className="text-neutral-600 text-sm">
              {user.arrivalDate
                ? moment(user.arrivalDate).format('DD MMM YYYY')
                : 'N/A'}
            </span>
          </li>
          <li className="flex justify-between">
            <strong className="text-neutral-800 text-sm font-semibold">
              Departure Date:
            </strong>
            <span className="text-neutral-600 text-sm">
              {user.departureDate
                ? moment(user.departureDate).format('DD MMM YYYY')
                : 'N/A'}
            </span>
          </li>
          <li className="flex justify-between">
            <strong className="text-neutral-800 text-sm font-semibold">
              Passport Number:
            </strong>
            <span className="text-neutral-600 text-sm">
              {user.passportNumber || 'N/A'}
            </span>
          </li>
          <li className="flex justify-between">
            <strong className="text-neutral-800 text-sm font-semibold">
              Passport File:
            </strong>
            {user.passportAttachmentUrl ? (
              user.passportAttachmentUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => openModal(user.passportAttachmentUrl)}
                    className="cursor-pointer underline text-primary-600 hover:underline text-sm"
                  >
                    View passport
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <a
                      href={user.passportAttachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer underline text-primary-600 hover:underline text-sm"
                    >
                      {user.passportAttachmentUrl.split('/').pop()}
                    </a>
                  </div>
                </div>
              )
            ) : (
              <span className="text-neutral-600 text-sm">
                No Passport File Uploaded
              </span>
            )}
          </li>
        </ul>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <DialogPanel className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-lg"
          >
            ✖
          </button>

          {imageUrl && (
            <>
              <img
                src={imageUrl}
                alt="Passport"
                className="w-full h-auto rounded-2xl"
              />
              <div className="mt-4 text-center">
                <a
                  href={imageUrl}
                  download
                  className="bg-primary-700 text-sm text-white px-6 py-1 rounded-lg hover:bg-primary-800 transition"
                >
                  Dowload
                </a>
              </div>
            </>
          )}
        </DialogPanel>
      </Dialog>
    </div>
  );
};
