'use client';

import React, { useState } from 'react';
import { Home, BookOpen, Heart, MessageCircle, User, Settings, HelpCircle, LogOut, Search, Bell, ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const [sidebarOpen] = useState(true);
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: Home, label: 'Home', color: '#007BFF' },
    { icon: BookOpen, label: 'My Bookings', color: '#007BFF' },
    { icon: Heart, label: 'Favorites', color: '#007BFF' },
    { icon: MessageCircle, label: 'Messages', color: '#007BFF' },
    { icon: User, label: 'Profile', color: '#007BFF' },
    { icon: Settings, label: 'Settings', color: '#007BFF' },
    { icon: HelpCircle, label: 'Support', color: '#007BFF' },
  ];

  const services = [
    { name: 'Electrician', bg: '#FFC107' },
    { name: 'Plumber', bg: '#007BFF' },
    { name: 'Barber', bg: '#FFC107' },
    { name: 'Domestic Helper', bg: '#007BFF' },
    { name: 'Painter', bg: '#FFC107' },
    { name: 'Carpenter', bg: '#007BFF' },
    { name: 'AC Mechanic', bg: '#FFC107' },
    { name: 'Gardener', bg: '#007BFF' },
    { name: 'Driver', bg: '#FFC107' },
    { name: 'Cook', bg: '#007BFF' },
    { name: 'Laundry', bg: '#FFC107' },
    { name: 'Technician', bg: '#007BFF' },
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
      marginLeft: '280px',
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
      margin: '0 24px 24px 24px',
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

  return (
    <div style={styles.container}>
      <nav style={styles.sidebar}>
        <div style={styles.sidebarMenu}>
          {sidebarItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                ...styles.menuItem,
                ...{ cursor: 'pointer' },
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <item.icon size={20} color={item.color} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <button
          style={styles.logoutBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffcccc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffe6e6';
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>

      <div style={styles.mainContent}>
        <header style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ArrowLeft size={20} color="#333" cursor="pointer" onClick={() => navigate(-1) }/>
          </div>
          <div style={styles.headerIcons}>
            <Bell size={20} color="#333" cursor="pointer" />
            <User size={20} color="#333" cursor="pointer" />
            <Menu size={20} color="#333" cursor="pointer" />
          </div>
        </header>

        <div style={styles.searchContainer}>
          <div style={styles.searchBar}>
            <Search size={18} color="#007BFF" />
            <input
              type="text"
              placeholder="Search workers, services or locations…"
              style={styles.searchInput}
            />
          </div>
        </div>

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
  );
}
