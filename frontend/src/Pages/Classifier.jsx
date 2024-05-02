import React, { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import Data from '../Data.json'
import PlanCard from '../Components/PlanCard'
const Classifier = () => {
const [search, set] = useSearchParams();
const val = search.get("id");
const newvalue  = Data.filter((ele)=>ele.id === parseInt(val))
const [value,setValue] = useState(newvalue[0].plans)
  return (
    <div className="min-h-screen">
      <h1 className="my-5 text-3xl p-4 font-bold">Plans Available</h1>
      <hr />

      <div className=" container mx-auto grid grid-cols-3 gap-3 max-md:grid-cols-1 mt-5 ">
        {value.map((item, index) => (
          <PlanCard
            key={index}
            name={item.name}
            description={item.description}
            link={item.url}
            img={item.img}
            id={item.id}
            price={item.price}
            duration={item.duration}
            coverage={item.coverage}
            deductible={item.deductible} 
            additionalBenefits={item["additional benefits"]} 
          />
        ))}
      </div>
    </div>
  );
}

export default Classifier
