import { Text } from '@magnetic/ui';

interface Props {
  title: string;
  children: React.ReactNode;
}

function BookingDashboard({ title, children }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <Text className="font-semiBold text-lg font-semibold mb-3">{title}</Text>
      {children}
    </div>
  );
}

export default BookingDashboard;
