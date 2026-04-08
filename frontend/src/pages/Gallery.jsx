import { Link } from "react-router-dom";

// Laser images
import laserImg from "../assets/laser.jpeg";
import laser3 from "../assets/3.jpeg";

// Hydrafacial images
import hydrafacialImg from "../assets/hydrafacial.jpeg";
import hydrafacial1 from "../assets/1.jpeg";
import hydrafacial2 from "../assets/2.jpeg";
import hydrafacial4 from "../assets/4.jpeg";
import hydrafacial5 from "../assets/5.jpeg";
import hydrafacial6 from "../assets/6.jpeg";

const treatments = [
  {
    id: 1,
    name: "Laser Hair Removal",
    images: [laserImg, laser3],
  },
  {
    id: 2,
    name: "Hydrafacial",
    images: [
      hydrafacialImg,
      hydrafacial1,
      hydrafacial2,
      hydrafacial4,
      hydrafacial5,
      hydrafacial6,
    ],
  },
];

function TreatmentSection({ name, images }) {
  return (
    <section className="mb-20">
      {/* Title */}
      <h2 className="font-serif text-3xl sm:text-4xl text-stone-800 mb-8 text-center">
        {name}
      </h2>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
          key={index}
          className="bg-white border border-stone-100 rounded-2xl overflow-hidden flex items-center justify-center h-[320px]"
        >
          <img
            src={img}
            alt={name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        ))}
      </div>
    </section>
  );
}

export default function GalleryPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        body {
          font-family: 'Lato', sans-serif;
        }
      `}</style>

      <div className="min-h-screen bg-[#F8F5F0]">

        {/* HERO */}
        <section className="px-6 sm:px-10 lg:px-16 pt-16 pb-12 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C07A50] mb-4">
            Our Gallery
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-800 mb-6">
            Treatment Gallery
          </h1>

          <p className="max-w-2xl mx-auto text-[15px] text-stone-500">
            Explore real results from our treatments.
          </p>
        </section>

        {/* ALL TREATMENTS */}
        <section className="px-6 sm:px-10 lg:px-16 pb-20">
          {treatments.map((treatment) => (
            <TreatmentSection
              key={treatment.id}
              name={treatment.name}
              images={treatment.images}
            />
          ))}
        </section>

       

      </div>
    </>
  );
}