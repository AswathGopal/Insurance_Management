import React from 'react'
import { useState, useEffect } from 'react';
import axios from  'axios';
import Cookies from 'js-cookie'
import Data from '../Data.json'
import Registered_Card from '../Components/Registered_Card'
import { Navigate, useNavigate } from 'react-router-dom';
const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [insuranceData, setInsuranceData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    tokenverification();
    fetchUserData();
    fetchInsuranceData();
  }, []);

  const fetchUserData = async () => {
    axios
      .post("http://localhost:8000/auth/user-data", {
        token: Cookies.get("token"),
      })
      .then((result) => {
        setUserData(result.data);
      })
      .then((err) => console.log(err));
  };

  const fetchInsuranceData =  () => {
   axios
           .post("http://localhost:8000/auth/profile", {
             token: Cookies.get("token"),
           })
           .then((result) => {
             let c = [];
            console.log(result.data)
             result.data.forEach((i) => {
               Data.forEach((j) => {
                 if (
                   j.id === i.id &&
                   j.plans.some((plan) => plan.name === i.plan)
                 ) {
                   let res = { id: j.id, name: j.name, plan: i.plan, claimed:i.claimed };
                   c.push(res);
                 }
               });
             });
           console.log(c)
             setInsuranceData(c)
           })
           .then((err) => console.log(err));

  };

  const tokenverification=()=>{
      axios
        .post("http://localhost:8000/verify", { token: Cookies.get("token") })
        .then((result) => {
          console.log(result.data.status);
          if (result.data.Status != "ok") navigate("/");
        })
        .then((err) => console.log(err));
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md">
        {userData ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Age:</strong> {userData.age}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        ) : (
          <p>Loading data...</p>
        )}

      <div className=" container mx-auto grid grid-cols-3 gap-3 max-md:grid-cols-1 mb-3 mt-3 ">
        {insuranceData.map((item, index) => (
          <Registered_Card 
            key={index}
            name={item.name}
            plan={item.plan}
            id={item.id}
            claim={item.claimed}
          />
        ))}
      </div>
      </div>
    </div>
  );
};


export default Profile
