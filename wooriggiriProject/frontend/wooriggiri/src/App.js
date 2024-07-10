import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Board from './content/Board.js';
import Main from './content/Main.js';
import PostDetail from './content/PostDetail.js'
import UserDetail from './content/UserDetail.js'
import MainLayout from './pages/MainLayout.js'
import Login from './login/Login.js'
import LoginForm from './login/LoginForm.js';
import SignUpForm from './login/SignUpForm.js';
import NotFound from './pages/NotFound';
import Admin from './admin/Admin.js'
import AdminUser from './admin/AdminUser.js'
import AdminBoard from './admin/AdminBoard.js'
import AdminPost from './admin/AdminPost.js'
import AdminComment from './admin/AdminComment.js'
import NotiesBoard from './content/NotiesBoard.js';

import { AuthProvider } from './contexts/AuthContext.js';
import AdminNoties from './admin/AdminNoties.js';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<MainLayout><Main/></MainLayout>}></Route>
                    <Route path="/login" element={<Login><LoginForm/></Login>}></Route>
                    <Route path="/signup" element={<Login><SignUpForm/></Login>}></Route>
                    <Route path="/noties">
                        <Route path="" element={<MainLayout><NotiesBoard/></MainLayout>}></Route>
                        <Route path="post/:postId" element={<MainLayout><PostDetail/></MainLayout>}></Route>
                        <Route path="*" element={<MainLayout><NotFound/></MainLayout>}></Route>
                    </Route>
                    <Route path="/community/:communityName">
                        <Route path="" element={<MainLayout><Board/></MainLayout>}></Route>
                        <Route path="post/:postId" element={<MainLayout><PostDetail/></MainLayout>}></Route>
                        <Route path="*" element={<MainLayout><NotFound/></MainLayout>}></Route>
                    </Route>
                    <Route path="/user/:userId">
                        <Route path="" element={<MainLayout><UserDetail/></MainLayout>}></Route>
                        <Route path="*" element={<MainLayout><NotFound/></MainLayout>}></Route>
                    </Route>
                    <Route path="/admin/*">
                        <Route path="user" element={<MainLayout><Admin><AdminUser/></Admin></MainLayout>}></Route>
                        <Route path="board" element={<MainLayout><Admin><AdminBoard/></Admin></MainLayout>}></Route>
                        <Route path="post" element={<MainLayout><Admin><AdminPost/></Admin></MainLayout>}></Route>
                        <Route path="comment" element={<MainLayout><Admin><AdminComment/></Admin></MainLayout>}></Route>
                        <Route path="noties" element={<MainLayout><Admin><AdminNoties/></Admin></MainLayout>}></Route>
                        <Route path="*" element={<MainLayout><NotFound/></MainLayout>}></Route>
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