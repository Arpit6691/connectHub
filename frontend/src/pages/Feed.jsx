import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, Typography, Skeleton } from '@mui/material';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 }, maxWidth: '800px !important' }}>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <CreatePost onPostCreated={handlePostCreated} user={user} />
      </motion.div>

      <Box sx={{ mt: 5 }}>
        {loading ? (
          // Futuristic Loading Skeletons
          [1, 2, 3].map((n) => (
            <motion.div key={n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: n * 0.1 }}>
              <Box className="glass-card" sx={{ mb: 4, p: { xs: 3, sm: 4 }, borderRadius: '24px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Skeleton variant="circular" width={56} height={56} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Skeleton variant="text" width="40%" height={28} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
                    <Skeleton variant="text" width="20%" height={20} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                  </Box>
                </Box>
                <Skeleton variant="text" width="95%" height={24} sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
                <Skeleton variant="text" width="85%" height={24} sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
                <Skeleton variant="rectangular" height={350} sx={{ mt: 3, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.05)' }} />
              </Box>
            </motion.div>
          ))
        ) : posts.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {posts.map((post, i) => (
              <motion.div 
                key={post._id} 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }} 
                transition={{ duration: 0.6, delay: i * 0.05, type: 'spring', damping: 20 }}
              >
                <PostCard post={post} currentUser={user} />
              </motion.div>
            ))}
          </Box>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: 'spring' }}>
            <Box className="glass-card" sx={{ 
              textAlign: 'center', 
              py: 12, 
              px: 4,
              borderRadius: '24px',
              mt: 6,
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.5) 100%)',
            }}>
              <Sparkles size={64} color="#8B5CF6" style={{ marginBottom: 24, filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))' }} />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'white' }}>
                The Feed is Empty
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', maxWidth: '400px', mx: 'auto', lineHeight: 1.6 }}>
                You are the first to arrive. Share your thoughts and begin the conversation.
              </Typography>
            </Box>
          </motion.div>
        )}
      </Box>
    </Container>
  );
};

export default Feed;
