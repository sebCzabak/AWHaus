import { CreditCalculator } from '../components/CreditCalculator';

export function CreditCalculatorPage() {
  return (
    <>
      <title>Kalkulator Kredytu Hipotecznego na Mieszkanie | AWHaus Opole</title>
      <meta
        name="description"
        content="Planujesz zakup mieszkania? Skorzystaj z naszego kalkulatora kredytowego, aby obliczyć szacunkową miesięczną ratę i wkład własny. AWHaus Opole pomaga w finansowaniu."
      />
      <CreditCalculator />
    </>
  );
}
