import React from "react";
import { WHATSAPP_NUMBER } from "./config";

export default function Contact() {
  const openWhatsApp = (e, text = "Hello, I would like to order.") => {
    e && e.preventDefault();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Contact</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>WhatsApp Orders</h3>
            <p>WhatsApp orders available — fastest way to place bulk orders.</p>
            <button
              className="btn whatsapp-btn large"
              onClick={(e) =>
                openWhatsApp(e, "Hello, I want to place a bulk order.")
              }
            >
              WhatsApp Order
            </button>
          </div>

          <div className="contact-card">
            <h3>Instagram</h3>
            <p>@all.in.one_se</p>
            <a
              className="btn secondary"
              href="https://instagram.com/all.in.one_se"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Instagram
            </a>
          </div>

          <div className="contact-card">
            <h3>Phone</h3>
            <p>+91 9326201544</p>
          </div>

          <div className="contact-card">
            <h3>Address</h3>
            <p>Address placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
