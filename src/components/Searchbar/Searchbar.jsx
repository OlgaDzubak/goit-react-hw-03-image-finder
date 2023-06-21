import { Component } from 'react';
import PropTypes from "prop-types";

import css from './searchbar.module.css';
import {ImSearch} from 'react-icons/im';

//========================================================================================
export class Searchbar extends Component {
  
  static propTypes = {
    onSubmit: PropTypes.func,
  };

    state = { 
    filter: '',
  };

  reset = () => this.setState({filter: '',});

  onChangeFilter = (event) => {
    this.setState({ filter: event.target.value });
  };

  onSubmitForm = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.filter);
    this.reset();
  };

  render() {

    const {onChangeFilter, onSubmitForm} = this
    const {filter} = this.state;

    return (
      <header className={css.header}>

        <form className={css.SearchForm} onSubmit={onSubmitForm}>

          <button type="submit" className={css.SearchForm_button}>
            <span className={css.button_label}>
                <ImSearch className={css.icon}/>
            </span>
          </button>

          <input className={css.SearchForm_input}
            type="text"
            placeholder="Search images and photos"
            id="input"
            value={filter}
            onChange={onChangeFilter} 
          />

        </form>

      </header>
    );
  }
}
//========================================================================================