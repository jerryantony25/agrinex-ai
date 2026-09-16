import React from 'react';
import { ShoppingCart, Star, Check, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/formatters';

export function ProductCard({ product, onAddToCart, isInCart }) {
  return (
    <Card className="p-4 border-slate-200 bg-white hover:border-emerald-300 transition-all flex flex-col justify-between group">
      <div>
        
        {/* Product Image */}
        <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
          <img
            src={product.image_url || "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="default" size="sm" className="bg-white/90 backdrop-blur-xs font-semibold">
              {product.category}
            </Badge>
          </div>
          {product.is_demo && (
            <div className="absolute top-2 right-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900/80 text-white backdrop-blur-xs">
                Catalog Demo
              </span>
            </div>
          )}
        </div>

        {/* Rating & Stock */}
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Name & Description */}
        <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
          {product.name}
        </h4>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

      </div>

      {/* Footer Price & Add Button */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Price</span>
          <span className="text-base font-extrabold text-slate-900">
            {formatCurrency(product.price, product.currency)}
          </span>
        </div>

        <Button
          size="sm"
          variant={isInCart ? "secondary" : "primary"}
          onClick={() => onAddToCart(product)}
          className={isInCart ? "bg-emerald-100 text-emerald-900" : "bg-emerald-800 hover:bg-emerald-900"}
          icon={isInCart ? Check : ShoppingCart}
        >
          <span>{isInCart ? 'In Cart' : 'Add'}</span>
        </Button>
      </div>
    </Card>
  );
}
