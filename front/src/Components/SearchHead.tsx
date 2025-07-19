'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Box,
  InputAdornment,
  TextField,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import debounce from 'lodash.debounce';
import { cryptoOptions, type Token } from '../data/data';

const SearchHead = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);

  const handleSearch = useCallback((value: string) => {
    const result = cryptoOptions.filter(token =>
      token.symbol.toLowerCase().includes(value.toLowerCase()) ||
      token.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTokens(result);
  }, []);

  const debouncedSearch = useMemo(() => debounce(handleSearch, 200), [handleSearch]);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <Box sx={{ px: 0.7, pt: 0.25, width: 120 }}>
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          type="submit"
          sx={{
            position: 'absolute',
            zIndex: 3,
            left: 0,
            p: '3px',
            pt:'4px',
            color: 'text.secondary',
          }}
        >
          <SearchIcon sx={{ fontSize: 21 }} />
        </IconButton>

        <WhatshotIcon
          sx={{
            position: 'absolute',
            zIndex: 2,
            left: 30,
            top: 1,
            fontSize: 16,
            color: 'primary.main',
            transform: 'translate(-3px, 8px)',
          }}
        />

        <TextField
          variant="outlined"
          placeholder="Coinit"
          size="small"
          fullWidth
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          InputProps={{
            startAdornment: <InputAdornment position="start" sx={{ width: 0 }} />,
            sx: {
              borderRadius: 20,
              pl: 0,
              height: 34,
              fontSize: '0.8rem',
              backgroundColor: 'action.hover',
              '& input': {
                pl: '40px !important',
                py: '8.5px',
              },
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
      </Box>

      {showResults && filteredTokens.length > 0 && (
        <Box
          sx={{
            mt: 1,
            position: 'absolute',
            width: '100%',
            zIndex: 10,
            borderRadius: 2,
            backdropFilter: 'blur(8px)',
            bgcolor: 'background.paper',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            py: 1,
          }}
        >
          {filteredTokens.map((token) => (
            <Box
              key={token.symbol}
              onMouseDown={() => {
                setQuery(token.symbol);
                setShowResults(false);
              }}
              sx={{
                px: 2,
                py: 1,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Box fontWeight={600}>{token.symbol}</Box>
              <Box fontSize="0.75rem" color="text.secondary">
                {token.name}
              </Box>
            </Box>
          ))}
        </Box>
      )}

    </Box>
  );
};

export default SearchHead;
