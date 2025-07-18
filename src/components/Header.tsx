import  { useState } from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, Container, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon
} from '@mui/material';
import { Link as ScrollLink } from 'react-scroll'; // <--- IMPORT

import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type NavItem = {
  text: string;
  to?: string;
  href?: string;
  icon?: React.ReactElement;
  highlight?: boolean;
  dropdown?: boolean;
};
const navItems:NavItem[] = [
  { text: 'Start', to: 'start', highlight: true },
  { text: 'O nas', to: 'o-nas' },
  { text: 'Oferta', to: 'oferta' },
  { text: 'Dla klienta', href: '/dla-klienta' },
  { text: 'Dziennik budowy', href: '/dziennik-budowy' },
  { text: 'Kontakt', to: 'kontakt' },
];

const navButtonStyle = { color: 'text.primary', mx: 1, width: '100%' };

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <span style={{ color: '#af2249' }}>struxi</span> DEWELOPER
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            {item.to ? ( // Jeśli to link do scrollowania
              <ScrollLink to={item.to} spy={true} smooth={true} offset={-70} duration={500} style={{ width: '100%' }}>
                <ListItemButton sx={{ textAlign: 'left' }}>
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.text} primaryTypographyProps={{ color: item.highlight ? 'primary' : 'inherit', fontWeight: item.highlight ? 'bold' : 'normal' }} />
                </ListItemButton>
              </ScrollLink>
            ) : ( // Jeśli to zwykły link
              <ListItemButton component="a" href={item.href} sx={{ textAlign: 'left' }}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.06)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, flexGrow: 1, fontWeight: 700, textDecoration: 'none', color: 'text.primary' }}>
              <span style={{ color: '#af2249' }}>struxi</span> DEWELOPER
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {navItems.map((item) => (
                item.to ? ( // Jeśli to link do scrollowania
                  <ScrollLink key={item.text} to={item.to} spy={true} smooth={true} offset={-70} duration={500}>
                    <Button endIcon={item.dropdown ? <KeyboardArrowDownIcon /> : null} sx={{ ...navButtonStyle, color: item.highlight ? 'primary.main' : 'text.primary' }}>
                      {item.text}
                    </Button>
                  </ScrollLink>
                ) : ( // Jeśli to zwykły link
                  <Button key={item.text} component="a" href={item.href} startIcon={item.icon} endIcon={item.dropdown ? <KeyboardArrowDownIcon /> : null} sx={{ ...navButtonStyle, color: item.highlight ? 'primary.main' : 'text.primary' }}>
                    {item.text}
                  </Button>
                )
              ))}
            </Box>

            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <nav>
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} anchor="right" sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}>
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}