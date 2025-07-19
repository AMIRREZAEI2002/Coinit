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
} from '@mui/icons-material';
import { Icon } from '@iconify/react';

// تعریف نوع برای داده‌های دارایی‌ها
interface Asset {
  id: number;
  name: string;
  currentPosition: string;
  totalPNL: string;
  pnlRate: string;
  totalBuy: string;
  totalSell: string;
}

// تعریف نوع برای دسته‌بندی‌ها
interface Category {
  id: string;
  label: string;
}

// تعریف نوع برای فیلترها
interface Filters {
  hideSmallBalances: boolean;
}

// تعریف نوع برای props کامپوننت FilterButton
interface FilterButtonProps {
  active?: number;
}

// داده‌های نمونه برای دارایی‌ها
const assetsData: Asset[] = [
  {
    id: 1,
    name: 'SOL',
    currentPosition: '0 ≈ 0 USD',
    totalPNL: '-0.12%',
    pnlRate: '-$12.50',
    totalBuy: '--',
    totalSell: '--',
  },
  {
    id: 2,
    name: 'BTC',
    currentPosition: '0.5 ≈ 32,500 USD',
    totalPNL: '2.45%',
    pnlRate: '$1,580.00',
    totalBuy: '$30,000.00',
    totalSell: '$2,500.00',
  },
  {
    id: 3,
    name: 'ETH',
    currentPosition: '2 ≈ 6,800 USD',
    totalPNL: '-1.75%',
    pnlRate: '-$119.00',
    totalBuy: '$7,000.00',
    totalSell: '--',
  },
  {
    id: 4,
    name: 'DOT',
    currentPosition: '100 ≈ 600 USD',
    totalPNL: '0.85%',
    pnlRate: '$5.10',
    totalBuy: '$550.00',
    totalSell: '$50.00',
  },
  {
    id: 5,
    name: 'ADA',
    currentPosition: '0 ≈ 0 USD',
    totalPNL: '-0.30%',
    pnlRate: '-$3.00',
    totalBuy: '--',
    totalSell: '--',
  },
  {
    id: 6,
    name: 'XRP',
    currentPosition: '500 ≈ 250 USD',
    totalPNL: '1.20%',
    pnlRate: '$3.00',
    totalBuy: '$200.00',
    totalSell: '$50.00',
  },
];

// دسته‌بندی‌ها
const categories: Category[] = [
  { id: 'all', label: 'All' },
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

const WalletDex2: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    hideSmallBalances: false,
  });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

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

  const filteredAssets: Asset[] = assetsData.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all';
    const matchesSmallBalances = filters.hideSmallBalances
      ? parseFloat(asset.currentPosition.match(/[\d\.]+/)?.[0] || '0') > 0
      : true;
    return matchesSearch && matchesCategory && matchesSmallBalances;
  });

  const paginatedAssets = filteredAssets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <SectionCard>
      {/* Header */}
      <Grid container alignItems="center" spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" fontWeight={700}>
            Assets List
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
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
                    <SearchIcon fontSize="small" sx={{ color: '#85919f' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Filter Options */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                    <Tooltip title="Hide assets with zero current position">
                      <IconButton size="small" sx={{ ml: 0.5 }}>
                        <InfoIcon fontSize="small" sx={{ color: '#85919f' }} />
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
              setPage(1);
            }}
          >
            {category.label}
          </FilterButton>
        ))}
      </FilterBar>

      {/* Assets Cards */}
      <Box
        sx={{
          p:3,
          mt: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          maxHeight: 500,
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
        {paginatedAssets.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
            No matching records found
          </Typography>
        ) : (
          paginatedAssets.map((asset) => (
            <AssetCard key={asset.id}>
              {/* Asset Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Icon
                  icon={`cryptocurrency-color:${asset.name.toLowerCase()}`}
                  width={24}
                  height={24}
                  style={{ marginRight: theme.spacing(2) }}
                />
                <Typography variant="h6" fontWeight={600}>
                  {asset.name}
                </Typography>
              </Box>

              {/* Asset Details */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 1,
                  flexGrow: 1,
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Current Position
                  </Typography>
                  <Typography fontWeight={600}>
                    {asset.currentPosition}{' '}
                    <small style={{ color: theme.palette.text.secondary }}>
                      ≈ {asset.currentPosition.split('≈')[1]}
                    </small>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Total PNL
                  </Typography>
                  <Typography color={asset.totalPNL.startsWith('-') ? 'error.main' : 'success.main'}>
                    {asset.totalPNL}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    PNL Rate
                  </Typography>
                  <Typography color={asset.pnlRate.startsWith('-') ? 'error.main' : 'success.main'}>
                    {asset.pnlRate}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Total Buy
                  </Typography>
                  <Typography>{asset.totalBuy}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Total Sell
                  </Typography>
                  <Typography>{asset.totalSell}</Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <ActionButton variant="contained" color="primary" startIcon={<ArrowForwardIcon />}>
                  Trade
                </ActionButton>
              </Box>
            </AssetCard>
          ))
        )}
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

export default WalletDex2;