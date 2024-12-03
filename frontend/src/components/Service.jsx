import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Service.css';

function Service() {
    const [properties,setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/getService')
       .then(response => 
       {
           setProperties(response.data.data)
           setLoading(false); 
        })
       .catch(error => {
        console.log(error)
        setError('Failed to load properties');
        setLoading(false);
       });
    }, []);
    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }

  return (
    <>
    {<Navbar/>}
        <h1>Service</h1>
      <div className='content-3'>
        {properties.map((property)=>(
            
      <div className="card-1" key={property.id}>
                <div className="cardimage-holder">
                    {console.log(property.pImage)}
                  <img src={`http://localhost:8081/uploads/${property.pImage}`} alt="" />
                </div>
                <div className="property-details">
                  <h5 className="pname">{property.pname}</h5>
                  <h5 className="ptype">{property.serviceType}</h5>
                  <h5 className="ptype">$ {property.serviceCost}</h5>
                  <h5 className="ppurchase">Purchased Date : {property.serviceDate}</h5>
                  <h5 className="ptype">{property.propertyType}</h5>
                  
                </div>
              </div>
        ))}
    </div>
    </>
  )
}

export default Service
