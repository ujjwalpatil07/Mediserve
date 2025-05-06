import React from "react";
import { Link } from "react-router-dom";
import { FaHospitalAlt, FaUserMd, FaUsers, FaPhoneAlt, FaStethoscope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
      {/* Hero Section */}
      <div className="text-center py-20 px-4 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-blue-900 mb-4"
        >
          Welcome to MediServe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Your trusted platform to book appointments with top-rated specialist doctors, hospitals with cutting-edge technology, and 24/7 patient support.
        </motion.p>
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Explore Appointments
          </motion.button>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center px-6 md:px-20 py-10">
        <motion.div className="bg-white rounded-xl shadow-lg p-6" whileHover={{ scale: 1.05 }}>
          <FaUserMd className="text-blue-600 text-4xl mx-auto mb-2" />
          <h3 className="text-xl font-semibold">2000+ Doctors</h3>
          <p className="text-gray-500 text-sm">Specialists across all fields</p>
        </motion.div>
        <motion.div className="bg-white rounded-xl shadow-lg p-6" whileHover={{ scale: 1.05 }}>
          <FaHospitalAlt className="text-purple-600 text-4xl mx-auto mb-2" />
          <h3 className="text-xl font-semibold">500+ Hospitals</h3>
          <p className="text-gray-500 text-sm">With modern facilities</p>
        </motion.div>
        <motion.div className="bg-white rounded-xl shadow-lg p-6" whileHover={{ scale: 1.05 }}>
          <FaStethoscope className="text-green-600 text-4xl mx-auto mb-2" />
          <h3 className="text-xl font-semibold">Advanced Technology</h3>
          <p className="text-gray-500 text-sm">AI & Robotic Assisted Treatment</p>
        </motion.div>
        <motion.div className="bg-white rounded-xl shadow-lg p-6" whileHover={{ scale: 1.05 }}>
          <FaUsers className="text-pink-600 text-4xl mx-auto mb-2" />
          <h3 className="text-xl font-semibold">5000+ Happy Patients</h3>
          <p className="text-gray-500 text-sm">Real care, real results</p>
        </motion.div>
      </div>

      {/* About MediServe Section */}
      <div className="bg-white py-16 px-6 md:px-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-blue-800 mb-6">Why Choose MediServe?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            MediServe is a next-gen health platform designed to simplify your healthcare experience. We partner with highly qualified doctors and reputed hospitals that use advanced equipment to ensure accurate diagnosis and treatment. Booking an appointment is just a few clicks away!
          </p>
        </motion.div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-tr from-purple-200 to-blue-200 py-14 px-6 md:px-20 text-center">
        <FaPhoneAlt className="text-4xl text-blue-700 mx-auto mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">Have Questions?</h3>
        <p className="text-gray-600 mb-4">Our support team is ready to help you anytime.</p>
        <Link to="/contact">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}
