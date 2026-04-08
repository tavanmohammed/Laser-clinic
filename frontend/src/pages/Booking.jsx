import { useEffect, useMemo, useState } from "react";
import servicesData from "../data/servicesData";

const API_BASE = "https://laser-clinic-backend.onrender.com";

function formatTo12Hour(hour, minute = 0) {
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  const m = minute === 0 ? "00" : minute;
  return `${h}:${m} ${ampm}`;
}

function isSunday(dateString) {
  if (!dateString) return false;
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).getDay() === 0;
}

export default function Booking() {
  const categories = [...new Set(servicesData.map((item) => item.category))];

  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const filteredServices = useMemo(() => {
    return servicesData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const selectedService = useMemo(() => {
    return servicesData.find((item) => item._id === selectedServiceId);
  }, [selectedServiceId]);

  useEffect(() => {
    setSelectedServiceId("");
  }, [selectedCategory]);

  useEffect(() => {
    async function fetchAvailability() {
      if (!selectedDate) {
        setAvailableSlots([]);
        return;
      }

      if (isSunday(selectedDate)) {
        setAvailableSlots([]);
        return;
      }

      try {
        setLoadingSlots(true);

        const res = await fetch(
          `${API_BASE}/api/bookings/availability?date=${selectedDate}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load availability");
        }

        setAvailableSlots(data.availableSlots || []);
      } catch (error) {
        console.error(error);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchAvailability();
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedService) return alert("Select service");
    if (!selectedDate) return alert("Select date");
    if (!selectedTime) return alert("Select time");
  
    try {
      setSubmitting(true);
  
      // ⚡ IMMEDIATE FEEDBACK
      alert("Booking is being confirmed...");
  
      const payload = {
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        notes: formData.notes,
        serviceId: selectedService._id,
        serviceName: selectedService.name,
        category: selectedCategory,
        price: selectedService.price ?? 0,
        date: selectedDate,
        time: selectedTime,
        source: "website",
      };
  
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message);
      }
  
      // ✅ FINAL SUCCESS
      alert("Booking confirmed!");
  
      // reset form
      setSelectedServiceId("");
      setSelectedDate("");
      setSelectedTime("");
      setAvailableSlots([]);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        notes: "",
      });
  
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  

  return (
    <section className="min-h-screen bg-[#f5f5f3]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="max-w-3xl">
          <h1 className="font-serif text-[42px] leading-tight text-[#555555] md:text-[60px]">
            Book an Appointment
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#4f4f4f]">
            Choose your treatment, select a date and time, and submit your booking.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div className="rounded-[24px] border border-[#e7e4df] bg-white p-6">
            <h2 className="text-2xl font-semibold text-[#4a4a4a]">
              Choose a service
            </h2>

            <div className="mt-6">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#4f4f4f]">
                  Category
                </span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <div className="mt-6">
                <span className="mb-3 block text-sm font-medium text-[#4f4f4f]">
                  Services
                </span>

                <div className="max-h-[560px] space-y-4 overflow-y-auto pr-2">
                  {filteredServices.map((service) => (
                    <button
                      key={service._id}
                      type="button"
                      onClick={() => setSelectedServiceId(service._id)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        selectedServiceId === service._id
                          ? "border-[#f2a482] bg-[#fff7f3]"
                          : "border-[#e7e4df] bg-white hover:border-[#d9d3cc]"
                      }`}
                    >
                      <div className="flex gap-4">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="h-24 w-24 rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-[#3f3f3f]">
                                {service.name}
                              </h3>
                              <p className="mt-1 text-sm text-[#6a6a6a]">
                                {service.area}
                              </p>
                            </div>

                            <div className="text-right">
                              {service.price !== null ? (
                                <p className="text-lg font-semibold text-[#3f3f3f]">
                                  ${service.price}
                                </p>
                              ) : (
                                <p className="text-sm font-medium text-[#3f3f3f]">
                                  Custom
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm text-[#5a5a5a]">
                              Duration: {service.duration}
                            </p>

                            {service.description && (
                              <p className="mt-2 text-sm leading-7 text-[#5a5a5a]">
                                {service.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#e7e4df] bg-white p-6">
            <h2 className="text-2xl font-semibold text-[#4a4a4a]">
              Your details
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4f4f4f]">
                  Selected service
                </label>
                <input
                  type="text"
                  value={selectedService ? selectedService.name : ""}
                  readOnly
                  placeholder="Choose a service from the left"
                  className="w-full rounded-xl border border-gray-300 bg-[#faf9f7] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4f4f4f]">
                  Preferred date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime("");
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  required
                />
                <p className="mt-2 text-sm text-[#6a6a6a]">
                  Monday–Saturday: 10 AM–8 PM, Sunday: Closed
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4f4f4f]">
                  Preferred time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  required
                  disabled={!selectedDate || loadingSlots || availableSlots.length === 0}
                >
                  <option value="">
                    {!selectedDate
                      ? "Select a date first"
                      : loadingSlots
                      ? "Loading available times..."
                      : availableSlots.length === 0
                      ? "No available times"
                      : "Select a time"}
                  </option>

                  {availableSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4f4f4f]">
                  Full name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4f4f4f]">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4f4f4f]">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4f4f4f]">
                  Notes
                </label>
                <textarea
                  rows="5"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  placeholder="Anything we should know"
                />
              </div>

              <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[#f2a482] px-6 py-4 text-lg font-medium text-white transition hover:opacity-90 disabled:opacity-60"
              >
              {submitting ? "Processing booking..." : "Confirm Booking"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
