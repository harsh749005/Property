import { Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../styles/AddProperty.css';
import home from '../images/home.png';
import axios from "axios";
import Navbar from './Navbar';

function AddProperty() {

  const [values, setValues] = useState({
    productName: "",
    address: "",
    date: "",
    propertyType: "",
  });
  
  const [productImage, setProductImage] = useState(null); 

  const handlefrom =  (e) => {
    e.preventDefault();

 // Create a new FormData object
 const formData = new FormData();
 formData.append('productName', values.productName);
 formData.append('address', values.address);
 formData.append('date', values.date);
 formData.append('propertyType', values.propertyType);
 formData.append('productImage', productImage); 

    axios.post('http://localhost:8081/addProperty', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      if (res.data.Status === "Success") {
        // Clear the form fields
        setValues({
          productName: "",
          address: "",
          date: "",
          productImage: null,  
          propertyType: "",
        });
        alert(res.data.message);
      }
      else{
        alert(res.data.Error);
      }
    })
    .then((err) => console.log(err));

  };

    useEffect(() => {
        // Add click event on the image to trigger file selection
        const imagePreview = document.getElementById('image-preview');
        const fileInput = document.getElementById('file-input');
    
        imagePreview.addEventListener('click', () => {
          fileInput.click();
        });
    
        // Update the image preview when a new image is selected
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            setProductImage(file); 
            const reader = new FileReader();
            reader.onload = function (e) {
              imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
          }
        });
    
       
      }, [values]);

  return (
   <>
   {<Navbar/>}
        <div className="root">
      <div className="property-product-holder">
          <h1 className='adpheading'>Add Property</h1>
        <form
            className='property-property-form'
          onSubmit={handlefrom}
          encType="multipart/form-data"
        >
          <div className="property-left">
            <img
              src={home}
              alt="select"
              id="image-preview"
            />
            <input
            onChange={(e) => setValues({ ...values, productImage: e.target.value })}
              type="file"
              name="image"
              id="file-input"
              accept="image/*"
              style={{ display: 'none' }}
              required
            />
          </div>
          <div className="right">
            <div className="input-group">
            
              <input 
              onChange={(e) => setValues({ ...values, productName: e.target.value })}
              value={values.productName}
              placeholder="Property Name" type="text" id="name" name="name" required />
            </div>
            <div className="input-group">
              
              <input 
              onChange={(e) => setValues({ ...values, address: e.target.value })}
              value={values.address}
              placeholder="Address" type="text" id="address" name="address" required />
            </div>
            <div className="input-group">
              <select 
              onChange={(e) => setValues({ ...values, propertyType: e.target.value })}
              value={values.propertyType}
              id="ategoryDcropdown" className="category-select">
                <option value="" disabled selected>Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          
            <div className="date-holder">
                <input 
                value={values.date}
                onChange={(e) => setValues({ ...values, date: e.target.value })}
                type="date" id="datePicker" className="date-picker"/>
            </div>
            <button type="submit">Add Product</button>
          </div>
        </form>
        <Link to="/" className='backhome'>Back to Home</Link>
        
      </div>
    </div>
   </>
  );
}

export default AddProperty;
