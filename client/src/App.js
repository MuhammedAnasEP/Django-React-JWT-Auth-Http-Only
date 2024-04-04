import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import './App.css';
import Home from './view/Home';
import Login from './view/Auth/Login';
import Register from './view/Auth/Register';
import AuthMiddleware from './middleware/Auth'; // Reaname middle  ware
import User from './view/Auth/User';

function App() {
  return (
    <Routes>
      <Route path='/' exact element={<Home />}>

      </Route>
      <Route path='/auth'>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>

        {/* protect user page with AuthMiddleware */}
        <Route path='user' element={<AuthMiddleware />}>
          <Route index element={<User />}></Route>
        </Route>

      </Route>
      <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
)}

export default App;
