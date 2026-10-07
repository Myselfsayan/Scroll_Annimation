import React, { forwardRef } from 'react';
import Car from './Car';

const HEADLINE_TEXT = "WELCOME ITZFIZZ";

const RoadBanner = forwardRef(({ carRef, trailRef, textContainerRef, lettersRef }, ref) => {
  return (
    <div
      ref={ref}
      className="road-banner relative w-full h-[110px] sm:h-[145px] md:h-[185px] lg:h-[220px] xl:h-[250px] bg-[#1e1e1e] overflow-hidden flex items-center shadow-inner select-none"
    >
      {/* Green Trail that expands behind the car */}
      <div
        ref={trailRef}
        className="trail-bg absolute top-0 bottom-0 left-0 bg-[#45db7d] z-10 will-change-[width] pointer-events-none"
        style={{ width: '0px' }}
      />

      {/* Headline Text: WELCOME ITZFIZZ */}
      <div
        ref={textContainerRef}
        className="headline-container absolute left-[2.5%] sm:left-[4%] md:left-[5%] top-1/2 -translate-y-1/2 z-20 flex items-center tracking-[0.1em] sm:tracking-[0.16em] md:tracking-[0.22em] lg:tracking-[0.26em] font-black uppercase text-[#111111] select-none whitespace-nowrap pointer-events-none text-[clamp(1.05rem,4.3vw,5.5rem)] leading-none"
      >
        {HEADLINE_TEXT.split('').map((char, index) => {
          if (char === ' ') {
            return (
              <span
                key={index}
                className="inline-block w-[0.35em] sm:w-[0.55em] md:w-[0.75em]"
              >
                &nbsp;
              </span>
            );
          }
          return (
            <span
              key={index}
              ref={(el) => {
                if (lettersRef && lettersRef.current) {
                  lettersRef.current[index] = el;
                }
              }}
              data-letter-index={index}
              className="headline-letter inline-block text-[#111111] opacity-0 transition-[opacity,transform] duration-150 will-change-[opacity,transform]"
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Top View Orange Sports Car */}
      <Car ref={carRef} />
    </div>
  );
});

RoadBanner.displayName = 'RoadBanner';

export default RoadBanner;
