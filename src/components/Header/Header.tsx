'use client'
import React, { useState, useEffect, useContext } from 'react';
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

import { useRouter } from 'next/navigation';
import { CgProfile } from "react-icons/cg";


import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

import { FiShoppingCart } from "react-icons/fi";

import { CartContext } from '@/context/CartContext'

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { qtdTotal } = useContext(CartContext)

  const { data: session, status } = useSession()
  const router = useRouter()

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

  useEffect(() => {
    console.log(qtdTotal)
  },[qtdTotal])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar className='relative' disableGutters>
          {
            status === 'authenticated' && (
              <div onClick={() => router.push('/carrinho')} className='absolute cursor-pointer w-[200px] mx-auto flex justify-center items-center left-0 right-0'>
                {qtdTotal > 0 && (
                  <p className='absolute cursor-pointer bg-white rounded-full text-black w-[25px] h-[25px] mx-auto flex justify-center right-0 left-0 -translate-y-3 translate-x-4'>{qtdTotal}</p>
                )}
                <Link href={'/carrinho'}>
                  <FiShoppingCart className='cursor-pointer' size={25}/>
                </Link>
              </div>
            )
          }
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
                  <Link href={'/'}>
                    Home
                  </Link>  
                </Typography>
              </MenuItem>
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
                <Link href={'/'}>Home</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={'/produtos'}>Produtos</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={'/sobre'}>Sobre</Link>
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
                {status === 'authenticated' && (
                  <MenuItem onClick={() => {
                    handleCloseUserMenu(),
                    router.push('/profile')
                  }}>
                    <Typography textAlign="center">Meu perfil</Typography>
                  </MenuItem>
                )}
                {
                  session?.user?.role === 'admin' && (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link href={'/painel-admin'}>
                          Painel Admin
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