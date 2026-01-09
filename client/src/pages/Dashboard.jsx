import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const dashboardRes = await axios.get('http://localhost:5000/api/users/dashboard');
        setData(dashboardRes.data);

        const refRes = await axios.get('http://localhost:5000/api/users/referrals');
        setReferrals(refRes.data);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [token, navigate, logout]);

  if (!data) return <div>Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {data.username}</h1>
        <button onClick={logout} className="btn-secondary">Logout</button>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>Wallet Balance</h3>
          <p className="stat-value">${data.walletBalance.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Investment</h3>
          <p className="stat-value">${data.totalInvestment.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>ROI Income</h3>
          <p className="stat-value">${data.roiIncome.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Level Income</h3>
          <p className="stat-value">${data.levelIncome.toFixed(2)}</p>
        </div>
      </section>

      <section className="referral-section">
        <h2>Your Referral Code: <span className="highlight">{data.referralCode}</span></h2>
        
        <h3>Referral Network</h3>
        {referrals.length === 0 ? (
          <p>No referrals yet.</p>
        ) : (
          <table className="referral-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Total Investment</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref) => (
                <tr key={ref._id}>
                  <td>{ref.username}</td>
                  <td>${ref.totalInvestment}</td>
                  <td>{new Date(ref.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
