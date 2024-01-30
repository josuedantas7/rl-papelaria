'use client'
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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

import logo from '@/assets/logo-papelaria2-removebg-preview.png'
import Image from 'next/image';
import Link from 'next/link';

import { CgProfile } from "react-icons/cg";


import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

import { api } from '@/lib/api';

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [userAdmin, setUserAdmin] = useState<null | boolean>(null)

  const { data: session, status } = useSession()

  useEffect(() => {
    async function getCurrentUser(){
      const response = await api.get(`/api/users/${session?.user?.email}`)

      console.log(response)

      if (response.data.role === 'admin'){
        setUserAdmin(true)
      }
    }
    getCurrentUser()
  },[session])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
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
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Image priority={true} className='rounded-full w-[90px] h-[70px]' alt='Logo loja' src={logo} />
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
              {
                status === 'unauthenticated' && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link href={'/login'}>
                        Login
                      </Link>  
                    </Typography>
                  </MenuItem>
                )
              }
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link href={'/produtos'}>
                    Produtos
                  </Link>  
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                <Link href={'/sobre'}>
                  Sobre
                </Link>
              </Typography>
            </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            <Image priority={true} className='rounded-full w-[90px] h-[70px]' alt='Logo loja' src={logo} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Produtos
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Sobre
              </Button>
              {
                status === 'unauthenticated' && (
                  <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link href={'/login'}>
                    Login
                  </Link>
                </Button>
                )
              }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {
                  status === 'authenticated' && session.user ? (
                    <Avatar alt="Remy Sharp" src={session?.user?.image || ''} />
                  ) : status === 'authenticated' ? (
                    <CgProfile className='text-2xl'/>
                  ) : null
                }
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                {
                  userAdmin && (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link href={'/cadastrar-admin'}>
                          Cadastrar Admin
                        </Link>
                      </Typography>
                    </MenuItem>
                  )
                }
                <MenuItem onClick={() => {
                  signOut()
                  handleCloseUserMenu()
                }}>
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;