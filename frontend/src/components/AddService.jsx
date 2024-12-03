import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddService.css";
import Navbar from "./Navbar";

function AddService() {
  const [values, setValues] = useState({
    serviceType: "",
    serviceCost: "",
    serviceDate: "",
    propertyName: "",
  });

  const navigate = useNavigate();
  const handlefrom = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/addService", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Service added successfully");
          navigate("/addservice");
        } else {
          alert(res.data.Status);
        }
      })
      .then((err) => console.log(err));
  };

  const [properties,setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
      axios.get('http://localhost:8081/getproperty')
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
      {<Navbar />}
      <div className="root">
        <div className="product-holder">
          <h1 className="adpheading">Service Management</h1>
          <form
            className="property-form"
            onSubmit={handlefrom}
            encType="multipart/form-data"
          >
            <div className="right">
              <div className="input-group">
                <input
                  onChange={(e) =>
                    setValues({ ...values, serviceType: e.target.value })
                  }
                  value={values.serviceType}
                  placeholder="Service Type"
                  type="text"
                  id="serviceType"
                  name="serviceType"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  onChange={(e) =>
                    setValues({ ...values, serviceCost: e.target.value })
                  }
                  value={values.serviceCost}
                  placeholder="Service Cost"
                  type="text"
                  id="serviceCost"
                  name="serviceCost"
                  required
                />
              </div>
              <div className="input-group">
                <select
                  onChange={(e) =>
                    setValues({ ...values, propertyName: e.target.value })
                  }
                  value={values.propertyName}
                  id="ategoryDcropdown"
                  className="category-select"
                >
                  <option value="" disabled selected>
                    Property Type
                  </option>
                  {properties.map((property) => (
                    <option key={property._id} value={property.propertyName}>
                      {property.propertyName}
                    </option>
                  ))}
             
                </select>
              </div>

              <div className="date-holder">
                <input
                  value={values.serviceDate}
                  onChange={(e) =>
                    setValues({ ...values, serviceDate: e.target.value })
                  }
                  type="date"
                  id="datePicker"
                  className="date-picker"
                />
              </div>
              <button type="submit">Add Service</button>
            </div>
            <Link to="/" className="backhome">
              Back to Home
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddService;
