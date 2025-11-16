
import React, { useState } from 'react';
import {Home, Heart, MessageSquare, User, HelpCircle, Menu, X, Search, Bell, LogOut, Star, Clock, DollarSign, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function WorkerDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  
    const handleLogout = () => {
      // you can clear tokens here if needed
      navigate("/");
    };
  
    const handleSearchClick = () => {
      navigate("/search"); // <-- change to your search page route
    };

  const worker = {
    id: 1,
    name: 'John Smith',
    title: 'Professional Web Designer',
    skills: ['Web Design', 'UI/UX Design', 'Figma'],
    phone: '+1-234-567-8901',
    email: 'john.smith@skillmatch.com',
    location: 'San Francisco, CA',
    image: '/professional-man-1.jpg',
    rating: 4.8,
    reviews: 156,
    price: '$75/hour',
    experience: '8 years',
    avgWaitingTime: '2-4 hours',
    completedProjects: 287,
    responseTime: '15 mins',
    portfolio: 'johnsmith.design',
    about: 'Expert web designer with 8 years of experience creating beautiful, user-friendly websites and applications. Specialized in modern design trends and responsive layouts.',
  };

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
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
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const contentAreaStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '30px',
  };

  const profileContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const profileImageStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '12px',
    backgroundColor: '#e0e0e0',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const profileInfoStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const nameStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  };

  const titleStyle = {
    fontSize: '16px',
    color: '#666',
    marginBottom: '15px',
  };

  const ratingContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e0e0e0',
  };

  const starStyle = {
    color: '#FFC107',
    fontSize: '18px',
  };

  const infoRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    fontSize: '14px',
    color: '#555',
  };

  const iconContainerStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#f0f7ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#007BFF',
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0',
  };

  const statCardStyle = {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
  };

  const statNumberStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: '4px',
  };

  const statLabelStyle = {
    fontSize: '12px',
    color: '#666',
  };

  const aboutSectionStyle = {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0',
  };

  const aboutTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  };

  const aboutTextStyle = {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
  };

  const contactButtonStyle = {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const contactButtonHoverStyle = {
    ...contactButtonStyle,
    backgroundColor: '#0056b3',
  };

  const bookButtonStyle = {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#FFC107',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const bookButtonHoverStyle = {
    ...bookButtonStyle,
    backgroundColor: '#ffb300',
  };

  const menuItems = [
    { icon: Home, label: "Home", href: "/customer-dashboard" },
    { icon: Heart, label: "Favorites", href: "/customer-Favorites" },
    { icon: MessageSquare, label: "Messages", href: "/Messages" },
    { icon: User, label: "Profile", href: "/user-profile" },
    { icon: HelpCircle, label: "Support", href: "/about" },
  ];


  return (
    <div style={containerStyle}>
      {/* Sidebar */}
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
      <div style={mainContentStyle}>
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
            <div style={searchContainerStyle} onClick={handleSearchClick}>
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

        {/* Content Area */}
        <div style={contentAreaStyle}>
          <div style={profileContainerStyle}>
            {/* Left - Worker Image */}
            <div
              style={{
                ...profileImageStyle,
                backgroundImage: `url('${worker.image}')`,
              }}
            />

            {/* Right - Worker Details */}
            <div style={profileInfoStyle}>
              <div style={nameStyle}>{worker.name}</div>
              <div style={titleStyle}>{worker.title}</div>

              {/* Rating */}
              <div style={ratingContainerStyle}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      style={{
                        ...starStyle,
                        fill: i < Math.floor(worker.rating) ? '#FFC107' : '#ddd',
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontWeight: '600', color: '#333' }}>{worker.rating}</span>
                <span style={{ color: '#666' }}>({worker.reviews} reviews)</span>
              </div>

              {/* Info Rows */}
              <div style={infoRowStyle}>
                <div style={iconContainerStyle}>
                  <DollarSign size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999' }}>Hourly Rate</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{worker.price}</div>
                </div>
              </div>

              <div style={infoRowStyle}>
                <div style={iconContainerStyle}>
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999' }}>Avg Waiting Time</div>
                  <div style={{ fontSize: '14px', color: '#333' }}>{worker.avgWaitingTime}</div>
                </div>
              </div>

              <div style={infoRowStyle}>
                <div style={iconContainerStyle}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999' }}>Phone</div>
                  <div style={{ fontSize: '14px', color: '#007BFF', fontWeight: '600' }}>{worker.phone}</div>
                </div>
              </div>

              <div style={infoRowStyle}>
                <div style={iconContainerStyle}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999' }}>Email</div>
                  <div style={{ fontSize: '14px', color: '#333' }}>{worker.email}</div>
                </div>
              </div>

              <div style={infoRowStyle}>
                <div style={iconContainerStyle}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999' }}>Location</div>
                  <div style={{ fontSize: '14px', color: '#333' }}>{worker.location}</div>
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {worker.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: '#f0f7ff',
                        color: '#007BFF',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={statsContainerStyle}>
                <div style={statCardStyle}>
                  <div style={statNumberStyle}>{worker.completedProjects}</div>
                  <div style={statLabelStyle}>Projects Completed</div>
                </div>
                <div style={statCardStyle}>
                  <div style={statNumberStyle}>{worker.experience}</div>
                  <div style={statLabelStyle}>Experience</div>
                </div>
                <div style={statCardStyle}>
                  <div style={statNumberStyle}>{worker.responseTime}</div>
                  <div style={statLabelStyle}>Response Time</div>
                </div>
                <div style={statCardStyle}>
                  <div style={statNumberStyle}>{worker.reviews}</div>
                  <div style={statLabelStyle}>Client Reviews</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={buttonGroupStyle}>
                <button
                  style={contactButtonStyle}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, contactButtonHoverStyle)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, contactButtonStyle)}
                >
                  Send Message
                </button>
                <button
                  style={bookButtonStyle}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, bookButtonHoverStyle)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, bookButtonStyle)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={profileInfoStyle}>
              <div style={aboutSectionStyle}>
                <div style={aboutTitleStyle}>About</div>
                <div style={aboutTextStyle}>
                  {worker.about}
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#007BFF', fontWeight: '600', cursor: 'pointer' }}>
                    Portfolio: {worker.portfolio} →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
