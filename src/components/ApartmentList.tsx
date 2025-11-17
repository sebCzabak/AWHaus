import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'


import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { db } from '../data/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Investment, Apartment } from '../data/investments';

interface FlatApartment extends Apartment {
  investmentId: string;
  investmentName: string;
}

export function ApartmentList() {
  const [apartments, setApartments] = useState<FlatApartment[]>([]);
  const [_loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllApartments = async () => {
      const allApartments: FlatApartment[] = [];
      const querySnapshot = await getDocs(collection(db, 'investments'));

      querySnapshot.forEach((doc) => {
        const investment = doc.data() as Investment;
        investment.apartments.forEach((apt) => {
          allApartments.push({
            ...apt,
            investmentId: doc.id,
            investmentName: investment.name,
          });
        });
      });
       allApartments.sort((a, b) => {
        const numA = parseInt(a.id);
        const numB = parseInt(b.id);
        const charA = a.id.slice(-1);
        const charB = b.id.slice(-1);

        if (numA < numB) return -1;
        if (numA > numB) return 1;
        
        // Jeśli numery są takie same, sortuj po literze
        if (charA < charB) return -1;
        if (charA > charB) return 1;

        return 0;
      });
      setApartments(allApartments);
      setLoading(false);
    };

    fetchAllApartments();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 8 }}
    >
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
      >
        Dostępne Mieszkania
      </Typography>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ border: 'none', fontWeight: 600, color: '#212121' }}>Nr Lokalu</TableCell>
              <TableCell sx={{ border: 'none', fontWeight: 600, color: '#212121' }}>Metraż (m²)</TableCell>
              <TableCell sx={{ border: 'none', fontWeight: 600, color: '#212121' }}>Pokoje</TableCell>
              <TableCell sx={{ border: 'none', fontWeight: 600, color: '#212121' }}>Ekspozycja</TableCell>
              <TableCell sx={{ border: 'none', fontWeight: 600, color: '#212121' }}>Ogród (m²)</TableCell>
              <TableCell sx={{ border: 'none', fontWeight: 600, color: '#212121' }}>Status</TableCell>
              <TableCell align="center" sx={{ border: 'none', fontWeight: 600, color: '#212121' }}>Premium</TableCell>
              <TableCell sx={{ border: 'none', fontWeight: 600, color: '#212121' }}>Karta Lokalu</TableCell>
              <TableCell sx={{ border: 'none', fontWeight: 600, color: '#212121' }}>Cena Brutto</TableCell>
             
              <TableCell sx={{ border: 'none' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apartments.map((apt) => (
              <TableRow
                key={`${apt.investmentId}-${apt.id}`}
                onClick={() => navigate(`/oferta/${apt.investmentId}/${apt.id}`)}
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  '&:last-child': { borderBottom: 'none' },
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 131, 99, 0.04)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    '& .MuiTableCell-root': {
                      color: '#212121',
                    },
                  },
                }}
              >
                <TableCell component="th" scope="row" sx={{ border: 'none', py: 2.5, color: '#212121' }}>
                  {apt.id.toUpperCase()}
                </TableCell>
                <TableCell sx={{ border: 'none', py: 2.5, color: '#212121', fontWeight: 500 }}>
                  {apt.area ? `${apt.area.toFixed(2)}m²` : '-'}
                </TableCell>
                <TableCell sx={{ border: 'none', py: 2.5, color: '#757575' }}>
                  {apt.rooms || '-'}
                </TableCell>
                <TableCell sx={{ border: 'none', py: 2.5, color: '#757575' }}>
                  {apt.exposure || '-'}
                </TableCell>
                <TableCell sx={{ border: 'none', py: 2.5, color: '#757575' }}>
                  {apt.gardenm2 ? `${apt.gardenm2} m²` : '-'}
                </TableCell>
                <TableCell sx={{ border: 'none', py: 2.5, color: '#757575' }}>
                  {apt.status || '-'}
                </TableCell>
                <TableCell align="center" sx={{ border: 'none', py: 2.5 }}>
                  {apt.isPremium && <CheckIcon sx={{ color: 'primary.main' }} />}
                </TableCell>
                <TableCell sx={{ border: 'none', py: 2.5 }}>
                  <Button 
                    variant="text" 
                    size="small"
                    sx={{
                      color: 'primary.main',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    ZOBACZ
                  </Button>
                </TableCell>
                <TableCell sx={{ border: 'none', py: 2.5, color: '#212121', fontWeight: 500 }}>
                  {apt.price || '-'}
                </TableCell>
              
                <TableCell sx={{ border: 'none', py: 2.5 }}>
                  <Button 
                    component={RouterLink} 
                    to={`/oferta/${apt.investmentId}/${apt.id}`} 
                    variant="outlined" 
                    size="small"
                    sx={{
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'rgba(0, 131, 99, 0.04)',
                      },
                    }}
                  >
                    ZAPYTAJ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
