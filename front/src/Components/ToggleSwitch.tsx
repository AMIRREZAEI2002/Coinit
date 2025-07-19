'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import {Button } from '@mui/material';

const SwitchContainer = styled('div')({
  position: 'relative',
  display: 'inline-block',
  width: '90px',
  height: '25px',
  border: '2px solid #dcdcdc',
  background: '#e0e0e0',
  overflow: 'hidden',
  borderRadius: '50rem',
  cursor: 'pointer',
});

const HiddenInput = styled('input')({
  opacity: 0,
  width: 0,
  height: 0,
  position: 'absolute',
});

const Slider = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  transition: 'transform 0.5s',
  color: '#9a9a9a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'sans-serif',
});

const Slider0 = styled(Slider)({
  color: 'white',
  fontWeight: 500,
  fontSize: '10px',
  backgroundColor: '#49d84e',
  zIndex: 4,
  '&:hover': {
    backgroundColor: '#3cb043',
  },
});

const Slider1 = styled(Slider)({
  zIndex: 1,
  '& div': {
    transition: 'transform 0.5s',
    position: 'absolute',
    width: '100%',
    height: '50%',
    left: 0,
  },
  '& div:first-of-type': {
    top: 0,
    backgroundColor: '#f3f3f3',
  },
  '& div:last-child': {
    bottom: 0,
    backgroundColor: '#f3f3f3',
    borderTop: '1px solid #e0e0e0',
  },
});

const Slider2 = styled(Slider)({
  backgroundColor: '#e6e6e6',
  borderLeft: '1px solid #d2d2d2',
  zIndex: 2,
});

const Slider3 = styled(Slider)({
  backgroundColor: '#49d84e',
  color: 'white',
  fontSize: '10px',
  borderRight: '1px solid #d2d2d2',
  zIndex: 3,
  '&:hover': {
    backgroundColor: '#3cb043',
  },
});

const ToggleSwitch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDexMode, setIsDexMode] = useState(false);

  useEffect(() => {
    setIsDexMode(pathname.includes('dex-plus'));
  }, [pathname]);

  const handleToggle = () => {
    const newPath = isDexMode ? '/' : '/dex-plus';
    router.push(newPath);
  };

  return (
    <Button className="nav-item pt-2 ">
      <SwitchContainer onClick={handleToggle}>
        <HiddenInput type="checkbox" checked={isDexMode} readOnly />
        <Slider0 sx={{ 
          transform: isDexMode ? 'translateX(-100%)' : 'translateX(0)',
          transitionDelay: isDexMode ? '0s' : '1s'
        }}>
          Exchange
        </Slider0>
        <Slider1>
          <div style={{ 
            transform: isDexMode ? 'translateY(-100%)' : 'translateY(0)',
            transitionDelay: isDexMode ? '1s' : '0s'
          }}></div>
          <div style={{ 
            transform: isDexMode ? 'translateY(100%)' : 'translateY(0)',
            transitionDelay: isDexMode ? '1s' : '0s'
          }}></div>
        </Slider1>
        <Slider2 sx={{ 
          transform: isDexMode ? 'translateX(100%)' : 'translateX(0)',
          transitionDelay: isDexMode ? '0.5s' : '0.5s'
        }} />
        <Slider3 sx={{ 
          transform: isDexMode ? 'translateX(0)' : 'translateX(100%)',
          transitionDelay: isDexMode ? '0s' : '1s'
        }}>
          DEX+
        </Slider3>
      </SwitchContainer>
    </Button>
  );
};

export default ToggleSwitch;