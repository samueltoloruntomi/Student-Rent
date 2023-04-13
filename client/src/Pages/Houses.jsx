import React, { useState, useMemo, useEffect } from "react";
import styles from "./Houses.module.css";
import House1 from "../assets/acc.png";
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';       
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 
import Pagination from "../components/Pagination"; 
import { useParams } from "react-router-dom";
import { GetScrapedData, GetZooplaScrapedData, GetAltZooplaScrapedData } from "../UTILS/API";
import { Loader } from "../components/Loader";
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";


let PageSize = 3;
export const Houses = () => {
  const [selectedProperties, setSelectedProperties] = useState(null);
  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');

  const [selectedMinBedRoom, setSelectedMinBedRoom] = useState('');
  const [selectedMaxBedRoom, setSelectedMaxBedRoom] = useState('');
  const [houses, setHouses] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const { code } = useParams();
  
  //default images for houses without images from zoopla
  const DEFAULT_IMAGE_URL = 'https://img.freepik.com/free-vector/coming-soon-construction-yellow-design_1017-26685.jpg?w=2000'

  const rooms = [
  
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' }
  ];

  const Prices = [
  
    { name: '£300 pcm' },
    { name: '£400 pcm' },
    { name: '£500 pcm' },
    { name: '£600 pcm' },
    { name: '£700 pcm' },
    { name: '£800 pcm' },
    { name: '£900 pcm' },
    { name: '£1000 pcm' },
    { name: '£1100 pcm' },
    { name: '£1200 pcm' },
    { name: '£1300 pcm' },
    { name: '£1400 pcm' },
    { name: '£1500 pcm' },
    { name: '£1600 pcm' },
    { name: '£1800 pcm' },
    { name: '£2000 pcm' },
  ];

  useEffect(() => {
    searchFunction();
  }, []);

  const checkEmptyFiled = (fields) => {
    for(const field in fields) {
      if(fields[field] !== '') {
        console.log("true")
        return false;
      }
    }
   return true;
  }

  const resetSearch = async () => 
  {
    // console.log("resetting...");
    // console.log(selectedMinPrice);
    console.log(selectedMaxPrice);
    // if((selectedMinPrice === undefined || selectedMinPrice?.name === '' ) && (selectedMaxPrice === '' || selectedMaxPrice?.name === '') && selectedMaxBedRoom === '' && selectedMinBedRoom === '') {
    //   console.log("checking...")
    //   //await searchFunction();
    // }

    await searchFunction();
  }

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  const searchFunction = async () => {
    const houses = await GetScrapedData(code);
    const zooplaHouses = await GetZooplaScrapedData(code);
    const results = [...houses, ...zooplaHouses]
    let shuffledData = shuffleArray(results);

    setHouses(shuffledData)
    return
  }

  const AltSearchFunction = async () => {
    const minPrice = Number(selectedMinPrice?.name.split(" ")[0].replace('£', ''));
    const maxPrice = Number(selectedMaxPrice?.name.split(" ")[0].replace('£', ''));

    const minRoom = Number(selectedMinBedRoom?.name.split(" ")[0]);
    const maxRoom = Number(selectedMaxBedRoom?.name.split(" ")[0]);

    const houses = await GetAltZooplaScrapedData(code, minPrice, maxPrice, minRoom, maxRoom);
    console.log(houses)
    setHouses(houses)
    return
  }

  const filteredFunction = async (e) => {
    e.preventDefault();
    // Use Number() to convert price strings to numbers
    const minPrice = Number(selectedMinPrice?.name.split(" ")[0].replace('£', ''));
    const maxPrice = Number(selectedMaxPrice?.name.split(" ")[0].replace('£', ''));

    const minRoom = Number(selectedMinBedRoom?.name.split(" ")[0]);
    const maxRoom = Number(selectedMaxBedRoom?.name.split(" ")[0]);

  
    // Use Array.filter() to filter houses by price range
    const filteredData = await houses.filter(house => {
      const price = Number(house.price.split(" ")[0].replace(/[^\d.-]/g, "")); // Convert house price to number
      const bedroom = Number(house.rooms.split(" ")[0]);
      //const property = house.agent.toLowerCase().split(" ");

      // THE RULE ENGINE
      return (price >= minPrice || price <= maxPrice) || (bedroom >= minRoom || bedroom <= maxRoom);
    });
    console.log(filteredData);
    if(filteredData.length > 0)  {
      setHouses(filteredData);
    }
    else {
      // searchFunction();
      
      //toastify alert pop-up
  Toastify({
    text: "No record found!, but we are looking for suitable accomodation close to your search.",
    duration: 5000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #ff0000, #f00000)",
    },
    onClick: function(){} // Callback after click
  }).showToast();

  setTimeout(() => {
    AltSearchFunction();
  }, 7000)
      return;
    }
  };
  
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return houses.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);


  if(houses.length > 0) {
    return (
      <div>
        <Header />
        <div className="container">
          
        <div className={` card mb-3 ${styles.filterSearch}`}>
          <form className={`${styles.formCenter}`}>
              <div className="row g-2 container">
              
  
                  <div className="col-md-2">
                    <Dropdown value={selectedMinPrice} onChange={(e) =>{ 
                      setSelectedMinPrice(e.value)
                      if(selectedMaxPrice === undefined && selectedMinPrice === undefined) {
                        console.log("Undefined")
                      }
                      else {
                        console.log("defined");
                      }
                      //resetSearch();
                    }} options={Prices} optionLabel="name" 
                      showClear placeholder="Min price" className={`${styles.mSelect}`} />
                  </div>
  
                  <div className="col-md-2">
                    <Dropdown value={selectedMaxPrice} onChange={(e) =>{ 
                      setSelectedMaxPrice(e.value);
                      //selectedMaxPrice === undefined ? '' :  resetSearch()
                      if(selectedMaxPrice === undefined && selectedMinPrice === undefined) {
                        console.log("Undefined")
                      }
                      else {
                        console.log("defined");
                      }
                      
                      
                    }} options={Prices} optionLabel="name" 
                      showClear placeholder="Max price" className={`${styles.mSelect}`} />
                  </div>
  
                  <div className="col-md-2">
                      <Dropdown value={selectedMinBedRoom} onChange={(e) =>{
                         setSelectedMinBedRoom(e.value);
                         resetSearch();
                        }} options={rooms} optionLabel="name" 
                      showClear placeholder="Min Bedroom" className={`${styles.mSelect}`} />
                  </div>
  
                  <div className="col-md-2">
                      <Dropdown value={selectedMaxBedRoom} onChange={(e) =>{ 
                        setSelectedMaxBedRoom(e.value);
                        resetSearch();
                      }} options={rooms} optionLabel="name" 
                      showClear placeholder="Max Bedroom" className={`${styles.mSelect}`} />
                  </div>
  
                  
  
                  <div className="col-md-2">
                    <Button onClick={filteredFunction} label="Search" severity="danger" />
                    
                  </div>
                  </div>
                  
          </form>
        </div>
  
        {/* <div className={`${styles.houseCard}`}>
  
          </div> */}
  
        <div style={{ marginTop: "350px" }}>
          {houses.map((house, i) => {
            return (
              <div
                class="card mb-3"
                style={{ maxWidth: "1800px", marginTop: "0px" }}
                key={i}
                // onClick={handleNavigation(house.link)}
              >
                {/* to open new window when search results are clicked */}
                <div class="row g-0" onClick={(e) => {
                  e.preventDefault();
                  let str = house.link
                  if(str.charAt(1) == 'p') {
                    window.open(`https://www.gumtree.com${house.link}`, '_blank');
                  }
                  else {
                    window.open(`https://www.zoopla.co.uk${house.link}`, '_blank');
                  }
                }}>
                  <div class="col-md-4">
                  {house.thumbnail && (
              <img src={house.thumbnail} alt={house.title} class="img-fluid rounded-start" style={{height: "100%"}}/>
            )}
            {!house.thumbnail && (
              <img src={DEFAULT_IMAGE_URL} alt={house.title} class="img-fluid rounded-start" style={{height: "100%"}}/>
            )}
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title"><strong>{house.price}</strong></h5>
                      {/* <h6 class="card-subtitle">{house.price}</h6> */}
                      <h5 className={styles.h5}>{house.title}</h5>
                     <h6> <p class="card-text-truncate-paragraph">{house.description}</p> 
                     </h6>
                      <h6>
                      <i class="bi bi-geo-fill"></i> {house.address}
                      </h6>
                      <h6>
                      <i class="bi bi-house-door"></i> {house.rooms}
                      </h6>
  
                      {
                      house.agent && <p class="card-text">
                      <small class="text-muted">{ house?.agent?.split(" ")[0]?.replace("Agency", "")} {house?.agent.split(" ")[1]} {house?.agent.split(" ")[2]} / {house?.agent.split(" ")[3]} / {house?.agent.split(" ")[4].length <= 9 ? house?.agent.split(" ")[4].slice(0, -5) : house?.agent.split(" ")[4].slice(0, -6) }</small>
                    </p>
                    }
                    <p class="card-text">
                      <small class="text-muted">{house?.availability}</small>
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
      </div>
    );
  }
   else  {
    return <Loader/>
   }

  
};
