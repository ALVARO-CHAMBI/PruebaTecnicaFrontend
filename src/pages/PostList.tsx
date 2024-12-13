import React, { useEffect, useState } from 'react';
import { TextInput, Select, Spinner } from 'flowbite-react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Post, User } from '../types';
import { PostCard } from '../components/PostCard';
import { Pagination } from '../components/Pagination';
import { Button } from '../components/Button';
import { useApi } from '../context/ApiContext';

const POSTS_PER_PAGE = 7;

export const PostList: React.FC = () => {
  const { getPosts, getUsers } = useApi();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | number>('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, usersData] = await Promise.all([
          getPosts(),
          getUsers()
        ]);
        setPosts(postsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getPosts, getUsers]);

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesUser = !selectedUser || post.userId === Number(selectedUser);
    return matchesSearch && matchesUser;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner 
        size="xl" 
        color="blue" 
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg bg-opacity-10 max-w-4xl mx-auto px-4 py-8">
      <div className=" border-2 border-blue-900 rounded-lg bg-blue-300 bg-opacity-100 px-4 py-12 mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Blog Posts</h1>
        <p className="text-blue-500 text-2xl">Explora las últimas publicaciones de nuestra comunidad</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <TextInput
            icon={MagnifyingGlassIcon}
            placeholder="Buscar por título o contenido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select
            icon={FunnelIcon}
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value ? Number(e.target.value) : '')}
          >
            <option value="">Todos los usuarios</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </Select>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No se encontraron publicaciones</p>
          <Button
            variant="outline"
            gradientDuoTone="blue"
            onClick={() => {
              setSearchTerm('');
              setSelectedUser('');
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 mb-8">
            {currentPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                userName={getUserName(post.userId)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};