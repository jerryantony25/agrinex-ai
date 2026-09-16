import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, Info, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { MarketTable } from '../components/agriculture/MarketTable';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { marketService } from '../services/marketService';

export function MarketPage() {
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMarket() {
      setIsLoading(true);
      try {
        const data = await marketService.getMarketInsights();
        setMarketData(data);
      } catch (err) {
        console.error("Market API load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadMarket();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <TrendingUp className="h-6 w-6 text-emerald-800" />
            <span>Agricultural Mandi & Market Insights</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Wholesale commodity rates, modal prices per quintal, daily volume arrivals, and price movement trends.
          </p>
        </div>

        <Badge variant="warning" size="sm">Regional Mandi Benchmarks</Badge>
      </div>

      {/* Market Table */}
      <MarketTable
        items={marketData?.items || []}
        notice={marketData?.notice}
      />

    </div>
  );
}
