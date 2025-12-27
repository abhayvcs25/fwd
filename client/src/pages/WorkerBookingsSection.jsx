import React, { useState, useEffect } from 'react';

const WorkerBookingsSection = ({ workerId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/workers/${workerId}/bookings`);
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (workerId) fetchBookings();
  }, [workerId]);

  if (loading) return <div style={loadingStyle}>Loading bookings...</div>;
  if (error) return <div style={errorStyle}>Error: {error}</div>;

  return (
    <div style={sectionStyle}>
      <h3 style={titleStyle}>Recent Bookings</h3>

      {bookings.length === 0 ? (
        <p style={emptyStyle}>No bookings yet for this worker</p>
      ) : (
        <div style={listStyle}>
          {bookings.map((booking, index) => (
            <div key={index} style={cardStyle}>
              {/* Top Left - Customer Name */}
              <div style={customerNameStyle}>
                {booking.customerName}
              </div>

              {/* Top Right - Status */}
              <div
                style={{
                  ...statusStyle,
                  color:
                    booking.status === 'pending'
                      ? '#ffa500'
                      : booking.status === 'confirmed'
                      ? '#28a745'
                      : '#dc3545',
                }}
              >
                {booking.status}
              </div>

              {/* Bottom Left - Description */}
              <div style={descriptionStyle}>
                {booking.description}
              </div>

              {/* Bottom Right - Date */}
              <div style={dateStyle}>
                {new Date(booking.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ===================== STYLES ===================== */

const sectionStyle = {
  marginTop: '10px',
  paddingTop: '15px',
  borderTop: '1px solid #e0e0e0',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '12px',
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const cardStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridTemplateRows: 'auto auto',
  gap: '6px 12px',
  padding: '12px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const customerNameStyle = {
  fontWeight: '600',
  color: '#333',
};

const statusStyle = {
  justifySelf: 'end',
  fontWeight: '600',
  textTransform: 'capitalize',
};

const descriptionStyle = {
  fontSize: '14px',
  color: '#555',
};

const dateStyle = {
  justifySelf: 'end',
  fontSize: '13px',
  color: '#666',
};

const loadingStyle = {
  padding: '10px',
  color: '#666',
};

const errorStyle = {
  padding: '10px',
  color: '#dc3545',
};

const emptyStyle = {
  color: '#777',
  fontSize: '14px',
};

export default WorkerBookingsSection;
