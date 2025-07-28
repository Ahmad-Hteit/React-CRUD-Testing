import React, { useState } from 'react';
import '../Dashboard.css'; // Your styling here

const Dashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Jane Doe", email: "jane@example.com", role: "Admin" }
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // Modal state
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const addUser = () => {
    if (!name || !email || !role) return alert("Please fill all fields");
    setUsers([...users, { id: Date.now(), name, email, role }]);
    setName('');
    setEmail('');
    setRole('');
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (!currentUser.name || !currentUser.email || !currentUser.role) {
      return alert("Please fill all fields");
    }

    setUsers(users.map(user =>
      user.id === currentUser.id ? currentUser : user
    ));

    setIsEditing(false);
    setCurrentUser(null);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <div className="form-group">
        <input
          placeholder="Name"
          id='inputName'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          id='inputEmail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Role"
          id='inputRole'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button id='addUserBtn' onClick={addUser}>Add User</button>
      </div>

      <ul>
        {users.map(user => (
          <li key={user.id} className="user-item">
            <div>
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email} <br />
              <strong>Role:</strong> {user.role}
            </div>
            <div className="action-buttons">
              <button className='editBtn' onClick={() => openEditModal(user)}>Edit</button>
              <button className='deleteBtn' onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal Lightbox */}
      {isEditing && currentUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <input
              value={currentUser.name}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              value={currentUser.email}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              value={currentUser.role}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, role: e.target.value })
              }
              placeholder="Role"
            />
            <button onClick={handleUpdate} className='updateBtn'>Update</button>
            <button className="cancelBtn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
