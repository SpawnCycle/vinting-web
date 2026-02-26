import { CgAddR, CgPlayListSearch, CgSearch } from "react-icons/cg";
import "./Welcome.css";
import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";

export default function Welcome() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  const openLogin = () => {
    setMode("login");
    setOpen(true);
  };

  const openRegister = () => {
    setMode("register");
    setOpen(true);
  };

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        {/* header */}
        <header className="welcome-header">
          <div className="logo">
            <img src="/images/logo_800x800.png" alt="vinting logo" />
            <p className="title">VINTING</p>
          </div>

          <div className="header-buttons">
            <button className="secondary-btn small" onClick={openLogin}>
              Log in
            </button>
            <button className="primary-btn small" onClick={openRegister}>
              Sign up
            </button>
          </div>
        </header>

        {/* hero */}
        <section className="hero">
          {/* background bloooooob */}
          <div className="color-blob" />

          <div className="hero-left">
            <h1>
              Explore fashion.
              <br />
              Resell effortlessly.
            </h1>

            <p className="subtitle">
              Sell and find second-hand pieces with ease in a modern,
              user-friendly marketplace.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn" onClick={openLogin}>
                Log in
              </button>
              <button className="secondary-btn" onClick={openRegister}>
                Create account
              </button>
            </div>
          </div>

          {/* image wrapper */}
          <div className="hero-image-wrapper">
            <img src="/images/összegezve_1.png" alt="3 cards preview" />
          </div>
        </section>

        {/* features */}
        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">
              <CgSearch className="icon" />
            </div>
            <div>
              <h3>Browse listings</h3>
              <p>Find unique, pre-loved fashion items from real people.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <CgAddR className="icon" />
            </div>
            <div>
              <h3>Post your items</h3>
              <p>
                List your clothes, shoes, or accessories in just a few steps.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <CgPlayListSearch className="icon" />
            </div>
            <div>
              <h3>Manage sales</h3>
              <p>Effortlessly track and manage your active and sold items.</p>
            </div>
          </div>
        </section>
      </div>
      <AuthModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialMode={mode}
      />
    </div>
  );
}
