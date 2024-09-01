import React, { useState, useEffect, useContext } from 'react';
import '../Product/Product.css';
import { CartContext } from '../../CartContext';

function Product({ selectedCategory, selectedBrands, selectedColors, minPrice, maxPrice }) {
    const { addToCart } = useContext(CartContext);
    const [backendData, setBackendData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://gamingshop.studenti.sum.ba/dohvati');
                const data = await response.json();
                setBackendData(data);
            } catch (error) {
                console.error('Greška prilikom dohvaćanja podataka:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Apply category filter
        const categoryFilteredData = (Number(selectedCategory) === 0 || !selectedCategory)
            ? backendData
            : backendData.filter((data) => Number(data.CategoryID) === Number(selectedCategory));
        // Apply brand filter
        const brandFilteredData = selectedBrands.length === 0 ? categoryFilteredData : categoryFilteredData.filter((data) => selectedBrands.includes(data.Brand));
        // Apply color filter
        const colorFilteredData = selectedColors.length === 0 ? brandFilteredData : brandFilteredData.filter((data) => selectedColors.includes(data.Color));
        // Apply price filter
        const priceFilteredData = colorFilteredData.filter((data) => {
            const minPriceMatch = minPrice === '' || parseFloat(data.Price) >= parseFloat(minPrice);
            const maxPriceMatch = maxPrice === '' || parseFloat(data.Price) <= parseFloat(maxPrice);
            return minPriceMatch && maxPriceMatch;
        });

        // Shuffle the filtered data
        const shuffledData = shuffleArray(priceFilteredData);
        setFilteredData(shuffledData);
    }, [backendData, selectedCategory, selectedBrands, selectedColors, minPrice, maxPrice]);

    const shuffleArray = (array) => {
        const shuffledArray = array.slice(); // Copy array to avoid modifying the original array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setNotification(`Product ${product.Name} added to cart!`);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <>
            {notification && <div className="notification">{notification}</div>}
            {filteredData.map(data => (
                <div className='card' key={data.ProductID}>
                    <div className='img-container'>
                        {data.Base64Image && <img src={data.Base64Image} alt="Slika" />}
                    </div>
                    <div className='product-name'>
                        <p>{data.Name}</p>
                    </div>
                    <div className='product-desc'>
                        <div className='learn-more'>
                            <button className='learn-more-btn'>Learn More</button>
                        </div>
                        <div className='product-price'>
                            <p>{data.Price}€</p>
                        </div>
                    </div>
                    <div className='add-cart'>
                        <button className='add-cart-btn' onClick={() => handleAddToCart(data)}>ADD TO CART</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Product;


