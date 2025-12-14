import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Home,Menu, Heart, MessageSquare, User, HelpCircle, LogOut, Bell, X, Search, Send } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

export default function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState(0);
  const [messageInput, setMessageInput] = useState('');
  const navigate = useNavigate(); 
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

const [currentReceiver, setCurrentReceiver] = useState(null);

  const [chats, setChats] = useState([]);
  const [chatData, setChatData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState({
  name: "Guest User",
  email: "user@example.com",
});

  
  // ------------------- USE EFFECT -------------------
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
      setUser({
        name: decoded.fullName || decoded.name || "Guest User",
        email: decoded.email || "user@example.com",
      });
      fetchConversations(decoded.userId);
    } catch (error) {
      console.error("Invalid token");
    }
  }
}, []);

  

const fetchConversations = async (userId) => {
  try {
    const res = await fetch("http://localhost:5000/api/messages/conversations", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (!res.ok) throw new Error("Failed to fetch conversations");

    const data = await res.json();

    const mappedChats = (data.conversations || [])
      .map((conv) => {
        if (!conv.participants || !Array.isArray(conv.participants)) return null;

        const otherUser = conv.participants.find((p) => p.id !== userId);
        if (!otherUser) return null;

        return {
          conversationId: conv._id,
          otherUserId: otherUser.id,
          name: otherUser.fullName || "Unknown",
          avatar: otherUser.fullName?.[0] || "U",
          lastMessage: conv.lastMessage || "",
          time: conv.lastMessageTime
            ? new Date(conv.lastMessageTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "",
          unread: conv.unreadCount || 0,
          otherUserRole: otherUser.role,
        };
      })
      .filter(Boolean);

    setChats(mappedChats);

    // Auto-open chat if workerId is in URL
    const workerId = searchParams.get("workerId");
    const workerName = searchParams.get("workerName");
    if (workerId) {
      const chatIndex = mappedChats.findIndex((c) => c.otherUserId === workerId);
      if (chatIndex !== -1) {
        setSelectedChat(chatIndex);
        openChat(mappedChats[chatIndex]);
      } else {
        const body = { otherUserId: workerId, otherUserRole: "worker" };
        if (workerName) body.otherUserFullName = workerName;

        const res2 = await fetch("http://localhost:5000/api/messages/conversation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        });

        const data2 = await res2.json();

        const newChat = {
          conversationId: data2.conversation._id,
          otherUserId: workerId,
          name: workerName || "Worker",
          avatar: (workerName || "W")[0],
          lastMessage: "",
          time: "",
          unread: 0,
          otherUserRole: "worker",
        };

        const updatedChats = [...mappedChats, newChat];
        setChats(updatedChats);
        setSelectedChat(updatedChats.length - 1);
        openChat(newChat);
      }
    }
  } catch (error) {
    console.error("Error fetching conversations:", error);
  }
};



  // ------------------- GET MESSAGES -------------------
 const getMessages = async (conversationId, otherUser) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/messages/conversation/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch messages");

    const data = await res.json();

    if (!Array.isArray(data.messages)) {
      throw new Error("Invalid messages response");
    }

    // Format messages safely
    const formattedMessages = data.messages.map((msg) => {
      const isOwnMessage = msg.senderId === userId;

      return {
        id: msg._id,
        sender: isOwnMessage ? "You" : otherUser.fullName || otherUser.name,
        text: msg.text,
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: isOwnMessage,
      };
    });

    // Count unread messages (messages sent TO current user)
    const unreadCount = data.messages.filter(
      (msg) =>
        msg.receiverId === userId &&
        !msg.readAt
    ).length;

    setChatData({
      conversationId,
      id: otherUser.id || otherUser._id,
      name: otherUser.fullName || otherUser.name,
      avatar:
        otherUser.avatar ||
        (otherUser.fullName || otherUser.name)[0],
      messages: formattedMessages,
      lastMessage: formattedMessages.at(-1)?.text || "",
      time: formattedMessages.at(-1)?.time || "",
      unread: unreadCount,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};


  // ------------------- OPEN CHAT -------------------
const openChat = (chat) => {
  if (!chat || !chat.conversationId) {
    console.error("Invalid chat object:", chat);
    return;
  }

  setCurrentReceiver({
    id: chat.otherUserId,
    role: chat.otherUserRole,
    conversationId: chat.conversationId,
    name: chat.name,
    avatar: chat.avatar,
  });

  getMessages(chat.conversationId, {
    id: chat.otherUserId,
    fullName: chat.name,
    name: chat.name,
    avatar: chat.avatar,
  });
};




const handleSendMessage = async () => {
  try {
    if (!messageInput.trim()) return;

    if (!currentReceiver?.id || !currentReceiver?.role) {
      console.error("No active receiver selected");
      return;
    }

    const payload = {
      receiverId: currentReceiver.id,
      receiverType: currentReceiver.role,
      text: messageInput.trim(),
    };

    const res = await fetch("http://localhost:5000/api/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload), // ✅ plain JSON only
    });

    if (!res.ok) {
      throw new Error("Message send failed");
    }

    const { message } = await res.json();

    // 1️⃣ Update open chat instantly
    setChatData((prev) => ({
      ...prev,
      messages: [
        ...(prev?.messages || []),
        {
          id: message._id,
          sender: "You",
          text: message.text,
          time: new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: true,
        },
      ],
      lastMessage: message.text,
      time: new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    // 2️⃣ Update chat list preview
    setChats((prev) =>
      prev.map((chat) =>
        chat.conversationId === message.conversationId
          ? {
              ...chat,
              lastMessage: message.text,
              time: new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : chat
      )
    );

    // 3️⃣ Clear input
    setMessageInput("");
  } catch (error) {
    console.error("Error sending message:", error);
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

    const menuItems = [
        { icon: Home, label: "Home", href: "/customer-dashboard" },
        { icon: Heart, label: "Favorites", href: "/customer-Favorites" },
        { icon: MessageSquare, label: "Messages", href: "/Messages" },
        { icon: User, label: "Profile", href: "/user-profile" },
        { icon: HelpCircle, label: "Support", href: "/about" },
    ]

  return (
    <div style={containerStyle}>
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

          {/* Messages Area */}
        <div style={messagesContainerStyle}>
          {/* Chat List */}
          <div style={chatListStyle}>
            <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', fontWeight: '600', color: '#333' }}>
              Messages
            </div>
           {chats.length > 0 ? (
  chats.map((chat, index) => (
    <div
      key={chat.conversationId || chat.otherUserId} // unique key
      style={chatItemStyle(selectedChat === index)}
      onClick={() => {
        setSelectedChat(index);
        openChat(chat); // pass full chat object
      }}
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div style={chatNameStyle}>{chat.name}</div>
            {chat.unread > 0 && <div style={unreadBadgeStyle}>{chat.unread}</div>}
          </div>
          <div style={chatMessageStyle}>{chat.lastMessage}</div>
          <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{chat.time}</div>
        </div>
      </div>
    </div>
  ))
) : (
  <div style={{ padding: '20px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
    No conversations yet. Start chatting with workers!
  </div>
)}

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
                {chatData?.avatar || 'U'}
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#333', fontSize: '15px' }}>
                  {chatData?.name || 'Select a chat'}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Active now</div>
              </div>
            </div>

            {/* Messages */}
            <div style={messagesAreaStyle}>
  {chatData?.messages?.length > 0 ? (
    chatData.messages.map((msg) => (
      <div key={msg.id}>
        <div style={messageStyle(msg.isOwn)}>
          <div style={messageBubbleStyle(msg.isOwn)}>{msg.text}</div>
        </div>
        <div style={messageTimeStyle}>{msg.time}</div>
      </div>
    ))
  ) : (
    <div style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginTop: '20px' }}>
      No messages yet. Start the conversation!
    </div>
  )}
</div>


            {/* Input Area */}
          <div style={inputContainerStyle}>
  <textarea
    value={messageInput}
    onChange={(e) => setMessageInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (chatData && messageInput.trim()) {
          handleSendMessage();
        }
      }
    }}
    placeholder={
      chatData
        ? "Type your message..."
        : "Select a chat to start messaging"
    }
    style={inputFieldStyle}
    disabled={!chatData}
  />

  <button
    type="button"
    onClick={() => {
      if (chatData && messageInput.trim()) {
        handleSendMessage();
      }
    }}
    style={{
      ...sendButtonStyle,
      backgroundColor:
        chatData && messageInput.trim()
          ? sendButtonStyle.backgroundColor
          : "#ccc",
      cursor:
        chatData && messageInput.trim() ? "pointer" : "not-allowed",
    }}
    disabled={!chatData || !messageInput.trim()}
    onMouseEnter={(e) => {
      if (chatData && messageInput.trim()) {
        e.currentTarget.style.backgroundColor = "#0056b3";
      }
    }}
    onMouseLeave={(e) => {
      if (chatData && messageInput.trim()) {
        e.currentTarget.style.backgroundColor =
          sendButtonStyle.backgroundColor;
      }
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
