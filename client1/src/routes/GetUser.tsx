import React, { useState } from "react";
import axios from "axios";
import { IUser } from "../models/User";

const GetUser = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users/get");
      setUsers(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Fel vid hämtning av användare:", error);
    }
  };

  return (
    <div className="user-list">
      <h2>Användarlista</h2>
      {!isLoaded ? (
        <button onClick={fetchUsers} className="form-submit">
          Hämta användare
        </button>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetUser;
