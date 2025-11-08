import React, { useEffect, useState } from "react";
import { getProducts, addToCart, getCart, removeCartItem, checkout } from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkoutMsg, setCheckoutMsg] = useState("");

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const loadCart = async () => {
    const data = await getCart();
    setCart(data.items);
    setTotal(data.total);
  };

  const handleAdd = async (id) => {
    await addToCart(id, 1);
    loadCart();
  };

  const handleRemove = async (id) => {
    await removeCartItem(id);
    loadCart();
  };

  const handleCheckout = async () => {
    const { receipt } = await checkout({ name: "Yash", email: "test@mail.com" });
    setCheckoutMsg(`✅ Checkout successful! Total: ₹${receipt.total}`);
  };

  return (
    <div className="font-sans w-[187%] p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-center text-indigo-700">🛒 Vibe Commerce</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
        {/* PRODUCTS SECTION */}
        <div className="pr-4 border-r border-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Products</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                <p className="text-gray-600 mb-3">₹{p.price}</p>
                <button
                  onClick={() => handleAdd(p._id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CART SECTION */}
        <div className="pl-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((c) => (
              <div
                key={c._id}
                className="flex justify-between items-center bg-white rounded-lg shadow p-3 mb-3"
              >
                <div>
                  <span className="font-medium text-gray-800">{c.name}</span>
                  <p className="text-sm text-gray-500">Qty: {c.qty}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-800 font-semibold">₹{c.lineTotal}</span>
                  <button
                    onClick={() => handleRemove(c._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))
          )}

          {/* TOTAL AND CHECKOUT */}
          <div className="mt-5 p-4 bg-indigo-50 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700">Total: ₹{total}</h3>
            <button
              onClick={handleCheckout}
              className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Checkout
            </button>
            {checkoutMsg && (
              <p className="mt-3 text-green-700 font-medium text-sm">{checkoutMsg}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
