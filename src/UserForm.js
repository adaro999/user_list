import React from 'react';

function UserForm({ newUser, handleInputChange, handleSubmit }) {
  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserForm;