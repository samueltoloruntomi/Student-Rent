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
import { GetScrapedData } from "../UTILS/API";
import { Loader } from "../components/Loader";
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const ListOfHouses = [
  {
    _id: "640df0b5c2052f45ae0c725d",
    typeOfApartment: "1 bed flat to rent",
    apartmentDescription: "Watson Crescent, Edinburgh EH11",
    price: "£900 pcm",
    subPrice: "£208 pw",
    postedOn: "Listed on 10th Mar 2023",
    availability: "Available from 1st Apr 2023",
    distance1: "0.6 miles Haymarket",
    distance2: "1.1 miles Slateford",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600",
    __v: 0,
  },
  {
    _id: "640df0b5c2052f45ae0c725e",
    typeOfApartment: "1 bed flat to rent",
    apartmentDescription: "Mount Grange, Edinburgh EH9",
    price: "£795 pcm",
    subPrice: "£183 pw",
    postedOn: "Listed on 9th Mar 2023",
    availability: "Available from 13th Mar 2023",
    distance1: "1.2 miles Haymarket",
    distance2: "1.3 miles Edinburgh",
    image:
      "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1600",
    __v: 0,
  },
  {
    _id: "640df0b5c2052f45ae0c725f",
    typeOfApartment: "1 bed flat to rent",
    apartmentDescription: "Duff Street, Dalry, Edinburgh EH11",
    price: "£950 pcm",
    subPrice: "£219 pw",
    postedOn: "Listed on 8th Mar 2023",
    availability: "Available from 27th Mar 2023",
    distance1: "0.3 miles Haymarket",
    distance2: "1.3 miles Slateford",
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
    __v: 0,
  },
  {
    _id: "640df0b5c2052f45ae0c7260",
    typeOfApartment: "1 bed flat to rent",
    apartmentDescription: "Balcarres Street, Morningside, Edinburgh EH10",
    price: "£950 pcm",
    subPrice: "£219 pw",
    postedOn: "Listed on 8th Mar 2023",
    availability: "Available from 21st Mar 2023",
    distance1: "1.2 miles Slateford",
    distance2: "1.4 miles Haymarket",
    image:
      "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1600",
    __v: 0,
  },
  {
    _id: "640df0b5c2052f45ae0c7261",
    typeOfApartment: "1 bed flat to rent",
    apartmentDescription: "Gorgie Road, Edinburgh EH11",
    price: "£765 pcm",
    subPrice: "£177 pw",
    postedOn: "Listed on 8th Mar 2023",
    availability: "Available from 10th Apr 2023",
    distance1: "0.7 miles Haymarket",
    distance2: "1 mile Slateford",
    image:
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600",
    __v: 0,
  },
];

let PageSize = 3;
export const Houses = () => {
  const [selectedProperties, setSelectedProperties] = useState(null);
  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);

  const [selectedMinBedRoom, setSelectedMinBedRoom] = useState(null);
  const [selectedMaxBedRoom, setSelectedMaxBedRoom] = useState(null);
  const [houses, setHouses] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const { code } = useParams();


  // const properties = [
  //     { name: 'Semi-detached', code: 1 },
  //     { name: 'Detached', code: 2 },
  //     { name: 'Flat', code: 3 },
  //     { name: 'Terraced', code: 4 },
  //     { name: 'Bungalow', code: 5 },
  //     { name: 'Park homes', code: 6 },
  //     { name: 'House', code: 7 },
  //     { name: 'Other', code: 8 }
  // ];

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
    console.log(code);
    searchFunction();

  }, [])

  const searchFunction = async () => {
    const houses = await GetScrapedData(code);
    console.log(houses);
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
    const filteredData = houses.filter(house => {
      const price = Number(house.price.split(" ")[0].replace(/[^\d.-]/g, "")); // Convert house price to number
      const bedroom = Number(house.rooms.split(" ")[0]);
      const property = house.agent.toLowerCase().split(" ");

      return (price >= minPrice && price <= maxPrice) && (bedroom >= minRoom && bedroom <= maxRoom);
    });
    
    if(filteredData.length > 0)  {
      setHouses(filteredData);
    }
    else {
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
                    <Dropdown value={selectedMinPrice} onChange={(e) => setSelectedMinPrice(e.value)} options={Prices} optionLabel="name" 
                      showClear placeholder="Min price" className={`${styles.mSelect}`} />
                  </div>
  
                  <div className="col-md-2">
                    <Dropdown value={selectedMaxPrice} onChange={(e) => setSelectedMaxPrice(e.value)} options={Prices} optionLabel="name" 
                      showClear placeholder="Max price" className={`${styles.mSelect}`} />
                  </div>
  
                  <div className="col-md-2">
                      <Dropdown value={selectedMinBedRoom} onChange={(e) => setSelectedMinBedRoom(e.value)} options={rooms} optionLabel="name" 
                      showClear placeholder="Min Bedroom" className={`${styles.mSelect}`} />
                  </div>
  
                  <div className="col-md-2">
                      <Dropdown value={selectedMaxBedRoom} onChange={(e) => setSelectedMaxBedRoom(e.value)} options={rooms} optionLabel="name" 
                      showClear placeholder="Max Bedroom" className={`${styles.mSelect}`} />
                  </div>
  
                  
  
                  <div className="col-md-2">
                    <Button onClick={filteredFunction} label="Search" />
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
                style={{ maxWidth: "840px", marginTop: "0px" }}
                key={i}
              >
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src={house.thumbnail}
                      class="img-fluid rounded-start"
                      alt="..."
                      style={{height: "100%"}}
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title"><strong>{house.price}</strong></h5>
                      {/* <h6 class="card-subtitle">{house.price}</h6> */}
                      <h5>{house.title}</h5>
                      <p class="card-text">{house.description}</p>
                      <h6>
                      <i class="bi bi-geo-fill"></i> {house.address}
                      </h6>
                      <h6>
                      <i class="bi bi-house-door"></i> {house.rooms}
                      </h6>
  
                      <p class="card-text">
                        <small class="text-muted">{house?.agent.split(" ")[0].replace("Agency", "")} {house?.agent.split(" ")[1]} {house?.agent.split(" ")[2]} / {house?.agent.split(" ")[3]} / {house?.agent.split(" ")[4].length <= 9 ? house?.agent.split(" ")[4].slice(0, -5) : house?.agent.split(" ")[4].slice(0, -6) }</small>
                      </p>
                      {/* <p class="card-text">
                        <small class="text-muted">{house.agent.split(" ")[4].length <= 9 ? house.agent.split(" ")[4].slice(4, 8) : house.agent.split(" ")[4].slice(4, 9)}</small>
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
  
        {/* <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={ListOfHouses.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        /> */}
        </div>
      </div>
      <Footer />
      </div>
    );
  }
   else  {
    return <Loader />
   }

  
};
