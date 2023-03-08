import React from "react";
import img from "../assets/images/home-img.png";

const Hero = () => {
  return (
    <section className="lg:h-[700px] mb-36">
      <div className="container mx-auto h-full relative">
        <div className="flex flex-col xl:flex-row items-center h-full md:py-28">
          {/* text */}
          <div className="text-center xl:text-left xl:absolute">
            {/* title */}
            <h1 className="h1 xl:max-w-[700px] mb-6 xl:mb-12">
              Little
              <span className="color-primary"> Lemon</span>
            </h1>
            {/* subtitle */}
            <p className="lead xl:max-w-[380px] mb-6 lg:mb-12 dark:text-gray-300">
              Delicious Dishes for Every Taste. A Unique Dining Experience
            </p>
            <button className="btn btn-primary mb-8 xl:mb-0">
              Book a table
            </button>
          </div>
          {/* image */}
          <div className="w-1/2 h-auto  xl:absolute xl:-right-5 xl:bottom-25 xs:hidden">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
