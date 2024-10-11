import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Importa el archivo CSS

const App = () => {
  const [selectedOption, setSelectedOption] = useState(''); // Opción seleccionada del menú
  const [users, setUsers] = useState([]); // Para gestionar la lista de usuarios
  const [username, setUsername] = useState(''); // Para el nombre de usuario
  const [email, setEmail] = useState(''); // Para el email
  const [password, setPassword] = useState(''); // Para la contraseña
  const [userId, setUserId] = useState(''); // Para el ID del usuario
  const [userInfo, setUserInfo] = useState(null); // Para mostrar la información del usuario
  const [message, setMessage] = useState(''); // Para mensajes de éxito o error

  // Función para manejar la creación de un usuario
  const handleCreateUser = () => {
    axios.post('http://localhost:8000/users', {
      username,
      email,
      hashed_password: password
    })
    .then(response => {
      setUsers([...users, response.data]);
      setMessage('Usuario creado exitosamente');
      setUsername('');
      setEmail('');
      setPassword('');
    })
    .catch(error => {
      setMessage('Error creando usuario');
      console.error(error);
    });
  };

  // Función para obtener un usuario por ID
  const handleGetUser = () => {
    axios.get(`http://localhost:8000/users/${userId}`)
    .then(response => {
      setUserInfo(response.data);
      setMessage('');
    })
    .catch(error => {
      setMessage('Usuario no encontrado');
      setUserInfo(null);
      console.error(error);
    });
  };

  // Función para actualizar un usuario por ID
  const handleUpdateUser = () => {
    axios.put(`http://localhost:8000/users/${userId}`, {
      username,
      email,
      hashed_password: password
    })
    .then(response => {
      setUsers(users.map(user => (user.id === userId ? response.data : user)));
      setMessage('Usuario actualizado exitosamente');
      setUserId('');
      setUsername('');
      setEmail('');
      setPassword('');
    })
    .catch(error => {
      setMessage('Error actualizando usuario');
      console.error(error);
    });
  };

  // Función para borrar un usuario por ID
  const handleDeleteUser = () => {
    axios.delete(`http://localhost:8000/users/${userId}`)
    .then(response => {
      setUsers(users.filter(user => user.id !== parseInt(userId)));
      setMessage('Usuario borrado exitosamente');
      setUserId('');
    })
    .catch(error => {
      setMessage('Error borrando usuario');
      console.error(error);
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestión de Usuarios</h1>
      </header>

      <main className="app-main">
        {/* Menú desplegable */}
        <div className="menu-section">
          <h2>Selecciona una opción</h2>
          <select className="dropdown" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">-- Selecciona --</option>
            <option value="create">Crear un nuevo usuario</option>
            <option value="get">Buscar un usuario</option>
            <option value="update">Actualizar un usuario</option>
            <option value="delete">Borrar un usuario</option>
          </select>
        </div>

        {/* Formulario dinámico según la opción seleccionada */}
        {selectedOption === 'create' && (
          <div className="form-section">
            <h2>Crear Usuario</h2>
            <input
              className="input"
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn" onClick={handleCreateUser}>Crear Usuario</button>
          </div>
        )}

        {selectedOption === 'get' && (
          <div className="form-section">
            <h2>Buscar Usuario</h2>
            <input
              className="input"
              type="text"
              placeholder="ID del usuario"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button className="btn" onClick={handleGetUser}>Buscar Usuario</button>
            {userInfo && (
              <div>
                <h3>Información del Usuario</h3>
                <p>Nombre: {userInfo.username}</p>
                <p>Email: {userInfo.email}</p>
                <p>ID: {userInfo.id}</p>
              </div>
            )}
          </div>
        )}

        {selectedOption === 'update' && (
          <div className="form-section">
            <h2>Actualizar Usuario</h2>
            <input
              className="input"
              type="text"
              placeholder="ID del usuario"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Nuevo nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              type="email"
              placeholder="Nuevo correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn" onClick={handleUpdateUser}>Actualizar Usuario</button>
          </div>
        )}

        {selectedOption === 'delete' && (
          <div className="form-section">
            <h2>Borrar Usuario</h2>
            <input
              className="input"
              type="text"
              placeholder="ID del usuario"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button className="btn delete-btn" onClick={handleDeleteUser}>Borrar Usuario</button>
          </div>
        )}

        {/* Mensaje de éxito o error */}
        {message && <p>{message}</p>}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Aplicación de Gestión de Usuarios</p>
      </footer>
    </div>
  );
};

export default App;
