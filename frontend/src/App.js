import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(''); // Para el menú desplegable
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
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
    // Aquí actualizamos los usuarios después de la creación
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
    setUserInfo(response.data); // Aquí aseguramos que los datos se reflejen
    setMessage('');
  })
  .catch(error => {
    setMessage('Usuario no encontrado');
    setUserInfo(null); // Asegúrate de limpiar la vista cuando no se encuentre el usuario
    console.error(error);
  });
}

// Función para actualizar un usuario por ID
const handleUpdateUser = () => {
  axios.put(`http://localhost:8000/users/${userId}`, {
    username,
    email,
    hashed_password: password
  })
  .then(response => {
    // Actualizamos el usuario en la lista local
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
      console.log(response);  // Opcional: Para verificar la respuesta
      // Eliminamos el usuario de la lista local
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
    <div>
      <h1>Gestión de Usuarios</h1>
      
      {/* Menú desplegable */}
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="">Selecciona una opción</option>
        <option value="create">Crear usuario</option>
        <option value="get">Buscar usuario</option>
        <option value="update">Actualizar usuario</option>
        <option value="delete">Borrar usuario</option>
      </select>

      {/* Formulario dinámico según la opción seleccionada */}
      {selectedOption === 'create' && (
        <div>
          <h2>Crear un nuevo usuario</h2>
          <input 
            type="text" 
            placeholder="Nombre de usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={handleCreateUser}>Crear Usuario</button>
        </div>
      )}

      {selectedOption === 'get' && (
        <div>
          <h2>Buscar usuario</h2>
          <input 
            type="text" 
            placeholder="ID del usuario" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
          />
          <button onClick={handleGetUser}>Buscar Usuario</button>
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
        <div>
          <h2>Actualizar usuario</h2>
          <input 
            type="text" 
            placeholder="ID del usuario" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Nuevo nombre de usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="Nuevo correo electrónico" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Nueva contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={handleUpdateUser}>Actualizar Usuario</button>
        </div>
      )}

      {selectedOption === 'delete' && (
        <div>
          <h2>Borrar usuario</h2>
          <input 
            type="text" 
            placeholder="ID del usuario" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
          />
          <button onClick={handleDeleteUser}>Borrar Usuario</button>
        </div>
      )}

      {/* Mensaje de éxito o error */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
