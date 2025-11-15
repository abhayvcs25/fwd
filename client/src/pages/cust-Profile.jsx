import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Home,Menu, Heart, MessageSquare, User, HelpCircle, LogOut, Bell, X, Search,  Edit2, Eye, EyeOff } from 'lucide-react';

export default function UserProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const navigate = useNavigate(); 
const handleLogout = () => {
    // you can clear tokens here if needed
    navigate("/");
  };
  const [userData, setUserData] = useState({
    fullName: 'Abhay Pawar',
    email: 'abhay.pawar@skillmatch.com',
    password: 'SecurePass123!',
    company: 'Tech Solutions Inc.',
    phoneNumber: '+91 98765 43210',
    location: 'Mumbai, India',
  });

  const [editData, setEditData] = useState(userData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(userData);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const containerStyle = {
  display: 'flex',
  height: '100vh',
  backgroundColor: '#f8f9fa',
  fontFamily: "'Geist', 'Geist Fallback', sans-serif",
};


  const sidebarStyle = {
    width: sidebarOpen ? '250px' : '0',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    padding: sidebarOpen ? '20px 0' : '0',
    overflowY: 'auto',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
  };

  const logoStyle = {
    padding: '0 20px 20px',
    marginBottom: '10px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#007BFF',
  };

  const menuItemStyle = {
    padding: '12px 20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#333',
    transition: 'all 0.2s ease',
    borderLeft: '4px solid transparent',
    fontSize: '14px',
  };

  const menuItemHoverStyle = {
    ...menuItemStyle,
    backgroundColor: '#f0f7ff',
    borderLeftColor: '#007BFF',
    color: '#007BFF',
  };

  const logoutStyle = {
    ...menuItemStyle,
    color: '#e74c3c',
    marginTop: 'auto',
  };

  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: '15px 30px',
    borderBottom: '1px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f5f5f5',
    padding: '8px 15px',
    borderRadius: '8px',
    flex: '0 0 350px',
  };

  const rightNavStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const userProfileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#007BFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const mainContentStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '40px',
  };

  const profileCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  };

  const fieldStyle = {
    marginBottom: '25px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    backgroundColor: '#f9f9f9',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#007BFF',
    backgroundColor: '#fff',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.1)',
  };

  const valueStyle = {
    padding: '12px 15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#333',
    border: '1px solid #ddd',
  };

  const passwordFieldStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '40px',
  };

  const buttonStyle = {
    padding: '12px 28px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007BFF',
    color: '#fff',
  };

  const editButtonHoverStyle = {
    ...editButtonStyle,
    backgroundColor: '#0056b3',
    boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: '#fff',
  };

  const saveButtonHoverStyle = {
    ...saveButtonStyle,
    backgroundColor: '#218838',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: '#fff',
  };

  const cancelButtonHoverStyle = {
    ...cancelButtonStyle,
    backgroundColor: '#5a6268',
  };

  const menuItems = [
    { icon: Home, label: "Home", href: "/customer-dashboard" },
    { icon: Heart, label: "Favorites", href: "/customer-Favorites" },
    { icon: MessageSquare, label: "Messages", href: "/Messages" },
    { icon: User, label: "Profile", href: "/user-profile" },
    { icon: HelpCircle, label: "Support", href: "/about" },
  ]

  return (
    <div style={containerStyle}>
      {/* SIDEBAR */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-sm`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-center border-b border-gray-200">
          <div className={`flex items-center ${sidebarOpen ? "justify-start" : "justify-center"} w-full`}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              SM
            </div>
            {sidebarOpen && <span className="ml-3 font-bold text-lg text-gray-900">DailyJobs</span>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="ml-3 text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>


        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors group font-medium">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-2 text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <div style={navbarStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#333',
              }}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div style={searchContainerStyle}>
              <Search size={18} color="#666" />
              <input
                type="text"
                placeholder="Search services, workers..."
                style={{
                  border: 'none',
                  background: 'none',
                  outline: 'none',
                  flex: 1,
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          <div style={rightNavStyle}>
            <Bell size={20} color="#666" style={{ cursor: 'pointer' }} />
            <div style={userProfileStyle}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                  Abhay Pawar
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  abhay.pawar@skillmatch.com
                </div>
              </div>
              <div style={avatarStyle}>AP</div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div style={mainContentStyle}>
          <div style={profileCardStyle}>
            <h1 style={titleStyle}>My Profile</h1>

            {/* Full Name */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              ) : (
                <div style={valueStyle}>{userData.fullName}</div>
              )}
            </div>

            {/* Email */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              ) : (
                <div style={valueStyle}>{userData.email}</div>
              )}
            </div>

            {/* Password */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Password</label>
              {isEditing ? (
                <div style={passwordFieldStyle}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={editData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    style={{ ...inputStyle, flex: 1 }}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#666',
                      padding: '8px',
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              ) : (
                <div style={valueStyle}>
                  {'•'.repeat(userData.password.length)}
                </div>
              )}
            </div>

            {/* Company */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Company</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              ) : (
                <div style={valueStyle}>{userData.company}</div>
              )}
            </div>

            {/* Phone Number */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              ) : (
                <div style={valueStyle}>{userData.phoneNumber}</div>
              )}
            </div>

            {/* Location */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              ) : (
                <div style={valueStyle}>{userData.location}</div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={buttonContainerStyle}>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    style={saveButtonStyle}
                    onMouseEnter={(e) =>
                      Object.assign(e.currentTarget.style, saveButtonHoverStyle)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.currentTarget.style, saveButtonStyle)
                    }
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    style={cancelButtonStyle}
                    onMouseEnter={(e) =>
                      Object.assign(e.currentTarget.style, cancelButtonHoverStyle)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.currentTarget.style, cancelButtonStyle)
                    }
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  style={editButtonStyle}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, editButtonHoverStyle)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, editButtonStyle)
                  }
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}
                