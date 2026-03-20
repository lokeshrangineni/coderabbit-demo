import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './components/DepartmentList';
import './App.css';

// Bad: hardcoded credentials in frontend
const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = 'admin123';

function App() {
  const [activeTab, setActiveTab] = useState('employees');

  // Bad: client-side only authentication (easily bypassed)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = (user, pass) => {
    // Bad: comparing credentials on client side
    if (user === ADMIN_USER && pass === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Employee & Department Management</h1>
        <p>Manage your organization's workforce and departments</p>
      </header>

      <div className="tab-container">
        <button
          onClick={() => setActiveTab('employees')}
          className={`tab-button ${activeTab === 'employees' ? 'active' : ''}`}
        >
          Employees
        </button>
        <button
          onClick={() => setActiveTab('departments')}
          className={`tab-button ${activeTab === 'departments' ? 'active' : ''}`}
        >
          Departments
        </button>
      </div>

      {activeTab === 'employees' ? <EmployeeList /> : <DepartmentList />}

      {/* Bad: debug info in production */}
      <div className="debug-panel">
        <h4>Debug Info (Remove in Production!)</h4>
        <p><strong>Admin User:</strong> {ADMIN_USER}</p>
        <p><strong>Admin Password:</strong> {ADMIN_PASSWORD}</p>
        <p><strong>Employee API:</strong> http://localhost:5001/api</p>
        <p><strong>Department API:</strong> http://localhost:8080/api</p>
      </div>
    </div>
  );
}

export default App;
