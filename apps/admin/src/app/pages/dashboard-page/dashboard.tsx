import { StatsCard } from "@magnetic/ui";

export function DashboardPage() {

  const options = [
    {
      title: 'Total Guests',
      number: '10293',
      icon: 'ticket-perforated',
    },
    {
      title: 'Total Sales',
      number: '$89,000',
      icon: 'calendar',
    },
    {
      title: 'Total Comissions',
      number: '2040',
      icon: 'house',
    },
  ];

  return (
    <div className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-x-[20px]">
          {options.map((option, index) => (
            <StatsCard key={index} icon={option.icon} title={option.title} percentage={option.number}/>
          ))}
        </div>
    </div>
  );
}

export default DashboardPage;
