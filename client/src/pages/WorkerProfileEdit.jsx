import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function WorkerProfileEdit() {
  const [activeNav, setActiveNav] = useState('Edit Profile');
  const navigate = useNavigate();

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
    };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    skills: '',
    experience: '',
    location: '',
  });




  const handleSave = () => {
    console.log('Profile data saved:', formData);
    alert('Profile updated successfully!');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' , path: "/worker-dashboard"},
    { id: 'jobs', label: 'My Jobs' , path: "/worker-jobs"},
    { id: 'earnings', label: 'Earnings' , path: "/worker-earnings"},
    { id: 'messages', label: 'Messages' , path: "/worker-messages"},
    { id: 'reviews', label: 'Reviews' , path: "/worker-reviews"},
    { id: 'settings', label: 'Settings' , path: "/worker-settings"},
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

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none transition"
                  placeholder="Enter your location"
                />
              </div>

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
