import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Box, TextField } from '@mui/material';
import currencies, { ICurrency, GOLD_PRICE_IN_DEFAULT_CURRENCY } from './config/currencies';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './style/App.scss';

const App = () => {
  const defaultCurrency = currencies.filter((currency: ICurrency) => currency.isDefault);
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency>(defaultCurrency.length ? defaultCurrency[0] : currencies[0]);
  const [goldValue, setGoldValue] = useState<number>(0);
  const [goldCost, setGoldCost] = useState<string>(`${selectedCurrency.title}: 0`);

  useEffect(() => {
    calculateGoldPrice();
  }, [goldValue, selectedCurrency]);

  const calculateGoldPrice = () => {
    const price = goldValue * (GOLD_PRICE_IN_DEFAULT_CURRENCY / selectedCurrency.value);
    setGoldCost(`${selectedCurrency.title}: ${price.toFixed(2)}`);
  }

  return (
    <Box className='main'>
      <Header chosenCurrency={selectedCurrency} setCurrency={setSelectedCurrency} />
      <Box className='calculator'>
        <TextField 
          label='Enter gold value (g)'
          className='calculator__gold-input'
          value={goldValue} 
          type='number' 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoldValue(+e.target.value)} 
          />
        <TextField 
          label={`Price`}
          value={goldCost} 
          disabled />
      </Box>
      <Box className='note'>
        <p>
          <b>Note:</b> In task description was specified that formula for calculating gold value is <b><i>amount * (itemPrice * currencyPrice) == price</i></b> but i guess it's a bit wrong cause in this case the more valuable currency is, the bigger price you'll get. So i've changed formula to <b><i>amount * (itemPrice / currencyPrice) == price</i></b> which makes a little bit more sense to me.
        </p>
      </Box>
      <Box className='currencies'>
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Currency coefficient (according to USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currencies.map((row) => (
              <TableRow
                key={row.code}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </Box>
  );
}

export default App;
