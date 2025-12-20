import React, { useState } from 'react';
import { Home, BookOpen, Heart, MessageSquare, User, Settings, HelpCircle, LogOut, Search, Bell, ArrowLeft, Menu ,X} from 'lucide-react';
import { useNavigate,Link } from "react-router-dom";


export default function SearchPage() {
  const [sidebarOpen] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchNotFound, setSearchNotFound] = useState(false);
  const navigate = useNavigate();
  
    const handleLogout = () => {
      // you can clear tokens here if needed
      localStorage.removeItem("token");
      localStorage.removeItem("customerId");
      localStorage.removeItem("fullName");
    localStorage.removeItem("email");
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
  { name: 'Electrician', bg: '#FFC107', path: '/workers-search?skill=Electrician' },
  { name: 'Plumber', bg: '#007BFF', path: '/workers-search?skill=Plumber' },
  { name: 'Barber', bg: '#FFC107', path: '/workers-search?skill=Barber' },
  { name: 'Domestic Helper', bg: '#007BFF', path: '/workers-search?skill=Domestic Helper' },
  { name: 'Painter', bg: '#FFC107', path: '/workers-search?skill=Painter' },
  { name: 'Carpenter', bg: '#007BFF', path: '/workers-search?skill=Carpenter' },
  { name: 'AC Mechanic', bg: '#FFC107', path: '/workers-search?skill=AC Mechanic' },
  { name: 'Gardener', bg: '#007BFF', path: '/workers-search?skill=Gardener' },
  { name: 'Driver', bg: '#FFC107', path: '/workers-search?skill=Driver' },
  { name: 'Cook', bg: '#007BFF', path: '/workers-search?skill=Cook' },
  { name: 'Laundry', bg: '#FFC107', path: '/workers-search?skill=Laundry' },
  { name: 'Technician', bg: '#007BFF', path: '/workers-search?skill=Technician' },
];

const skills = [
  {
    skill: 'electrician',
    aliases: [
      'electrician',
      'electric work',
      'electrical',
      'electric repair',
      'wireman',
      'light fitting',
      'switch repair',
      'power issue',
      'electrician worker',
      'electric ka kaam',
      'light ka problem',
      'current nahi aa raha',
      'switch kharab hai',
      'wire ka kaam',
      'bijli ka kaam'
    ]
  },
  {
    skill: 'plumber',
    aliases: [
      'plumber',
      'plumbing',
      'pipe repair',
      'water leakage',
      'leakage',
      'tap repair',
      'bathroom repair',
      'water problem',
      'pipe se pani leak ho raha',
      'nal se pani tapak raha',
      'water leak ho raha',
      'bathroom ka pani bahar aa raha',
      'commode ka problem',
      'flush kharab hai'
    ]
  },
  {
    skill: 'barber',
    aliases: [
      'barber',
      'haircut',
      'hair cutting',
      'salon',
      'hair stylist',
      'mens haircut',
      'shaving',
      'cutting karwani hai',
      'baal katwane hai',
      'shaving karni hai',
      'haircut chahiye',
      'salon wala chahiye',

    ]
  },
  {
    skill: 'domestic helper',
    aliases: [
      'domestic helper',
      'maid',
      'house maid',
      'house help',
      'home helper',
      'cleaning lady',
      'cleaner',
      'bai chahiye',
      'ghar ke kaam ke liye maid',
      'jhaadu pocha ke liye bai',
      'ghar safai ke liye madam',
      'house ka kaam karne wali'

    ]
  },
  {
    skill: 'painter',
    aliases: [
      'painter',
      'painting',
      'wall painting',
      'house painting',
      'paint work',
      'interior painting',
      'ghar rangna hai',
      'wall paint karna hai',
      'ghar painting ka kaam',
      'rangai putai'

    ]
  },
  {
    skill: 'carpenter',
    aliases: [
      'carpenter',
      'wood work',
      'furniture repair',
      'door repair',
      'cabinet work',
      'wardrobe work',
      'lakdi ka kaam',
      'darwaza repair karna hai',
      'almari ka kaam',
      'bed repair karna hai'
    ]
  },
  {
    skill: 'ac mechanic',
    aliases: [
      'ac mechanic',
      'ac repair',
      'air conditioner',
      'air conditioning',
      'ac service',
      'ac installation',
      'cooling problem',
      'lakdi ka kaam',
      'darwaza repair karna hai',
      'almari ka kaam',
      'bed repair karna hai'

    ]
  },
  {
    skill: 'gardener',
    aliases: [
      'gardener',
      'garden work',
      'mali',
      'plant care',
      'lawn maintenance',
      'garden cleaning',
      'mali chahiye',
      'bagicha saaf karna hai',
      'plants ka dhyan rakhne wala',
      'garden ka kaam'

    ]
  },
  {
    skill: 'driver',
    aliases: [
      'driver',
      'car driver',
      'personal driver',
      'chauffeur',
      'driving service'
    ]
  },
  {
    skill: 'cook',
    aliases: [
      'cook',
      'chef',
      'home cook',
      'personal cook',
      'kitchen help',
      'cooking service',
      'khana banane wali chahiye',
      'ghar ka cook',
      'roti sabzi banane wala',
      'cook chahiye'

    ]
  },
  {
    skill: 'laundry',
    aliases: [
      'laundry',
      'washing clothes',
      'cloth washing',
      'dry cleaning',
      'iron clothes',
      'press clothes',
      'kapde dhone ke liye',
      'kapde press karne hai',
      'dhobi chahiye',
      'clothes washing service'

    ]
  },
  {
    skill: 'technician',
    aliases: [
      'technician',
      'repair technician',
      'service technician',
      'machine repair',
      'general repair',
      'maintenance work'
    ]
  }
];

// Normalize input: lowercase, remove punctuation, trim and normalize whitespace
function normalizeInput(input) {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // replace punctuation with space
    .replace(/\s+/g, ' ') // replace multiple spaces with single space
    .trim();
}

// Detect skill from input using normalized aliases
function detectSkill(input) {
  const normalizedInput = normalizeInput(input);
  if (!normalizedInput) return null;

  // Build alias index: normalize aliases once and sort by length descending
  const aliasIndex = [];
  skills.forEach(skillObj => {
    skillObj.aliases.forEach(alias => {
      const normalizedAlias = normalizeInput(alias);
      aliasIndex.push({ normalizedAlias, skill: skillObj.skill });
    });
  });
  aliasIndex.sort((a, b) => b.normalizedAlias.length - a.normalizedAlias.length);

  // Find first match
  for (const { normalizedAlias, skill } of aliasIndex) {
    if (normalizedInput.includes(normalizedAlias)) {
      return skill;
    }
  }
  return null;
}

// Handle search navigation
function handleSearch(inputValue) {
  setSearchNotFound(false); // Reset previous state
  const skill = detectSkill(inputValue);
  if (skill) {
    navigate(`/workers-search?skill=${skill}`);
  } else {
    setSearchNotFound(true);
  }
}


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

  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: '15px 30px',
    borderBottom: '1px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };
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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(searchInput);
                    }
                  }}
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    flex: 1,
                    fontSize: '14px',
                  }}
                />
                <button
                  onClick={() => handleSearch(searchInput)}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#007BFF',
                  }}
                >
                  <Search size={18} />
                </button>
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

          {searchNotFound && (
            <div style={{
              padding: '10px 20px',
              backgroundColor: '#ffe6e6',
              color: '#d32f2f',
              borderRadius: '8px',
              margin: '10px 30px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              No matching skill found. Try a different search term or select from the services below.
            </div>
          )}

        <div style={styles.footerSection}>
          <div style={styles.sectionTitle}>Popular Searches</div>
          <div style={styles.chips}>
          {popularSearches.map((search, idx) => (
            <button
              key={idx}
              style={styles.chip}
              onClick={() => handleSearch(search)}
            >
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
