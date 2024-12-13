import React from 'react';
import { Card, Avatar } from 'flowbite-react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Comment } from '../types';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <Card key={comment.id} className="bg-gray-300  hover:bg-indigo-200 transition duration-300 hover:scale-105">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{comment.name}</h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <span>{comment.email}</span>
              </div>
              <p className="text-gray-700">{comment.body}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};