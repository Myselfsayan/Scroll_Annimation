import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//Initializes the initial load intro animation and the core GSAP ScrollTrigger timeline.

export function initHeroAnimation({
  containerRef,
  trackRef,
  roadRef,
  carRef,
  trailRef,
  lettersRef,
  cardRefs,
}) {
  const ctx = gsap.context(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;

    if (!container || !track || !road || !car || !trail) {
      return;
    }

    const letters = (lettersRef.current || []).filter(Boolean);
    const cards = cardRefs.map((ref) => ref.current).filter(Boolean);

    // Initial setup for cards
    gsap.set(cards, {
      opacity: 0,
      y: 20,
      scale: 0.96,
      transformOrigin: 'center center',
    });

    // Helper to calculate exact geometry and letter offsets dynamically
    const calculateBounds = () => {
      const roadRect = road.getBoundingClientRect();
      const carRect = car.getBoundingClientRect();
      const carWidth = carRect.width || 180;
      const roadWidth = roadRect.width || window.innerWidth;

      // Starting position: Car rear sits right at the left edge
      const startX = -carWidth * 0.1;
      // Ending position: Car reaches the far right edge so trail covers all of WELCOME ITZFIZZ
      const endX = roadWidth - carWidth * 0.25;
      // Initial trail width: small slice behind the car
      const initialTrail = Math.max(25, carWidth * 0.2);

      const letterOffsets = letters.map((letter) => {
        if (!letter) return 0;
        const letterRect = letter.getBoundingClientRect();
        return letterRect.left - roadRect.left;
      });

      return { roadWidth, carWidth, startX, endX, initialTrail, letterOffsets };
    };

    let bounds = calculateBounds();

    // Set initial positions
    gsap.set(car, { x: bounds.startX });
    gsap.set(trail, { width: bounds.initialTrail });

    // 1. Initial Load Intro Animation
    const introTl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.7 },
    });

    introTl
      .fromTo(
        track,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      )
      .fromTo(
        road,
        { scaleY: 0.96, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.5 },
        '-=0.2'
      )
      .fromTo(
        car,
        { opacity: 0, x: bounds.startX - 25 },
        { opacity: 1, x: bounds.startX, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        trail,
        { width: 0 },
        { width: bounds.initialTrail, duration: 0.5, ease: 'power2.out' },
        '-=0.6'
      );

    // 2. Core Scroll-Controlled Timeline (Duration normalized to 1.0)
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: track,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          bounds = calculateBounds();
        },
      },
    });

    // Horizontal Car Movement spans the entire 0.0 -> 1.0 timeline
    mainTimeline.to(
      car,
      {
        x: () => {
          bounds = calculateBounds();
          return bounds.endX;
        },
        duration: 1.0,
        ease: 'none',
        onUpdate: function () {
          const currentCarX = gsap.getProperty(car, 'x');
          // Trail extends behind car's rear/center
          const trailEnd = Math.max(
            bounds.initialTrail,
            currentCarX + bounds.carWidth * 0.5
          );

          // Update trail width
          gsap.set(trail, { width: Math.min(trailEnd, bounds.roadWidth) });

          // Unmask/reveal each letter in WELCOME ITZFIZZ as car passes them
          letters.forEach((letter, i) => {
            if (!letter) return;
            const letterX = bounds.letterOffsets[i] || 0;
            if (trailEnd >= letterX - 2) {
              letter.style.opacity = '1';
              letter.style.transform = 'translateY(0px)';
            } else {
              letter.style.opacity = '0';
              letter.style.transform = 'translateY(5px)';
            }
          });
        },
      },
      0
    );

    // Subtle natural driving suspension micro-dynamics synchronized along 0 -> 1
    mainTimeline.to(
      car,
      {
        rotation: 0.4,
        y: -1.5,
        duration: 0.25,
        ease: 'power1.inOut',
      },
      0.1
    );
    mainTimeline.to(
      car,
      {
        rotation: -0.3,
        y: 1,
        duration: 0.25,
        ease: 'power1.inOut',
      },
      0.35
    );
    mainTimeline.to(
      car,
      {
        rotation: 0.2,
        y: -0.5,
        duration: 0.25,
        ease: 'power1.inOut',
      },
      0.60
    );
    mainTimeline.to(
      car,
      {
        rotation: 0,
        y: 0,
        duration: 0.15,
        ease: 'power1.out',
      },
      0.85
    );

    // Staggered Stat Cards reveal along scroll progress
    // Card 1: 58% (Lime) -> reveals at ~15% - 32%
    if (cards[0]) {
      mainTimeline.to(
        cards[0],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.18,
          ease: 'power2.out',
        },
        0.15
      );
    }

    // Card 2: 23% (Blue) -> reveals at ~35% - 52%
    if (cards[1]) {
      mainTimeline.to(
        cards[1],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.18,
          ease: 'power2.out',
        },
        0.35
      );
    }

    // Card 3: 27% (Dark) -> reveals at ~55% - 72%
    if (cards[2]) {
      mainTimeline.to(
        cards[2],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.18,
          ease: 'power2.out',
        },
        0.55
      );
    }

    // Card 4: 40% (Orange) -> reveals at ~75% - 92%
    if (cards[3]) {
      mainTimeline.to(
        cards[3],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.18,
          ease: 'power2.out',
        },
        0.75
      );
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, containerRef);

  return () => ctx.revert();
}
