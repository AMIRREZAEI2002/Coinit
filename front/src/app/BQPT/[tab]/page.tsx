'use client';

import React from 'react';
import { motion } from 'framer-motion';
import QuickBuySell from '@/Components/QuickBuySell';
import P2P from '@/Components/p2p';
import ThirdParty from '@/Components/ThirdParty';
import Transfer from '@/Components/Transfer';

export default function TabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = React.use(params);

  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {tab === 'QuickBuySell' && <QuickBuySell />}
      {tab === 'P2P' && <P2P />}
      {tab === 'ThirdParty' && <ThirdParty />}
      {tab === 'Transfer' && <Transfer/>}
    </motion.div>
  );
}
