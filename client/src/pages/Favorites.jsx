import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Home,Menu, Heart, MessageSquare, User, HelpCircle, LogOut, Bell, X, Search,  Star } from 'lucide-react';
export default function Favorites() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleLogout = () => {
      // you can clear tokens here if needed
      localStorage.removeItem("token");
      localStorage.removeItem("customerId");
      localStorage.removeItem("fullName");
    localStorage.removeItem("email");
      navigate("/");
    };
     const handleSearchClick = () => {
    navigate("/search"); // <-- change to your search page route
  };
  const fetchFavorites = async () => {
    try {
      const res = await fetch('http://localhost:5000/favorite', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.favorites || []);
        console.log("Fetched favorites:", data.favorites);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleRemoveFavorite = async (workerId) => {
    try {
      const res = await fetch(`http://localhost:5000/favorite/${workerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        // Update UI by removing the worker from state
        setFavorites(prev => prev.filter(worker => worker._id !== workerId));
      } else {
        console.error('Failed to remove favorite');
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    ...cardStyle,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-4px)',
  };

  const cardHeaderStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '15px',
    justifyContent: 'space-between',
  };

  const workerInfoStyle = {
    display: 'flex',
    gap: '12px',
    flex: 1,
  };

  const workerAvatarStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#007BFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const workerNameStyle = {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
  };

  const serviceNameStyle = {
    fontSize: '12px',
    color: '#666',
  };

  const favoriteButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#FFC107',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  };

  const starStyle = {
    color: '#FFC107',
    display: 'flex',
    alignItems: 'center',
  };

  const ratingTextStyle = {
    fontSize: '13px',
    color: '#333',
    fontWeight: '600',
  };

  const reviewsStyle = {
    fontSize: '12px',
    color: '#666',
  };

  const priceStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: '12px',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
  };

  const buttonStyle = {
    flex: 1,
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const contactButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007BFF',
    color: '#fff',
  };

  const removeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#fee',
    color: '#e74c3c',
    border: '1px solid #e74c3c',
  };

  const emptyStateStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    color: '#666',
  };

  const emptyIconStyle = {
    fontSize: '64px',
    marginBottom: '20px',
    opacity: 0.5,
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
              { localStorage.getItem("fullName") || "Guest User"}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {localStorage.getItem("email") || "user@example.com"}
            </div>
                </div>
                <div style={avatarStyle}>
            {(localStorage.getItem("fullName") || "G")
              .split(' ')
              .map(word => word[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
                </div>
              </div>
            </div>
        </div>

        {/* Content Area */}
        <div style={contentAreaStyle}>
          <div style={headerStyle}>
            <div style={titleStyle}>❤️ My Favorites</div>
            <div style={subtitleStyle}>
              {favorites.length} favorite {favorites.length === 1 ? 'worker' : 'workers'}
            </div>
          </div>

          {favorites.length > 0 ? (
            <div style={gridStyle}>
              {favorites.map((worker) => (
                <div
                  key={worker._id}
                  style={cardStyle}
                  onClick={() => navigate(`/worker-detail/${worker._id}`)}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
                >
                  <div style={cardHeaderStyle}>
                    <div style={workerInfoStyle}>
                      <div style={workerAvatarStyle}>
                        {worker.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <div style={workerNameStyle}>{worker.fullName}</div>
                        <div style={serviceNameStyle}>{worker.skills[0] || 'Service'}</div>
                      </div>
                    </div>
                    <button
                      style={favoriteButtonStyle}
                      onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(worker._id); }}
                      title="Remove from favorites"
                    >
                      <Heart size={20} fill="#FFC107" />
                    </button>
                  </div>

                  <div style={ratingStyle}>
                    <div style={starStyle}>
                      <Star size={16} fill="#FFC107" />
                      <span style={ratingTextStyle}>{worker.stats.ratingAverage.toFixed(1)}</span>
                    </div>
                    <div style={reviewsStyle}>({worker.stats.ratingCount} reviews)</div>
                  </div>

                  <div style={priceStyle}>${worker.hourlyRate}/hour</div>

                  <div style={buttonGroupStyle}>
                    <button 
                      style={contactButtonStyle}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/Messages?workerId=${worker._id}&workerName=${encodeURIComponent(worker?.fullName || '')}`
                        );
                      }}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, {
                          ...contactButtonStyle,
                          backgroundColor: '#0056b3',
                        });
                      }}
                      onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, contactButtonStyle);
                      }}
                    >
                      Contact
                    </button>
                    <button
                      style={removeButtonStyle}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, {
                          ...removeButtonStyle,
                          backgroundColor: '#f8d7da',
                        });
                      }}
                      onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, removeButtonStyle);
                      }}
                      onClick={() => handleRemoveFavorite(worker._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>❤️</div>
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
                No favorites yet
              </div>
              <div>Start adding workers to your favorites list!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
