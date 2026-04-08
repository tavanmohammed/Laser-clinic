import clinicImage from "../../assets/clinic.png";

export default function LeadersSection() {
  return (
    <section className="bg-[#f5f5f3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-28 grid lg:grid-cols-2 gap-14 items-center">
        <div className="max-w-xl">
          <h3 className="text-[40px] md:text-[58px] leading-[1.15] text-[#555555] font-serif">
            Leaders in skin, laser, and confidence
          </h3>

          <p className="mt-8 text-[#4f4f4f] text-lg leading-9">
            Your clinic is more than a clinic. It’s a destination for
            results-driven treatments, real expertise, and personalized care.
            We create a welcoming and modern environment where clients feel
            comfortable, cared for, and confident in every step of their
            treatment journey.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src={clinicImage}
            alt="Clinic treatment"
            className="w-full max-w-[520px] rounded-[28px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}