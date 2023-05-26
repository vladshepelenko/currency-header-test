import React, { useState } from 'react';
import { Menu, MenuItem, Typography, Box } from '@mui/material';
import currencies, { ICurrency } from './config/currencies';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import './style/CurrencyPicker.scss';

interface ICurrencyPickerProps {
  shouldCollapse: boolean;
  setCurrency: (currency: ICurrency) => void;
}

const CurrencyPicker = ({ shouldCollapse, setCurrency }: ICurrencyPickerProps) => {
  const defaultCurrency = currencies.filter((currency: ICurrency) => currency.isDefault);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency>(defaultCurrency.length ? defaultCurrency[0] : currencies[0]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleCurrencySelect = (currency: ICurrency) => {
    setSelectedCurrency(currency);
    setCurrency(currency);
    handleCloseMenu();
  };

  return (
    <>
      {
        shouldCollapse
        ? <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
          <AccordionSummary
            expandIcon={<KeyboardArrowDownIcon />}
            aria-controls="accordion-content"
            id="accordion-header"
          >
            <Box className={`pickerSelected collapsed`}>
              <Box className={`pickerSelected__left`}>
                <Box className='pickerSelected__left__logo'>
                  <img src={selectedCurrency.logo} alt='us-icon' />
                </Box>
                <Box className={`pickerSelected__left__title`}>
                  <Typography>
                    {selectedCurrency.title}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {currencies.length && currencies.map((currency: ICurrency, i: number) => {
              return <Box className='picker-accordion-row' key={i} onClick={() => {
                handleCurrencySelect(currency);
                setCurrency(currency);
                setExpanded(false);
              }}>
                <Box className='picker-item-logo'>
                  <img src={currency.logo} alt='currency-icon' />
                </Box>
                <Typography  className='picker-item-title'>
                  {currency.title}
                </Typography>
              </Box>
            })} 
          </AccordionDetails>
        </Accordion>
        : <>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
              {currencies.length && currencies.map((currency: ICurrency, i: number) => {
                return <MenuItem key={i} onClick={() => {
                  handleCurrencySelect(currency);
                }}>
                  <Box className='picker-item-logo'>
                    <img src={currency.logo} alt='currency-icon' />
                  </Box>
                  <Typography  className='picker-item-title'>
                    {currency.title}
                  </Typography>
                </MenuItem>
              })} 
            </Menu>
            <Box className={`pickerSelected`} onClick={handleOpenMenu}>
              <Box className={`pickerSelected__left`}>
                <Box className='pickerSelected__left__logo'>
                  <img src={selectedCurrency.logo} alt='us-icon' />
                </Box>
                <Box className={`pickerSelected__left__title ${anchorEl ? 'active' : null}`}>
                  <Typography>
                    {selectedCurrency.title}
                  </Typography>
                </Box>
              </Box>
              {
                shouldCollapse
                ? null
                : <Box className={`pickerSelected__chevron ${anchorEl ? 'active' : null}`}>
                  { anchorEl ? <KeyboardArrowUpIcon />  : <KeyboardArrowDownIcon /> }
                </Box>
              }
            </Box>
          </>

      }
      
    </>
  );
};

export default CurrencyPicker;