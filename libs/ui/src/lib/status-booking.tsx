import { Text } from '@magnetic/ui';

interface Props {
  status: string;
}

export function StatusBooking({ status }: Props) {
  const statusColors: Record<string, string> = {
    accepted: 'bg-green-500',
    completed: 'bg-green-500',
    cancelled: 'bg-red-500',
    pending: 'bg-yellow-500',
    modification_requested: 'bg-yellow-500',
  };

  const textColors: Record<string, string> = {
    accepted: 'text-green-600',
    completed: 'text-green-600',
    cancelled: 'text-red-600',
    pending: 'text-yellow-600',
    modification_requested: 'text-yellow-600',
  };

  const color = statusColors[status] || 'bg-gray-400';
  const textColor = textColors[status] || 'text-gray-400';

  return (
    <div className="flex gap-3 items-center border rounded-lg px-4 py-2">
      <span className={`p-[7px] w-3 h-3 rounded-full ${color}`} />
      <Text className={`${textColor} capitalize`} size="1">
        {status}
      </Text>
    </div>
  );
}

export default StatusBooking;
