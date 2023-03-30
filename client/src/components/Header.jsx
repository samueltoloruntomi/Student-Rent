import React from 'react'
import Logo from "../assets/acc.png";
import styles from "./Header.module.css"

export const Header = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark py-1 scrolling-navbar ${styles.main}`}>
    <div className="container">
      <a href='/' className="navbar-brand">
        <img className={`${styles.logo}`} src={Logo} alt="house" />
    </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navmenu">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">About</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  )
}
