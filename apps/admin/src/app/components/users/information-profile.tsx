import { User } from '@magnetic/interfaces';
import moment from 'moment';
import { Avatar, Text } from '@magnetic/ui';

interface InformationProfileProps {
  user: User;
}

export const InformationProfile = ({ user }: InformationProfileProps) => {
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
              Arrival Date:
            </strong>
            <span className="text-neutral-600 text-sm">
              {moment(user.arrivalDate).format('DD MMM YYYY')}
            </span>
          </li>
          <li className="flex justify-between">
            <strong className="text-neutral-800 text-sm font-semibold">
              Departure Date:
            </strong>
            <span className="text-neutral-600 text-sm">
              {moment(user.departureDate).format('DD MMM YYYY')}
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
        </ul>
      </div>

      <div className="space-y-6 mt-6">
        <h3 className="text-lg font-semibold text-neutral-800">
          Passport File
        </h3>
        {user.passportAttachmentUrl ? (
          user.passportAttachmentUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
            <div className="flex flex-col items-center">
              <img
                src={user.passportAttachmentUrl}
                alt="Passport"
                className="rounded-lg shadow-sm max-w-full h-auto mb-4"
              />
              <a
                href={user.passportAttachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline text-sm"
              >
                View Full Image
              </a>
            </div>
          ) : (
            <div className="flex items-center space-x-3 bg-neutral-50 p-3 rounded-lg shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6 text-neutral-500"
              >
                <path d="M6 2v16h12V2H6zm2 14V4h8v12H8zm4-4h4v4h-4z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-neutral-600 text-sm">
                  {user.passportAttachmentUrl.split('/').pop()}
                </span>
                <a
                  href={user.passportAttachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline text-sm"
                >
                  View Full Document
                </a>
              </div>
            </div>
          )
        ) : (
          <span className="text-neutral-500 text-sm">
            No Passport File Uploaded
          </span>
        )}
      </div>
    </div>
  );
};
