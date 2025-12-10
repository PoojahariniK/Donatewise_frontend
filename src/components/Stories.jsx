import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Regular Donor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "Kindred Deeds made it so easy to find and support local NGOs. I love seeing the direct impact of my donations!",
  },
  {
    name: "Maria Garcia",
    role: "NGO Director",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "This platform transformed how we connect with donors and volunteers. The verification process builds trust with our community.",
  },
  {
    name: "Michael Chen",
    role: "Volunteer Coordinator",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "As a volunteer, this platform connected me with amazing opportunities. I've helped organize food drives and literacy programs.",
  },
];

const Stories = () => {
  return (
    <div className="bg-[#f5f9ff] w-full py-20 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-900">
        Stories of Impact
      </h2>

      <p className="text-center text-gray-600 mt-3 text-lg">
        Hear from our community of donors, volunteers, and NGOs who are making
        a difference together.
      </p>

      <div className="max-w-5xl mx-auto mt-12">
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md rounded-2xl p-10 text-center max-w-4xl mx-auto border">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 mx-auto rounded-full mb-4"
                />

                <p className="text-lg italic text-gray-700 max-w-3xl mx-auto">
                  "{item.quote}"
                </p>

                <h3 className="text-lg font-semibold text-blue-600 mt-4">
                  {item.name}
                </h3>

                <p className="text-gray-500">{item.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Stories;



