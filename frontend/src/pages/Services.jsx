import { useEffect, useMemo, useState } from "react";
import servicesData from "../data/servicesData";

const categoryConfig = {
  "Hair Removal": {
    title: "Laser Hair Removal",
    description:
      "Minimize unwanted hair with gentle, precision laser treatments tailored to your skin tone for silky-smooth, lasting results.",
  },
  Waxing: {
    title: "Waxing Services",
    description:
      "Enjoy smooth, clean results with professional waxing services for the face and body.",
  },
  "Facial Treatments": {
    title: "Facial Treatments",
    description:
      "Refresh and renew your skin with customized facial treatments designed to cleanse, hydrate, and restore your natural glow.",
  },
  Microneedling: {
    title: "Microneedling",
    description:
      "Target texture, acne scars, fine lines, and overall skin rejuvenation with advanced microneedling treatments and packages.",
  },
};

const categoryOrder = [
  "Hair Removal",
  "Waxing",
  "Facial Treatments",
  "Microneedling",
];

const areaOrder = [
  "Small Area",
  "Medium Area",
  "Large Area",
  "Face",
  "Face & Neck",
  "Targeted Area",
  "Special Treatment",
  "Intimate Area",
  "Full Body",
  "Facial Treatments",
  "Package",
  "Other",
];

function groupByArea(services) {
  return services.reduce((acc, service) => {
    const key = service.area || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(service);
    return acc;
  }, {});
}

function sortAreas(grouped) {
  return Object.entries(grouped).sort(([a], [b]) => {
    const indexA = areaOrder.indexOf(a);
    const indexB = areaOrder.indexOf(b);

    const safeA = indexA === -1 ? areaOrder.length : indexA;
    const safeB = indexB === -1 ? areaOrder.length : indexB;

    return safeA - safeB;
  });
}

function ServiceCard({ service }) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm border border-[#efebe8] flex flex-col sm:flex-row min-h-[190px] hover:shadow-md transition">
      <div className="sm:w-[35%] w-full h-[220px] sm:h-auto">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center p-6 md:p-7">
        <p className="text-[15px] tracking-wide text-[#8b8b8b] uppercase">
          {service.duration}
          {service.price !== null && ` | $${service.price}`}
          {service.description && ` | ${service.description}`}
        </p>

        <h3 className="mt-3 text-[26px] md:text-[28px] leading-[1.15] font-semibold text-[#4a4a4a]">
          {service.name}
        </h3>
      </div>
    </div>
  );
}

function CategorySection({ category, services }) {
  const groupedServices = useMemo(() => groupByArea(services), [services]);
  const sortedGroupedServices = sortAreas(groupedServices);
  const config = categoryConfig[category];

  return (
    <section className="mb-20">
      <div className="mb-12">
        <h2 className="text-[38px] md:text-[50px] leading-tight font-medium text-[#4a4a4a] font-serif">
          {config?.title || category}
        </h2>

        {config?.description && (
          <p className="mt-4 max-w-5xl text-[19px] md:text-[22px] leading-relaxed text-[#555]">
            {config.description}
          </p>
        )}

        <div className="mt-8 h-[10px] w-full bg-[#f2e9e4] rounded-full" />
      </div>

      <div className="space-y-16">
        {sortedGroupedServices.map(([area, items]) => (
          <div key={area}>
            <h3 className="mb-8 text-[30px] md:text-[38px] font-medium text-[#4a4a4a] font-serif">
              {area}
            </h3>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {items.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(servicesData);
  }, []);

  const groupedByCategory = useMemo(() => {
    return services.reduce((acc, service) => {
      const key = service.category || "Other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(service);
      return acc;
    }, {});
  }, [services]);

  const sortedCategories = Object.keys(groupedByCategory).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    const safeA = indexA === -1 ? categoryOrder.length : indexA;
    const safeB = indexB === -1 ? categoryOrder.length : indexB;

    return safeA - safeB;
  });

  return (
    <section className="bg-[#f8f6f4] min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <h1 className="text-[42px] md:text-[60px] leading-tight font-medium text-[#4a4a4a] font-serif">
            Our Services
          </h1>

          <p className="mt-4 max-w-4xl text-[20px] md:text-[24px] leading-relaxed text-[#555]">
            Explore our professional beauty and skincare services, from laser hair
            removal and waxing to facials and microneedling treatments.
          </p>
        </div>

        {sortedCategories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            services={groupedByCategory[category]}
          />
        ))}
      </div>
    </section>
  );
}