import React, { useState } from 'react';

interface Props {
  title: string;
  children?: React.ReactElement;
  subTitle?: string;
  subTitleClassName?: string;
  diamondPackage?: boolean;
}

export function SectionCard(props: Props) {
  const { title, children, subTitle, subTitleClassName, diamondPackage } =
    props;

  return (
    <div className="bg-base-100 listingSection__wrap overflow-hidden">
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold">{title}</h2>
        {subTitle && diamondPackage ? (
          <div>
            <span className={`block mt-2 ${subTitleClassName}`}>
              {subTitle}
            </span>
            <div className="flex gap-1">
              <span className="text-base mt-2 lg:text-lg font-normal text-neutral-500">
                Minimum spend €15,000 per week.
              </span>
              <span className="text-base mt-2 lg:text-lg font-normal text-neutral-500">
                -
              </span>
              <span className="text-base mt-2 lg:text-lg font-normal text-neutral-500">
                €1,800 flat fee for lower spend.
              </span>
            </div>
          </div>
        ) : (
          <span className={`block mt-2  ${subTitleClassName}`}>{subTitle}</span>
        )}
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="leading-relaxed editor-text">{children}</div>
    </div>
  );
}

export default SectionCard;
