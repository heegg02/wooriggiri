import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Board from './content/Board.js';
import Main from './content/Main.js';
import MainLayout from './pages/MainLayout.js'
import Login from './login/Login.js'
import LoginForm from './login/LoginForm.js';
import SignUpForm from './login/SignUpForm.js';
import NotFound from './pages/NotFound'

import { AuthProvider } from './contexts/AuthContext.js';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<MainLayout><Main/></MainLayout>}></Route>
                    <Route path="/login" element={<Login><LoginForm/></Login>}></Route>
                    <Route path="/signup" element={<Login><SignUpForm/></Login>}></Route>
                    <Route path="/community/:communityName">
                        <Route path="" element={<MainLayout><Board/></MainLayout>}></Route>
                        <Route path="post/:postId" element={<MainLayout><Board/></MainLayout>}></Route>
                    </Route>
                    <Route path="*" element={<NotFound/>}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;


{/* <Routes>
<Route path="/" element={<Main/>}></Route>
<Route path="/login" element={<Login/>}></Route>
<Route path="/settings" element={<Settings/>}></Route>
<Route path="/community/:communityName" >
  <Route path="createPost" element={<CreatePost/>}></Route>
  <Route path=":postId" element={<Post/>}></Route>
  <Route path="" element={<Community/>}></Route>
</Route>
<Route path="/user/:userName">
  <Route path="createPost" element={<CreatePost/>}></Route>
  <Route path=":postId" element={<Post/>}></Route>
  <Route path="" element={<User/>}></Route>
</Route>
<Route path="/createPost" element={<CreatePost/>}></Route>
<Route path="*" element={<NotFound/>}></Route>
</Routes> */}