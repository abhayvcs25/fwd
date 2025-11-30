import { useNavigate, useLocation ,Link} from "react-router-dom";

import React, { useState, useEffect } from 'react';
import { Home, Menu, Heart, MessageSquare, User, X, HelpCircle, LogOut, Search, Bell, Star } from "lucide-react"

export default function WorkersSearch() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [workers, setWorkers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favLoadingIds, setFavLoadingIds] = useState({});

  const navigate = useNavigate(); 
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const skill = query.get("skill"); // get skill from URL

  useEffect(() => {
    if (!skill) return; // no skill selected

    console.log("Fetching workers with skill:", skill);
    fetch(`http://localhost:5000/workers/search?skill=${skill}`)
      .then(res => res.json())
       .then(data => {
      console.log("Fetched Workers:", data);  // 🔥 SHOW ALL DATA HERE
      setWorkers(data);
    })
      .catch(err => console.error(err));
  }, [skill]);

  const handleLogout = () => navigate("/");
  const handleSearchClick = () => navigate("/search");
  const handleProfileClick = (id) => {
  navigate(`/worker-detail/${id}`);
};


  // load favorites for logged in user (only if authenticated)

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
    position: 'relative',
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
    color: '#666',
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
          <div style={headerStyle}>
            <div style={titleStyle}>🔍 Search Workers</div>
            <div style={subtitleStyle}>
              {workers.length} workers available
              {favorites.length > 0 && (
                <span style={{ marginLeft: 12, color: '#007BFF', fontWeight: 600 }}>
                  • {favorites.length} favorites
                </span>
              )}
            </div>
          </div>

          <div style={gridStyle}>
            {workers.map((worker) => {
              const wid = String(worker.id);
              const isFav = favorites.some(f => String(f.workerId) === wid || (f.workerId && String(f.workerId._id || f.workerId) === wid));
              return (
              <div
                key={worker._id}
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

                {/* favorite star overlay */}
                <div style={{ position: 'absolute', right: 12, top: 12 }}>
                  <div
                    role="button"
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={async (e) => {
                      e.stopPropagation();
                      const token = localStorage.getItem('token');
                      if (!token) return navigate('/customer-auth');
                      if (favLoadingIds[wid]) return;
                      setFavLoadingIds(prev => ({ ...prev, [wid]: true }));
                      try {
                        if (!isFav) {
                          const res = await fetch('http://localhost:5000/favorite/add', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                            body: JSON.stringify({ workerId: worker.id })
                          });
                          if (!res.ok) throw new Error('Failed to add');
                          const data = await res.json();
                          setFavorites(prev => [...prev, data.favorite]);
                        } else {
                          const res = await fetch('http://localhost:5000/favorite/remove', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                            body: JSON.stringify({ workerId: worker.id })
                          });
                          if (!res.ok) throw new Error('Failed to remove');
                          setFavorites(prev => prev.filter(f => !(String(f.workerId) === wid || (f.workerId && String(f.workerId._id || f.workerId) === wid))));
                        }
                      } catch (err) {
                        console.error(err);
                      } finally {
                        setFavLoadingIds(prev => { const copy = { ...prev }; delete copy[wid]; return copy; });
                      }
                    }}
                    style={{ background: 'rgba(255,255,255,0.95)', padding: 6, borderRadius: 999, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Star size={18} color={isFav ? '#FFC107' : '#999'} fill={isFav ? '#FFC107' : 'none'} />
                  </div>
                </div>

                {/* Card Content */}
                <div key={worker._id} style={cardContentStyle}>
  
  <div style={workerNameStyle}>{worker.fullName}</div>

  <div style={skillsStyle}>
    {worker.skills?.map((skill) => (
      <div key={skill}>• {skill}</div>
    ))}
  </div>

  <div style={phoneStyle}>Gender : {worker.gender}</div>
  <div style={phoneStyle}>HourlyRate : {worker.hourlyRate}</div>

  <div style={buttonGroupStyle}>
    <button
      onClick={() => handleProfileClick(worker._id)}  
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
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}
