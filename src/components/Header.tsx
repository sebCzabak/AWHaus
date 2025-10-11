import React, { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
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
import { Link as ScrollLink } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const logoPath = '/LogoW.png'; 


const navItems = [
  { text: 'Start', path: '/' },
  { text: 'Budynek', to: 'budynek' },
  {text:'Lokalizacja',to:'lokalizacja'},
  { text: 'Dlaczego warto', to: 'dlaczego-warto' },
  {text:'Oferta',path:'/oferta'},
  { text: 'Kontakt', path: '/kontakt' },

];

const clientMenuItems = [
  { text: 'Dziennik budowy', path: '/dziennik-budowy' }, 
  { text: 'FAQ', path: '/faq' },
  { text: 'Kalkulator Kredytowy', path: '/kalkulator-kredytowy' },
  { text: 'Jak możemy pomóc?', path: '/jak-pomagamy' },
];

export function Header() {
  const location = useLocation();
  //const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // // Logika do obsługi kliknięcia linku scrollującego z innej podstrony
  // const handleScrollClick = (to: string) => {
  //   if (isHomePage) {
  //     // Jeśli jesteśmy na stronie głównej, po prostu przewiń
  //     const scroll = ScrollLink.prototype as any;
  //     scroll.scrollTo(to, {
  //       spy: true, 
  //       smooth: true, 
  //       offset: -70, 
  //       duration: 500
  //     });
  //   } else {
  //     // Jeśli jesteśmy na innej podstronie, wróć na stronę główną, przekazując ID sekcji
  //     navigate('/', { state: { scrollTo: to } });
  //   }
  // };


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box component={RouterLink} to="/" sx={{ display: 'inline-block', my: 2 }}>
        {/* Poprawione logo w menu mobilnym */}
        <img src={logoPath} alt="Logo Firmy" style={{ height: 40 }} />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            {/* Poprawiona logika dla menu mobilnego */}
            {isHomePage && item.to ? (
              <ScrollLink to={item.to} spy={true} smooth={true} offset={-70} duration={500} style={{ width: '100%' }}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ScrollLink>
            ) : (
              <ListItemButton component={RouterLink} to={item.path || '/'} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
        <Divider>Dla klienta</Divider>
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
        elevation={0}
        sx={{
          backgroundColor: '#f1f1ea',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            backgroundColor: 'primary.main',
            width: isScrolled ? '100%' : '0%',
            transition: 'width 0.4s ease-out',
          },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box component={RouterLink} to="/" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src={logoPath} 
                alt="Logo Firmy"
                sx={{ height: { xs: 55, md: 60 }, transition: 'all 0.3s' }}
              />
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {navItems.map((item) =>
                item.to && isHomePage ? (
                  <Button
                    key={item.text}
                    component={ScrollLink}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    sx={{ mx: 1, color: 'text.primary' }}
                  >
                    {item.text}
                  </Button>
                ) : (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path || `/#${item.to}`} // Jeśli na innej podstronie, linkuj do strony głównej z hashem
                    sx={{ mx: 1, color: 'text.primary' }}
                  >
                    {item.text}
                  </Button>
                )
              )}
              <Button onClick={handleMenuOpen} endIcon={<KeyboardArrowDownIcon />} sx={{ mx: 2, color: 'text.primary' }}>
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
                  <MenuItem
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    onClick={handleMenuClose}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.secondry' }}
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
