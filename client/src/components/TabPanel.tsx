import React, { useState } from "react";
import CreateUser from "../routes/CreateUser";
import DeleteUser from "../routes/DeleteUser";
import GetUser from "../routes/GetUser";
import ChangePassword from "../routes/ChangePassword";

const TabPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("create");

  const getButtonClass = (tabName: string) => {
    return `tab-button ${activeTab === tabName ? "active" : ""}`;
  };

  return (
    <div>
      <button
        className={getButtonClass("create")}
        onClick={() => setActiveTab("create")}
      >
        Skapa Användare
      </button>
      <button
        className={getButtonClass("edit")}
        onClick={() => setActiveTab("edit")}
      >
        Byt lösenord
      </button>
      <button
        className={getButtonClass("delete")}
        onClick={() => setActiveTab("delete")}
      >
        Ta bort Användare
      </button>
      <button
        className={getButtonClass("get")}
        onClick={() => setActiveTab("get")}
      >
        Hämta Användare
      </button>

      <div className="tab-content">
        {activeTab === "create" && <CreateUser />}
        {activeTab === "delete" && <DeleteUser />}
        {activeTab === "get" && <GetUser />}
        {activeTab === "edit" && <ChangePassword />}
      </div>
    </div>
  );
};

export default TabPanel;
