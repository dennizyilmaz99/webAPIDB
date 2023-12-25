import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/create",
        {
          username: name,
          password: password,
        }
      );

      setName("");
      setPassword("");

      if (response.status === 201) {
        alert(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Nu när vi vet att det är ett Axios-fel, kan vi säkert använda 'error.response'
        const serverResponse = error.response;

        if (serverResponse && serverResponse.status === 400) {
          alert(serverResponse.data.message);
        } else {
          alert(
            "Fel vid anrop till servern: " +
              (serverResponse ? serverResponse.status : "Okänt fel")
          );
        }
      } else {
        // Om det inte är ett Axios-fel, hantera det som ett okänt fel
        console.error("Fel vid skapande av användare:", error);
        alert("Ett okänt fel inträffade.");
      }
    }
  };

  return (
    <div className="user-form">
      <h2>Skapa användare</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Användarnamn:</label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form-submit">
          Skapa användare
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
