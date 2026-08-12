import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'messages'
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role === 'owner') {
      fetchData();
    }
  }, [profile]);

  const fetchData = async () => {
    setLoading(true);
    
    const { data: bookingsData } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (bookingsData) setBookings(bookingsData);

    const { data: messagesData } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (messagesData) setMessages(messagesData);

    setLoading(false);
  };

  const updateStatus = async (table, id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' || currentStatus === 'Unread' 
      ? (table === 'bookings' ? 'Approved' : 'Read') 
      : (table === 'bookings' ? 'Pending' : 'Unread');

    const { error } = await supabase
      .from(table)
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      fetchData(); // Refresh data
    } else {
      alert("Error updating status: " + error.message);
    }
  };

  if (profile?.role !== 'owner') {
    return (
      <div className="admin-access-denied">
        <h2>Access Denied</h2>
        <p>You must be an owner to view this dashboard.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Owner Dashboard</h2>
        <p>Manage your incoming event bookings and customer messages.</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Booking Requests ({bookings.filter(b => b.status === 'Pending').length} Pending)
        </button>
        <button 
          className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Contact Messages ({messages.filter(m => m.status === 'Unread').length} Unread)
        </button>
      </div>

      <div className="admin-content">
        {loading ? (
          <p className="admin-loading">Loading data...</p>
        ) : (
          <>
            {activeTab === 'bookings' && (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Events</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length > 0 ? bookings.map(b => (
                      <tr key={b.id} className={b.status === 'Pending' ? 'row-pending' : ''}>
                        <td>{new Date(b.created_at).toLocaleDateString()}</td>
                        <td>{b.name}</td>
                        <td><a href={`tel:${b.phone}`}>{b.phone}</a></td>
                        <td><a href={`mailto:${b.email}`}>{b.email}</a></td>
                        <td>{b.location}</td>
                        <td>{b.events}</td>
                        <td>
                          <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                        </td>
                        <td>
                          <button 
                            className="btn-status-toggle"
                            onClick={() => updateStatus('bookings', b.id, b.status)}
                          >
                            {b.status === 'Pending' ? 'Mark Approved' : 'Mark Pending'}
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="8" className="empty-table">No bookings found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.length > 0 ? messages.map(m => (
                      <tr key={m.id} className={m.status === 'Unread' ? 'row-unread' : ''}>
                        <td>{new Date(m.created_at).toLocaleDateString()}</td>
                        <td>{m.name}</td>
                        <td><a href={`mailto:${m.email}`}>{m.email}</a></td>
                        <td className="msg-text">{m.message}</td>
                        <td>
                          <span className={`status-badge ${m.status.toLowerCase()}`}>{m.status}</span>
                        </td>
                        <td>
                          <button 
                            className="btn-status-toggle"
                            onClick={() => updateStatus('messages', m.id, m.status)}
                          >
                            {m.status === 'Unread' ? 'Mark Read' : 'Mark Unread'}
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="6" className="empty-table">No messages found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
