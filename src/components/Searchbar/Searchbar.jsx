import React, { Component } from 'react';
import styles from './Searchbar.module.scss';
export default class Searchbar extends Component {
  state = {
    searchingImg: '',
  };
  handleInputChange = evt => {
    this.setState({
      searchingImg: evt.currentTarget.value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.searchingImg);
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm_button}>
            <span className={styles.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
