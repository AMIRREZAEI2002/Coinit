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
import { Search as SearchIcon } from '@mui/icons-material';
import { Icon } from '@iconify/react';
import Link from 'next/link';

// تعریف نوع برای داده‌های دارایی‌ها
interface CryptoRow {
  id: number;
  name: string;
  totalEquity: string;
  bonus: string;
  walletBalance: string;
  unrealizedPNL: string;
  positionMargin: string;
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

// داده‌های نمونه متنوع
const rows: CryptoRow[] = [
  {
    id: 1,
    name: 'SOL',
    totalEquity: '$78,940.00',
    bonus: '+$50.00',
    walletBalance: '$45,000.00',
    unrealizedPNL: '+$12,300.00',
    positionMargin: '$18,200.00',
  },
  {
    id: 2,
    name: 'BTC',
    totalEquity: '$32,500.00',
    bonus: '-$20.00',
    walletBalance: '$20,000.00',
    unrealizedPNL: '-$1,580.00',
    positionMargin: '$10,000.00',
  },
  {
    id: 3,
    name: 'ETH',
    totalEquity: '$6,800.00',
    bonus: '+$30.00',
    walletBalance: '$4,000.00',
    unrealizedPNL: '+$119.00',
    positionMargin: '$2,000.00',
  },
  {
    id: 4,
    name: 'DOT',
    totalEquity: '$600.00',
    bonus: '-$5.00',
    walletBalance: '$400.00',
    unrealizedPNL: '+$5.10',
    positionMargin: '$150.00',
  },
  {
    id: 5,
    name: 'ADA',
    totalEquity: '$0.00',
    bonus: '+$0.00',
    walletBalance: '$0.00',
    unrealizedPNL: '-$3.00',
    positionMargin: '$0.00',
  },
];

// دسته‌بندی‌ها
const categories: Category[] = [{ id: 'all', label: 'All' }];

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

const WalletFiat2: React.FC = () => {
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

  const filteredAssets: CryptoRow[] = rows.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all';
    const matchesSmallBalances = filters.hideSmallBalances
      ? parseFloat(asset.walletBalance.replace('$', '').replace(',', '')) > 0
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
                    <Tooltip title="Hide assets with zero wallet balance">
                      <IconButton size="small" sx={{ ml: 0.5 }}>
                        <Icon icon="mdi:information-outline" width={16} height={16} style={{ color: '#85919f' }} />
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
          p: 3,
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
                    Total
                  </Typography>
                  <Typography fontWeight={600}>
                    {asset.totalEquity}{' '}
                    <small style={{ color: theme.palette.text.secondary }}>
                      ≈ {asset.totalEquity}
                    </small>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Bonus
                  </Typography>
                  <Typography color={asset.bonus.startsWith('-') ? 'error.main' : 'success.main'}>
                    {asset.bonus}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Available Balance
                  </Typography>
                  <Typography>{asset.walletBalance}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Frozen Balance
                  </Typography>
                  <Typography color={asset.unrealizedPNL.startsWith('-') ? 'error.main' : 'success.main'}>
                    {asset.unrealizedPNL} {asset.unrealizedPNL.startsWith('-') ? '▼' : '▲'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    USDT Valuation
                  </Typography>
                  <Typography fontWeight={600}>{asset.positionMargin}</Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                <Link href="/trade" passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: 'none',
                      borderRadius: 20,
                      padding: theme.spacing(0.5, 1.5),
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      width: 80,
                      height: 30,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: theme.shadows[2],
                      },
                    }}
                  >
                    Trade
                  </Button>
                </Link>
                <Link href="/transfer" passHref>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      textTransform: 'none',
                      borderRadius: 20,
                      padding: theme.spacing(0.5, 1.5),
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      width: 80,
                      height: 30,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: theme.shadows[2],
                      },
                    }}
                  >
                    Transfer
                  </Button>
                </Link>
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
        <Link href="/all-assets" passHref>
          <Button
            endIcon={<Icon icon="mdi:arrow-right" />}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            View All Assets
          </Button>
        </Link>
      </Box>
    </SectionCard>
  );
};

export default WalletFiat2;