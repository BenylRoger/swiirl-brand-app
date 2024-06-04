import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [commissions, setCommissions] = useState([]);
  const [selectedCommission, setSelectedCommission] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSelectCommission = (commission) => {
    setSelectedCommission(commission);
  };

  const handleUpdateStatus = async () => {
    if (!selectedCommission) return;

    try {
      const response = await axios.put(
        `https://mc54wwmd2jqfhvis2huj46wl240ilczp.lambda-url.us-east-1.on.aws/?id=${selectedCommission.id}`,
        { status: "Completed" }
      );

      if (response.status === 200) {
        setSuccessMessage("Commission status updated successfully.");
        setCommissions(
          commissions.map((commission) =>
            commission.id === selectedCommission.id
              ? { ...commission, status: "Completed" }
              : commission
          )
        );
        setSelectedCommission(null);
      } else {
        console.error("Error updating commission status");
      }
    } catch (error) {
      console.error("Error updating commission status:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
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
                {commission.status === "In Progress" && (
                  <button onClick={() => handleSelectCommission(commission)}>
                    Mark as Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCommission && (
        <div className="update-section">
          <h2>Update Commission Status</h2>
          <p>Are you sure you want to mark this commission as completed?</p>
          <p>
            <strong>{selectedCommission.name}</strong>
          </p>
          <button onClick={handleUpdateStatus}>Yes, Update Status</button>
          <button onClick={() => setSelectedCommission(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
