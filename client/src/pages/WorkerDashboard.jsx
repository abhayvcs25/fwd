import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function WorkerDashboard (){
  const [activeNav, setActiveNav] = useState("Dashboard")

  const navItems = ["Dashboard", "My Jobs", "Earnings", "Messages", "Reviews", "Settings"]

  const upcomingJobs = [
    { id: 1, title: "Website Design", customer: "John Smith", status: "Pending" },
    { id: 2, title: "App Development", customer: "Sarah Johnson", status: "In Progress" },
    { id: 3, title: "Content Writing", customer: "Mike Davis", status: "Scheduled" },
  ]

  const recentMessages = [
    { id: 1, from: "John Smith", message: "Can you start the project tomorrow?", time: "2 hours ago" },
    { id: 2, from: "Sarah Johnson", message: "Great work on the design mockup!", time: "4 hours ago" },
  ]

  const reviews = [
    { id: 1, author: "John Smith", rating: 5, comment: "Excellent work, highly recommended!" },
    { id: 2, author: "Sarah Johnson", rating: 5, comment: "Very professional and timely delivery." },
  ]

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

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navbarTitle}>💼 WorkHub</div>
        <div style={styles.navbarRight}>
          <span style={styles.navbarIcon}>🔔</span>
          <div style={styles.navbarAvatar}>JD</div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        {navItems.map((item) => (
          <div
            key={item}
            style={{
              ...styles.navItem,
              ...(activeNav === item ? styles.navItemActive : styles.navItemInactive),
            }}
            onClick={() => setActiveNav(item)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Info Cards */}
        <div style={styles.infoCardsContainer}>
          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>💪</div>
            <div style={styles.cardLabel}>Active Jobs</div>
            <div style={styles.cardValue}>5</div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>✅</div>
            <div style={styles.cardLabel}>Completed Jobs</div>
            <div style={styles.cardValue}>42</div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>⏳</div>
            <div style={styles.cardLabel}>Pending Requests</div>
            <div style={styles.cardValue}>3</div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>💰</div>
            <div style={styles.cardLabel}>Total Earnings</div>
            <div style={styles.cardValue}>$2,450</div>
          </div>
        </div>

        {/* Upcoming Jobs */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>📋 Upcoming Jobs</div>
          {upcomingJobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <div style={styles.jobInfo}>
                <div style={styles.jobTitle}>{job.title}</div>
                <div style={styles.jobCustomer}>by {job.customer}</div>
              </div>
              <span style={{ ...styles.statusBadge, ...getStatusStyle(job.status) }}>{job.status}</span>
            </div>
          ))}
        </div>

        {/* Two Column Layout for Messages and Reviews */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* Recent Messages */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>💬 Recent Messages</div>
            {recentMessages.map((msg) => (
              <div key={msg.id} style={styles.messageCard}>
                <div style={styles.messageSender}>{msg.from}</div>
                <div style={styles.messageText}>{msg.message}</div>
                <div style={styles.messageTime}>{msg.time}</div>
              </div>
            ))}
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


