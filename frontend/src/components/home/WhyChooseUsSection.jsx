import clinicImg from "../../assets/clinic-image.jpg"


export default function WhyChooseUsSection() {
  const pillars = [
    { label: "State-of-the-art technology", desc: "The latest devices for safe, precise outcomes." },
    { label: "Expert practitioners", desc: "Fully qualified and continuously trained." },
    { label: "Private & discreet", desc: "A calm, confidential space just for you." },
    { label: "Transparent pricing", desc: "No hidden fees, ever." },
  ];

  return (
    <section className="bg-[#f5f5f3] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left: copy */}
        <div className="max-w-xl">
          <p className="text-xs tracking-widest uppercase text-[#8a8a82] font-medium mb-5">
            Our difference
          </p>
          <h2 className="text-[40px] md:text-[52px] leading-[1.12] text-[#3a3a38] font-serif font-normal mb-7">
            Why choose us?
          </h2>
          <p className="text-[#5a5a56] text-lg leading-[1.85] mb-10">
            We founded our clinic with one goal in mind — to make aesthetic
            treatments effective, safe, and genuinely accessible. Every detail
            of our space, our team, and our approach is designed to give you
            outstanding results in a setting that feels both clinical and
            welcoming.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-10">
            {pillars.map((p) => (
              <div
                key={p.label}
                className="bg-white border border-[#ddddd8] rounded-xl p-4"
              >
                <span className="text-base mb-1 block">✦</span>
                <p className="text-[13px] font-medium text-[#3a3a38] mb-1">{p.label}</p>
                <p className="text-[12px] text-[#8a8a82] leading-snug">{p.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="/about"
            className="inline-flex items-center gap-2 bg-[#3a3a38] text-[#f5f5f3] px-7 py-3.5 rounded-xl text-[15px] font-medium hover:bg-[#222220] transition group"
          >
            Learn more about us
            <span className="group-hover:translate-x-1 transition-transform">&#8594;</span>
          </a>
        </div>

        {/* Right: image */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
          <img
            src={ clinicImg }
            alt="Modern aesthetic clinic interior"
            className="w-full h-full object-cover"
          />
          {/* Stats badge */}
          <div className="absolute bottom-6 left-6 right-6 bg-[#f5f5f3]/90 backdrop-blur-sm rounded-xl px-5 py-4 flex gap-6">
            {[
              { num: "3+", label: "Years experience" },
              { num: "1000+", label: "Happy clients" },
              { num: "98%", label: "Satisfaction rate" },
            ].map((s, i) => (
              <div key={s.label} className={`flex-1 text-center ${i > 0 ? "border-l border-[#ddddd8]" : ""}`}>
                <p className="text-2xl font-medium text-[#3a3a38] font-serif leading-none">{s.num}</p>
                <p className="text-[11px] uppercase tracking-wide text-[#8a8a82] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}