import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu as MenuIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import headerLogo from './images/headerLogo.png';
import CurrencyPicker from './CurrencyPicker';
import './style/Header.scss';
import { ICurrency } from './config/currencies';

const COLLAPSE_BREAKPOINT = 960;

interface IHeaderProps {
  chosenCurrency: ICurrency; 
  setCurrency: (currency: ICurrency) => void;
}

interface IHeaderMenuProps {
  shouldCollapse: boolean;
  chosenCurrency: ICurrency; 
  setCurrency: (currency: ICurrency) => void;
}

const HeaderMenu = ({ chosenCurrency, shouldCollapse, setCurrency }: IHeaderMenuProps) => {
  return (
    <Box className={`appBar__content ${shouldCollapse ? 'content-collapsed' : null}`}>
      <Box className={`appBar__content__menus ${shouldCollapse ? 'menus-collapsed' : null}`}>
        {
          !shouldCollapse && <Box className='appBar__content__menus__logo'>
            <img src={headerLogo} alt='logo' />
          </Box>
        }
        <Box className={`appBar__content__menus__list ${shouldCollapse ? 'menus-list-collapsed' : null}`}>
          <Box className={`appBar__content__menus__list__item ${shouldCollapse ? 'menus-list-item-collapsed' : null}`}>
            <Typography variant={shouldCollapse ? 'h6' : 'body1'}>
              OSRS Gold
            </Typography>
          </Box>
          <Box className={`appBar__content__menus__list__item ${shouldCollapse ? 'menus-list-item-collapsed' : null}`}>
            <Typography className='active' variant={shouldCollapse ? 'h6' : 'body1'}>
              RS3 Gold
            </Typography>
          </Box>
          <Box className={`appBar__content__menus__list__item ${shouldCollapse ? 'menus-list-item-collapsed' : null}`}>
            <Typography variant={shouldCollapse ? 'h6' : 'body1'}>
              Sell RS Gold
            </Typography>
          </Box>
          <Box className={`appBar__content__menus__list__item ${shouldCollapse ? 'menus-list-item-collapsed' : null}`}>
            <Typography variant={shouldCollapse ? 'h6' : 'body1'}>
              OSRS Items
            </Typography>
          </Box>
          <Box className={`appBar__content__menus__list__item ${shouldCollapse ? 'menus-list-item-collapsed' : null}`}>
            <Typography variant={shouldCollapse ? 'h6' : 'body1'}>
              OSRS Accounts
            </Typography>
          </Box>
          <Box className={`appBar__content__menus__list__item ${shouldCollapse ? 'menus-list-item-collapsed' : null}`}>
            <Typography variant={shouldCollapse ? 'h6' : 'body1'}>
              Reward Chests
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={`appBar__content__controls ${shouldCollapse ? 'controls-collapsed' : null}`}>
        <Box className={`appBar__content__controls__picker ${shouldCollapse ? 'picker-collapsed' : null}`}>
          <CurrencyPicker 
            chosenCurrency={chosenCurrency} 
            shouldCollapse={shouldCollapse} 
            setCurrency={setCurrency} 
          />
        </Box>
        <Box className={`appBar__content__controls__auth ${shouldCollapse ? 'auth-collapsed' : null}`}>
          <Box className={`appBar__content__controls__auth__signup ${shouldCollapse ? 'signup-button-collapsed' : null}`}>
            <Typography>Sign Up</Typography>
          </Box>
          <Box className='appBar__content__controls__auth__login'><Typography variant='body2'>Log In</Typography></Box>
        </Box>
      </Box>
    </Box>
  );
}

const Header = ({ chosenCurrency, setCurrency }: IHeaderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);

  const theme = createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#142241',
            borderBottom: '1px solid #E9B109BF',
            boxShadow: '0px 4px 3px 0px #17222740',
            paddingLeft: shouldCollapse ? '21px' : '70px',
            paddingRight: shouldCollapse ? '16px' : '71px',
            height: '80px',
            justifyContent: shouldCollapse && isNavOpen ? 'flex-start' : 'center',
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: '#142241',
            boxShadow: 'none',
          },
          region: {
            padding: 0,
          }
        }
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            padding: 0,
            '&$expanded': {
              minHeight: 0,
            },
          },
          expandIconWrapper: {
            color: '#fafafa',
          }
        }
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        }
      },
      MuiTypography: {
        defaultProps: {
          fontFamily: 'Poppins'
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            background: '#142241',
            borderRadius: '4px',
            color: '#FFFFFF',
            boxShadow: '0px -1px 5px 2px #31424B1A',
            width: '105px',
          },
          list: {
            paddingTop: '5px',
            paddingBottom: '5px',
          }
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            paddingTop: '6px',
            paddingBottom: '5px',
            paddingLeft: '8px',
            '&:hover': {
              background: 'rgba(44, 62, 103, 0.2)',
              borderRight: '2px solid #E9B109',
            },
          }
        },
      },
    },
    typography: {
      body1: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '17px',
        textAlign: 'center',
        color: '#FAFAFA',
      },
      body2: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '17px',
        textAlign: 'center',
        color: '#142241',
      },
      h6: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '24px',
        textAlign: 'center',
        color: '#FAFAFA',
      }
    }
  });

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleWindowResize = () => {
    const shouldCollapse = window.innerWidth < COLLAPSE_BREAKPOINT;
    if (shouldCollapse === false) {
      setIsNavOpen(false);
    }
    setShouldCollapse(shouldCollapse);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={`appBar ${shouldCollapse && isNavOpen ? 'collapsed' : null}`}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className="menuButton"
            onClick={handleToggleNav}
          >
            {
              isNavOpen
              ? <CloseIcon />
              : <MenuIcon />
            }
            
          </IconButton>
          {
            shouldCollapse
            ? 
              isNavOpen
              ? null
              : <Box className='content-minified'>
                <Box>
                  
                </Box>
                <Box>
                  <img src={headerLogo} alt='logo' />
                </Box>
                <Box className='content-minified__controls'>
                  <Box className='content-minified__controls__login'><Typography variant='body2'>Log In</Typography></Box>
                </Box>
              </Box>
            : <HeaderMenu chosenCurrency={chosenCurrency} shouldCollapse={shouldCollapse} setCurrency={setCurrency} />
          }
        </Toolbar>
        {isNavOpen ? (
          <HeaderMenu chosenCurrency={chosenCurrency} shouldCollapse={shouldCollapse} setCurrency={setCurrency} />
        ) : null}
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;