import React from "react";
import "./styles/Home.css";
import Products from "../product/Products";

const Home = () => (
  <div>
    <main>
      <header className="header">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">FlicKart</span>
            <span className="heading-primary--sub">
              is where Shopping starts
            </span>
          </h1>

          <a href="/shop" className="button button--white button--animated">
            Discover our shop
          </a>
        </div>
      </header>

      <section className="product-home">
        <Products />
      </section>
    </main>
  </div>
);

export default Home;
