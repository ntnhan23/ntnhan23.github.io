import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SocialSidebar from './components/SocialSidebar';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <div className="relative">
      <Header />
      <SocialSidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </div>
  );
}

export default App;
