import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function FAQPage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Najczęściej zadawane pytania (FAQ)
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Jak wygląda proces rezerwacji mieszkania?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Proces jest prosty: po wybraniu mieszkania podpisujemy umowę rezerwacyjną, a następnie...
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Czy pomagacie w uzyskaniu kredytu?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tak, współpracujemy z niezależnymi doradcami kredytowymi, którzy pomogą Państwu przejść przez cały proces.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}