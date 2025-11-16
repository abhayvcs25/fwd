
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from 'react';
import { Home, Menu, Heart, MessageSquare, User, X, HelpCircle, LogOut, Search, Bell } from "lucide-react"
export default function WorkersSearch() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 
  const handleLogout = () => {
      // you can clear tokens here if needed
      navigate("/");
    };
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: 'John Smith',
      skills: ['Web Design', 'UI/UX', 'Figma'],
      phone: '+1-234-567-8901',
      image: '/professional-man-1.jpg',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      skills: ['Logo Design', 'Branding'],
      phone: '+1-234-567-8902',
      image: '/professional-woman-1.jpg',
    },
    {
      id: 3,
      name: 'Mike Davis',
      skills: ['Content Writing', 'Copywriting', 'SEO'],
      phone: '+1-234-567-8903',
      image: '/professional-man-2.png',
    },
    {
      id: 4,
      name: 'Emma Wilson',
      skills: ['Social Media Marketing', 'Analytics'],
      phone: '+1-234-567-8904',
      image: '/professional-woman-2.png',
    },
    {
      id: 5,
      name: 'Alex Chen',
      skills: ['Mobile App Dev', 'React Native', 'Backend'],
      phone: '+1-234-567-8905',
      image: '/professional-man-3.jpg',
    },
    {
      id: 6,
      name: 'Lisa Brown',
      skills: ['Graphic Design', 'Illustration'],
      phone: '+1-234-567-8906',
      image: '/professional-woman-3.png',
    },
    {
      id: 7,
      name: 'David Martinez',
      skills: ['Video Editing', 'Motion Graphics', 'Adobe Suite'],
      phone: '+1-234-567-8907',
      image: '/professional-man-4.jpg',
    },
    {
      id: 8,
      name: 'Jessica Lee',
      skills: ['Photography', 'Photo Editing', 'Lightroom'],
      phone: '+1-234-567-8908',
      image: '/professional-woman-4.jpg',
    },
    {
      id: 9,
      name: 'Robert Taylor',
      skills: ['Full Stack Dev', 'Database Design'],
      phone: '+1-234-567-8909',
      image: '/professional-man-5.jpg',
    },
  ]);

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

  const headerStyle = {
    marginBottom: '30px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: '#666',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  };

  const cardHoverStyle = {
    ...cardStyle,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-4px)',
  };

  const workerImageStyle = {
    width: '100%',
    height: '200px',
    backgroundColor: '#e0e0e0',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const cardContentStyle = {
    padding: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const workerNameStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  };

  const skillsStyle = {
    fontSize: '12px',
    color: '#666',
    marginBottom: '10px',
    lineHeight: '1.4',
  };

  const phoneStyle = {
    fontSize: '12px',
    color: '#007BFF',
    fontWeight: '600',
    marginBottom: '12px',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '8px',
    marginTop: 'auto',
  };

  const profileButtonStyle = {
    flex: 1,
    padding: '10px',
    border: '1px solid #007BFF',
    backgroundColor: '#ffffff',
    color: '#007BFF',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const profileButtonHoverStyle = {
    ...profileButtonStyle,
    backgroundColor: '#f0f7ff',
  };

  const contactButtonStyle = {
    flex: 1,
    padding: '10px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const contactButtonHoverStyle = {
    ...contactButtonStyle,
    backgroundColor: '#0056b3',
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
            <div style={searchContainerStyle}>
              <Search size={18} color="#666" />
              <input
                type="text"
                placeholder="Search services, workers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          <div style={headerStyle}>
            <div style={titleStyle}>🔍 Search Workers</div>
            <div style={subtitleStyle}>
              {workers.length} workers available
            </div>
          </div>

          <div style={gridStyle}>
            {workers.map((worker) => (
              <div
                key={worker.id}
                style={cardStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
              >
                <img
                  src={worker.image}
                  alt={worker.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    objectPosition: 'top', 
                    display: 'block',
                  }}
                />

                {/* Card Content */}
                <div style={cardContentStyle}>
                  <div style={workerNameStyle}>{worker.name}</div>
                  
                  <div style={skillsStyle}>
                    {worker.skills.map((skill, idx) => (
                      <div key={idx}>• {skill}</div>
                    ))}
                  </div>

                  <div style={phoneStyle}>{worker.phone}</div>

                  <div style={buttonGroupStyle}>
                    <button
                      style={profileButtonStyle}
                      onMouseEnter={(e) => Object.assign(e.currentTarget.style, profileButtonHoverStyle)}
                      onMouseLeave={(e) => Object.assign(e.currentTarget.style, profileButtonStyle)}
                    >
                      Profile
                    </button>
                    <button
                      style={contactButtonStyle}
                      onMouseEnter={(e) => Object.assign(e.currentTarget.style, contactButtonHoverStyle)}
                      onMouseLeave={(e) => Object.assign(e.currentTarget.style, contactButtonStyle)}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
