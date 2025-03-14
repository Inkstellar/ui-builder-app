import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { MdMenu } from "react-icons/md";
import { Box, Stack } from '@mui/material';

interface HeaderProps {
    actionsCenter?: React.ReactNode;
    actionsRight?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({actionsCenter,actionsRight}) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MdMenu />
        </IconButton>
        <Typography variant="h6">
          UI Builder
        </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
        {actionsCenter}
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
        {actionsRight}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;