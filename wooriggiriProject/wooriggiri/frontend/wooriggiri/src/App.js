import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import Main from './pages/Main'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Community from './pages/Community'
import User from './pages/User'
import Post from './pages/Post'
import CreatePost from './pages/CreatePost'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/login/*" element={<Login/>}></Route>
        <Route path="/settings/*" element={<Settings/>}></Route>
        <Route path="/community/*" element={<CreatePost/>}></Route>
        <Route path="/user/*" element={<CreatePost/>}></Route>
        <Route path="/createPost/*" element={<CreatePost/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
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