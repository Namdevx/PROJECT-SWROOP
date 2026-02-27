import React from "react";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="products">
          <Products />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}
