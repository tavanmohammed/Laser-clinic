import { useState, useEffect, useRef } from "react";
import clinicPhoto from "../assets/clinic.png";
import allaPhoto from "../assets/Alla.jpeg";
import machinePhoto from "../assets/lasermachine.jpeg";
import { Link } from "react-router-dom";


function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#F5F0E8]">
      <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 pt-16 pb-16">
        <p
          className="text-[11px] tracking-[0.3em] uppercase text-[#C07A50] mb-6"
          style={{ animation: "fadeUp 0.8s ease both 0.2s", opacity: 0 }}
        >
          Toronto&apos;s Boutique Laser Studio
        </p>

        <h1
          className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-stone-800 mb-8"
          style={{ animation: "fadeUp 0.8s ease both 0.4s", opacity: 0 }}
        >
          Welcome to
          <br />
          <span className="italic text-[#C07A50]">Alla&apos;s</span> Laser
          <br />
          &amp; Skin Studio
        </h1>

        <p
          className="text-[15px] leading-relaxed text-stone-500 max-w-md mb-10"
          style={{ animation: "fadeUp 0.8s ease both 0.6s", opacity: 0 }}
        >
          A boutique, results-driven experience in laser hair removal. With a
          client-first approach and industry-leading technology, we&apos;re here
          to help you feel confident every visit.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4"
          style={{ animation: "fadeUp 0.8s ease both 0.8s", opacity: 0 }}
        >
          <button className="bg-[#C07A50] hover:bg-[#a8663e] transition-colors text-white text-[13px] tracking-wide px-7 py-3 rounded-md">
            Book a Free Consultation
          </button>

          <button className="border border-stone-300 hover:border-stone-400 text-stone-600 text-[13px] tracking-wide px-7 py-3 rounded-md transition-colors">
            Learn More
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden min-h-[420px] lg:min-h-0">
        <img
          src={clinicPhoto}
          alt="Alla's Laser Studio"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
          <p className="font-serif text-2xl text-stone-800">500+</p>
          <p className="text-[11px] tracking-widest text-stone-400 uppercase mt-1">
            Happy Clients
          </p>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const stats = [
    { num: "500+", label: "Treatments Performed" },
    { num: "5 ★", label: "Average Client Rating" },
    { num: "100%", label: "FDA-Cleared Device" },
  ];

  return (
    <section className="py-24 px-6 sm:px-8 text-center bg-white">
      <FadeIn>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C07A50] mb-4">
          Our Promise
        </p>
        <h2 className="font-serif text-4xl lg:text-5xl text-stone-800 mb-8">
          Why clients trust us
        </h2>
        <p className="text-[15px] leading-relaxed text-stone-500 max-w-2xl mx-auto">
          Everything we do is designed with your confidence in mind. From the
          specialist who cares for your skin to the trusted technology behind
          each treatment, we&apos;re committed to delivering safe,
          results-driven care you can count on.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-100 mt-20 border border-stone-100 rounded-2xl overflow-hidden max-w-6xl mx-auto">
        {stats.map(({ num, label }, i) => (
          <FadeIn key={label} delay={i * 0.15}>
            <div className="bg-white py-12 text-center">
              <p className="font-serif text-4xl text-stone-800">{num}</p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 mt-3">
                {label}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function SplitSection({
  reversed = false,
  image,
  imageAlt,
  title,
  body,
  badge,
}) {
  const textBlock = (
    <FadeIn
      delay={0.1}
      className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-16"
    >
      <h2 className="font-serif text-3xl lg:text-4xl text-stone-800 leading-snug mb-6">
        {title}
      </h2>

      <p className="text-[15px] leading-relaxed text-stone-500">{body}</p>

      {badge && (
        <span className="mt-6 inline-block self-start bg-[#F5F0E8] border border-[#d9c8b4] text-[#9a6840] text-[11px] tracking-widest uppercase px-4 py-2 rounded-full">
          {badge}
        </span>
      )}
    </FadeIn>
  );

  const imgBlock = (
    <FadeIn delay={0} className="relative overflow-hidden min-h-[380px]">
      <img
        src={image}
        alt={imageAlt}
        className="w-full h-full min-h-[380px] object-cover"
      />
    </FadeIn>
  );

  return (
    <section
      className={`grid grid-cols-1 lg:grid-cols-2 ${
        reversed ? "bg-[#F5F0E8]" : "bg-white"
      }`}
    >
      {reversed ? (
        <>
          {textBlock}
          {imgBlock}
        </>
      ) : (
        <>
          {imgBlock}
          {textBlock}
        </>
      )}
    </section>
  );
}

function MeetSection() {
  return (
    <section className="bg-white py-24 px-6 sm:px-8">
      <FadeIn className="text-center mb-16">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C07A50] mb-4">
          The Specialist
        </p>
        <h2 className="font-serif text-4xl lg:text-5xl text-stone-800">
          Meet Alla
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <FadeIn delay={0.1}>
          <img
            src={allaPhoto}
            alt="Alla"
            className="w-full aspect-[3/4] object-cover rounded-2xl"
          />
        </FadeIn>

        <FadeIn delay={0.25} className="flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-3xl text-stone-800">Alla</h3>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#C07A50] mt-1">
              Certified Laser Technician
            </p>
          </div>

          <p className="text-[15px] leading-relaxed text-stone-500">
            Alla is a certified laser technician dedicated to delivering safe,
            comfortable, and effective hair removal treatments. With a warm and
            professional approach, she ensures every client feels at ease and
            leaves with confidence in their results.
          </p>

          <div className="border border-stone-100 rounded-xl p-5 flex items-center gap-4 bg-[#F5F0E8]">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-[#C07A50]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div>
              <p className="text-[10px] tracking-widest uppercase text-stone-400">
                Device Used
              </p>
              <p className="text-[14px] font-medium text-stone-700 mt-0.5">
                Soprano Ice Platinum · Alma Lasers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              "All Skin Types",
              "Virtually Painless",
              "FDA-Cleared",
              "Health Canada Approved",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[11px] tracking-wide text-stone-500 bg-stone-50 border border-stone-100 rounded-lg px-3 py-2 text-center"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
  to="/booking"
  className="inline-flex items-center justify-center bg-[#C07A50] hover:bg-[#a8663e] transition-colors text-white text-[13px] tracking-wide px-6 py-3 rounded-md w-full mt-2"
>
  Book with Alla
</Link>
        </FadeIn>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <FadeIn>
      <section className="bg-[#C07A50] py-20 px-6 sm:px-8 text-center">
        <h2 className="font-serif text-4xl text-white mb-4">
          Ready to feel confident in your skin?
        </h2>
        <p className="text-white/80 text-[15px] mb-10 max-w-lg mx-auto">
          Book your free consultation with Alla today and take the first step
          toward smooth, lasting results.
        </p>
        <Link
            to="/booking"
            className="inline-flex items-center justify-center bg-[#C07A50] hover:bg-[#a8663e] transition-colors text-white text-[13px] tracking-wide px-7 py-3 rounded-md"
          >
            Book a Free Consultation
         </Link>
      </section>
    </FadeIn>
  );
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400&display=swap');

        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        body {
          font-family: 'Lato', sans-serif;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="min-h-screen bg-white">
        <Hero />
        <TrustSection />

        <SplitSection
          title="Expertise you can see. Results you can feel."
          body="With years of hands-on experience and a passion for skin health, Alla brings empathy, consistency, and precision to every appointment. Your results and your comfort are always the priority — from your very first consultation to your final session."
          image={clinicPhoto}
          imageAlt="Clinic interior"
        />

        <SplitSection
          reversed
          title="Technology that works as hard as we do"
          body="Alla uses the Soprano Ice Platinum by Alma Lasers — one of the most advanced laser hair removal systems in the world. It's Health Canada and FDA-cleared, effective on all skin types and tones, and virtually painless thanks to its triple-wavelength technology."
          badge="Soprano Ice Platinum · Alma Lasers"
          image={machinePhoto}
          imageAlt="Laser machine"
        />

        <MeetSection />
        <CtaBanner />
      </div>
    </>
  );
}