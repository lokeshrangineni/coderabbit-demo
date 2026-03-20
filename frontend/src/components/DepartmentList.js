import React, { useState, useEffect } from 'react';
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from '../api/departmentApi';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: '',
    managerPassword: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = () => {
    getDepartments().then(res => {
      setDepartments(res.data);
    });
    // Bad: no error handling
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Bad: no validation
    if (editingId) {
      updateDepartment(editingId, formData).then(() => {
        loadDepartments();
        resetForm();
      });
    } else {
      createDepartment(formData).then(() => {
        loadDepartments();
        resetForm();
      });
    }
  };

  const handleEdit = (dept) => {
    setFormData(dept);
    setEditingId(dept.id);
  };

  const handleDelete = (id) => {
    // Bad: no confirmation
    deleteDepartment(id).then(() => loadDepartments());
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', budget: '', managerPassword: '' });
    setEditingId(null);
  };

  // Bad: XSS vulnerability
  const renderDescription = (desc) => {
    return <span dangerouslySetInnerHTML={{ __html: desc }} />;
  };

  const formatCurrency = (amount) => {
    const num = parseFloat(amount) || 0;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  return (
    <div>
      <div className="card">
        <h3 className="card-title">{editingId ? 'Edit Department' : 'Add New Department'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Department Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter department name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Budget</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
            {/* Bad: password in plain text field */}
            <div className="form-group">
              <label>Manager Password</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter manager password"
                value={formData.managerPassword}
                onChange={(e) => setFormData({ ...formData, managerPassword: e.target.value })}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Department' : 'Add Department'}
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
        <h3 className="card-title">Department Directory</h3>
        {departments.length === 0 ? (
          <div className="empty-state">
            <p>No departments found. Add your first department above.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Budget</th>
                <th>Manager Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td>{dept.id}</td>
                  <td><strong>{dept.name}</strong></td>
                  <td>{renderDescription(dept.description)}</td>
                  <td>
                    <span className="badge badge-warning">{formatCurrency(dept.budget)}</span>
                  </td>
                  {/* Bad: showing password */}
                  <td><code>{dept.managerPassword}</code></td>
                  <td className="actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(dept)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(dept.id)}>
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

export default DepartmentList;
