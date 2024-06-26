import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateTodo from './Components/CreateTodo';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UpdateTodo from './Components/UpdateTodo';

const App = () => {
  const token =  localStorage.getItem('token');
  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={token ? <CreateTodo /> : <Navigate to="/login" />} />
      <Route path="/update/:id" element={<UpdateTodo />} />
    </Routes>
  );
};

export default App;
