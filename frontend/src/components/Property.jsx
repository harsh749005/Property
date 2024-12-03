import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Property.css'

function Property() {
    const [properties,setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/getProperty')
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

    const handleDelete = (propertyId) => {
        axios
          .delete(`http://localhost:8081/deleteProperty/${propertyId}`)
          .then((response) => {
            console.log(response.data.message);
            // Remove the deleted property from the state
            setProperties(properties.filter((property) => property.id !== propertyId));
          })
          .catch((error) => {
            console.log(error);
            setError('Failed to delete property');
          });
      };

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
  return (
    <>
      {<Navbar/>}
        <h1>Properties</h1>
      <div className='content-3'>
        {properties.map((property)=>(
            
      <div className="card-1" key={property.id}>
                <div className="cardimage-holder">
                    {console.log(property.pImage)}
                  <img src={`http://localhost:8081/uploads/${property.pImage}`} alt="" />
                </div>
                <div className="property-details">
                  <h5 className="pname">{property.pname}</h5>
                  <h5 className="ptype">PropertyType : {property.propertyType}</h5>
                  <h5 className="ptype">Address : {property.address}</h5>
                  <h5 className="ppurchase">Purchased Date : {property.date}</h5>
                  <button type="button"
                className="deleteButton"
                onClick={() => handleDelete(property.id)}>Delete</button>
                </div>
              </div>
        ))}
    </div> 
    </>
  )
}

export default Property
