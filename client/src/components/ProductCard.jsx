import React from "react";
import { WHATSAPP_NUMBER } from "../config";

export default function ProductCard({ product }) {
  const { name, category, imageUrl, description, price } = product;

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello I want to order ${name}${price ? ` - Price: ${price}` : ``}`
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <article
      className="product-card"
      aria-labelledby={`product-${product._id}`}
    >
      <img
        src={
          imageUrl ||
          `https://via.placeholder.com/400x250?text=${encodeURIComponent(name)}`
        }
        alt={name}
        loading="lazy"
      />
      <div className="card-body">
        <h3 id={`product-${product._id}`}>{name}</h3>
        <p className="category">{category || "General"}</p>
        {price && <div className="price">{price}</div>}
        <p className="muted-text" style={{ margin: "8px 0 12px" }}>
          {description}
        </p>
        <button
          className="btn whatsapp-btn"
          onClick={openWhatsApp}
          aria-label={`Order ${name} on WhatsApp`}
        >
          WhatsApp Order
        </button>
      </div>
    </article>
  );
}
