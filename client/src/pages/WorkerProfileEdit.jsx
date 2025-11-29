import { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";

export default function WorkerProfileEdit() {
  const [activeNav, setActiveNav] = useState('Edit Profile');
  const navigate = useNavigate();

   // Track all fields including location fields

  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",   // optional: leave blank if not changing
  age: "",
  gender: "",
  skills: "",         // main skills as comma-separated string
  experience: "",
  city: "",
  state: "",
  country: "",
  profileTitle: "",
  profileBio: "",
  availability: "available",
  hourlyRate: 0,
});

useEffect(() => {
  const workerId = localStorage.getItem("workerId");
  if (!workerId) return;

  fetch(`http://localhost:5000/api/workers/me?id=${workerId}`)
    .then((res) => res.json())
    .then((data) => {
      setFormData({
        fullName: data.fullName || "",
        email: data.email || "",
        password: "", // keep blank for security
        age: data.age || "",
        gender: data.gender || "",
        skills: (data.skills || []).join(", "), // array → string
        experience: data.experience || "",
        city: data.location?.city || "",
        state: data.location?.state || "",
        country: data.location?.country || "",
        profileTitle: data.profile?.title || "",
        profileBio: data.profile?.bio || "",
        availability: data.availability || "available",
        hourlyRate: data.hourlyRate || 0,
      });
    })
    .catch((err) => console.error(err));
}, []);




// unchanged - generic input handler
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// Save / submit function
const handleSave = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/workers/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),   // <--- send raw values
    });

    const data = await response.json();
    console.log("Profile data saved:", data);

    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Error saving profile:", err);
  }
};


  const navItems = [
    { id: 'dashboard', label: 'Dashboard' , path: "/worker-dashboard"},
    { id: 'messages', label: 'Messages' , path: "/worker-messages"},
    { id: 'reviews', label: 'Reviews' , path: "/worker-reviews"},
    { id: 'Edit Profile', label: 'Edit Profile' , path: "/worker-profile-edit"},
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
       <aside className="fixed left-0 top-0 h-screen w-[230px] bg-white border-r border-gray-200 rounded-r-xl">
        {/* Logo Row */}
        <div className="flex items-center px-4 py-6 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#007BFF] flex items-center justify-center text-white font-bold mr-3">
            D
          </div>
          <span className="text-[#007BFF] font-bold text-xl">DailyJobs</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => 
                {setActiveNav(item.id);
                navigate(item.path);
                }
              }
              className={`block w-full text-left px-4 py-3 rounded-lg cursor-pointer transition ${
                activeNav === item.id
                  ? 'bg-[#007BFF] text-white font-semibold shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button className="w-[90%] mx-auto block bg-[#FFC107] text-white font-bold px-4 py-3 rounded-lg text-center shadow hover:opacity-90 transition mb-4">
            Logout
          </button>
        </div>
      </aside>



      <nav className="fixed top-0 left-[230px] right-0 h-[70px] bg-white shadow-sm flex items-center justify-between px-6 z-40">
        <div className="flex-1"></div>
        <div className="flex items-center gap-6">
          <button className="text-xl">🔔</button>
          <div className="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold">
            JD
          </div>
        </div>
      </nav>

      <main className="ml-[230px] w-full bg-gray-50 min-h-screen pt-24 pb-8 px-6">
        <div className="max-w-xl mx-auto">
          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <img
              src="/worker-profile-picture.jpg"
              alt="Profile Picture"
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow mx-auto"
            />
          </div>

          {/* Edit Form Card */}
          <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>

  <form className="space-y-4">

    {/* Full Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Full Name
      </label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
        placeholder="Enter your full name"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
        placeholder="Enter your email"
      />
    </div>

    {/* Password */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
        placeholder="Enter your password"
      />
    </div>

    {/* Age */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Age
      </label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
        placeholder="Enter your age"
      />
    </div>

    {/* Gender */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Gender
      </label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
      >
        <option value="">Select your gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Skills */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Skills
      </label>
      <textarea
        name="skills"
        value={formData.skills}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition resize-none"
        placeholder="List your skills"
        rows={3}
      />
    </div>

    {/* Experience */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Experience
      </label>
      <textarea
        name="experience"
        value={formData.experience}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition resize-none"
        placeholder="Describe your professional experience"
        rows={3}
      />
    </div>

    {/* Location City */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        City
      </label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
        placeholder="Enter your city"
      />
    </div>

    {/* Location State */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        State
      </label>
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
        placeholder="Enter your state"
      />
    </div>

    {/* Location Country */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Country
      </label>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
        placeholder="Enter your country"
      />
    </div>

    {/* PROFILE → Title */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Profile Title
      </label>
      <input
        type="text"
        name="profileTitle"
        value={formData.profileTitle}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
        placeholder="e.g. Electrician | Plumber | Carpenter"
      />
    </div>

    {/* PROFILE → Bio */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Bio
      </label>
      <textarea
        name="profileBio"
        value={formData.profileBio}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition resize-none"
        placeholder="Write a short bio"
        rows={3}
      />
    </div>

    {/* PROFILE → Profile Skills */}

    {/* PROFILE → Portfolio */}

    {/* Availability */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Availability
      </label>
      <select
        name="availability"
        value={formData.availability}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
      >
        <option value="">Select status</option>
        <option value="available">Available</option>
        <option value="busy">Busy</option>
        <option value="offline">Offline</option>
      </select>
    </div>

    {/* Hourly Rate */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Hourly Rate (₹)
      </label>
      <input
        type="number"
        name="hourlyRate"
        value={formData.hourlyRate}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
        placeholder="Enter hourly rate"
      />
    </div>

    {/* Save Button */}
    <button
      type="button"
      onClick={handleSave}
      className="w-full bg-[#007BFF] text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mt-4"
    >
      Save Changes
    </button>
  </form>
</div>

        </div>
      </main>
    </div>
  );
}
