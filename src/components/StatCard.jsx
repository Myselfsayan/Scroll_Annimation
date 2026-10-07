import React, { forwardRef } from 'react';

const themes = {
  lime: {
    bg: 'bg-[#def54f]',
    text: 'text-[#111111]',
    subtext: 'text-[#111111]/90',
  },
  dark: {
    bg: 'bg-[#2b2b2b]',
    text: 'text-white',
    subtext: 'text-neutral-300',
  },
  blue: {
    bg: 'bg-[#6ac9ff]',
    text: 'text-[#111111]',
    subtext: 'text-[#111111]/90',
  },
  orange: {
    bg: 'bg-[#fa7328]',
    text: 'text-[#111111]',
    subtext: 'text-[#111111]/95',
  },
};

const StatCard = forwardRef(({ value, label, theme = 'lime', className = '', id }, ref) => {
  const currentTheme = themes[theme] || themes.lime;

  return (
    <div
      ref={ref}
      id={id}
      className={`stat-card absolute z-20 flex flex-col justify-center rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-5 md:px-7 md:py-6 min-w-[110px] sm:min-w-[160px] md:min-w-[210px] shadow-sm select-none will-change-transform will-change-opacity ${currentTheme.bg} ${className}`}
    >
      <span className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none mb-1 sm:mb-1.5 ${currentTheme.text}`}>
        {value}
      </span>
      <span className={`text-[10px] sm:text-xs md:text-sm font-semibold leading-tight max-w-[115px] sm:max-w-[155px] md:max-w-[190px] ${currentTheme.subtext}`}>
        {label}
      </span>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;
