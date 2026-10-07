import React, { useRef, useLayoutEffect } from 'react';
import RoadBanner from './RoadBanner';
import StatCard from './StatCard';
import { initHeroAnimation } from '../animations/heroAnimation';

const Hero = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  useLayoutEffect(() => {
    let cleanupFn = null;

    // Wait for initial paint/fonts to ensure precise measurements
    const timeout = setTimeout(() => {
      cleanupFn = initHeroAnimation({
        containerRef,
        trackRef,
        roadRef,
        carRef,
        trailRef,
        lettersRef,
        cardRefs: [card1Ref, card2Ref, card3Ref, card4Ref],
      });
    }, 60);

    return () => {
      clearTimeout(timeout);
      if (typeof cleanupFn === 'function') {
        cleanupFn();
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-section relative w-full bg-[#cfd3d8]"
      style={{ height: '240vh' }}
    >
      {/* Pinned Viewport Track */}
      <div
        ref={trackRef}
        className="hero-track h-screen w-full sticky top-0 flex flex-col items-center justify-center relative overflow-hidden bg-[#cfd3d8]"
      >
        {/* Top Statistic Cards */}
        <StatCard
          ref={card1Ref}
          id="box1"
          value="58%"
          label="Increase in pick up point use"
          theme="lime"
          className="top-[3%] sm:top-[6%] md:top-[8%] left-[4%] sm:left-auto sm:right-[38%] md:right-[34%] lg:right-[32%] xl:right-[30%]"
        />

        <StatCard
          ref={card3Ref}
          id="box3"
          value="27%"
          label="Increase in pick up point use"
          theme="dark"
          className="top-[3%] sm:top-[6%] md:top-[8%] right-[4%] sm:right-[6%] md:right-[8%] lg:right-[8%] xl:right-[6%]"
        />

        {/* Central Road & Car Banner */}
        <RoadBanner
          ref={roadRef}
          carRef={carRef}
          trailRef={trailRef}
          lettersRef={lettersRef}
        />

        {/* Bottom Statistic Cards */}
        <StatCard
          ref={card2Ref}
          id="box2"
          value="23%"
          label="Decreased in customer phone calls"
          theme="blue"
          className="bottom-[3%] sm:bottom-[6%] md:bottom-[8%] left-[4%] sm:left-[35%] md:left-[40%] lg:left-[43%] xl:left-[46%]"
        />

        <StatCard
          ref={card4Ref}
          id="box4"
          value="40%"
          label="Decreased in customer phone calls"
          theme="orange"
          className="bottom-[3%] sm:bottom-[6%] md:bottom-[8%] right-[4%] sm:right-[6%] md:right-[8%] lg:right-[8%] xl:right-[6%]"
        />
      </div>
    </section>
  );
};

export default Hero;
