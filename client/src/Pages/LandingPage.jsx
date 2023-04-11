import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if(!searchQuery) {
      alert("Please enter your post code.")
      return;
    }
    navigate(`/houses/${searchQuery}`)
  }

  return (
    
    <div>
      <Header />
      <div style={{marginTop: "150px"}}>
      <section className={styles.imageBg}>
        <div className={styles.formHolder}>
          <form action="" className="form">
            
            <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Enter post code within Edinburgh. Eg EH10, 5DT"
              className={styles.input}
            />{" "}
           
            {/* <Link to={`/houses/${searchQuery}`}> */}
                <button
                style={{backgroundColor: '#FF4545', color: 'aliceblue'}}
                className={`btn ${styles.search}`}
                onClick={handleSearch}
                >
                {" "}
                <i class="bi bi-search"></i> Search
                </button>
            {/* </Link> */}
          </form>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
};
