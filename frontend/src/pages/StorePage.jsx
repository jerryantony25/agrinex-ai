import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShoppingCart, Filter, Search, Sparkles, ShieldCheck, Check } from 'lucide-react';
import { ProductCard } from '../components/agriculture/ProductCard';
import { CartDrawer } from '../components/agriculture/CartDrawer';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { productService } from '../services/productService';
import { useToast } from '../components/ui/Toast';

const CATEGORIES = ['All', 'Seeds', 'Fertilizers', 'Organic', 'Irrigation', 'Tools'];

export function StorePage() {
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const data = await productService.getProducts(selectedCategory === 'All' ? null : selectedCategory);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} added to your agricultural supply order.`
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShoppingBag className="h-6 w-6 text-emerald-800" />
            <span>AGRINEX Agricultural Supply Store</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Curated bio-fertilizers, high-yield hybrid seeds, micro-irrigation hardware, and digital soil probes.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={ShoppingCart}
          onClick={() => setIsCartOpen(true)}
          className="bg-emerald-800 hover:bg-emerald-900 shadow-sm relative"
        >
          <span>View Cart</span>
          {totalCartCount > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-white text-emerald-950 font-extrabold text-xs">
              {totalCartCount}
            </span>
          )}
        </Button>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-amber-700 shrink-0" />
          <span>Catalog items are structured for student portfolio & demonstration. No real financial payments are charged.</span>
        </div>
        <Badge variant="warning" size="sm">Demo Store</Badge>
      </div>

      {/* Category Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onAddToCart={handleAddToCart}
            isInCart={cartItems.some(i => i.id === prod.id)}
          />
        ))}
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
