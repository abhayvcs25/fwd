
import React, { useState, useEffect } from "react"
import { Home, X, Heart, MessageSquare, User, Menu, HelpCircle, LogOut, Search, Bell } from "lucide-react"
import { useNavigate, Link } from "react-router-dom";

  
export default function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [summary, setSummary] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, pendingBookingsRes, bookingsRes, messagesRes] = await Promise.all([
        fetch('http://localhost:5000/api/dashboard/summary', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:5000/api/dashboard/pending-bookings-count', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:5000/api/dashboard/recent-bookings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:5000/api/dashboard/messages', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        if (pendingBookingsRes.ok) {
          const pendingData = await pendingBookingsRes.json();
          setSummary([
            { title: "Total Bookings", value: summaryData.totalBookings, icon: "📅", bgColor: "bg-blue-50" },
            { title: "Pending Bookings", value: pendingData.count, icon: "⚡", bgColor: "bg-amber-50" },
            { title: "Messages", value: summaryData.totalMessages, icon: "💬", bgColor: "bg-purple-50" },
            { title: "Saved Favorites", value: summaryData.totalFavorites, icon: "❤️", bgColor: "bg-red-50" },
          ]);
        }
      }

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setRecentBookings(bookingsData.bookings.map((b, index) => ({
          id: index + 1,
          worker: b.workerName,
          service: b.serviceName,
          date: b.bookingDate,
          status: b.status,
          statusColor: getStatusColor(b.status)
        })));
      }

      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setNotifications(messagesData.messages.map((m, index) => ({
          id: index + 1,
          sender: m.senderName,
          message: m.lastMessageText,
          time: new Date(m.timestamp).toLocaleString()
        })));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

  const user = {
    name: localStorage.getItem("fullName") || "Guest User",
    email: localStorage.getItem("email") || "user@example.com",
    avatar: (localStorage.getItem("fullName") || "G").split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
  }

  // Sidebar menu items
  const menuItems = [
    { icon: Home, label: "Home", href: "/customer-dashboard" },
    { icon: Heart, label: "Favorites", href: "/customer-Favorites" },
    { icon: MessageSquare, label: "Messages", href: "/Messages" },
    { icon: User, label: "Profile", href: "/user-profile" },
    { icon: HelpCircle, label: "Support", href: "/about" },
  ]
 
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

  return (
    <div className="flex h-screen bg-gray-50">
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

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* NAVBAR */}
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
        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name.split(" ")[0]}! 👋</h1>
              <p className="text-gray-600 mt-2">Here's what's happening with your SkillMatch account today.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {loading ? (
                Array(4).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-12"></div>
                      </div>
                      <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))
              ) : (
                summary.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{item.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{item.value}</p>
                      </div>
                      <div className="text-3xl">{item.icon}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Bookings Table */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Worker
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Service
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          Array(3).fill(0).map((_, index) => (
                            <tr key={index} className="border-b border-gray-200">
                              <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                              <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                              <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                              <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                            </tr>
                          ))
                        ) : recentBookings.length > 0 ? (
                          recentBookings.map((booking) => (
                            <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.worker}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{booking.service}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${booking.statusColor}`}
                                >
                                  {booking.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                              No recent bookings found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-4 border-t border-gray-200">
                    <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                      View All Bookings →
                    </a>
                  </div>
                </div>
              </div>

              {/* Messages & Notifications Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">Messages & Alerts</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="divide-y divide-gray-200">
                    {loading ? (
                      Array(3).fill(0).map((_, index) => (
                        <div key={index} className="px-6 py-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-48"></div>
                            </div>
                            <div className="h-3 bg-gray-200 rounded w-12 ml-2"></div>
                          </div>
                        </div>
                      ))
                    ) : notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-gray-900">{notification.sender}</p>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                            </div>
                            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{notification.time}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-6 py-8 text-center text-gray-500">
                        No messages yet.
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <a
                    href="#"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    View All Messages
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Need help?</h3>
                  <p className="text-gray-700 mt-1">Check out our support resources or contact our team</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-300">
                    Documentation
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
