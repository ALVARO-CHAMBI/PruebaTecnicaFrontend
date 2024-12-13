import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import { PostList } from './pages/PostList';
import { PostDetail } from './pages/PostDetail';


function App() {
  return (
    <ApiProvider>
      <BrowserRouter> 
      
        <div className="min-h-screen bg-cover bg-center bg-[url('../src/assets/bg.jpg')]">
        <div className="flex flex-col h-auto py-8 ">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </div>
        </div>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;