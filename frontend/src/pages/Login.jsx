import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Grid } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Hexagon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Grid container sx={{ minHeight: 'calc(100vh - 70px)' }}>
      {/* Left Branding Side (Hidden on Mobile) */}
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ 
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, bgcolor: 'primary.main', opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }} />
        <Box sx={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, bgcolor: 'secondary.main', opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }} />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box sx={{ textAlign: 'center', p: 4, maxWidth: 500 }}>
            <Hexagon size={80} color="#3B82F6" strokeWidth={1.5} style={{ marginBottom: 24 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'white' }}>
              Welcome back to <br />
              <span style={{ color: '#3B82F6' }}>ConnectHub</span>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.6 }}>
              Experience the next generation of social networking. Connect, share, and engage like never before.
            </Typography>
          </Box>
        </motion.div>
      </Grid>

      {/* Right Form Side */}
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 3
        }}
      >
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ width: '100%', maxWidth: '450px' }}
        >
          <Box className="glass" sx={{ p: { xs: 4, sm: 6 }, borderRadius: 4 }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: 'white' }}>
              Sign In
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Enter your credentials to access your account.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} color="#94A3B8" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} color="#94A3B8" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#94A3B8' }}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 4 }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<ArrowRight size={20} />}
                disabled={!email || !password}
                sx={{ 
                  py: 1.8, 
                  mb: 3, 
                  fontSize: '1.05rem',
                  background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
                  '&:hover': { background: 'linear-gradient(45deg, #2563eb, #7c3aed)' }
                }}
              >
                Sign In
              </Button>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link to="/signup" style={{ color: '#3B82F6', fontWeight: 600, textDecoration: 'none' }}>
                    Create one now
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default Login;
