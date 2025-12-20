import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function WorkerDashboard (){
  const [activeNav, setActiveNav] = useState("dashboard")
  const [summary, setSummary] = useState({})
  const [upcomingJobs, setUpcomingJobs] = useState([])
  const [recentMessages, setRecentMessages] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, jobsRes, messagesRes, reviewsRes] = await Promise.all([
        fetch('http://localhost:5000/api/worker-dashboard/summary', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:5000/api/worker-dashboard/upcoming-jobs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:5000/api/worker-dashboard/recent-messages', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:5000/api/worker-dashboard/reviews', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      if (summaryRes.ok) {
        const data = await summaryRes.json();
        setSummary(data);
      }

      if (jobsRes.ok) {
        const data = await jobsRes.json();
        setUpcomingJobs(data.jobs);
      }

      if (messagesRes.ok) {
        const data = await messagesRes.json();
        setRecentMessages(data.messages);
      }

      if (reviewsRes.ok) {
        const data = await reviewsRes.json();
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching worker dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  
    const handleLogout = () => {
      // you can clear tokens here if needed
      
    localStorage.removeItem("token");
    localStorage.removeItem("workerId");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");
      navigate("/");
    };

    const styles = {
    container: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#F8F9FA",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
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
      paddingLeft: "20px",
      paddingRight: "20px",
      zIndex: 100,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    navbarTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#007BFF",
    },
    navbarRight: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    navbarIcon: {
      fontSize: "20px",
      cursor: "pointer",
    },
    navbarAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#007BFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
      fontWeight: "bold",
      cursor: "pointer",
    },
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
      transition: "all 0.3s ease",
      borderLeft: "4px solid transparent",
    },
    navItemActive: {
      backgroundColor: "#E7F3FF",
      borderLeftColor: "#007BFF",
      color: "#007BFF",
      fontWeight: "600",
    },
    navItemInactive: {
      color: "#666",
    },
    mainContent: {
      marginLeft: "220px",
      marginTop: "60px",
      padding: "30px",
      flex: 1,
      overflowY: "auto",
    },
    infoCardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    },
    infoCard: {
      backgroundColor: "#FFFFFF",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
    },
    infoCardHover: {
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    },
    cardValue: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#007BFF",
      marginTop: "10px",
    },
    cardLabel: {
      fontSize: "12px",
      color: "#999",
      textTransform: "uppercase",
      fontWeight: "600",
    },
    cardIcon: {
      fontSize: "28px",
      marginBottom: "10px",
    },
    section: {
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "15px",
    },
    jobCard: {
      backgroundColor: "#FFFFFF",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
    },
    jobCardHover: {
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    },
    jobInfo: {
      flex: 1,
    },
    jobTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "5px",
    },
    jobCustomer: {
      fontSize: "13px",
      color: "#999",
    },
    statusBadge: {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
    },
    statusPending: {
      backgroundColor: "#FFE5B4",
      color: "#8B6914",
    },
    statusInProgress: {
      backgroundColor: "#B4E7FF",
      color: "#0047AB",
    },
    statusScheduled: {
      backgroundColor: "#D4F1D4",
      color: "#2D5016",
    },
    messageCard: {
      backgroundColor: "#FFFFFF",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
    messageSender: {
      fontWeight: "600",
      color: "#333",
      fontSize: "14px",
      marginBottom: "5px",
    },
    messageText: {
      color: "#666",
      fontSize: "13px",
      marginBottom: "5px",
    },
    messageTime: {
      color: "#999",
      fontSize: "12px",
    },
    reviewCard: {
      backgroundColor: "#FFFFFF",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
    reviewAuthor: {
      fontWeight: "600",
      color: "#333",
      fontSize: "14px",
      marginBottom: "5px",
    },
    reviewRating: {
      color: "#FFC107",
      fontSize: "14px",
      marginBottom: "5px",
    },
    reviewComment: {
      color: "#666",
      fontSize: "13px",
    },
    ratingOverview: {
      backgroundColor: "#FFFFFF",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "15px",
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
    averageRating: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#007BFF",
    },
    ratingStars: {
      color: "#FFC107",
      fontSize: "18px",
      marginTop: "5px",
    },
    "@media (max-width: 768px)": {
      sidebar: {
        width: "70px",
      },
      mainContent: {
        marginLeft: "70px",
        padding: "15px",
      },
      navItem: {
        padding: "15px 8px",
        fontSize: "12px",
        textAlign: "center",
      },
      infoCardsContainer: {
        gridTemplateColumns: "1fr",
      },
    },
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return styles.statusPending
      case "In Progress":
        return styles.statusInProgress
      case "Scheduled":
        return styles.statusScheduled
      default:
        return styles.statusPending
    }
  }
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' , path: "/worker-dashboard"},
    { id: 'messages', label: 'Messages' , path: "/worker-messages"},
    { id: 'reviews', label: 'Reviews' , path: "/worker-reviews"},
    { id: 'Edit Profile', label: 'Edit Profile' , path: "/worker-profile-edit"},
    {id: 'pending-requests', label: 'Pending Requests' , path: "/pending-requests"}
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
          <button onClick={handleLogout} className="w-[90%] mx-auto block bg-[#FFC107] text-white font-bold px-4 py-3 rounded-lg text-center shadow hover:opacity-90 transition mb-4">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <nav className="fixed top-0 left-[230px] right-0 h-[70px] bg-white shadow-sm flex items-center justify-between px-6 z-40">
        <div className="flex-1"></div>
        <div className="flex items-center gap-6">
          <button className="text-xl">🔔</button>
          <div className="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold">
            JD
          </div>
        </div>
      </nav>
        {/* Info Cards */}
        <div style={styles.infoCardsContainer}>
          {loading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} style={styles.infoCard}>
                <div style={{...styles.cardIcon, backgroundColor: '#f0f0f0'}}></div>
                <div style={{...styles.cardLabel, backgroundColor: '#f0f0f0', height: '12px'}}></div>
                <div style={{...styles.cardValue, backgroundColor: '#f0f0f0', height: '28px'}}></div>
              </div>
            ))
          ) : (
            <>
              <div style={styles.infoCard}>
                <div style={styles.cardIcon}>💪</div>
                <div style={styles.cardLabel}>Active Jobs</div>
                <div style={styles.cardValue}>{summary.activeJobs || 0}</div>
              </div>
              <div style={styles.infoCard}>
                <div style={styles.cardIcon}>✅</div>
                <div style={styles.cardLabel}>Completed Jobs</div>
                <div style={styles.cardValue}>{summary.completedJobs || 0}</div>
              </div>
              <div style={styles.infoCard}>
                <div style={styles.cardIcon}>⏳</div>
                <div style={styles.cardLabel}>Pending Requests</div>
                <div style={styles.cardValue}>{summary.pendingRequests || 0}</div>
              </div>
              <div style={styles.infoCard}>
                <div style={styles.cardIcon}>💰</div>
                <div style={styles.cardLabel}>Total Earnings</div>
                <div style={styles.cardValue}>${summary.totalEarnings || 0}</div>
              </div>
            </>
          )}
        </div>

        {/* Upcoming Jobs */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>📋 Upcoming Jobs</div>
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} style={styles.jobCard}>
                <div style={styles.jobInfo}>
                  <div style={{...styles.jobTitle, backgroundColor: '#f0f0f0', height: '16px'}}></div>
                  <div style={{...styles.jobCustomer, backgroundColor: '#f0f0f0', height: '13px'}}></div>
                </div>
                <div style={{...styles.statusBadge, backgroundColor: '#f0f0f0', width: '80px', height: '24px'}}></div>
              </div>
            ))
          ) : upcomingJobs.length > 0 ? (
            upcomingJobs.map((job) => (
              <div key={job.id} style={styles.jobCard}>
                <div style={styles.jobInfo}>
                  <div style={styles.jobTitle}>{job.title}</div>
                  <div style={styles.jobCustomer}>by {job.customer}</div>
                </div>
                <span style={{ ...styles.statusBadge, ...getStatusStyle(job.status) }}>{job.status}</span>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
              No upcoming jobs.
            </div>
          )}
        </div>

        {/* Two Column Layout for Messages and Reviews */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* Recent Messages */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>💬 Recent Messages</div>
            {loading ? (
              Array(2).fill(0).map((_, index) => (
                <div key={index} style={styles.messageCard}>
                  <div style={{...styles.messageSender, backgroundColor: '#f0f0f0', height: '14px'}}></div>
                  <div style={{...styles.messageText, backgroundColor: '#f0f0f0', height: '13px'}}></div>
                  <div style={{...styles.messageTime, backgroundColor: '#f0f0f0', height: '12px'}}></div>
                </div>
              ))
            ) : recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} style={styles.messageCard}>
                  <div style={styles.messageSender}>{msg.from}</div>
                  <div style={styles.messageText}>{msg.message}</div>
                  <div style={styles.messageTime}>{msg.time}</div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                No recent messages.
              </div>
            )}
          </div>

          {/* Ratings & Reviews */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>⭐ Ratings & Reviews</div>
            <div style={styles.ratingOverview}>
              <div style={styles.averageRating}>4.9</div>
              <div style={styles.ratingStars}>★★★★★</div>
            </div>
            {reviews.map((review) => (
              <div key={review.id} style={styles.reviewCard}>
                <div style={styles.reviewAuthor}>{review.author}</div>
                <div style={styles.reviewRating}>{"⭐".repeat(review.rating)}</div>
                <div style={styles.reviewComment}>{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


