export const products = [
  { id: 1, name: "Laptop", price: 12900, category: "Computer", image: "/laptop.svg", description: "High-performance laptop" },
  { id: 2, name: "Headphones", price: 1290, category: "Audio", image: "/headphones.svg", description: "Noise cancelling headphones" },
  { id: 3, name: "Backpack", price: 890, category: "Fashion", image: "/backpack.svg", description: "Durable travel backpack" },
  { id: 4, name: "Smart Watch", price: 2990, category: "Gadget", image: "/smart_watch.svg", description: "Feature-rich smartwatch" }
];

export const getProducts = () => products;
export const getProductById = (id) => products.find((p) => p.id === Number(id));