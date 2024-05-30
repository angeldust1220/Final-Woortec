import React, { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Woortec
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          {children}
        </Container>
      </div>
    </div>
  );
};

export default Layout;
