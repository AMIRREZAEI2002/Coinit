import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  Paper,
  Pagination,
  useTheme,
  styled,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

// تعریف نوع برای داده‌های دارایی‌ها
interface Asset {
  id: number;
  name: string;
  icon: string;
  total: string;
  available: string;
  frozen: string;
  valuation: string;
  category: string;
}

// تعریف نوع برای دسته‌بندی‌ها
interface Category {
  id: string;
  label: string;
}

// تعریف نوع برای فیلترها
interface Filters {
  hideSmallBalances: boolean;
  simplifiedList: boolean;
  convertToMX: boolean;
}

// تعریف نوع برای props کامپوننت FilterButton
interface FilterButtonProps {
  active?: number;
}

// داده‌های نمونه برای جدول
const assetsData: Asset[] = [
  {
    id: 1,
    name: 'SOL/USDT',
    icon: 'solana.webp',
    total: '$78,940.00',
    available: '$45,000.00',
    frozen: '$0.00 ➔',
    valuation: '$27,400.00',
    category: 'main',
  },
  {
    id: 2,
    name: 'BTC/USDT',
    icon: 'bitcoin.webp',
    total: '$128,500.00',
    available: '$85,200.00',
    frozen: '$0.00 ➔',
    valuation: '$43,300.00',
    category: 'main',
  },
  {
    id: 3,
    name: 'ETH/USDT',
    icon: 'ethereum.webp',
    total: '$56,780.00',
    available: '$32,100.00',
    frozen: '$0.00 ➔',
    valuation: '$24,680.00',
    category: 'main',
  },
  {
    id: 4,
    name: 'DOT/USDT',
    icon: 'polkadot.webp',
    total: '$23,450.00',
    available: '$15,670.00',
    frozen: '$0.00 ➔',
    valuation: '$7,780.00',
    category: 'innovation',
  },
  {
    id: 5,
    name: 'ADA/USDT',
    icon: 'cardano.webp',
    total: '$18,900.00',
    available: '$12,300.00',
    frozen: '$0.00 ➔',
    valuation: '$6,600.00',
    category: 'innovation',
  },
];

// دسته‌بندی‌ها
const categories: Category[] = [
  { id: 'all', label: 'All' },
  { id: 'main', label: 'Main' },
  { id: 'innovation', label: 'Innovation' },
  { id: 'delisted', label: 'Delisted' },
  { id: 'dividend', label: 'Dividend' },
];

// Styled Components
const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
  marginTop: theme.spacing(3),
  overflow: 'hidden',
}));

const FilterBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  overflowX: 'auto',
  paddingBottom: theme.spacing(1),
  marginTop: theme.spacing(3),
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    height: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '4px',
  },
}));

const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<FilterButtonProps>(({ theme, active }) => ({
  textTransform: 'none',
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  borderBottom: active
    ? `3px solid ${theme.palette.primary.main}`
    : '1px solid transparent',
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: active ? 700 : 500,
  minWidth: 'max-content',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));

const AssetCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: 12,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.paper} 100%)`,
  },
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 20,
  padding: theme.spacing(0.5, 1.5),
  fontSize: '0.75rem',
  fontWeight: 500,
  margin: theme.spacing(0.5),
  minWidth: 70,
  height: 30,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

const WalletSpot3: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    hideSmallBalances: false,
    simplifiedList: false,
    convertToMX: false,
  });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  const convertToMX = (value: string): string => {
    const numericValue = parseFloat(value.replace('$', '').replace(/,/g, ''));
    return filters.convertToMX
      ? `${(numericValue * 0.05).toFixed(2)} MX`
      : value;
  };

  const handleFilterChange = (filter: keyof Filters) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFilters({ ...filters, [filter]: event.target.checked });
    setPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const filteredAssets: Asset[] = assetsData
    .filter((asset) => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || asset.category === activeCategory;
      const matchesSmallBalances = filters.hideSmallBalances
        ? parseFloat(asset.total.replace('$', '').replace(/,/g, '')) >= 20000
        : true;
      return matchesSearch && matchesCategory && matchesSmallBalances;
    })
    .map((asset) => ({
      ...asset,
      total: convertToMX(asset.total),
      available: convertToMX(asset.available),
      valuation: convertToMX(asset.valuation),
    }));

  const paginatedAssets = filteredAssets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <SectionCard>
      {/* Header */}
      <Grid container alignItems="top" spacing={2}>
        <Grid size={{ xs: 12, md: 3}}>
          <Typography variant="h6" fontWeight={700}>
            Assets List
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: { xs: 'center', md: 'end' },
            }}
          >
            {/* Search Box */}
            <TextField
              placeholder="Search"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                width: 200,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 50,
                  backgroundColor: theme.palette.action.hover,
                  paddingLeft: 1,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="disabled" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Filter Options */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.hideSmallBalances}
                    onChange={handleFilterChange('hideSmallBalances')}
                    size="small"
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">Hide small Balances</Typography>
                    <Tooltip title="Hide assets with total balance less than $20,000">
                      <IconButton size="small" sx={{ ml: 0.5 }}>
                        <InfoIcon fontSize="small" color="disabled" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.simplifiedList}
                    onChange={handleFilterChange('simplifiedList')}
                    size="small"
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">Simplified List</Typography>
                    <Tooltip title="Show only name and total balance">
                      <IconButton size="small" sx={{ ml: 0.5 }}>
                        <InfoIcon fontSize="small" color="disabled" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.convertToMX}
                    onChange={handleFilterChange('convertToMX')}
                    size="small"
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">Convert to MX</Typography>
                    <Tooltip title="Convert values to MX currency (1 USD = 0.05 MX)">
                      <IconButton size="small" sx={{ ml: 0.5 }}>
                        <ChevronRightIcon fontSize="small" color="disabled" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Category Filter Bar */}
      <FilterBar>
        {categories.map((category) => (
          <FilterButton
            key={category.id}
            active={activeCategory === category.id ? 1 : 0}
            onClick={() => {
              setActiveCategory(category.id);
              setPage(1); // Reset to first page when category changes
            }}
          >
            {category.label}
          </FilterButton>
        ))}
      </FilterBar>

      {/* Assets Cards */}
      <Box
        sx={{
          mt: 1,
          p: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          maxHeight: 600,
          overflowX: 'visible',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: '4px',
          },
        }}
      >
        {paginatedAssets.map((asset) => (
          <AssetCard key={asset.id}>
            {/* Asset Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                component="img"
                src={`/assets/${asset.icon}`}
                alt={asset.name}
                sx={{ width: 40, height: 40, mr: 2, borderRadius: '50%' }}
              />
              <Typography variant="h6" fontWeight={600}>
                {asset.name}
              </Typography>
            </Box>

            {/* Asset Details */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: filters.simplifiedList ? '1fr' : '1fr 1fr',
                gap: 1,
                flexGrow: 1,
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Total
                </Typography>
                <Typography fontWeight={600}>{asset.total}</Typography>
              </Box>
              {!filters.simplifiedList && (
                <>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Available
                    </Typography>
                    <Typography color="success.main">{asset.available}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Frozen
                    </Typography>
                    <Typography color="warning.main">{asset.frozen}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Valuation
                    </Typography>
                    <Typography>{asset.valuation}</Typography>
                  </Box>
                </>
              )}
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              <ActionButton variant="contained" color="primary">
                Earn
              </ActionButton>
              <ActionButton variant="contained" color="primary">
                Deposit
              </ActionButton>
              <ActionButton variant="contained" color="primary">
                Convert
              </ActionButton>
              <ActionButton variant="outlined" color="secondary">
                Trade
              </ActionButton>
            </Box>
          </AssetCard>
        ))}
      </Box>

      {/* Pagination and Footer */}
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {paginatedAssets.length} of {filteredAssets.length} assets
        </Typography>
        <Pagination
          count={Math.ceil(filteredAssets.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: 8,
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
              },
            },
            '& .Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
        />
        <Button
          endIcon={<ArrowForwardIcon />}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          View All Assets
        </Button>
      </Box>
    </SectionCard>
  );
};

export default WalletSpot3;