'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import debounce from 'lodash.debounce';
import { cryptoOptions, type Token } from '../data/data';

const SearchHead = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);

  const handleSearch = (value: string) => {
    const result = cryptoOptions.filter(token =>
      token.symbol.toLowerCase().includes(value.toLowerCase()) ||
      token.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTokens(result);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 200), []);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query]);

  return (
    <Box sx={{ px: 0.7, pt: 0.25, width: 200 }}>
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
            p: '2px',
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
          placeholder="جستجوی رمز ارز"
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
        <Paper sx={{ mt: 1, position: 'absolute', width: '100%', zIndex: 10 }}>
          <List dense>
            {filteredTokens.map((token) => (
              <ListItem
                key={token.symbol}
                button
                onMouseDown={() => {
                  setQuery(token.symbol);
                  setShowResults(false);
                }}
              >
                <ListItemText
                  primary={token.symbol}
                  secondary={token.name}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchHead;
