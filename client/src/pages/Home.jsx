import { Link,useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold" style={{ color: "#007BFF", fontFamily: "Poppins" }}>
            DailyJobs
          </div>
          <nav className="flex items-center gap-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </a>
            <Link to="/customer-auth" className="text-gray-700 hover:text-blue-600 transition">
               Find Workers
            </Link>
            <Link to="/worker-auth" className="text-gray-700 hover:text-blue-600 transition">
              Register as Worker
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </Link>
            <a href="/" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </a>
          </nav>
          <Link to="/customer-auth">
           <button
              className="px-6 py-2 rounded-lg font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: "#007BFF" }}
            >
              Login
            </button>
          </Link>
          
         
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-12">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4" style={{ color: "#333" }} >
              Hire Skilled Daily Wage Workers Instantly
            </h1>
            <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: "Roboto" }}>
              Find verified and available workers near you.
            </p>
            <div className="flex gap-4">
              <Link to="/customer-auth">
                <button
                  className="px-8 py-3 rounded-lg font-medium text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#007BFF" }}
                  >
                  Find Workers
               </button>
              </Link>
              <Link to="/worker-auth">
                <button
                  className="px-8 py-3 rounded-lg font-medium text-gray-800 transition hover:opacity-90"
                  style={{ backgroundColor: "#FFC107" }}
                >
                  Register as Worker
                </button>
              </Link>
              
            </div>
          </div>
          <div className="flex-1">
            <img src="/skilled-workers-illustration.jpg" alt="Workers illustration" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: "#333", fontFamily: "Poppins" }}>
            Why Choose WorkConnect?
          </h2>
          <p className="text-center text-gray-600 mb-12" style={{ fontFamily: "Roboto" }}>
            Everything you need to find and hire skilled workers efficiently
          </p>
          <div className="grid grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#007BFF" }}
              >
                <span className="text-2xl text-white">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Poppins" }}>
                Verified Workers
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Roboto" }}>
                All workers are verified and background checked for your safety
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#FFC107" }}
              >
                <span className="text-2xl text-gray-800">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Poppins" }}>
                Ratings & Reviews
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Roboto" }}>
                Real feedback from customers helps you make informed decisions
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#007BFF" }}
              >
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Poppins" }}>
                Instant Hiring
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Roboto" }}>
                Post a job and get connected with available workers in minutes
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#FFC107" }}
              >
                <span className="text-2xl text-gray-800">📍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Poppins" }}>
                Real-Time Availability
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Roboto" }}>
                See who's available right now and hire immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
          {/* Left CTA */}
          <div
            className="p-8 rounded-lg text-white flex flex-col justify-center"
            style={{ backgroundColor: "#007BFF" }}
          >
            <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "Poppins" }}>
              Looking for skilled workers?
            </h3>
            <p className="text-lg mb-6" style={{ fontFamily: "Roboto" }}>
              Post your job and connect with verified workers near you
            </p>
            
              <button onClick={() => navigate("/customer-auth")}
              className="self-start px-8 py-3 rounded-lg font-medium text-blue-600 transition hover:opacity-90"
              style={{ backgroundColor: "#FFC107" }}
            >
             <Link href="/customer-auth"> Find Workers</Link>
            </button>
            
            
          </div>

          {/* Right CTA */}
          <div
            className="p-8 rounded-lg text-white flex flex-col justify-center"
            style={{ backgroundColor: "#FFC107" }}
          >
            <h3 className="text-3xl font-bold mb-4 text-gray-900" style={{ fontFamily: "Poppins" }}>
              Are you a worker?
            </h3>
            <p className="text-lg mb-6 text-gray-800" style={{ fontFamily: "Roboto" }}>
              Register now and start getting hired for jobs in your area
            </p>
            
              <button onClick={() => navigate("/worker-auth")}
              className="self-start px-8 py-3 rounded-lg font-medium text-yellow-600 transition hover:opacity-90"
              style={{ backgroundColor: "#007BFF", color: "white" }}
              >
                <Link href="/worker-auth">Register Now</Link>
              </button>
            
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: "Poppins" }}>
              Quick Links
            </h4>
            <ul className="space-y-2" style={{ fontFamily: "Roboto" }}>
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">
                  Find Workers
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">
                  Register
                </a>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: "Poppins" }}>
              Contact Info
            </h4>
            <ul className="space-y-2 text-gray-300" style={{ fontFamily: "Roboto" }}>
              <li>Email: abhayvpawar737@gmail.com</li>
              <li>Phone: +91 78990 55638</li>
              <li>Address: BMS College of Engineering, Bangaluru, Karnataka</li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: "Poppins" }}>
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href="/"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <span>in</span>
              </a>
              <a
                href="/"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <span>f</span>
              </a>
              <a
                href="/"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <span>ig</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p style={{ fontFamily: "Roboto" }}>© 2025 WorkConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
