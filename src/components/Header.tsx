import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from '/logo.png';

const navItems = [
  { text: 'Start', path: '/' },
  { text: 'O nas', path: '/o-nas' },
  { text: 'Oferta', path: '/oferta' },
  { text: 'Dziennik budowy', path: '/dziennik-budowy' },
  { text: 'Kontakt', path: '/kontakt' },
];

const clientMenuItems = [
  { text: 'FAQ', path: '/faq' },
  { text: 'Kalkulator Kredytowy', path: '/kalkulator-kredytowy' },
  { text: 'Jak możemy pomóc?', path: '/jak-pomagamy' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box component={RouterLink} to="/" sx={{ display: 'inline-block', my: 2 }}>
        <img src={logo} alt="Logo Firmy" style={{ height: 40 }} />
      </Box>
      <Divider />
      <List>
        {/* Standardowe linki w menu mobilnym */}
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider>Dla klienta</Divider>
        {/* Linki z dropdownu dodane bezpośrednio do menu mobilnego */}
        {clientMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

   return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: 'primary.main', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.06)' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box component={RouterLink} to="/" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Box component="img" src={logo} alt="Logo Firmy" sx={{ height: { xs: 65, md: 70 }, mr: 2 }} />
            </Box>

            {/* Menu na Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {navItems.map((item) => (
                <RouterLink
                  key={item.text}
                  to={item.path}
                  style={{ textDecoration: 'none' }}
                >
                  {({ isActive }) => (
                    <Button
                      sx={{
                        mx: 1,
                        color: isActive ? 'secondary.main' : 'text.primary',
                        fontWeight: isActive ? 'bold' : 'normal',
                      }}
                    >
                      {item.text}
                    </Button>
                  )}
                </RouterLink>
              ))}
              
              <Button
                onClick={handleMenuOpen}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ mx: 1, color: 'text.primary' }}
              >
                Dla klienta
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {clientMenuItems.map((item) => (
                  <MenuItem key={item.text} component={RouterLink} to={item.path} onClick={handleMenuClose}>
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          anchor="right"
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}