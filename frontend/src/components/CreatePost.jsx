import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Avatar, Typography, LinearProgress } from '@mui/material';
import { ImagePlus, X, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const CreatePost = ({ onPostCreated, user }) => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const MAX_CHARS = 500;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) {
      toast.error('Post must contain either text or an image');
      return;
    }
    
    if (text.length > MAX_CHARS) {
      toast.error(`Text cannot exceed ${MAX_CHARS} characters`);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/posts', { text, image: imagePreview });
      setText('');
      setImagePreview('');
      onPostCreated(res.data);
      toast.success('Published successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const charCountColor = text.length > MAX_CHARS ? 'error.main' : text.length > MAX_CHARS * 0.8 ? 'warning.main' : 'text.secondary';

  return (
    <Box className="glass-card" sx={{ mb: 4, borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
      {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />}
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, border: '2px solid rgba(255,255,255,0.1)' }}>
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                maxRows={6}
                placeholder="Share your thoughts with the universe..."
                variant="standard"
                value={text}
                onChange={(e) => setText(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: '1.1rem', color: 'white', bgcolor: 'transparent', lineHeight: 1.6 }
                }}
              />
            </Box>
          </Box>
          
          <AnimatePresence>
            {imagePreview && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
              >
                <Box sx={{ position: 'relative', mt: 2, borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
                  <IconButton 
                    onClick={() => setImagePreview('')} 
                    sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', backdropFilter: 'blur(4px)', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}
                  >
                    <X size={20} />
                  </IconButton>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton component="label" sx={{ color: 'primary.main', bgcolor: 'rgba(59, 130, 246, 0.1)', '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.2)' } }}>
                <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                <ImagePlus size={22} />
              </IconButton>
              {text.length > 0 && (
                <Typography variant="caption" sx={{ color: charCountColor, fontWeight: 500 }}>
                  {text.length} / {MAX_CHARS}
                </Typography>
              )}
            </Box>
            
            <Button 
              type="submit" 
              variant="contained" 
              endIcon={<Send size={18} />}
              disabled={loading || (!text.trim() && !imagePreview) || text.length > MAX_CHARS}
              sx={{ 
                borderRadius: '24px', 
                px: 4, 
                py: 1,
                background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
                '&:hover': { background: 'linear-gradient(45deg, #2563eb, #7c3aed)' }
              }}
            >
              Publish
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;
