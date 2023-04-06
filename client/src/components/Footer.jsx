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
            <a href="https://www.gumtree.co.uk/" className={`nav-link ${styles.navLink}`}>Agents</a>
          </li>
          <li className="">
            <a href="https://www.napier.ac.uk/" className={`nav-link ${styles.navLink}`}>Napier</a>
          </li>
          
          <li className={`nav-item ${styles.navLink}`}>
            <a href="https://www.researchgate.net/profile/Samuel-Toloruntomi-2" className={`nav-link ${styles.navLink}`}>Contact</a>
          </li>

          <li className={`nav-item ${styles.navLink}`}>
            <a href="https://livenapierac-my.sharepoint.com/personal/40500521_live_napier_ac_uk/Documents/DISSERTATION/TOLORUNTOMI_Dissertation_40500521.docx" className={`nav-link ${styles.navLink}`}>About</a>
          </li>
        </ul>

        <div>
            <p className={`${styles.creator}`}>Created by Samuel Toloruntomi 40500521</p>
        </div>

        <div className={`${styles.iconList}`}>
                <a href="https://www.facebook.com/toloruntomi.s.femi" className="me-5 link-grayish">
                    <i class="bi bi-facebook"></i>
                </a>
                <a href="https://twitter.com/OlufemiTravis" className="me-5 link-grayish">
                    <i class="bi bi-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/m/in/samuel-toloruntomi" className="me-5 link-grayish">
                    <i class="bi bi-linkedin"></i>
                </a>
                <a href="https://github.com/samueltoloruntomi" className="me-5 link-grayish">
                    <i class="bi bi-github"></i>
                </a>
              </div>
        </div>
      </section>
    </footer>
  )
}
