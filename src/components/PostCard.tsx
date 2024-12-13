import React from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, ChatBubbleLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Post } from '../types';
import { Button } from './Button';

interface PostCardProps {
  post: Post;
  userName: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, userName }) => {
  return (
    <Card className="transform h-65  bg-gray-300  hover:bg-indigo-200 transition duration-300 hover:scale-105 ">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <UserCircleIcon className="h-8 w-8 text-blue-600" />
          <span className="font-medium text-gray-700">{userName}</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-gray-500">
          <ChatBubbleLeftIcon className="h-5 w-5" 
          />
          <span className="text-sm">Ver comentarios</span>
        </div>
        
        <Button
          as={Link}
          to={`/post/${post.id}`}
          variant="outline"
          size="sm"
          icon={<ArrowRightIcon className="h-4 w-4" />}
          gradientDuoTone="blue"
          className="hover:bg-blue-600 hover:text-white rounded-lg"
        >
          Leer más
        </Button>
      </div>
    </Card>
  );
};