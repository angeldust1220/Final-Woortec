'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LinkIcon from '@mui/icons-material/Link';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <List>
        <ListItem button onClick={() => handleNavigation('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/connections')}>
          <ListItemIcon>
            <LinkIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Connections" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/strategy')}>
          <ListItemIcon>
            <LinkIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Strategy" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/relax')}>
          <ListItemIcon>
            <LinkIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Relax" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/aggressive')}>
          <ListItemIcon>
            <LinkIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Aggressive" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/optimization')}>
          <ListItemIcon>
            <LinkIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Optimization" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
