import { useState } from 'react';

const tabItems = [
  { value: 'すべて', label: 'すべて' },
  { value: 'プログラミング', label: 'プログラミング' },
  { value: '日常', label: '日常' },
];

export const useTabs = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].value);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return { activeTab, handleTabChange, tabItems };
};
