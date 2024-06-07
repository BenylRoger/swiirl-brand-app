import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await axios.get(
          "https://mc54wwmd2jqfhvis2huj46wl240ilczp.lambda-url.us-east-1.on.aws/",
          {
            params: { status: "In Progress" },
          }
        );
        setCommissions(response.data);
      } catch (error) {
        console.error("Error fetching commissions:", error);
      }
    };

    fetchCommissions();
  }, []);

  return (
    <div className="container">
      <div className="admin-page">
        <table className="commission-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Target Location</th>
              <th>Timeline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((commission) => (
              <tr key={commission.id}>
                <td>{commission.name}</td>
                <td>{commission.target_location}</td>
                <td>{commission.timeline}</td>
                <td>{commission.status}</td>
                <td>
                  <Link to={`/admin/commission/${commission.id}`}>
                    <button>View Detail</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
