import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3001/api/users/change",
        {
          username,
          currentPassword,
          newPassword,
        }
      );
      setUsername("");
      setCurrentPassword("");
      setNewPassword("");

      if (response.status === 201) {
        alert(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverResponse = error.response;
        if (serverResponse && serverResponse.status === 404) {
          alert(serverResponse.data.message);
        } else if (serverResponse && serverResponse.status === 403) {
          alert(serverResponse.data.message);
        } else {
          console.error("Fel vid skapande av användare:", error);
          alert("Ett okänt fel inträffade.");
        }
      }
    }
  };

  return (
    <div className="user-form">
      <h2>Byt lösenord</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Användarnamn:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="current-password">Nuvarande lösenord:</label>
          <input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">Nytt lösenord:</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form-submit">
          Ändra lösenord
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
