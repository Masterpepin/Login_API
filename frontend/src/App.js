import React, { useState } from 'react';
import './App.css';  // Importa el archivo CSS

const App = () => {
  const [selectedOption, setSelectedOption] = useState(''); // Opción seleccionada del menú
  const [searchUsername, setSearchUsername] = useState(''); // Para buscar un usuario
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' }); // Para crear un usuario
  const [updateUser, setUpdateUser] = useState({ id: '', username: '', email: '', password: '' }); // Para actualizar un usuario
  const [deleteUsername, setDeleteUsername] = useState(''); // Para borrar un usuario
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);  // Cambiar la opción seleccionada
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestión de Usuarios</h1>
      </header>

      <main className="app-main">
        {/* Menú desplegable para seleccionar una acción */}
        <div className="menu-section">
          <h2>Selecciona una opción</h2>
          <select className="dropdown" value={selectedOption} onChange={handleOptionChange}>
            <option value="">-- Selecciona --</option>
            <option value="create">Crear un nuevo usuario</option>
            <option value="search">Buscar un usuario</option>
            <option value="update">Actualizar un usuario</option>
            <option value="delete">Borrar un usuario</option>
          </select>
        </div>

        {/* Formulario para crear un nuevo usuario */}
        {selectedOption === 'create' && (
          <div className="form-section">
            <h2>Crear Usuario</h2>
            <form onSubmit={(e) => { e.preventDefault(); /* Lógica de creación */ }}>
              <input
                className="input"
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="Nombre de usuario"
              />
              <input
                className="input"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Correo electrónico"
              />
              <input
                className="input"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Contraseña"
              />
              <button className="btn" type="submit">Crear Usuario</button>
            </form>
          </div>
        )}

        {/* Formulario para buscar un usuario */}
        {selectedOption === 'search' && (
          <div className="form-section">
            <h2>Buscar Usuario</h2>
            <form onSubmit={(e) => { e.preventDefault(); /* Lógica de búsqueda */ }}>
              <input
                className="input"
                type="text"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                placeholder="Nombre de usuario"
              />
              <button className="btn" type="submit">Buscar</button>
            </form>
          </div>
        )}

        {/* Formulario para actualizar un usuario */}
        {selectedOption === 'update' && (
          <div className="form-section">
            <h2>Actualizar Usuario</h2>
            <form onSubmit={(e) => { e.preventDefault(); /* Lógica de actualización */ }}>
              <input
                className="input"
                type="text"
                value={updateUser.id}
                onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
                placeholder="ID del usuario"
              />
              <input
                className="input"
                type="text"
                value={updateUser.username}
                onChange={(e) => setUpdateUser({ ...updateUser, username: e.target.value })}
                placeholder="Nuevo nombre de usuario"
              />
              <input
                className="input"
                type="email"
                value={updateUser.email}
                onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                placeholder="Nuevo correo electrónico"
              />
              <input
                className="input"
                type="password"
                value={updateUser.password}
                onChange={(e) => setUpdateUser({ ...updateUser, password: e.target.value })}
                placeholder="Nueva contraseña"
              />
              <button className="btn" type="submit">Actualizar Usuario</button>
            </form>
          </div>
        )}

        {/* Formulario para borrar un usuario */}
        {selectedOption === 'delete' && (
          <div className="form-section">
            <h2>Borrar Usuario</h2>
            <form onSubmit={(e) => { e.preventDefault(); /* Lógica de borrado */ }}>
              <input
                className="input"
                type="text"
                value={deleteUsername}
                onChange={(e) => setDeleteUsername(e.target.value)}
                placeholder="Nombre de usuario"
              />
              <button className="btn delete-btn" type="submit">Borrar Usuario</button>
            </form>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Aplicación de Gestión de Usuarios</p>
      </footer>
    </div>
  );
};

export default App;
