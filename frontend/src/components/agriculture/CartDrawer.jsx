import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatters';
import { productService } from '../../services/productService';

export function CartDrawer({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [shippingAddress, setShippingAddress] = useState('Green Valley Agro Farm, Coimbatore Rural, TN');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estShipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.50) : 0;
  const total = subtotal + estShipping;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsPlacingOrder(true);
    try {
      const orderPayload = {
        farmer_id: 'default-farmer',
        shipping_address: shippingAddress,
        total_amount: total,
        items: cartItems.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          unit_price: item.price
        }))
      };

      const result = await productService.placeOrder(orderPayload);
      setOrderSuccess(result);
      onClearCart();
    } catch (err) {
      console.error(err);
      // Fallback demo order
      setOrderSuccess({
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        status: "Confirmed (Demo Order)",
        total_amount: total
      });
      onClearCart();
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
        
        {/* Top Header */}
        <div>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">Your Agricultural Cart</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => {
                setOrderSuccess(null);
                onClose();
              }}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {orderSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Demo Order Placed!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Order ID: <strong>{orderSuccess.id}</strong>. Your requested agricultural supplies have been scheduled for dispatch.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                  Total: <strong>{formatCurrency(orderSuccess.total_amount || total)}</strong> (No actual payment charged)
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setOrderSuccess(null);
                    onClose();
                  }}
                  className="w-full bg-emerald-800"
                >
                  Continue Browsing
                </Button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <ShoppingBag className="h-12 w-12 mx-auto stroke-1" />
                <p className="text-sm font-semibold text-slate-600">Your cart is empty</p>
                <p className="text-xs text-slate-400">Add seeds, organic bio-nutrients, or irrigation tools.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 gap-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg object-cover bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-slate-900 truncate">{item.name}</h5>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {formatCurrency(item.price, item.currency)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                        className="text-xs border border-slate-300 rounded-md py-1 px-1.5 bg-white font-semibold"
                      >
                        {[1, 2, 3, 4, 5, 10].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Checkout */}
        {cartItems.length > 0 && !orderSuccess && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Agronomic Freight</span>
                <span className="font-semibold text-slate-800">
                  {estShipping === 0 ? <span className="text-emerald-700">Free</span> : formatCurrency(estShipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Due (Demo)</span>
                <span className="text-emerald-800 font-extrabold">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Delivery Farm Address
              </label>
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full bg-emerald-800 hover:bg-emerald-900"
              onClick={handleCheckout}
              isLoading={isPlacingOrder}
            >
              <span>Place Demo Farm Order ({formatCurrency(total)})</span>
            </Button>
            
            <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <span>Demo mode • No payment or card required</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
