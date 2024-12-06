"use client";

import Icon from './icon';
import Text from './text';

interface Props {
  icon?: string;
  title: string;
  percentage: string;
}

export function StatsCard(props: Props) {
  const { icon, title, percentage } = props;

  return (
    <div className="rounded-lg border border-gray-100 bg-base-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="1">{title}</Text>
          <Text size="5" className="font-medium">
            {percentage}
          </Text>
        </div>
        {icon && (
          <span className="rounded-full bg-primary-100 p-3 text-primary-600">
            <Icon icon={icon} size={28} />
          </span>
        )}
      </div>

      <div className="mt-1 flex gap-1 text-green-600">
        <p className="flex gap-2 items-center">
          <Text className="font-medium">67.81%</Text>
          <Text size="1" className="text-gray-500">
            Since last week
          </Text>
        </p>
      </div>
    </div>
  );
}

export default StatsCard;
