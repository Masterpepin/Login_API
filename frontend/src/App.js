import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');

  // Función para obtener todos los usuarios (Read)
  const fetchUsers = () => {
    axios.get('http://web:8000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users: ", error);
      });
  };

  // Ejecuta la función para obtener los usuarios al cargar la página
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para crear un nuevo usuario (Create)
  const handleCreateUser = () => {
    axios.post('http://web:8000/users', { name })
      .then(response => {
        setUsers([...users, response.data]); // Añade el nuevo usuario a la lista
        setName('');  // Limpia el campo de nombre
      })
      .catch(error => {
        console.error("Error creating user: ", error);
      });
  };

  // Función para actualizar un usuario existente (Update)
  const handleUpdateUser = (id) => {
    axios.put(`http://web:8000/users/${id}`, { name: newName })
      .then(response => {
        setUsers(users.map(user => (user.id === id ? response.data : user)));
        setEditingId(null);  // Sal del modo edición
        setNewName('');  // Limpia el campo de nuevo nombre
      })
      .catch(error => {
        console.error("Error updating user: ", error);
      });
  };

  // Función para eliminar un usuario (Delete)
  const handleDeleteUser = (id) => {
    axios.delete(`http://web:8000/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));  // Elimina el usuario de la lista
      })
      .catch(error => {
        console.error("Error deleting user: ", error);
      });
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Formulario para crear un nuevo usuario */}
      <form onSubmit={(e) => { e.preventDefault(); handleCreateUser(); }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new user name"
        />
        <button type="submit">Create User</button>
      </form>

      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {editingId === user.id ? (
              // Modo edición para actualizar el nombre
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter new name"
                />
                <button onClick={() => handleUpdateUser(user.id)}>Update</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {user.name}
                <button onClick={() => { setEditingId(user.id); setNewName(user.name); }}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
