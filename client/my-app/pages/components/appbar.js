import * as React from 'react';
import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import {Box,Stack,Item,Tab,Tabs} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
// import AddbuyerSeller from './addbuyerseller';
import Link from 'next/link'
// import { Link as MUILink } from '@mui/material';




const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['addbuyerSeller', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
             Blockchain CrowdFund
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link href="/">Home</Link>
                  
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link href="/components/campaign">Campaign</Link>
                  
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link href="/components/myasset">my assets</Link>
                  
                  </Typography>
                </MenuItem>
              
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ ml:38,flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                
                
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                 <Link href="/">Home</Link>
               
                
               
              </Button>
              <Button
                
                
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href="/components/campaign">Campaign</Link>
               
              </Button>
              <Button
                
                
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href="/components/myasset">my assets</Link>
               
              </Button>
            
          </Box>

          <Box mr={10} sx={{ flexGrow: 0 }}>
            <Tooltip title="Open service">
              <IconButton color='inherit' aria-label='menu' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography>Dashboard </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}

            >

              {/* <MenuItem onClick={handleCloseUserMenu}>

                <Link sx={{ textDecoration: 'none', color: 'inherit' }} href="/components/addbuyerseller">addbuyerseller</Link>




              </MenuItem> */}
              <MenuItem>


                <Link href="/components/launch">Launch</Link>

              </MenuItem>
              <MenuItem>
                <Link href="/components/pledge">Pledge</Link>

              </MenuItem>
              <MenuItem>
                <Link href="/components/unpledge">unPledge</Link>

              </MenuItem>
              <MenuItem>
                <Link href="/components/claim">Claim</Link>

              </MenuItem>
              <MenuItem>
                <Link href="/components/cancel">Cancel</Link>

              </MenuItem>
              <MenuItem>
                <Link href="/components/refund">Refund</Link>

              </MenuItem>
              {/* <MenuItem>
                <Link href="/components/selloff">selloff</Link>

              </MenuItem>
              <MenuItem>
                <Link href="/components/subscribe">subscribe</Link>

              </MenuItem> */}

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
