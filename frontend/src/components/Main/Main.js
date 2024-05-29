import React from 'react';
import './Main.css'
import '../Product/Product.css'
import Product from '../Product/Product'
import { useState } from 'react';

function Main({ selectedCategory }){

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleBrandChange = (brand) => {
    // Update selected brands
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter((selectedBrand) => selectedBrand !== brand);
      } else {
        return [...prevSelectedBrands, brand];
      }
    });
  };

  const handleColorChange = (color) => {
    // Update selected colors
    setSelectedColors((prevSelectedColors) => {
      if (prevSelectedColors.includes(color)) {
        return prevSelectedColors.filter((selectedColor) => selectedColor !== color);
      } else {
        return [...prevSelectedColors, color];
      }
    });
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

    return(
     <>
     <div className='main-page'>
        <div className='sidebar'>
           <p className='brand-filter'>Brand:</p>
           <form className='brand'>
                <input className='my-checkbox__input' type='checkbox' onChange={() => handleBrandChange('Razer')}></input>   
                <label className='my-checkbox__label'> Razer</label><br></br>
                <input className='my-checkbox__input' type='checkbox' onChange={() => handleBrandChange('HyperX')}></input>   
                <label className='my-checkbox__label'> HyperX</label><br></br>
                <input className='my-checkbox__input' type='checkbox' onChange={() => handleBrandChange('Logitech')}></input>   
                <label className='my-checkbox__label'> Logitech</label><br></br>
                <input className='my-checkbox__input' type='checkbox' onChange={() => handleBrandChange('Zowie')}></input>   
                <label className='my-checkbox__label'> Zowie</label><br></br>
           </form>  
           <p className='brand-filter'>Color:</p>
           <form className='brand'>
                <input className='my-checkbox__input' type='checkbox' onChange={() => handleColorChange('Black')}></input>   
                <label className='my-checkbox__label'> Black</label><br></br>
                <input className='my-checkbox__input' type='checkbox' onChange={() => handleColorChange('White')}></input>   
                <label className='my-checkbox__label'> White</label><br></br>
                <input className='my-checkbox__input' type='checkbox' onChange={() => handleColorChange('Red')}></input>   
                <label className='my-checkbox__label'> Red</label><br></br>
           </form>
           <p className='brand-filter'>Price:</p>
           <div className='price-range'>
                <p className='price-text'>Min:</p><input className='price' value={minPrice} onChange={handleMinPriceChange}></input>
                <p className='price-text2'>Max:</p><input className='price' value={maxPrice} onChange={handleMaxPriceChange}></input>
           </div>
       </div>
       <section className='card-container'>
        <Product 
        selectedCategory={selectedCategory} 
        selectedBrands={selectedBrands}
        selectedColors={selectedColors}
        minPrice={minPrice}
        maxPrice={maxPrice}/>  
       </section>
     </div>
     </>
    );
}
export default Main;