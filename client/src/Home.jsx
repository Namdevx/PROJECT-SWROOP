import React from "react";
import { WHATSAPP_NUMBER } from "./config";
import glue from "./glue.png";

export default function Home() {
  const goProducts = (e) => {
    e.preventDefault();
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const requestQuote = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      "Hello, I would like a quote for your products."
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <div className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="kicker">Wholesale • Fast Dispatch</span>
          <h1>Welcome to Shivam Enterprises</h1>
          <p className="lead">
            Best Jewelry Making Materials Supplier — Quality you can trust.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              className="btn primary"
              onClick={goProducts}
              aria-label="View products"
            >
              View Products
            </button>
            <button
              className="btn whatsapp-btn"
              onClick={requestQuote}
              aria-label="Request a quote via WhatsApp"
            >
              Request Quote
            </button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img src={glue} alt="Featured material" />
        </div>
      </div>
    </div>
  );
}
