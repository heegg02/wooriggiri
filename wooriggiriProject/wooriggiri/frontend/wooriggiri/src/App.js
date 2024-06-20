import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Community from './components/Community.js';
import MainContent from './components/MainContent.js';
import MainLayout from './pages/MainLayout.js'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

import { AuthProvider } from './contexts/AuthContext.js';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<MainLayout><MainContent/></MainLayout>}></Route>
                    <Route path="/login/*" element={<Login/>}></Route>
                    <Route path="/community/*">
                        <Route path="" element={<MainLayout><Community/></MainLayout>}></Route> 
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