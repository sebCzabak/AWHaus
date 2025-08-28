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
  const [loading, setLoading] = useState(true);
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
        elevation={2}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nr Apartamentu</TableCell>
              <TableCell>Metraż (m²)</TableCell>
              <TableCell>Pokoje</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Karta Lokalu</TableCell>
              <TableCell>Cena Brutto</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apartments.map((apt) => (
              <TableRow
                key={`${apt.investmentId}-${apt.id}`}
                onClick={() => navigate(`/oferta/${apt.investmentId}/${apt.id}`)}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  transition:
                    'transform 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover', // Standardowy kolor podświetlenia z motywu
                    transform: 'translateY(-3px)', // Efekt lekkiego uniesienia
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Delikatny cień dla głębi
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                >
                  {apt.id.toUpperCase()}
                </TableCell>
                <TableCell>{apt.area.toFixed(2)}m²</TableCell>
                <TableCell>{apt.rooms}</TableCell>
                <TableCell>{apt.status}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    size="small"
                  >
                    POBIERZ
                  </Button>
                </TableCell>
                <TableCell>{apt.price}</TableCell>
                <TableCell>
                  <Button
                    component={RouterLink}
                    to={`/oferta/${apt.investmentId}/${apt.id}`}
                    variant="text"
                    size="small"
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
