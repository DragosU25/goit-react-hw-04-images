import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import ImageContext from 'components/Context/Context';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { handleSearchSubmit } = useContext(ImageContext);

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim()) {
      handleSearchSubmit(query);
      setQuery('');
    }
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>
          <FaSearch className={styles.icon} />
        </button>
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
