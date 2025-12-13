import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

export default function PendingRequests() {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("requests");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("workerId");

    navigate("/");
  };

  // ✅ REAL BOOKINGS COMING FROM DATABASE
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/worker-login");

    const workerId = localStorage.getItem("workerId");


    const loadPending = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bookings/pending/${workerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setPendingBookings(data.pending || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadPending();
  }, []);

  // ❌ You used requests.filter — but "requests" didn’t exist!!
  // ✅ Now we directly use the real pending bookings
  const pendingReqs = pendingBookings;

const handleAccept = async (bookingId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/bookings/accept/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    // 🔥 Remove instantly
    setPendingBookings(prev =>
      prev.filter(b => b.id !== bookingId)
    );

  } catch (err) {
    console.error(err);
  }
};


 const handleCancel = async (bookingId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/bookings/cancel/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log("Cancelled:", data);

    // 🔥 Remove from UI instantly
    setPendingBookings((prev) =>
      prev.filter((b) => b.id !== bookingId)
    );

  } catch (err) {
    console.error("Cancel error:", err);
  }
};



  const navItems = [
    { id: "dashboard", label: "Dashboard", path: "/worker-dashboard" },
    { id: "messages", label: "Messages", path: "/worker-messages" },
    { id: "reviews", label: "Reviews", path: "/worker-reviews" },
    { id: "Edit Profile", label: "Edit Profile", path: "/worker-profile-edit" },
    { id: "pending-requests", label: "Pending Requests", path: "/pending-requests" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[230px] bg-white border-r border-gray-200 rounded-r-xl">
        <div className="flex items-center px-4 py-6 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#007BFF] flex items-center justify-center text-white font-bold mr-3">
            D
          </div>
          <span className="text-[#007BFF] font-bold text-xl">DailyJobs</span>
        </div>

        <nav className="flex flex-col px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id);
                navigate(item.path);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg cursor-pointer transition ${
                activeNav === item.id
                  ? "bg-[#007BFF] text-white font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-[90%] mx-auto block bg-[#FFC107] text-white font-bold px-4 py-3 rounded-lg text-center shadow hover:opacity-90 transition mb-4"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Top Navbar */}
      <nav className="fixed top-0 left-[230px] right-0 h-[70px] bg-white shadow-sm flex items-center justify-between px-6 z-40">
        <div className="flex-1"></div>
        <div className="flex items-center gap-6">
          <button className="text-xl">🔔</button>
          <div className="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold">
            JD
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-[230px] w-full bg-gray-50 min-h-screen pt-24 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pending Requests
            </h1>
            <p className="text-gray-600">
              You have {pendingReqs.length} pending job request
              {pendingReqs.length !== 1 ? "s" : ""}
            </p>
          </div>

          {pendingReqs.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <p className="text-gray-500 text-lg">
                No pending requests at this time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReqs.map((request) => (
                <div
                  key={request.id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {request.jobTitle}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        From: {request.clientName}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">
                      Pending
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Date & Time
                      </p>
                      <p className="text-gray-900">{request.date}</p>
                      <p className="text-gray-700">{request.time}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Location
                      </p>
                      <p className="text-gray-900">{request.location}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Rate
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {request.rate}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Job Type
                      </p>
                      <p className="text-gray-900">{request.jobTitle}</p>
                    </div>
                  </div>

                  <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium mb-2">
                      Description
                    </p>
                    <p className="text-gray-700">{request.description}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="flex-1 bg-[#007BFF] text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      Accept Request
                    </button>
                    <button
                      onClick={() => handleCancel(request.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                    >
                      Cancel Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
