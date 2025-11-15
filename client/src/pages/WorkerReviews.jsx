

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WorkerReviews() {
  // NAV STATE (Sidebar)
  const [activeNav, setActiveNav] = useState("reviews");
  const navigate = useNavigate();
  
    const handleLogout = () => {
      // you can clear tokens here if needed
      navigate("/");
    };

  // Reviews Data
  const allReviews = [
    { id: 1, author: "John Smith", rating: 5, comment: "Excellent work, highly recommended!", date: "2 weeks ago", project: "Website Design" },
    { id: 2, author: "Sarah Johnson", rating: 5, comment: "Very professional and timely delivery.", date: "1 week ago", project: "App Development" },
    { id: 3, author: "Mike Davis", rating: 4, comment: "Great quality, could be faster.", date: "3 days ago", project: "Content Writing" },
    { id: 4, author: "Emma Wilson", rating: 5, comment: "Exceeded my expectations!", date: "1 day ago", project: "UI/UX Design" },
    { id: 5, author: "Alex Chen", rating: 4, comment: "Good work overall.", date: "6 hours ago", project: "Logo Design" },
  ];

  const averageRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
  const totalReviews = allReviews.length;
  const fiveStarCount = allReviews.filter((r) => r.rating === 5).length;
  const fourStarCount = allReviews.filter((r) => r.rating === 4).length;

  // INLINE STYLES
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#F8F9FA",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    },

    // NAVBAR
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "60px",
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #E0E0E0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      zIndex: 100,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    navbarTitle: { fontSize: "20px", fontWeight: "bold", color: "#007BFF" },
    navbarRight: { display: "flex", alignItems: "center", gap: "20px" },
    navbarIcon: { fontSize: "20px", cursor: "pointer" },
    navbarAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#007BFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFF",
      fontWeight: "bold",
      cursor: "pointer",
    },

    // SIDEBAR
    sidebar: {
      position: "fixed",
      left: 0,
      top: "60px",
      width: "220px",
      height: "calc(100vh - 60px)",
      backgroundColor: "#FFFFFF",
      borderRight: "1px solid #E0E0E0",
      paddingTop: "20px",
      overflowY: "auto",
      boxShadow: "2px 0 4px rgba(0,0,0,0.05)",
    },
    navItem: {
      padding: "15px 20px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "0.3s",
      borderLeft: "4px solid transparent",
    },
    navItemActive: {
      backgroundColor: "#E7F3FF",
      borderLeftColor: "#007BFF",
      color: "#007BFF",
      fontWeight: "600",
    },
    navItemInactive: { color: "#666" },

    // MAIN CONTENT
    mainContent: {
      marginLeft: "220px",
      marginTop: "60px",
      padding: "30px",
      flex: 1,
      overflowY: "auto",
    },
    pageTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "10px",
    },
    pageSubtitle: { fontSize: "14px", color: "#999", marginBottom: "30px" },

    ratingOverview: {
      backgroundColor: "#FFF",
      padding: "30px",
      borderRadius: "8px",
      marginBottom: "30px",
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "20px",
    },

    reviewsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    },
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' , path: "/worker-dashboard"},
    { id: 'messages', label: 'Messages' , path: "/worker-messages"},
    { id: 'reviews', label: 'Reviews' , path: "/worker-reviews"},
    { id: 'Edit Profile', label: 'Edit Profile' , path: "/worker-profile-edit"},
  ];

  return (
    <div style={styles.container}>
      {/* Navbar */}
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

      {/* MAIN CONTENT */}
      <div style={styles.mainContent}>
        <div style={styles.pageTitle}>⭐ Your Reviews</div>
        <div style={styles.pageSubtitle}>Manage and view all customer reviews</div>

        {/* Rating Overview */}
        <div style={styles.ratingOverview}>
          <div>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#007BFF" }}>{averageRating}</div>
            <div style={{ color: "#FFC107", fontSize: "24px" }}>★★★★★</div>
            <p>Average Rating</p>
          </div>

          <div>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#007BFF" }}>{totalReviews}</div>
            <div style={{ fontSize: "22px" }}>📝</div>
            <p>Total Reviews</p>
          </div>

          <div>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#007BFF" }}>{fiveStarCount}</div>
            ⭐
            <p>5-Star Reviews</p>
          </div>

          <div>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#007BFF" }}>{fourStarCount}</div>
            ⭐
            <p>4-Star Reviews</p>
          </div>
        </div>

        {/* Reviews List */}
        <div style={styles.reviewsGrid}>
          {allReviews.map((review) => (
            <div key={review.id} style={{ background: "#FFF", padding: 20, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <strong>{review.author}</strong>
                <small style={{ color: "#888" }}>{review.date}</small>
              </div>

              <div style={{ color: "#FFC107", marginBottom: 8 }}>
                {"⭐".repeat(review.rating)}
              </div>

              <div style={{ background: "#E7F3FF", color: "#007BFF", display: "inline-block", padding: "5px 10px", borderRadius: 4, marginBottom: 8 }}>
                {review.project}
              </div>

              <p style={{ color: "#666" }}>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
