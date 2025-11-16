'use client';

import React, { useState } from 'react';
import { Home, BookOpen, Heart, MessageSquare, User, Settings, HelpCircle, LogOut, Search, Bell, ArrowLeft, Menu } from 'lucide-react';
import { useNavigate,Link } from "react-router-dom";


export default function SearchPage() {
  const [sidebarOpen] = useState(true);
   const navigate = useNavigate();
  
    const handleLogout = () => {
      // you can clear tokens here if needed
      navigate("/");
    };

  const menuItems = [
    { icon: Home, label: "Home", href: "/customer-dashboard" },
    { icon: Heart, label: "Favorites", href: "/customer-Favorites" },
    { icon: MessageSquare, label: "Messages", href: "/Messages" },
    { icon: User, label: "Profile", href: "/user-profile" },
    { icon: HelpCircle, label: "Support", href: "/about" },
  ]

  const services = [
  { name: 'Electrician', bg: '#FFC107', path: '/workers-search' },
  { name: 'Plumber', bg: '#007BFF', path: '/workers-search' },
  { name: 'Barber', bg: '#FFC107', path: '/workers-search' },
  { name: 'Domestic Helper', bg: '#007BFF', path: '/workers-search' },
  { name: 'Painter', bg: '#FFC107', path: '/workers-search' },
  { name: 'Carpenter', bg: '#007BFF', path: '/workers-search' },
  { name: 'AC Mechanic', bg: '#FFC107', path: '/workers-search' },
  { name: 'Gardener', bg: '#007BFF', path: '/workers-search' },
  { name: 'Driver', bg: '#FFC107', path: '/workers-search' },
  { name: 'Cook', bg: '#007BFF', path: '/workers-search' },
  { name: 'Laundry', bg: '#FFC107', path: '/workers-search' },
  { name: 'Technician', bg: '#007BFF', path: '/workers-search' },
];

  const popularSearches = [
    'Electrician near me',
    'AC Repair',
    'Home Cleaning',
    'Plumbing',
  ];

  const topRated = [
    { name: 'John Electrician', rating: '4.9' },
    { name: 'Sarah Plumber', rating: '4.8' },
    { name: 'Mike Carpenter', rating: '4.7' },
  ];

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f5f7fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    sidebar: {
      width: '280px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      padding: '24px 16px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      zIndex: 1000,
    },
    sidebarMenu: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      color: '#333',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      backgroundColor: 'transparent',
    },
    menuItemHover: {
      backgroundColor: '#f0f0f0',
    },
    logoutBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      color: '#ff4444',
      fontSize: '14px',
      fontWeight: '600',
      backgroundColor: '#ffe6e6',
      marginTop: 'auto',
      border: 'none',
      transition: 'all 0.3s ease',
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    header: {
      backgroundColor: '#ffffff',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      borderRadius: '0 0 12px 12px',
      gap: '16px',
    },
    headerIcons: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
    },
    searchContainer: {
      padding: '24px',
      paddingTop: '32px',
      paddingBottom: '16px',
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      backgroundColor: '#ffffff',
      border: '2px solid #007BFF',
      borderRadius: '50px',
      boxShadow: '0 4px 12px rgba(0, 123, 255, 0.1)',
      fontSize: '14px',
      width: '100%',
      maxWidth: '500px',
    },
    searchInput: {
      border: 'none',
      outline: 'none',
      fontSize: '14px',
      flex: 1,
      backgroundColor: 'transparent',
      color: '#333',
    },
    footerSection: {
      padding: '16px 24px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      margin: '24px 24px 24px 24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: '700',
      color: '#666',
      textTransform: 'uppercase',
      marginBottom: '12px',
      letterSpacing: '0.5px',
    },
    chips: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '16px',
    },
    chip: {
      padding: '8px 14px',
      backgroundColor: '#f0f0f0',
      border: 'none',
      borderRadius: '20px',
      fontSize: '13px',
      color: '#333',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    topRatedCards: {
      display: 'flex',
      gap: '12px',
      overflowX: 'auto',
      paddingBottom: '8px',
    },
    card: {
      minWidth: '140px',
      padding: '12px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      fontSize: '13px',
      color: '#333',
    },
    serviceGrid: {
      padding: '24px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '24px',
    },
    serviceItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    serviceCircle: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '32px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease',
      fontWeight: 'bold',
    },
    serviceLabel: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
    },
    pageFooter: {
      backgroundColor: '#f0f2f5',
      padding: '24px',
      textAlign: 'center',
      borderTop: '1px solid #e0e0e0',
      fontSize: '13px',
      color: '#666',
      marginTop: 'auto',
    },
    pageFooterLink: {
      color: '#007BFF',
      textDecoration: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      marginLeft: '8px',
    },
  };
const handleSearchClick = () => {
    navigate("/search"); // <-- change to your search page route
  };
  const user = {
    name: "Abhay Pawar",
    email: "abhay.pawar@skillmatch.com",
    avatar: "AP",
  }
  return (
    <div style={styles.container}>
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

      <div style={styles.mainContent}>
        <div className="flex-1 flex flex-col overflow-hidden">
        {/* NAVBAR */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            {/* Left: Search Bar */}
            <div className="flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

        <input
          type="text"
          placeholder="Search services, workers..."
          onClick={handleSearchClick}   // ⭐ click triggers navigation
          readOnly                    // ⭐ prevents typing
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent text-sm cursor-pointer"
        />
      </div>
    </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-6 ml-8">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-shadow">
                  {user.avatar}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div style={styles.footerSection}>
          <div style={styles.sectionTitle}>Popular Searches</div>
          <div style={styles.chips}>
            {popularSearches.map((search, idx) => (
              <button key={idx} style={styles.chip}>
                {search}
              </button>
            ))}
          </div>

          <div style={{...styles.sectionTitle, marginTop: '16px'}}>
            Top Rated Near You
          </div>
          <div style={styles.topRatedCards}>
            {topRated.map((worker, idx) => (
              <div key={idx} style={styles.card}>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {worker.name}
                </div>
                <div style={{ color: '#FFC107', fontSize: '12px' }}>
                  ⭐ {worker.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.serviceGrid}>
          {services.map((service, idx) => (
             <Link
    key={idx}
    to={service.path}
    style={{ textDecoration: "none" }}
  >
            <div
              key={idx}
              style={styles.serviceItem}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('[data-circle]').style.transform =
                  'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('[data-circle]').style.transform =
                  'scale(1)';
              }}
            >
              <div
                data-circle
                style={{
                  ...styles.serviceCircle,
                  backgroundColor: service.bg,
                }}
              >
                {idx % 2 === 0 ? '⚡' : '🔧'}
              </div>
              <div style={styles.serviceLabel}>{service.name}</div>
            </div>
             </Link>
          ))}
         
        </div>

        <footer style={styles.pageFooter}>
          © SkillMatch
          <a style={styles.pageFooterLink} href="#help">
            Help & Support
          </a>
        </footer>
      </div>
    </div>
  </div>
  );
}
