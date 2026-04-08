import fullBodyImg from "../assets/services/fullbody.jpg";
import bikiniImg from "../assets/services/bikini.jpg";
import acneImg from "../assets/services/micro.jpg";
import microneedlingImg from "../assets/services/face.jpg";
import poresImg from "../assets/services/chin.jpg";
import glowImg from "../assets/clinic-image.jpg";
import facialImg from "../assets/services/hydrafacial.jpg";
import fineLinesImg from "../assets/services/face.jpg";
import underarmsImg from "../assets/services/underarm.jpg";

const concernsData = [
  {
    id: 1,
    title: "Unwanted Hair",
    description:
      "Get long-lasting smooth skin with advanced laser and waxing treatments tailored to your skin and hair type.",
    services: ["Laser Hair Removal", "Waxing"],
    image: fullBodyImg,
  },
  {
    id: 2,
    title: "Ingrown Hairs & Razor Bumps",
    description:
      "Reduce irritation, bumps, and ingrown hairs with treatments that keep your skin clear and smooth.",
    services: ["Laser Hair Removal", "Waxing"],
    image: bikiniImg,
  },
  {
    id: 3,
    title: "Acne & Breakouts",
    description:
      "Calm active acne and prevent future breakouts with targeted treatments that cleanse and rebalance the skin.",
    services: ["Anti-Acne Facial", "Hydrofacial"],
    image: acneImg,
  },
  {
    id: 4,
    title: "Acne Scars",
    description:
      "Fade acne scars and smooth your skin with advanced treatments that promote collagen and renewal.",
    services: ["Microneedling"],
    image: microneedlingImg,
  },
  {
    id: 5,
    title: "Uneven Texture & Large Pores",
    description:
      "Refine skin texture and minimize pores with treatments designed to smooth and resurface your skin.",
    services: ["Microneedling", "Microdermabrasion"],
    image: poresImg,
  },
  {
    id: 6,
    title: "Pigmentation & Dark Spots",
    description:
      "Improve uneven tone, sun spots, and discoloration with brightening and skin-renewing treatments.",
    services: ["Brightening Glow Facial", "Microneedling"],
    image: glowImg,
  },
  {
    id: 7,
    title: "Dull Skin",
    description:
      "Restore your glow with treatments that deeply hydrate, exfoliate, and refresh tired-looking skin.",
    services: ["Hydrofacial", "Classic Facial"],
    image: glowImg,
  },
  {
    id: 8,
    title: "Fine Lines & Wrinkles",
    description:
      "Smooth fine lines and improve skin firmness with collagen-boosting treatments.",
    services: ["Microneedling", "Hydrofacial"],
    image: fineLinesImg,
  },
  {
    id: 9,
    title: "Dry & Dehydrated Skin",
    description:
      "Rehydrate and nourish your skin with treatments that restore moisture and softness.",
    services: ["Hydrofacial", "Classic Facial"],
    image: facialImg,
  },
  {
    id: 10,
    title: "Dark Underarms / Bikini Area",
    description:
      "Improve skin tone and texture in sensitive areas with safe and effective treatments.",
    services: ["Laser Hair Removal", "Waxing"],
    image: underarmsImg,
  },
];

function ConcernCard({ concern }) {
  return (
    <div className="rounded-[28px] border border-[#eee7e2] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="h-[170px] w-[170px] overflow-hidden rounded-[24px]">
        <img
          src={concern.image}
          alt={concern.title}
          className="h-full w-full object-cover"
        />
      </div>

      <h3 className="mt-6 text-[24px] font-semibold leading-tight text-[#4b4b4b]">
        {concern.title}
      </h3>

      <p className="mt-4 text-[16px] leading-[1.8] text-[#5b5b5b]">
        {concern.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {concern.services.map((service, index) => (
          <span
            key={index}
            className="rounded-full bg-[#f4ebe6] px-3 py-1 text-[12px] font-medium text-[#6d5f59]"
          >
            {service}
          </span>
        ))}
      </div>


    </div>
  );
}

export default function SkinConcerns() {
  return (
    <section className="min-h-screen bg-[#f7f5f3]">
      <section className="bg-[#e8e5e1]">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-24">
            <div className="max-w-[760px]">
              <h1 className="font-serif text-[54px] leading-[1.05] text-[#595452] md:text-[76px] xl:text-[90px]">
                Skin concerns
              </h1>

              <p className="mt-8 max-w-[720px] text-[21px] leading-[1.8] text-[#565656] md:text-[24px]">
                Explore common skin concerns and discover treatments designed to
                support clearer, smoother, brighter, and healthier-looking skin.
              </p>
            </div>
          </div>

          <div className="h-[380px] lg:h-auto">
            <img
              src={glowImg}
              alt="Skin care clinic"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 h-[10px] w-full rounded-full bg-[#f0e5df]" />

          <h2 className="text-center font-serif text-[42px] leading-tight text-[#595452] md:text-[60px] lg:text-[72px]">
            Start with your skin concern
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-center text-[18px] leading-[1.8] text-[#666] md:text-[20px]">
            Whether you are dealing with unwanted hair, acne, texture, dryness,
            or early signs of aging, we offer treatments tailored to your skin’s
            needs.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {concernsData.map((concern) => (
              <ConcernCard key={concern.id} concern={concern} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}