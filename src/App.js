import back from './assets/back.jpg'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setItems(response.data);
        setFilteredItems(response.data);
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = items.filter(item => item.category === category);
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(searchTerm)
    );

    if (selectedCategory) {
      const categoryFiltered = filtered.filter(
        item => item.category === selectedCategory
      );
      setFilteredItems(categoryFiltered);
    } else {
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="app">
      <img src={back} alt='background' className='background-image'/>
      <header className="header">
        <h1 style={{color:'white'}}>Elevate Labs</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </header>
      <div className="slogan">
          <h1 className='shop1'>Shop Anything</h1>
          <h1 className='shop2'>You Want!</h1>
        </div>
      <main>
        <h1 style={{color:'white'}}>{selectedCategory?selectedCategory:"All Items"}</h1>
        <ul className="item-list">
          {filteredItems.map(item => (
            <li key={item.id} className="item-card">
              <div className="item-details">
                <div className="upardabba">
                  <img src={item.image} alt={item.title} className="item-image" />
                  <div className="tipri">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-price">Price: ${item.price}</p>
                  </div>
                </div>
                <p className="item-category">Category: {item.category}</p>
                <p className="item-description">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;