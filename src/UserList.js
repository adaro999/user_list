import React from 'react';

function UserList({ users, handleEdit, handleDelete, handleDownload }) {
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleDownload}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        Download User List
      </button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>  
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default UserList;