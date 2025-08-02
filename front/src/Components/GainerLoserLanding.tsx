// src/Components/GainerLoserLanding.tsx (Server Component)
import ClientGainerLoser from './GainerLoserClient';

async function fetchData() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d',
    { next: { revalidate: 60 } }
  );
  const coins = await res.json();

  const data = coins.map((coin: any) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price,
    performance: coin.price_change_percentage_7d_in_currency,
    marketCap: coin.market_cap,
  }));

  const sorted = [...data].sort((a, b) => (b.performance || 0) - (a.performance || 0));

  return {
    gainers: sorted.slice(0, 3),
    losers: sorted.slice(-3).reverse(),
  };
}

export default async function GainerLoserLanding() {
  const { gainers, losers } = await fetchData();

  // اینجا کل داده رو به کلاینت پاس می‌دیم
  return <ClientGainerLoser gainers={gainers} losers={losers} />;
}
