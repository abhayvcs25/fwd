import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Home,Menu, Heart, MessageSquare, User, HelpCircle, LogOut, Bell, X, Search, Send } from 'lucide-react';

export default function WorkerMessages() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState(0);
  const [messageInput, setMessageInput] = useState('');
  const [activeNav, setActiveNav] = useState('messages');
  const navigate = useNavigate(); 
  const handleLogout = () => {
      // you can clear tokens here if needed
      navigate("/");
    };
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'John Smith',
      avatar: 'JS',
      lastMessage: 'Thanks for your help!',
      time: '2h ago',
      unread: 2,
      messages: [
        { id: 1, sender: 'John Smith', text: 'Hi, I need your help with the project', time: '10:30 AM', isOwn: false },
        { id: 2, sender: 'You', text: 'Sure, what do you need?', time: '10:32 AM', isOwn: true },
        { id: 3, sender: 'John Smith', text: 'Thanks for your help!', time: '10:35 AM', isOwn: false },
      ],
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      lastMessage: 'Let me know about the schedule',
      time: '4h ago',
      unread: 1,
      messages: [
        { id: 1, sender: 'Sarah Johnson', text: 'Are you available next week?', time: '9:00 AM', isOwn: false },
        { id: 2, sender: 'You', text: 'Yes, I am available', time: '9:05 AM', isOwn: true },
        { id: 3, sender: 'Sarah Johnson', text: 'Let me know about the schedule', time: '9:10 AM', isOwn: false },
      ],
    },
    {
      id: 3,
      name: 'Mike Davis',
      avatar: 'MD',
      lastMessage: 'Looking forward to it',
      time: '1d ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'Mike Davis', text: 'Can we reschedule?', time: 'yesterday', isOwn: false },
        { id: 2, sender: 'You', text: 'Sure, what time works for you?', time: 'yesterday', isOwn: true },
        { id: 3, sender: 'Mike Davis', text: 'Looking forward to it', time: 'yesterday', isOwn: false },
      ],
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar: 'EW',
      lastMessage: 'Perfect! See you then',
      time: '2d ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'Emma Wilson', text: 'Is the booking confirmed?', time: '2 days ago', isOwn: false },
        { id: 2, sender: 'You', text: 'Yes, all set', time: '2 days ago', isOwn: true },
        { id: 3, sender: 'Emma Wilson', text: 'Perfect! See you then', time: '2 days ago', isOwn: false },
      ],
    },
  ]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const updatedChats = [...chats];
      updatedChats[selectedChat].messages.push({
        id: updatedChats[selectedChat].messages.length + 1,
        sender: 'You',
        text: messageInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      });
      setChats(updatedChats);
      setMessageInput('');
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

  const messagesContainerStyle = {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  };

  const chatListStyle = {
    width: '300px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e0e0e0',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const chatItemStyle = (isSelected) => ({
    padding: '12px 15px',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#f0f7ff' : '#ffffff',
    borderLeft: isSelected ? '4px solid #007BFF' : '4px solid transparent',
    transition: 'all 0.2s ease',
  });

  const chatNameStyle = {
    fontWeight: '600',
    color: '#333',
    fontSize: '14px',
    marginBottom: '4px',
  };

  const chatMessageStyle = {
    fontSize: '13px',
    color: '#666',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const unreadBadgeStyle = {
    backgroundColor: '#FFC107',
    color: '#000',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: 'auto',
  };

  const chatWindowStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  };

  const chatHeaderStyle = {
    padding: '15px 20px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const messagesAreaStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const messageStyle = (isOwn) => ({
    display: 'flex',
    justifyContent: isOwn ? 'flex-end' : 'flex-start',
    marginBottom: '8px',
  });

  const messageBubbleStyle = (isOwn) => ({
    maxWidth: '60%',
    padding: '10px 15px',
    borderRadius: '12px',
    backgroundColor: isOwn ? '#007BFF' : '#f0f0f0',
    color: isOwn ? '#fff' : '#333',
    wordWrap: 'break-word',
    fontSize: '13px',
  });

  const messageTimeStyle = {
    fontSize: '11px',
    color: '#999',
    marginTop: '4px',
    textAlign: 'center',
  };

  const inputContainerStyle = {
    padding: '15px 20px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
  };

  const inputFieldStyle = {
    flex: 1,
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'inherit',
    resize: 'none',
    maxHeight: '100px',
  };

  const sendButtonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  };

     const navItems = [
    { id: 'dashboard', label: 'Dashboard' , path: "/worker-dashboard"},
    { id: 'messages', label: 'Messages' , path: "/worker-messages"},
    { id: 'reviews', label: 'Reviews' , path: "/worker-reviews"},
    { id: 'Edit Profile', label: 'Edit Profile' , path: "/worker-profile-edit"},
  ];

  return (
    <div style={containerStyle}>
       {/* SIDEBAR */}
      <aside className="h-screen w-[230px] bg-white border-r border-gray-200 rounded-r-xl flex flex-col">
  
  {/* Logo Row */}
  <div className="flex items-center px-4 py-6 border-b border-gray-200">
    <div className="w-8 h-8 rounded-full bg-[#007BFF] flex items-center justify-center text-white font-bold mr-3">
      D
    </div>
    <span className="text-[#007BFF] font-bold text-xl">DailyJobs</span>
  </div>

  {/* Navigation Items */}
  <nav className="flex flex-col px-4 py-6 space-y-2 flex-1">
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

  {/* Logout Button */}
  <div className="p-4">
    <button onClick={handleLogout} className="w-[90%] mx-auto block bg-[#FFC107] text-white font-bold px-4 py-3 rounded-lg text-center shadow hover:opacity-90 transition mb-4">
      Logout
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
            <div style={searchContainerStyle}>
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

        {/* Messages Area */}
        <div style={messagesContainerStyle}>
          {/* Chat List */}
          <div style={chatListStyle}>
            <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', fontWeight: '600', color: '#333' }}>
              Messages
            </div>
            {chats.map((chat, index) => (
              <div
                key={chat.id}
                style={chatItemStyle(selectedChat === index)}
                onClick={() => setSelectedChat(index)}
                onMouseEnter={(e) => {
                  if (selectedChat !== index) {
                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedChat !== index) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#007BFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      flexShrink: 0,
                    }}
                  >
                    {chat.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                      <div style={chatNameStyle}>{chat.name}</div>
                      {chat.unread > 0 && <div style={unreadBadgeStyle}>{chat.unread}</div>}
                    </div>
                    <div style={chatMessageStyle}>{chat.lastMessage}</div>
                    <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{chat.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Window */}
          <div style={chatWindowStyle}>
            {/* Chat Header */}
            <div style={chatHeaderStyle}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#007BFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                {chats[selectedChat].avatar}
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#333', fontSize: '15px' }}>
                  {chats[selectedChat].name}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Active now</div>
              </div>
            </div>

            {/* Messages */}
            <div style={messagesAreaStyle}>
              {chats[selectedChat].messages.map((msg) => (
                <div key={msg.id}>
                  <div style={messageStyle(msg.isOwn)}>
                    <div style={messageBubbleStyle(msg.isOwn)}>{msg.text}</div>
                  </div>
                  <div style={messageTimeStyle}>{msg.time}</div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div style={inputContainerStyle}>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
                style={inputFieldStyle}
              />
              <button
                onClick={handleSendMessage}
                style={sendButtonStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, {
                    ...sendButtonStyle,
                    backgroundColor: '#0056b3',
                  });
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, sendButtonStyle);
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
