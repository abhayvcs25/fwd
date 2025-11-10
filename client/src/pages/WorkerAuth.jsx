
import { useState } from "react"

export default function WorkerAuth() {
  const [activeTab, setActiveTab] = useState("login")
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    skills: "",
    experience: "",
    location: "",
  })
  const [errors, setErrors] = useState({})

  // Login validation
  const validateLogin = () => {
    const newErrors = {}
    if (!loginData.email) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) newErrors.email = "Invalid email format"
    if (!loginData.password) newErrors.password = "Password is required"
    return newErrors
  }

  // Register validation
  const validateRegister = () => {
    const newErrors = {}
    if (!registerData.fullName) newErrors.fullName = "Full name is required"
    if (!registerData.email) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) newErrors.email = "Invalid email format"
    if (!registerData.password) newErrors.password = "Password is required"
    else if (registerData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (!registerData.age) newErrors.age = "Age is required"
    if (!registerData.gender) newErrors.gender = "Gender is required"
    if (!registerData.skills) newErrors.skills = "Skills are required"
    if (!registerData.experience) newErrors.experience = "Experience is required"
    if (!registerData.location) newErrors.location = "Location is required"
    return newErrors
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateLogin()
    if (Object.keys(newErrors).length === 0) {
      alert("Login successful! Welcome back.")
      setLoginData({ email: "", password: "" })
      setErrors({})
    } else {
      setErrors(newErrors)
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateRegister()
    if (Object.keys(newErrors).length === 0) {
      alert("Registration successful! Welcome to SkillMatch.")
      setRegisterData({
        fullName: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        skills: "",
        experience: "",
        location: "",
      })
      setErrors({})
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold" style={{ color: "#007BFF", fontFamily: "Poppins" }}>
            Worker Portal – SkillMatch
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12">
          {/* Left Side - Illustration & Info */}
          <div className="flex flex-col justify-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/worker-illustration.jpg"
                alt="Worker joining illustration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#333", fontFamily: "Poppins" }}>
                Join SkillMatch Today
              </h2>
              <ul className="space-y-3" style={{ fontFamily: "Roboto" }}>
                <li className="flex items-start gap-3">
                  <span className="text-xl font-bold" style={{ color: "#007BFF" }}>
                    ✓
                  </span>
                  <span className="text-gray-700">Get hired for jobs matching your skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl font-bold" style={{ color: "#007BFF" }}>
                    ✓
                  </span>
                  <span className="text-gray-700">Flexible work schedules on your terms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl font-bold" style={{ color: "#007BFF" }}>
                    ✓
                  </span>
                  <span className="text-gray-700">Secure payments directly to your account</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl font-bold" style={{ color: "#007BFF" }}>
                    ✓
                  </span>
                  <span className="text-gray-700">Build your professional reputation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Tabbed Form */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => {
                  setActiveTab("login")
                  setErrors({})
                }}
                className="flex-1 py-4 px-6 font-semibold transition"
                style={{
                  color: activeTab === "login" ? "#007BFF" : "#999",
                  borderBottom: activeTab === "login" ? "3px solid #007BFF" : "none",
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
                className="flex-1 py-4 px-6 font-semibold transition"
                style={{
                  color: activeTab === "register" ? "#007BFF" : "#999",
                  borderBottom: activeTab === "register" ? "3px solid #007BFF" : "none",
                  fontFamily: "Poppins",
                }}
              >
                Register
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Login Form */}
              {activeTab === "login" && (
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#333", fontFamily: "Poppins" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      style={{ fontFamily: "Roboto" }}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#333", fontFamily: "Poppins" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      style={{ fontFamily: "Roboto" }}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: "#007BFF", fontFamily: "Poppins" }}
                  >
                    Login
                  </button>
                </form>
              )}

              {/* Register Form */}
              {activeTab === "register" && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#333", fontFamily: "Poppins" }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      style={{ fontFamily: "Roboto" }}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#333", fontFamily: "Poppins" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      style={{ fontFamily: "Roboto" }}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#333", fontFamily: "Poppins" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      placeholder="At least 6 characters"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      style={{ fontFamily: "Roboto" }}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-semibold mb-2"
                        style={{ color: "#333", fontFamily: "Poppins" }}
                      >
                        Age
                      </label>
                      <input
                        type="number"
                        value={registerData.age}
                        onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
                        placeholder="18"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        style={{ fontFamily: "Roboto" }}
                      />
                      {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                    </div>

                    <div>
                      <label
                        className="block text-sm font-semibold mb-2"
                        style={{ color: "#333", fontFamily: "Poppins" }}
                      >
                        Gender
                      </label>
                      <select
                        value={registerData.gender}
                        onChange={(e) => setRegisterData({ ...registerData, gender: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        style={{ fontFamily: "Roboto" }}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "#333", fontFamily: "Poppins" }}
                    >
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={registerData.skills}
                      onChange={(e) => setRegisterData({ ...registerData, skills: e.target.value })}
                      placeholder="e.g. Plumbing, Electrical, Carpentry"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      style={{ fontFamily: "Roboto" }}
                    />
                    {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-semibold mb-2"
                        style={{ color: "#333", fontFamily: "Poppins" }}
                      >
                        Experience (years)
                      </label>
                      <input
                        type="number"
                        value={registerData.experience}
                        onChange={(e) => setRegisterData({ ...registerData, experience: e.target.value })}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        style={{ fontFamily: "Roboto" }}
                      />
                      {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                    </div>

                    <div>
                      <label
                        className="block text-sm font-semibold mb-2"
                        style={{ color: "#333", fontFamily: "Poppins" }}
                      >
                        Location (City)
                      </label>
                      <input
                        type="text"
                        value={registerData.location}
                        onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                        placeholder="e.g. New York"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        style={{ fontFamily: "Roboto" }}
                      />
                      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: "#007BFF", fontFamily: "Poppins" }}
                  >
                    Register
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
