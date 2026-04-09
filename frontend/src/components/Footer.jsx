import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f3] text-[#4f4f4f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="border-t border-[#e2e2de] pt-14">

          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">

            {/* COMPANY */}
            <div>
              <h3 className="text-[20px] font-semibold text-[#4a4a4a]">
                Alla Beauty Laser  Skin Clinic
              </h3>

              <div className="mt-8 space-y-4 text-[18px]">
                <Link to="/about" className="block hover:text-black transition">
                  About
                </Link>
                <Link to="/pricing" className="block hover:text-black transition">
                  Pricing
                </Link>
                <Link to="/book" className="block hover:text-black transition">
                  Book a Free Consultation
                </Link>
                <Link to="/book" className="block hover:text-black transition">
                  Book an Appointment
                </Link>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-[20px] font-semibold text-[#4a4a4a]">
                Contact
              </h3>

              <div className="mt-8 space-y-4 text-[18px] leading-8">
                <p>4385 Sheppard Ave E</p>
                <p>Scarborough, ON M1S 1T8</p>
                <p>allabeauty983@gmail.com</p>
                <p>647-809-8545</p>
              </div>
            </div>

            {/* HOURS */}
            <div>
              <h3 className="text-[20px] font-semibold text-[#4a4a4a]">
                Hours of Operation
              </h3>

              <div className="mt-8 space-y-4 text-[18px] leading-8">
                <p>Monday – Saturday 10am – 8pm</p>
                <p>Sunday Closed</p>
                
              </div>
            </div>

            {/* SOCIAL */}
            <div>
              <h3 className="text-[20px] font-semibold text-[#4a4a4a]">
                Follow Us
              </h3>

              <div className="mt-8 flex gap-6 text-[#b7c0af]">
                <a
                  href="https://www.instagram.com/alla_beauty83?igsh=c2RzbXdkbXZyNXNo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f2a482] transition transform hover:scale-110"
                >
                  <FaInstagram size={28} />
                </a>
              </div>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="mt-24 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[16px] text-[#4f4f4f]">
              © 2026 Alla Beauty Laser  Skin Clinic &nbsp;|&nbsp; Privacy Policy
            </p>

            <p className="text-[16px] text-[#4f4f4f]">
              Made with <span className="text-[#f2a482]">♥</span> by{" "}
              <span className="text-[#f2a482] font-semibold">Tavan Mohammed</span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
