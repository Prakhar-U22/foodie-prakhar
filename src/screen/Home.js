import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch('http://localhost:5000/api/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response = await response.json();

        setFoodItems(response[0]);
        setFoodCat(response[1]);

    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
              <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-caption" style={{ zIndex: '10' }}>
                      <div className="d-flex justify-content-center" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                      </div>
                    </div>
                  <div className="carousel-item active">
                    <img
                      src="https://source.unsplash.com/random/900×700/?burger"
                      style={{ width: '90vh', height: '90vh', filter: 'brightness(80%)' }}
                      className="d-block w-100"
                      alt="Burger 1"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://source.unsplash.com/random/900×700/?pizza"
                      style={{ width: '90vh', height: '90vh', filter: 'brightness(80%)' }}
                      className="d-block w-100"
                      alt="Pizza"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://source.unsplash.com/random/900×700/?sandwich"
                      style={{ width: '90vh', height: '90vh', filter: 'brightness(80%)' }}
                      className="d-block w-100"
                      alt="Sandwich"
                    />
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div  className='row'>
              <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItems
                .filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase())))
                .map((filteredItem) => (
                  <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                    {/* props bhejna h card mein*/}
                    <Card foodName={filteredItem.name} foodImg={filteredItem.img} options={filteredItem.options[0]}
                    />
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
