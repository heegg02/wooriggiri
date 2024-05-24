import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import Main from './main/Main.js'
import Login from './main/Login.js'
import Settings from './main/Settings.js'
import Community from './main/Community.js'
import User from './main/User.js'
import Post from './main/Post.js'
import CreatePost from './main/CreatePost.js'
import NotFound from './main/NotFound.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;