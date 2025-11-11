import React from "react";
import {
  CheckCircleIcon,
  StarIcon,
  BoltIcon,
  MapPinIcon,
  UsersIcon,
  HeartIcon,
  BriefcaseIcon
} from "@heroicons/react/24/solid";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="text-center py-16 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About DailyJobs</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          WorkConnect is your trusted platform for finding and hiring skilled, verified workers quickly and safely.
          Whether you’re looking to hire or get hired, we make the process smooth, transparent, and efficient.
        </p>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To connect employers and skilled workers seamlessly through technology, trust, and real-time accessibility.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
            <CheckCircleIcon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Verified Workers</h3>
            <p className="text-sm text-gray-600">
              Every worker is background checked and verified for your peace of mind.
            </p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-lg shadow hover:shadow-md transition">
            <StarIcon className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Trusted Ratings</h3>
            <p className="text-sm text-gray-600">
              Read real reviews from customers to make confident hiring decisions.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
            <BoltIcon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Instant Hiring</h3>
            <p className="text-sm text-gray-600">
              Connect with available workers and hire within minutes.
            </p>
          </div>
            <div className="p-6 bg-yellow-50 rounded-lg shadow hover:shadow-md transition">
                <MapPinIcon className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Real-Time Availability</h3>
                <p className="text-sm text-gray-600">
                See who’s ready to work right now and hire instantly.
                </p>
            </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16 px-6 text-white">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            We believe in integrity, innovation, and inclusivity—empowering every worker and employer to succeed together.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg">
            <UsersIcon className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Community</h3>
            <p className="text-blue-100 text-sm">
              We foster a trusted community where people connect and grow together.
            </p>
          </div>
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg">
            <HeartIcon className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Integrity</h3>
            <p className="text-blue-100 text-sm">
              Transparency and honesty are at the core of everything we do.
            </p>
          </div>
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg">
            <BriefcaseIcon className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Empowerment</h3>
            <p className="text-blue-100 text-sm">
              We empower workers and employers to achieve success with ease.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
