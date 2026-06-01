import React, { useState } from 'react';
import { Box, Avatar, Typography, IconButton, TextField, Button, Collapse, Divider } from '@mui/material';
import { Heart, MessageCircle, Share2, Send, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import api from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const PostCard = ({ post, currentUser }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const isLiked = likes.includes(currentUser?.username);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    const previousLikes = [...likes];
    setLikes(isLiked ? likes.filter(l => l !== currentUser?.username) : [...likes, currentUser?.username]);
    
    try {
      const res = await api.put(`/posts/${post._id}/like`);
      setLikes(res.data);
    } catch (error) {
      setLikes(previousLikes);
      toast.error('Failed to like post');
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsCommenting(true);
    try {
      const res = await api.post(`/posts/${post._id}/comment`, { text: commentText });
      setComments(res.data);
      setCommentText('');
    } catch (error) {
      toast.error('Failed to post comment');
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <Box className="glass-card" sx={{ mb: 4, borderRadius: '24px', overflow: 'hidden' }}>
      
      {/* Header */}
      <Box sx={{ px: 3, pt: 3, pb: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, fontWeight: 600, border: '2px solid rgba(255,255,255,0.1)' }}>
          {post.username.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight="700" sx={{ color: 'white', lineHeight: 1.2 }}>
            {post.username}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Box>
        <IconButton sx={{ color: 'text.secondary' }}>
          <MoreHorizontal size={20} />
        </IconButton>
      </Box>
      
      {/* Text Content */}
      {post.text && (
        <Box sx={{ px: 3, py: 1 }}>
          <Typography variant="body1" sx={{ color: '#E2E8F0', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontSize: '1.05rem' }}>
            {post.text}
          </Typography>
        </Box>
      )}

      {/* Image Content */}
      {post.image && (
        <Box sx={{ px: 3, pb: 2, pt: post.text ? 2 : 0 }}>
          <Box sx={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
            <img
              src={post.image}
              alt="Post content"
              style={{ width: '100%', maxHeight: 600, objectFit: 'cover', display: 'block' }}
            />
          </Box>
        </Box>
      )}

      <Divider sx={{ mx: 3, borderColor: 'rgba(255,255,255,0.05)' }} />

      {/* Actions */}
      <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <motion.div whileTap={{ scale: 0.8 }}>
            <IconButton 
              onClick={handleLike} 
              sx={{ 
                color: isLiked ? '#ef4444' : 'text.secondary',
                bgcolor: isLiked ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                '&:hover': { bgcolor: isLiked ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)' }
              }}
            >
              <Heart size={22} fill={isLiked ? '#ef4444' : 'none'} />
            </IconButton>
          </motion.div>
          <Typography variant="body2" sx={{ ml: 1, color: isLiked ? '#ef4444' : 'text.secondary', fontWeight: 600 }}>
            {likes.length}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={() => setShowComments(!showComments)}
            sx={{ color: showComments ? 'primary.main' : 'text.secondary', '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.1)' } }}
          >
            <MessageCircle size={22} />
          </IconButton>
          <Typography variant="body2" sx={{ ml: 1, color: showComments ? 'primary.main' : 'text.secondary', fontWeight: 600 }}>
            {comments.length}
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ color: 'text.secondary' }}>
          <Share2 size={20} />
        </IconButton>
      </Box>

      {/* Comments Section */}
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', px: 3, py: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
              {currentUser?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <TextField
              fullWidth
              size="small"
              placeholder="Write a comment..."
              variant="outlined"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={isCommenting}
              InputProps={{
                sx: { borderRadius: '20px', bgcolor: 'rgba(255,255,255,0.05)', color: 'white', pr: 0.5 }
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              disabled={!commentText.trim() || isCommenting} 
              sx={{ minWidth: '40px', width: '40px', height: '40px', borderRadius: '50%', p: 0, background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)' }}
            >
              <Send size={18} />
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {comments.map((comment, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem', bgcolor: 'secondary.main' }}>
                  {comment.username.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 2, borderRadius: '16px', borderTopLeftRadius: 0, border: '1px solid rgba(255,255,255,0.03)' }}>
                    <Typography variant="subtitle2" fontWeight="700" sx={{ color: 'white', mb: 0.5 }}>
                      {comment.username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E2E8F0', lineHeight: 1.5 }}>
                      {comment.text}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', ml: 1, mt: 0.5, display: 'block' }}>
                    {moment(comment.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default PostCard;
