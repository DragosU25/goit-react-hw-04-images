import React, { Component } from 'react';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus=""
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button type="submit" className={styles.button}>
            <FaSearch className={styles.icon} />
          </button>
        </form>
      </header>
    );
  }
}
