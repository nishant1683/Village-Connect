import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCartItems } from "@/store/shop/cart-slice";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import accImg from "../../assets/account.jpg";

function ShoppingCartPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  const items = cartItems?.items || [];

  const totalCartAmount =
    items.length > 0
      ? items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // Free shipping above Rs. 500, else Rs. 50.
  const shippingFee = totalCartAmount > 500 || totalCartAmount === 0 ? 0 : 50;
  const estimatedTax = totalCartAmount * 0.05; // 5% GST
  const grandTotal = totalCartAmount + shippingFee + estimatedTax;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Hero Banner */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="Your Cart"
          className="h-full w-full object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 bg-gradient-to-r from-emerald-950/80 to-transparent">
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-sm text-emerald-100/90 max-w-md">
            Review your selected products, manage quantities, and proceed to checkout to secure your items.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="bg-emerald-50 p-4 rounded-full mb-6">
              <ShoppingBag className="h-12 w-12 text-emerald-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-md text-center">
              It looks like you haven't added any products to your cart yet. Explore our curated village products and start shopping!
            </p>
            <Button asChild className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-8 py-3 h-auto rounded-xl transition-all shadow-md hover:shadow-emerald-900/10">
              <Link to="/shop/listing" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardHeader className="border-b border-slate-50 pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold text-slate-800">
                      Cart Items ({items.length})
                    </CardTitle>
                    <Link to="/shop/listing" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors">
                      <ArrowLeft className="h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="divide-y divide-slate-100 pt-4 px-6">
                  {items.map((item) => (
                    <div key={item.productId} className="py-5 first:pt-0 last:pb-0">
                      <UserCartItemsContent cartItem={item} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Cart Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Free Delivery</h4>
                    <p className="text-[10px] text-slate-500">On orders over Rs. 500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Secure Payments</h4>
                    <p className="text-[10px] text-slate-500">100% SSL encryption</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Easy Returns</h4>
                    <p className="text-[10px] text-slate-500">Within 7 days delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-slate-100 shadow-sm rounded-2xl bg-white sticky top-24">
                <CardHeader className="border-b border-slate-50 pb-4">
                  <CardTitle className="text-lg font-bold text-slate-800">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">Rs {totalCartAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Estimated Tax (5%)</span>
                    <span className="font-semibold text-slate-800">Rs {estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Shipping Fee</span>
                    {shippingFee === 0 ? (
                      <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs">Free</span>
                    ) : (
                      <span className="font-semibold text-slate-800">Rs {shippingFee.toFixed(2)}</span>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-base font-bold text-slate-900 pt-2">
                    <span>Total</span>
                    <span className="text-emerald-800 font-extrabold">Rs {grandTotal.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3 pb-6">
                  <Button
                    onClick={() => navigate("/shop/checkout")}
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 h-auto rounded-xl shadow-md shadow-emerald-950/10 transition-all text-sm"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/shop/listing")}
                    className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-700 py-3 h-auto rounded-xl text-sm"
                  >
                    Continue Shopping
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCartPage;
