import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api"
});

export const getProducts = () => API.get("/products").then(r => r.data);
export const getCart = () => API.get("/cart").then(r => r.data);
export const addToCart = (productId, qty) => API.post("/cart", { productId, qty }).then(r => r.data);
export const removeCartItem = (id) => API.delete(`/cart/${id}`).then(r => r.data);
export const checkout = (data) => API.post("/checkout", data).then(r => r.data);
