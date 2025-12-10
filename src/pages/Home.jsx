import React from "react";
import Header from "../components/Header";
import HomeBg from "../assets/home-bg.jpg";
import Stories from "../components/Stories";


const Home = () => {
  return (
    <div className="w-full">
      <Header />

      {/* HERO SECTION */}
      <div
        className="w-full h-[75vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${HomeBg})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Donate Smart.
          </h1>

          <h1 className="text-5xl md:text-6xl font-extrabold text-green-400 drop-shadow-lg mt-2">
            Volunteer with Impact.
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-3xl leading-relaxed">
            Connect with verified NGOs, make meaningful donations, and volunteer
            for causes that matter. Every action creates ripples of positive
            change.
          </p>

          <div className="flex gap-6 mt-10">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg transition">
              🎁 Donate Now
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg transition">
              👐 Become a Volunteer
            </button>
          </div>
        </div>
      </div>

      {/* IMPACT SECTION */}
      <div className="w-full bg-white py-16 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Our Growing Impact
        </h2>
        <p className="text-center text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Together, we're building a community where every contribution creates lasting change.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 max-w-6xl mx-auto">
          <div className="bg-white shadow-md rounded-2xl p-10 text-center border 
                          transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-4xl font-bold text-blue-600">1,000+</h3>
            <p className="font-semibold text-gray-900 mt-2">Donations Made</p>
            <p className="text-gray-500 text-sm mt-1">
              Items donated to communities in need
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-10 text-center border
                          transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-4xl font-bold text-blue-600">500+</h3>
            <p className="font-semibold text-gray-900 mt-2">Active Volunteers</p>
            <p className="text-gray-500 text-sm mt-1">
              Dedicated volunteers making a difference
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-10 text-center border
                          transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-4xl font-bold text-blue-600">50+</h3>
            <p className="font-semibold text-gray-900 mt-2">NGOs Onboarded</p>
            <p className="text-gray-500 text-sm mt-1">
              Verified organizations creating impact
            </p>
          </div>
        </div>
      </div>

      {/* STORIES SECTION */}
      <Stories />

    </div>
  );
};

export default Home;




