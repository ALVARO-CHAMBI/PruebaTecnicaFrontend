import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, User, Mail } from 'lucide-react';
import { Post, Comment, User as UserType } from '../types';
import { CommentList } from '../components/CommentList';
import { Button } from '../components/Button';
import { useApi } from '../context/ApiContext';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost, getComments, getUser } = useApi();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        const postData = await getPost(id);
        const [commentsData, userData] = await Promise.all([
          getComments(id),
          getUser(postData.userId)
        ]);
        
        setPost(postData);
        setComments(commentsData);
        setAuthor(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, getPost, getComments, getUser]);

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!post || !author) {
    return (
      <div className=" max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 mb-4">Post no encontrado</p>
        <Link to="/">
          <Button 
          variant="outline" 
          icon={<ArrowLeft size={16} 
          />
          }
          >
            Volver a la lista
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className=" max-w-4xl mx-auto px-4 py-8">
      <Link to="/">
        <Button 
        variant="outline" 
        size="sm" 
        icon={<ArrowLeft size={16} 
        />
        }
        >
          Volver a la lista
        </Button>
      </Link>

      <article className=" bg-white rounded-lg shadow-lg p-8 my-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{post.title}</h1>
        
        <div className="flex items-center gap-4 p-4 bg-gray-300 rounded-lg mb-8">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{author.name}</h3>
            <div className="flex items-center gap-2 text-gray-900 text-sm">
              <Mail className="h-4 w-4" />
              <span>{author.email}</span>
            </div>
          </div>
        </div>
        
        <div className="prose max-w-none mb-12">
          <p className="text-gray-900 text-lg leading-relaxed whitespace-pre-line ">
            {post.body}
          </p>
        </div>
        
        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Comentarios ({comments.length})
          </h2>
          <CommentList comments={comments} />
        </div>
      </article>
    </div>
  );
};