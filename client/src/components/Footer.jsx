import React from 'react'
import styles from "./Footer.module.css"
import Logo from "../assets/acc.png";


export const Footer = () => {
  return (
    <footer className={`text-center text-white ${styles.footer}`}>
      <section className="p-5 ">
        <div className="container text-center text-md-start mt-5">
          <a href="#">
            <img className={`${styles.logo}`} src={Logo} alt="" />
          </a>

          <ul className={` ${styles.navBar}`}>
          <li className="">
            <a href="#learn" className={`nav-link ${styles.navLink}`}>Agents</a>
          </li>
          <li className="">
            <a href="#questions" className={`nav-link ${styles.navLink}`}>Napier</a>
          </li>
          <li className="nav-item">
            <a href="#questions" className={`nav-link ${styles.navLink}`}>SiteMap</a>
          </li>

          <li className={`nav-item ${styles.navLink}`}>
            <a href="#questions" className={`nav-link ${styles.navLink}`}>Contact</a>
          </li>

          <li className={`nav-item ${styles.navLink}`}>
            <a href="#questions" className={`nav-link ${styles.navLink}`}>About</a>
          </li>
        </ul>

        <div>
            <p className={`${styles.creator}`}>Created by Samuel Toloruntomi 40500521</p>
        </div>

        <div className={`${styles.iconList}`}>
                <a href="" className="me-5 link-grayish">
                    <i class="bi bi-facebook"></i>
                </a>
                <a href="" className="me-5 link-grayish">
                    <i class="bi bi-twitter"></i>
                </a>
                <a href="" className="me-5 link-grayish">
                    <i class="bi bi-linkedin"></i>
                </a>
                <a href="" className="me-5 link-grayish">
                    <i class="bi bi-instagram"></i>
                </a>
              </div>
        </div>
      </section>
    </footer>
  )
}
