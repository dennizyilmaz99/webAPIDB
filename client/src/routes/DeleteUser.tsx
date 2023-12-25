import React, { useState } from "react";
import axios from "axios";

const DeleteUser = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/users/delete${username}`
      );
      setUsername("");
      if (response.status === 201) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Fel vid borttagning av användare:", error);
    }
  };

  return (
    <div className="user-form">
      <h2>Ta bort användare</h2>
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
        <button type="submit" className="form-submit">
          Ta bort användare
        </button>
      </form>
    </div>
  );
};

export default DeleteUser;
