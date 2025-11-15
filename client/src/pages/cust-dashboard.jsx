
import { useState } from "react"
import { Home, BookOpen, Heart, MessageSquare, User, Settings, HelpCircle, LogOut, Search, Bell } from "lucide-react"
import { useNavigate, Link } from "react-router-dom";

  
export default function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate();

  const handleLogout = () => {
    // you can clear tokens here if needed
    navigate("/");
  };

  const handleSearchClick = () => {
    navigate("/search"); // <-- change to your search page route
  };
  // Mock user data
  const user = {
    name: "Abhay Pawar",
    email: "abhay.pawar@skillmatch.com",
    avatar: "AP",
  }

  // Mock summary data
  const summary = [
    { title: "Total Bookings", value: "12", icon: "📅", bgColor: "bg-blue-50" },
    { title: "Active Requests", value: "3", icon: "⚡", bgColor: "bg-amber-50" },
    { title: "Unread Messages", value: "5", icon: "💬", bgColor: "bg-purple-50" },
    { title: "Saved Favorites", value: "8", icon: "❤️", bgColor: "bg-red-50" },
  ]

  // Mock recent bookings data
  const recentBookings = [
    {
      id: 1,
      worker: "John Smith",
      service: "Web Design",
      date: "Nov 15, 2024",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      worker: "Emma Davis",
      service: "Logo Design",
      date: "Nov 14, 2024",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      worker: "Michael Chen",
      service: "Content Writing",
      date: "Nov 13, 2024",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 4,
      worker: "Lisa Johnson",
      service: "Social Media Marketing",
      date: "Nov 12, 2024",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
    },
  ]

  // Mock messages/notifications
  const notifications = [
    { id: 1, sender: "John Smith", message: "Your project is almost complete!", time: "2h ago" },
    { id: 2, sender: "Support Team", message: "We received your inquiry", time: "4h ago" },
    { id: 3, sender: "Emma Davis", message: "Can we schedule a meeting?", time: "1d ago" },
  ]

  // Sidebar menu items
  const menuItems = [
    { icon: Home, label: "Home", href: "/customer-dashboard" },
    { icon: Heart, label: "Favorites", href: "/customer-Favorites" },
    { icon: MessageSquare, label: "Messages", href: "/Messages" },
    { icon: User, label: "Profile", href: "/user-profile" },
    { icon: HelpCircle, label: "Support", href: "/about" },
  ]
 

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
              {summary.map((item, index) => (
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
              ))}
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
                        {recentBookings.map((booking) => (
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
                        ))}
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
                    {notifications.map((notification) => (
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
                    ))}
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
