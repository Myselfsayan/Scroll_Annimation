import React, { forwardRef } from 'react';

const Car = forwardRef(({ className = '', style = {} }, ref) => {
  return (
    <div
      ref={ref}
      className={`car-wrapper absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none will-change-transform ${className}`}
      style={style}
    >
      <img
        src="./assets/car.png"
        onError={(e) => {
          if (!e.currentTarget.src.includes('car.png')) {
            e.currentTarget.src = './car.png';
          }
        }}
        alt="Orange sports car top view"
        className="h-[95px] sm:h-[130px] md:h-[165px] lg:h-[200px] xl:h-[225px] w-auto max-w-none object-contain drop-shadow-md select-none pointer-events-none"
        draggable={false}
        loading="eager"
      />
    </div>
  );
});

Car.displayName = 'Car';

export default Car;
