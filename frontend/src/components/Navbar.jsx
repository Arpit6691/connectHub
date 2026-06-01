import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar, useScrollTrigger, Container, InputBase } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Hexagon, LogOut, User as UserIcon, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={trigger ? 4 : 0}
      sx={{ 
        bgcolor: trigger ? 'rgba(15, 23, 42, 0.85)' : 'transparent', 
        backdropFilter: trigger ? 'blur(12px)' : 'none',
        borderBottom: trigger ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }} 
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '70px', display: 'flex', justifyContent: 'space-between' }}>
          
          {/* Logo Section */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
            <Box 
              component={Link} 
              to="/" 
              sx={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}
            >
              <Hexagon size={30} color="#3B82F6" strokeWidth={2.5} />
              <Typography 
                variant="h6" 
                sx={{ 
                  ml: 1.5, 
                  fontWeight: 800, 
                  background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                ConnectHub
              </Typography>
            </Box>
          </motion.div>

          {/* Center Search Bar */}
          <Box sx={{ flex: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: 'rgba(255,255,255,0.05)', 
              borderRadius: '20px', 
              px: 2, 
              py: 0.75,
              width: '100%',
              maxWidth: '400px',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s ease',
              '&:focus-within': {
                bgcolor: 'rgba(255,255,255,0.1)',
                borderColor: 'primary.main',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)'
              }
            }}>
              <Search size={18} color="#94A3B8" />
              <InputBase 
                placeholder="Search ConnectHub..."
                sx={{ ml: 1, flex: 1, color: 'white', fontSize: '0.9rem' }}
              />
            </Box>
          </Box>

          {/* Right Profile Section */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.secondary', fontWeight: 500 }}>
                  Hi, <span style={{ color: 'white' }}>{user.username}</span>
                </Typography>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    onClick={handleMenu}
                    sx={{ p: 0.5, border: '2px solid transparent', '&:hover': { borderColor: 'primary.main' }, transition: 'all 0.2s ease' }}
                  >
                    <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '1rem', fontWeight: 'bold' }}>
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </motion.div>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      mt: 1.5,
                      bgcolor: 'background.paper',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      '& .MuiMenuItem-root': {
                        px: 2, py: 1.5,
                        gap: 1.5,
                        borderRadius: 1,
                        mx: 1,
                        mb: 0.5
                      }
                    }
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleClose}>
                    <UserIcon size={18} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: '#ef4444' }}>
                    <LogOut size={18} />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button 
                  onClick={() => navigate('/login')}
                  sx={{ color: 'text.secondary', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.05)' } }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/signup')}
                  sx={{ 
                    background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
                    '&:hover': { background: 'linear-gradient(45deg, #2563eb, #7c3aed)' }
                  }}
                >
                  Get Started
                </Button>
              </Box>
            )}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
