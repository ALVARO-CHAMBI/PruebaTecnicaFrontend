import React, { createContext, useContext } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

interface ApiContextType {
  getPosts: () => Promise<any>;
  getPost: (id: string) => Promise<any>;
  getComments: (postId: string) => Promise<any>;
  getUsers: () => Promise<any>;
  getUser: (id: number) => Promise<any>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getPosts = () => api.get('/posts').then(res => res.data);
  const getPost = (id: string) => api.get(`/posts/${id}`).then(res => res.data);
  const getComments = (postId: string) => api.get(`/posts/${postId}/comments`).then(res => res.data);
  const getUsers = () => api.get('/users').then(res => res.data);
  const getUser = (id: number) => api.get(`/users/${id}`).then(res => res.data);

  return (
    <ApiContext.Provider value={{ getPosts, getPost, getComments, getUsers, getUser }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};