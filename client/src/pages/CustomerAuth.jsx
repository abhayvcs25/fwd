
import { useState } from "react"
import { useNavigate } from "react-router-dom";



export default function CustomerAuth() {
  const [activeTab, setActiveTab] = useState("login")
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    companyName: "",
    phone: "",
    location: "",
  })
  const [errors, setErrors] = useState({})

  

  // Validation helper
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const navigate = useNavigate();
  // Handle login submit
  const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};
  if (!loginData.email) newErrors.email = 'Email is required';
  if (!loginData.password) newErrors.password = 'Password is required';
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Display server error
      setErrors({ server: data.message });
    } else {
      // Login successful
      localStorage.setItem('token', data.token);
      localStorage.setItem("customerId", data.user._id);
      localStorage.setItem("fullName", data.user.fullName);
      localStorage.setItem("email", data.user.email);
      navigate('/customer-dashboard');
      setLoginData({ email: '', password: '' });
    }
  } catch (error) {
    console.error(error);
    setErrors({ server: 'Something went wrong. Please try again.' });
  }
};



  // Handle register submit
  const handleRegisterSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!registerData.fullName) newErrors.fullName = "Full Name is required";
  if (!registerData.email) newErrors.email = "Email is required";
  if (!registerData.password) newErrors.password = "Password is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Registration successful!");
    navigate("/customer-dashboard");

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: "#F8F9FA" }}>
      {/* Main Card */}
      <div className="w-full max-w-md" style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        {/* Card Header */}
        <div className="p-8" style={{ backgroundColor: "#007BFF" }}>
          <h1 className="text-3xl font-bold text-white text-center mb-2" style={{ fontFamily: "Poppins" }}>
            SkillMatch
          </h1>
          <p className="text-blue-100 text-center" style={{ fontFamily: "Roboto" }}>
            Customer Portal
          </p>
        </div>

        {/* Card Body */}
        <div className="p-8 bg-white rounded-b-lg">
          {/* Tab Toggle */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => {
                setActiveTab("login")
                setErrors({})
              }}
              className="flex-1 py-2 px-4 rounded-lg font-semibold transition"
              style={{
                backgroundColor: activeTab === "login" ? "#007BFF" : "#E8EAED",
                color: activeTab === "login" ? "white" : "#666",
                fontFamily: "Poppins",
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveTab("register")
                setErrors({})
              }}
              className="flex-1 py-2 px-4 rounded-lg font-semibold transition"
              style={{
                backgroundColor: activeTab === "register" ? "#007BFF" : "#E8EAED",
                color: activeTab === "register" ? "white" : "#666",
                fontFamily: "Poppins",
              }}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit}>
              {/* Server error message */}
              {errors.server && (
                <div className="mb-4">
                  <p className="text-red-500 text-sm" style={{ fontFamily: 'Roboto' }}>{errors.server}</p>
                </div>
              )}

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2 text-gray-700" style={{ fontFamily: "Poppins" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none transition"
                  style={{ borderColor: errors.email ? "#E74C3C" : "#D0D7DE", fontFamily: "Roboto" }}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: "Roboto" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-700" style={{ fontFamily: "Poppins" }}>
                  Password
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none transition"
                  style={{ borderColor: errors.password ? "#E74C3C" : "#D0D7DE", fontFamily: "Roboto" }}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: "Roboto" }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: "#007BFF", fontFamily: "Poppins" }}
              >
                Login
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit}>
              {/* Full Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700" style={{ fontFamily: "Poppins" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={registerData.fullName}
                  onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none transition"
                  style={{ borderColor: errors.fullName ? "#E74C3C" : "#D0D7DE", fontFamily: "Roboto" }}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: "Roboto" }}>
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700" style={{ fontFamily: "Poppins" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none transition"
                  style={{ borderColor: errors.email ? "#E74C3C" : "#D0D7DE", fontFamily: "Roboto" }}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: "Roboto" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700" style={{ fontFamily: "Poppins" }}>
                  Password
                </label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none transition"
                  style={{ borderColor: errors.password ? "#E74C3C" : "#D0D7DE", fontFamily: "Roboto" }}
                  placeholder="At least 6 characters"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: "Roboto" }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Company/Individual Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700" style={{ fontFamily: "Poppins" }}>
                  Company / Individual Name
                </label>
                <input
                  type="text"
                  value={registerData.companyName}
                  onChange={(e) => setRegisterData({ ...registerData, companyName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none transition"
                  style={{ borderColor: errors.companyName ? "#E74C3C" : "#D0D7DE", fontFamily: "Roboto" }}
                  placeholder="ABC Construction"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: "Roboto" }}>
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700" style={{ fontFamily: "Poppins" }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none transition"
                  style={{ borderColor: errors.phone ? "#E74C3C" : "#D0D7DE", fontFamily: "Roboto" }}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: "Roboto" }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-700" style={{ fontFamily: "Poppins" }}>
                  Location (City)
                </label>
                <input
                  type="text"
                  value={registerData.location}
                  onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none transition"
                  style={{ borderColor: errors.location ? "#E74C3C" : "#D0D7DE", fontFamily: "Roboto" }}
                  placeholder="New York"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: "Roboto" }}>
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: "#007BFF", fontFamily: "Poppins" }}
              >
                Register
              </button>
            </form>
          )}

          {/* Toggle Link */}
          <div className="mt-6 text-center">
            {activeTab === "login" ? (
              <p className="text-gray-600" style={{ fontFamily: "Roboto" }}>
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setActiveTab("register")
                    setErrors({})
                  }}
                  className="font-semibold transition hover:opacity-80"
                  style={{ color: "#007BFF" }}
                >
                  Register
                </button>
              </p>
            ) : (
              <p className="text-gray-600" style={{ fontFamily: "Roboto" }}>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setActiveTab("login")
                    setErrors({})
                  }}
                  className="font-semibold transition hover:opacity-80"
                  style={{ color: "#007BFF" }}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
