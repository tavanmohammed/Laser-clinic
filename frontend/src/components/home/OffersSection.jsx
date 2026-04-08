import offerOne from "../../assets/offer-1.jpg";
import offerTwo from "../../assets/offer-2.jpg";
import offerThree from "../../assets/offer-3.jpg";
import { Link } from "react-router-dom";

const offers = [
  {
    image: offerOne,
    title: "Laser Full Body Offer",
    desc: "Get smooth, hair-free skin with our full body laser treatment (without face). Perfect for long-lasting results.",
    price: "$150 → First session only $120",
  },
  {
    image: offerTwo,
    title: "Hydrofacial Glow Deal",
    desc: "Deep cleanse, hydrate, and rejuvenate your skin with our premium Hydrofacial treatment.",
    price: "$120 → Save $25 on your first session",
  },
  {
    image: offerThree,
    title: "Microneedling Special",
    desc: "Boost collagen, reduce acne scars, and improve skin texture with professional microneedling.",
    price: "$200 → First session $170",
  },
  ];

export default function OffersSection() {
  return (
    <section className="bg-[#f7f5ef]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-[42px] md:text-[68px] leading-[1.15] text-[#555555] font-serif">
            Current offers
          </h2>

          <p className="mt-6 text-[#4f4f4f] text-xl leading-10">
            Discover seasonal specials and curated packages designed to help you
            look and feel your best, with a little extra value along the way.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-[28px] min-h-[640px] flex items-end"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="relative z-10 w-full p-8 text-white">
                <h3 className="text-[34px] leading-[1.2] font-serif text-center">
                  {offer.title}
                </h3>

                <p className="mt-6 text-center text-[18px] leading-9">
                  {offer.desc}
                </p>

                <div className="mt-8 border-t border-white/70 pt-6">
                  <p className="text-[18px] font-semibold">{offer.price}</p>

                  <Link
                   to="/booking"
                   className="inline-block mt-8 bg-[#f2a482] text-white px-8 py-4 rounded-xl text-xl font-medium hover:opacity-90 transition text-center"
       >
                    Book Now ↗
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}