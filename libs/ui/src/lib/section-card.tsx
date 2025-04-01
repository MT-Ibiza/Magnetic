import React, { useState } from 'react';

interface Props {
  title: string;
  children?: React.ReactElement;
  subTitle?: string;
}

export function SectionCard(props: Props) {
  const { title, children, subTitle } = props;

  return (
    <div className="bg-base-100 listingSection__wrap overflow-hidden">
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold">{title}</h2>
        {subTitle && <span className="block mt-2">{subTitle}</span>}
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="leading-relaxed editor-text">{children}</div>
    </div>
  );
}

export default SectionCard;
