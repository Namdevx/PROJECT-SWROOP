import React, { useState, useEffect } from "react";
import logo from "./imag.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const handleLink = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  useEffect(() => {
    const ids = ["home", "products", "about", "contact"];
    const observers = [];
    const options = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0,
    };

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        });
      }, options);
      obs.observe(el);
      observers.push(obs);
    });

    const onScroll = () => {
      // close mobile menu when scrolling manually
      setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">
          <a
            href="#home"
            className="logo-link"
            onClick={(e) => handleLink(e, "home")}
          >
            <img
              src={logo}
              alt="Shivam Enterprises logo"
              className="logo-img"
            />
            <span className="logo-text">Shivam Enterprises</span>
          </a>
        </div>

        <nav className="nav">
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
          <ul className={`nav-list ${open ? "open" : ""}`}>
            <li>
              <a
                href="#home"
                onClick={(e) => handleLink(e, "home")}
                className={active === "home" ? "active" : ""}
                aria-current={active === "home" ? "page" : undefined}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#products"
                onClick={(e) => handleLink(e, "products")}
                className={active === "products" ? "active" : ""}
                aria-current={active === "products" ? "page" : undefined}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => handleLink(e, "about")}
                className={active === "about" ? "active" : ""}
                aria-current={active === "about" ? "page" : undefined}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleLink(e, "contact")}
                className={active === "contact" ? "active" : ""}
                aria-current={active === "contact" ? "page" : undefined}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
