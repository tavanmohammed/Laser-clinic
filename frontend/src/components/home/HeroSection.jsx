import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import hero1 from "../../assets/hero.jpg";
import hero2 from "../../assets/5.jpeg"; // add this
import hero3 from "../../assets/hydrafacial.jpeg"; // add this

const images = [hero1, hero2, hero3];

const offers = [
  {
    title: "Laser Full Body Offer",
    price: "$150 → $120",
  },
  {
    title: "Hydrofacial Glow Deal",
    price: "$120 → Save $25",
  },
  {
    title: "Microneedling Special",
    price: "$200 → $170",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // change image + offer every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeImage {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(20px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>

      <section className="bg-white">
        {/* BIGGER HERO */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-[0.9fr_1.6fr] gap-12 items-center">

          {/* TEXT (SMALLER) */}
          <div>
          <h1 className="text-[38px] md:text-[54px] leading-[1.1] text-[#555555] font-serif">
           Welcome to <br />
          <span className="text-[#C07A50] italic">Alla Beauty</span> <br />
          Laser & Skin Clinic
           </h1>


            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="bg-[#4d4d4d] text-white px-5 py-3 rounded-lg text-sm font-medium"
              >
                Explore Services
              </Link>

              <Link
                to="/skin-concerns"
                className="bg-white text-[#4d4d4d] px-5 py-3 rounded-lg border border-gray-300 text-sm font-medium"
              >
                Skin Concerns
              </Link>
            </div>
          </div>

          {/* IMAGE + ANIMATION */}
          <div className="relative flex justify-center lg:justify-end">

            {/* IMAGE STACK (FADE) */}
            <div className="relative w-full max-w-[750px] h-[500px] rounded-[28px] overflow-hidden">

              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="hero"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: i === index ? 1 : 0,
                    transition: "opacity 0.8s ease",
                  }}
                />
              ))}

            </div>

            {/* OFFER */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%]">
              <div
                key={index}
                className="bg-black/60 backdrop-blur-md text-white rounded-2xl px-6 py-5 text-center"
                style={{ animation: "fadeSlide 3s ease-in-out" }}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#f2a482]">
                  Current Offer
                </p>

                <h3 className="mt-2 text-lg font-serif">
                  {offers[index].title}
                </h3>

                <p className="mt-1 text-sm text-white/80">
                  {offers[index].price}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}