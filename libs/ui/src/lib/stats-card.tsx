import Icon from './icon';

interface Props {
  icon?: string;
  title: string;
  percentage: string;
}

export function StatsCard(props: Props) {
  const { icon, title, percentage } = props;

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-medium text-gray-900">{percentage}</p>
        </div>
        {icon && (
          <span className="rounded-full bg-primary-100 p-3 text-primary-6000">
            <Icon icon={icon} size={28} />
          </span>
        )}
      </div>

      <div className="mt-1 flex gap-1 text-green-600">
        <p className="flex gap-2 text-xs">
          <span className="font-medium"> 67.81% </span>
          <span className="text-gray-500"> Since last week </span>
        </p>
      </div>
    </div>
  );
}

export default StatsCard;
