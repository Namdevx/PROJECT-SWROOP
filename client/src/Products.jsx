import React, { useState, useMemo } from "react";
import ProductCard from "./components/ProductCard";
import b7000Image from "./glue.png";
import pipingImage from "./72yrds.png";

const RAW_PRODUCTS = [
  {
    id: 1,
    name: "Premium Beads",
    category: "Beads",
    imageId: "beads",
    price: "₹120 / pack",
  },
  {
    id: 2,
    name: "Strong Nylon Thread",
    category: "Threads",
    imageId: "nylon-thread",
    price: "₹220 / spool",
  },
  {
    id: 3,
    name: "Jewelry Hooks",
    category: "Hooks",
    imageId: "hooks",
    price: "₹80 / set",
  },
  {
    id: 4,
    name: "Jump Rings (Silver/Gold)",
    category: "Rings",
    imageId: "rings",
    price: "₹150 / pack",
  },
  {
    id: 5,
    name: "B-7000 Adhesive Glue",
    category: "Glue",
    imageId: "glue",
    price: "₹95 / tube",
  },
  {
    id: 6,
    name: "Sparkling Crystal Beads",
    category: "Beads",
    imageId: "crystals",
    price: "₹160 / pack",
  },
  {
    id: 7,
    name: "Elastic Thread Roll",
    category: "Threads",
    imageId: "elastic",
    price: "₹140 / roll",
  },
  {
    id: 8,
    name: "Jewelry Making Tools",
    category: "Tools",
    imageId: "tools",
    price: "₹350 / set",
  },
  {
    id: 9,
    name: "72yrds Piping (Bias Card)",
    category: "Cords",
    imageId: "piping",
    price: "₹260 / piece",
  },
];

// Simple placeholder mapping — will always return a usable image URL
const getPlaceholderFor = (name, id) => {
  return `https://via.placeholder.com/400x250/fff/333?text=${encodeURIComponent(
    name
  )}`;
};

const PRODUCTS = RAW_PRODUCTS.map((p) => ({
  _id: String(p.id),
  name: p.name,
  category: p.category,
  imageUrl:
    p.imageId === "glue"
      ? b7000Image
      : p.imageId === "piping"
      ? pipingImage
      : getPlaceholderFor(p.name, p.imageId),

  description: "Professional quality materials for your creative needs.",
  price: p.price,
}));

const CATEGORIES = [
  "All",
  ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="products" style={{ padding: "24px 0" }}>
      <div className="container">
        <div className="section-header">
          <h2>Products</h2>
          <p>All Jewelry Making Materials at Wholesale Prices</p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 18,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            aria-label="Search materials"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: 8,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              minWidth: 220,
            }}
          />

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  border:
                    activeCategory === cat
                      ? "2px solid #d4a017"
                      : "1px solid #eee",
                  background:
                    activeCategory === cat ? "#d4a017" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#071233",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: "#6b7280", textAlign: "center", marginTop: 24 }}>
            No materials found.
          </p>
        )}
      </div>
    </div>
  );
}
