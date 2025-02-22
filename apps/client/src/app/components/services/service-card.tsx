import { Service } from '@magnetic/interfaces';
interface Props {
  service: Service;
  href?: string;
  className?: string;
}

function ServiceCard(props: Props) {
  const { service, href, className } = props;
  const { name, description, imageUrl } = service;

  return (
    <div
      className={`nc-CardCategory3 flex flex-col ${className}`}
      data-nc-id="CardCategory3"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-4 sm:aspect-h-7  rounded-2xl overflow-hidden group`}
      >
        <img
          src={
            imageUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
          }
          className="object-cover w-full h-[250px] lg:h-[300px] rounded-2xl"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 truncate">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
        >
          {name}
        </h2>
      </div>
    </div>
  );
}

export default ServiceCard;
