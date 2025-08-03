'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  Box, Button, Typography, useTheme, FormControlLabel, Checkbox, IconButton,
  Tooltip, Modal, TextField, MenuItem, Select, InputLabel, FormControl,
  Menu, ListItemIcon, ListItemText, Paper, styled, Divider
} from '@mui/material';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

// تعریف تایپ‌ها
interface TableRowData {
  id: number;
  tradingPair: string;
  icon: string;
  time: string;
  type?: string;
  side?: 'Buy' | 'Sell';
  price?: number;
  quantity: number;
  orderAmount: string;
  tpSl?: string;
  filled: string;
  triggerConditions?: string;
  status: 'Open' | 'Closed' | 'Canceled';
}

// تعریف هدرها برای هر تب
const tabHeaders: { [key: string]: { label: string; key?: keyof TableRowData; icon?: string; color?: string; onClick?: () => void }[] } = {
  'open-position': [
    { label: 'Trading Pair', key: 'tradingPair', icon: 'fa-solid:star' },
    { label: 'Time', key: 'time', icon: 'fa-solid:sort' },
    { label: 'Type', key: 'type', icon: 'fa-solid:caret-down' },
    { label: 'Side', key: 'side', icon: 'fa-solid:caret-down' },
    { label: 'Price', key: 'price', icon: 'fa-solid:sort' },
    { label: 'Quantity', key: 'quantity', icon: 'fa-solid:sort' },
    { label: 'Order Amount', key: 'orderAmount', icon: 'fa-solid:sort' },
    { label: 'TP/SL', key: 'tpSl' },
    { label: 'Filled', key: 'filled', icon: 'fa-solid:sort' },
    { label: 'Trigger Conditions', key: 'triggerConditions', icon: 'fa-solid:sort' },
    { label: 'Actions' },
  ],
  'open-order': [
    { label: 'Trading Pair', key: 'tradingPair', icon: 'fa-solid:star' },
    { label: 'Time', key: 'time', icon: 'fa-solid:sort' },
    { label: 'Type', key: 'type', icon: 'fa-solid:caret-down' },
    { label: 'Side', key: 'side', icon: 'fa-solid:caret-down' },
    { label: 'Price', key: 'price', icon: 'fa-solid:sort' },
    { label: 'Quantity', key: 'quantity', icon: 'fa-solid:sort' },
    { label: 'Order Amount', key: 'orderAmount', icon: 'fa-solid:sort' },
    { label: 'Filled', key: 'filled', icon: 'fa-solid:sort' },
    { label: 'Actions' },
  ],
  'position-history': [
    { label: 'Trading Pair', key: 'tradingPair', icon: 'fa-solid:star' },
    { label: 'Time', key: 'time', icon: 'fa-solid:sort' },
    { label: 'Type', key: 'type', icon: 'fa-solid:caret-down' },
    { label: 'Side', key: 'side', icon: 'fa-solid:caret-down' },
    { label: 'Price', key: 'price', icon: 'fa-solid:sort' },
    { label: 'Quantity', key: 'quantity', icon: 'fa-solid:sort' },
    { label: 'Order Amount', key: 'orderAmount', icon: 'fa-solid:sort' },
    { label: 'TP/SL', key: 'tpSl' },
    { label: 'Filled', key: 'filled', icon: 'fa-solid:sort' },
  ],
  'order-trade-history': [
    { label: 'Trading Pair', key: 'tradingPair', icon: 'fa-solid:star' },
    { label: 'Time', key: 'time', icon: 'fa-solid:sort' },
    { label: 'Type', key: 'type', icon: 'fa-solid:caret-down' },
    { label: 'Side', key: 'side', icon: 'fa-solid:caret-down' },
    { label: 'Price', key: 'price', icon: 'fa-solid:sort' },
    { label: 'Quantity', key: 'quantity', icon: 'fa-solid:sort' },
    { label: 'Order Amount', key: 'orderAmount', icon: 'fa-solid:sort' },
    { label: 'Filled', key: 'filled', icon: 'fa-solid:sort' },
  ],
  'capital-flow': [
    { label: 'Trading Pair', key: 'tradingPair', icon: 'fa-solid:star' },
    { label: 'Time', key: 'time', icon: 'fa-solid:sort' },
    { label: 'Side', key: 'side', icon: 'fa-solid:caret-down' },
    { label: 'Price', key: 'price', icon: 'fa-solid:sort' },
    { label: 'Quantity', key: 'quantity', icon: 'fa-solid:sort' },
    { label: 'Order Amount', key: 'orderAmount', icon: 'fa-solid:sort' },
  ],
  'wallet': [
    { label: 'Trading Pair', key: 'tradingPair', icon: 'fa-solid:star' },
    { label: 'Time', key: 'time', icon: 'fa-solid:sort' },
    { label: 'Quantity', key: 'quantity', icon: 'fa-solid:sort' },
    { label: 'Order Amount', key: 'orderAmount', icon: 'fa-solid:sort' },
    { label: 'Filled', key: 'filled', icon: 'fa-solid:sort' },
  ],
};

// تولید داده‌های فیک برای هر تب
const generateFakeDataForTab = (tab: string): TableRowData[] => {
  const baseData: { [key: string]: Partial<TableRowData> } = {
    'open-position': {
      tradingPair: 'BTC/USDT',
      icon: 'cryptocurrency:btc',
      type: 'Limit',
      side: 'Buy',
      price: 60000,
      quantity: 0.5,
      orderAmount: '0.5 USDT',
      tpSl: 'TP: 65000 / SL: 55000',
      filled: '50%',
      triggerConditions: 'Price > 59000',
      status: 'Open',
    },
    'open-order': {
      tradingPair: 'ETH/USDT',
      icon: 'cryptocurrency:eth',
      type: 'Market',
      side: 'Sell',
      price: 3000,
      quantity: 2,
      orderAmount: '2 USDT',
      filled: '0%',
      status: 'Open',
      tpSl: undefined,
      triggerConditions: undefined,
    },
    'position-history': {
      tradingPair: 'SOL/USDT',
      icon: 'cryptocurrency:sol',
      type: 'Limit',
      side: 'Buy',
      price: 150,
      quantity: 10,
      orderAmount: '10 USDT',
      tpSl: 'TP: 160 / SL: 140',
      filled: '100%',
      status: 'Closed',
      triggerConditions: undefined,
    },
    'order-trade-history': {
      tradingPair: 'ADA/USDT',
      icon: 'cryptocurrency:ada',
      type: 'Market',
      side: 'Sell',
      price: 0.5,
      quantity: 1000,
      orderAmount: '1000 USDT',
      filled: '100%',
      status: 'Closed',
      tpSl: undefined,
      triggerConditions: undefined,
    },
    'capital-flow': {
      tradingPair: 'BNB/USDT',
      icon: 'cryptocurrency:bnb',
      side: 'Buy',
      price: 500,
      quantity: 5,
      orderAmount: '5 USDT',
      status: 'Open',
      type: undefined,
      tpSl: undefined,
      filled: '0%',
      triggerConditions: undefined,
    },
    'wallet': {
      tradingPair: 'XRP/USDT',
      icon: 'cryptocurrency:xrp',
      quantity: 2000,
      orderAmount: '2000 USDT',
      filled: '100%',
      status: 'Closed',
      type: undefined,
      side: undefined,
      price: undefined,
      tpSl: undefined,
      triggerConditions: undefined,
    },
  };

  return Array.from({ length: 8 }, (_, i) => ({
    ...baseData[tab],
    id: i + 1,
    time: new Date(Date.now() - i * 60000).toLocaleString(),
    side: baseData[tab].side ? (i % 2 === 0 ? 'Buy' : 'Sell') : undefined,
    price: baseData[tab].price ? baseData[tab].price! + i * 10 : undefined,
    quantity: baseData[tab].quantity! + i * 0.1,
    status: tab === 'open-position' || tab === 'open-order' ? 'Open' : 'Closed',
  })) as TableRowData[];
};

// استایل‌های سفارشی
const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 15,
  marginRight: theme.spacing(1),
  padding: theme.spacing(3),
  height: '100%',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
}));


const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 20,
  padding: theme.spacing(0.5, 1.5),
  fontSize: '0.75rem',
  fontWeight: 500,
  height: 36,
  boxShadow: 'none',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  '&:hover': {
    boxShadow: theme.shadows[2],
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const TableCard = styled(motion.div)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
  borderRadius: 16,
  padding: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(0),
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.1)',
  },
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
}));

const FieldValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 500,
  textWrap: 'nowrap',
  color: theme.palette.text.primary,
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabButton = styled(Button)(({ theme, selected }: { theme: any; selected: boolean }) => ({
  fontSize: '0.75rem',
  borderRadius: 12,
  padding: theme.spacing(0.5, 1.5),
  fontWeight: 'medium',
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.action.hover,
  },
}));

// انیمیشن‌ها
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.5, ease: "easeOut" as any },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.3, ease: "easeInOut" as any },
  },
};

const SpotTable: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('open-position');
  const [hideOtherPairs, setHideOtherPairs] = useState(false);
  const [tableData, setTableData] = useState<{ [key: string]: TableRowData[] }>({
    'open-position': generateFakeDataForTab('open-position'),
    'open-order': generateFakeDataForTab('open-order'),
    'position-history': generateFakeDataForTab('position-history'),
    'order-trade-history': generateFakeDataForTab('order-trade-history'),
    'capital-flow': generateFakeDataForTab('capital-flow'),
    'wallet': generateFakeDataForTab('wallet'),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortConfig, setSortConfig] = useState<{ key: keyof TableRowData; direction: 'asc' | 'desc' } | null>(null);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const [editRow, setEditRow] = useState<TableRowData | null>(null);
  const [defaultTradingPair, setDefaultTradingPair] = useState('BTC/USDT');

  // تعریف تب‌ها
  const tabs = [
    { id: 'open-position', label: 'Open Position', icon: 'ph:open' },
    { id: 'open-order', label: 'Open Order', icon: 'mdi:order-bool-ascending' },
    { id: 'position-history', label: 'Position History', icon: 'mdi:history' },
    { id: 'order-trade-history', label: 'Order & Trade History', icon: 'mdi:file-document-multiple' },
    { id: 'capital-flow', label: 'Capital Flow', icon: 'mdi:cash-multiple' },
    { id: 'wallet', label: 'Wallet', icon: 'mdi:wallet' },
  ];

  // محاسبه تعداد ردیف‌ها برای هر تب
  const tabCounts = useMemo(() => {
    return tabs.reduce((acc, tab) => {
      const data = hideOtherPairs
        ? tableData[tab.id].filter(row => row.tradingPair === defaultTradingPair)
        : tableData[tab.id];
      acc[tab.id] = data.length;
      return acc;
    }, {} as { [key: string]: number });
  }, [tableData, hideOtherPairs, defaultTradingPair]);

  // فیلتر کردن داده‌ها بر اساس hideOtherPairs
  const filteredTableData = useMemo(() => {
    return hideOtherPairs
      ? tableData[activeTab].filter(row => row.tradingPair === defaultTradingPair)
      : tableData[activeTab];
  }, [tableData, activeTab, hideOtherPairs, defaultTradingPair]);

  // هندلرها

  const handleEdit = useCallback((row: TableRowData) => {
    setEditRow(row);
    setOpenSettingsModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setOpenSettingsModal(false);
    setEditRow(null);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (editRow) {
      setTableData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].map((row) =>
          row.id === editRow.id ? { ...editRow, orderAmount: `${editRow.quantity} USDT` } : row
        ),
      }));
      handleModalClose();
    }
  }, [editRow, activeTab, handleModalClose]);

  const handleSaveSettings = useCallback(() => {
    alert(`Settings saved: Default Trading Pair = ${defaultTradingPair}`);
    handleModalClose();
  }, [defaultTradingPair, handleModalClose]);

  const handleDelete = useCallback((id: number) => {
    setTableData((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((row) => row.id !== id),
    }));
  }, [activeTab]);

  const handleCancelAll = useCallback(() => {
    if (activeTab === 'open-position' || activeTab === 'open-order') {
      setTableData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].map((row) =>
          row.status === 'Open' ? { ...row, status: 'Canceled' as const } : row
        ),
      }));
    }
  }, [activeTab]);

  const handleSettingsOpen = useCallback(() => {
    setOpenSettingsModal(true);
    setEditRow(null);
  }, []);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setOpenMenu(null);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertToCSV = (data: any[]) => {
    if (!data.length) return '';
    const keys = Object.keys(data[0]);
    const header = keys.join(',');
    const rows = data.map((row) =>
      keys.map((k) => `"${row[k] ?? ''}"`).join(',')
    );
    return [header, ...rows].join('\n');
  };

  const parseCSV = (csv: string) => {
    const [headerLine, ...lines] = csv.trim().split('\n');
    const headers = headerLine.split(',').map((h) => h.replace(/"/g, ''));
    return lines.map((line) => {
      const values = line.split(',').map((v) => v.replace(/"/g, ''));
      return headers.reduce((obj, key, idx) => {
        obj[key] = values[idx];
        return obj;
      }, {} as Record<string, string>);
    });
  };

  const handleMenuAction = useCallback(
    (action: string) => {
      switch (action) {
        case 'export': {
          const csv = convertToCSV(tableData[activeTab]);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${activeTab}.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          break;
        }
        case 'import': {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.csv';
          input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            const text = await file.text();
            const parsedData = parseCSV(text);
            setTableData((prev) => ({
              ...prev,
              [activeTab]: parsedData as unknown as TableRowData[],
            }));
          };
          input.click();
          break;
        }
        case 'refresh': {
          setTableData((prev) => ({
            ...prev,
            [activeTab]: generateFakeDataForTab(activeTab),
          }));
          break;
        }
        default:
          break;
      }
      handleMenuClose();
    },
    [tableData, activeTab, handleMenuClose]
  );

  const showActions = activeTab === 'open-position' || activeTab === 'open-order';

  // رندر ردیف‌های جدول به صورت کارت
  const renderTableRow = (row: TableRowData) => {
    const headers = tabHeaders[activeTab];
    return (
      <TableCard
        key={row.id}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(auto-fit, minmax(120px, 1fr))', md: 'repeat(auto-fit, minmax(120px, 1fr))' },
          gap: 1,
          my: 1,
          alignItems: 'center',
        }}
      >
        {headers.map((header, idx) => {
          if (!header.key) return null;

          const value = row[header.key as keyof TableRowData];
          if (!value && value !== 0) return null;

          return (
            <Box height="100%" key={idx}>
              <FieldLabel>{header.label}</FieldLabel>
              {header.key === 'tradingPair' ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon icon={row.icon} width={20} height={20} />
                  <FieldValue>{value}</FieldValue>
                </Box>
              ) : header.key === 'side' ? (
                <FieldValue
                  sx={{
                    bgcolor: value === 'Buy' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: value === 'Buy' ? theme.palette.success.main : theme.palette.error.main,
                    borderRadius: 1,
                    px: 2,
                    py: 0.5,
                    display: 'inline-block',
                  }}
                >
                  {value}
                </FieldValue>
              ) : header.key === 'filled' ? (
                <FieldValue
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    display: 'inline-block',
                  }}
                >
                  {value}
                </FieldValue>
              ) : header.key === 'price' ? (
                <FieldValue>
                  ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </FieldValue>
              ) : (
                <FieldValue>{value}</FieldValue>
              )}
            </Box>
          );
        })}

        {showActions && row.status === 'Open' && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Edit Order">
              <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={() => handleEdit(row)}>
                <Icon icon="fa-solid:pen" width={14} height={14} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Order">
              <IconButton size="small" sx={{ color: theme.palette.error.main }} onClick={() => handleDelete(row.id)}>
                <Icon icon="fa-solid:trash" width={14} height={14} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </TableCard>
    );
  };

  return (
    <SectionCard>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* تب‌ها */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: { xs: 0.5, sm: 1 },
            pb: 1,
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.palette.divider} transparent`,
            '&::-webkit-scrollbar': {
              height: { xs: '4px', sm: '6px' },
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.divider,
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              startIcon={<Icon icon={tab.icon} width={14} />}
              sx={{
                fontSize: { xs: 9, sm: 10 },
                textWrap: 'nowrap',
                px: { xs: 1, sm: 1.5 },
                py: { xs: 0.5, sm: 0.75 },
                minWidth: 'fit-content',
                borderRadius: { xs: '8px', sm: '12px' },
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: { xs: 'none', sm: 'translateY(-1px)' },
                },
              }} theme={undefined}            >
              {tab.label} ({tabCounts[tab.id]})
            </TabButton>
          ))}
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* فیلترها و دکمه‌ها */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <FormControlLabel
              control={<Checkbox size="small" checked={hideOtherPairs} onChange={(e) => setHideOtherPairs(e.target.checked)} />}
              label={<Typography variant="caption">Hide Other Pairs</Typography>}
            />

            <StyledButton onClick={handleCancelAll}>
              <Icon icon="mdi:cancel" width={14} style={{ marginRight: 4 }} />
              Cancel All
            </StyledButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Settings">
              <IconButton size="small" sx={{ color: theme.palette.text.primary }} onClick={handleSettingsOpen}>
                <Icon icon="fa:sliders" width={16} height={16} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Menu">
              <IconButton size="small" sx={{ color: theme.palette.text.primary }} onClick={handleMenuOpen}>
                <Icon icon="fa-solid:bars" width={16} height={16} />
              </IconButton>
            </Tooltip>

            <StyledButton onClick={handleMenuAction.bind(null, 'refresh')}>
              <Icon icon="mdi:refresh" width={14} style={{ marginRight: 4 }} />
              Refresh
            </StyledButton>
          </Box>
        </Box>

        {/* منو */}
        <Menu
          anchorEl={openMenu}
          open={Boolean(openMenu)}
          onClose={handleMenuClose}
          sx={{ '& .MuiPaper-root': { borderRadius: 2, boxShadow: theme.shadows[4] } }}
        >
          <MenuItem onClick={() => handleMenuAction('export')}>
            <ListItemIcon><Icon icon="fa-solid:download" width={16} /></ListItemIcon>
            <ListItemText>Export Data</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction('import')}>
            <ListItemIcon><Icon icon="fa-solid:upload" width={16} /></ListItemIcon>
            <ListItemText>Import Data</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction('refresh')}>
            <ListItemIcon><Icon icon="fa-solid:refresh" width={16} /></ListItemIcon>
            <ListItemText>Refresh Table</ListItemText>
          </MenuItem>
        </Menu>

        {/* محتوای جدول */}
        <Box
          sx={{
            maxHeight: 380,
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.divider, borderRadius: '6px' },
          }}
        >
          <AnimatePresence>
            {filteredTableData.map((row) => renderTableRow(row))}
          </AnimatePresence>

          {filteredTableData.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Icon icon="mdi:database-remove" width={40} color={theme.palette.text.secondary} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                No transactions found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* مودال تنظیمات/ادیت */}
      <Modal open={openSettingsModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400, md: 500 },
            bgcolor: theme.palette.background.paper,
            borderRadius: 3,
            boxShadow: theme.shadows[10],
            p: { xs: 2, sm: 3, md: 4 },
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon={editRow ? 'fa-solid:edit' : 'fa-solid:sliders'} width={24} />
            {editRow ? `Edit Order (ID: ${editRow.id})` : 'Settings'}
          </Typography>

          {editRow ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={editRow.type || ''}
                  onChange={(e) => setEditRow({ ...editRow, type: e.target.value })}
                  label="Type"
                >
                  <MenuItem value="Limit">Limit</MenuItem>
                  <MenuItem value="Market">Market</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Side</InputLabel>
                <Select
                  value={editRow.side || ''}
                  onChange={(e) => setEditRow({ ...editRow, side: e.target.value as 'Buy' | 'Sell' })}
                  label="Side"
                >
                  <MenuItem value="Buy">Buy</MenuItem>
                  <MenuItem value="Sell">Sell</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Price (USDT)"
                type="number"
                value={editRow.price || ''}
                onChange={(e) => setEditRow({ ...editRow, price: Number(e.target.value) })}
                fullWidth
              />

              <TextField
                label="Quantity"
                type="number"
                value={editRow.quantity || ''}
                onChange={(e) => setEditRow({ ...editRow, quantity: Number(e.target.value) })}
                fullWidth
              />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Default Trading Pair"
                value={defaultTradingPair}
                onChange={(e) => setDefaultTradingPair(e.target.value)}
                fullWidth
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={handleModalClose} sx={{ borderRadius: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={editRow ? handleSaveEdit : handleSaveSettings} sx={{ borderRadius: 2 }}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </SectionCard>
  );
};

export default SpotTable;