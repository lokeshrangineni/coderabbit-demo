import React, { useState, useEffect } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employeeApi';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department_id: '',
    salary: '',
    password: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    getEmployees().then(res => {
      setEmployees(res.data);
    });
    // Bad: no error handling
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Bad: no input validation
    if (editingId) {
      updateEmployee(editingId, formData).then(() => {
        loadEmployees();
        resetForm();
      });
    } else {
      createEmployee(formData).then(() => {
        loadEmployees();
        resetForm();
      });
    }
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee.id);
  };

  const handleDelete = (id) => {
    // Bad: no confirmation dialog
    deleteEmployee(id).then(() => loadEmployees());
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', department_id: '', salary: '', password: '' });
    setEditingId(null);
  };

  // Bad: using dangerouslySetInnerHTML without sanitization (XSS vulnerability)
  const renderEmployeeName = (name) => {
    return <span dangerouslySetInnerHTML={{ __html: name }} />;
  };

  // Bad: using eval (code injection vulnerability)
  const calculateBonus = (salary) => {
    try {
      return eval(salary + ' * 0.1');
    } catch (e) {
      return 0;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
  };

  return (
    <div>
      <div className="card">
        <h3 className="card-title">{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Department ID</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter department ID"
                value={formData.department_id}
                onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>
            {/* Bad: password field with type="text" */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Employee' : 'Add Employee'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Employee Directory</h3>
        {employees.length === 0 ? (
          <div className="empty-state">
            <p>No employees found. Add your first employee above.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Dept ID</th>
                <th>Salary</th>
                <th>Bonus (10%)</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{renderEmployeeName(emp.name)}</td>
                  <td>{emp.email}</td>
                  <td>
                    <span className="badge badge-success">{emp.department_id || 'N/A'}</span>
                  </td>
                  <td>{formatCurrency(emp.salary)}</td>
                  <td>{formatCurrency(calculateBonus(emp.salary))}</td>
                  {/* Bad: displaying password in plain text */}
                  <td><code>{emp.password}</code></td>
                  <td className="actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(emp)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
