import React, { useState, useEffect } from 'react';
//import { renderToString } from 'react-dom/server';
import UserList from './UserList';
import UserForm from './UserForm';
import PaginationComponent from './pagination';
//import UserListPDF from './UserListPDF';
//import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import jsPDF from 'jspdf';
import 'jspdf-autotable';



function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [selectedUser, setSelectedUser] = useState({});
  const [editUser, setEditUser] = useState({ name: '', email: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);


  // Function to fetch users from an API
  const fetchUsers = async () => {
    try {
      // Simulating an API call with a delay
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace with your actual API endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();

      setUsers(data);
      setFilteredUsers(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Function to filter users based on search query
  const filterUsers = (query) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Function to handle input change in the search field
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterUsers(query);
  };

  const handleSort = () => {
    const sortedData = [...filteredUsers].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredUsers(sortedData);
  };

  // Function to handle input change in the new user form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(12);
    doc.text('User List', 20, 10);

    const tableData = users.map((user) => [user.id, user.name, user.email]);
    const tableHeaders = ['ID:','Name:', 'Email:'];

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: y + 20,
    });

    doc.save('userlist.pdf');
  };

  // Function to handle form submission for adding a new user
  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email } = newUser;
    const newUserObj = {  
      id: Date.now().toString(), // Generate a unique ID (for demonstration purposes only)
      name, 
      email,
    };
    setUsers((prevUsers) => [...prevUsers, newUserObj]);
    setFilteredUsers((prevUsers) => [...prevUsers, newUserObj]);
    setNewUser({ name: '', email: '' });
  };

  // Function to handle editing a user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditUser({ name: user.name, email: user.email });
  };

  // Function to handle input change in the edit form
  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Function to update a user
  const handleUpdate = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return { ...user, name: editUser.name, email: editUser.email };
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedUser({});
    setEditUser({ name: '', email: '' });
  };

  // Function to delete a user
  const handleDelete = (user) => {
    const updatedUsers = users.filter((u) => u.id !== user.id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    fetchUsers();
  }, []);

return (
  <div>
    <h1>User Management System</h1>

    {isLoading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>Error: {error}</div>
    ) : (
      <div>
        <UserForm
          newUser={newUser}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />

        <h2>Users</h2>
        <div>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={handleSort}>Sort By Name</button>
        </div>
       
        <UserList
          users={currentUsers}
          handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDownload={handleDownload}
        />

        <PaginationComponent
          totalUsers={filteredUsers.length}
          usersPerPage={usersPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {selectedUser.id && (
          <div>
            <h2>Edit User</h2>
            <form>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={handleEditInputChange}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleEditInputChange}
                />
              </div>
              <button onClick={handleUpdate}>Update User</button>
              <button onClick={() => setSelectedUser({})}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    )}
  </div>
);
}


export default App;