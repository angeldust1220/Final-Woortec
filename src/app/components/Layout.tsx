'use client';

import React, { ReactNode, useState, useMemo } from 'react';
import { 
  AppBar, Toolbar, Typography, Container, CssBaseline, 
  Box, Drawer, IconButton, ThemeProvider, createTheme, PaletteMode 
} from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const drawerWidth = 240;

  // Toggle theme mode between light and dark
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Memoized custom theme to avoid unnecessary re-renders
  const customTheme = useMemo(() => createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#00BFA6',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#303030',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === 'light' ? 'rgba(0, 191, 166, 0.8)' : 'rgba(51, 51, 51, 0.8)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: mode === 'light' ? 'rgba(245, 245, 245, 0.8)' : 'rgba(66, 66, 66, 0.8)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  }), [mode]);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* Drawer for Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Sidebar />
        </Drawer>
        
        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            ml: `${drawerWidth}px`,
          }}
        >
          {/* AppBar with theme toggle */}
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Woortec
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                sx={{ ml: 1 }}
                onClick={toggleColorMode}
                color="inherit"
              >
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Container>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
