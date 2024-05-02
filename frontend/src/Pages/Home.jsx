import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Data from '../Data.json'
import ImageCard from '../Components/ImageCard'
import { Link } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
    .post("http://localhost:8000/verify",{token:Cookies.get("token")})
      .then((result) => {
        if (result.data.Status != 'ok') navigate('/');
      })
      .then((err) => console.log(err));
  }, []);
  return (
    <>
      <div className=" container mx-auto grid grid-cols-3 gap-3 max-md:grid-cols-1 ">
        {Data.map((item, index) => (
          <ImageCard
            key={index} 
            name={item.name}
            description={item.description}
            link={item.link}
            img={item.img}
            id={item.id}
          />
        ))}
      </div>
    </>
  );
}

export default Home
