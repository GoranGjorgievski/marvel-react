import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from './marvel.svg';
import loader from './loader.gif';

import './App.css';
import CardComponent from './components/CardComponent/index';
import {
  fetchHeroes,
  toggleBookmark,
  prevPage,
  nextPage,
  search
} from './actions';

class App extends Component {

  componentDidMount(){
    this.props.fetchHeroes();
  }

  render() {
    const disabledPrev = this.props.currentPage === 0 ? 'disabled': '';
    const disabledNext = this.props.total/this.props.currentPage*20<=1 || this.props.total <=20 ? 'disabled': '';
  
    return (
      <div className="App container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Marvel Superheroes</h1>
        </header>
        <input 
          onChange={this.props.search}
          type="search" 
          className="form-control search-input col-md-6" 
          placeholder="Search..." />   
        <div className="row text-center marvel-content">
          {
            !this.props.isFetching ? (this.props.heroes.map(item => 
            <CardComponent 
              key={item.id} 
              item={item}
              toggleBookmark={this.props.toggleBookmark}
             />)
            ): <img className='loader' height={100} width={100} src={loader} alt="loader" />
          }

        </div>
        
        <nav aria-label="Page navigation example" className="nav-margin-top">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${disabledPrev}`}><a className="page-link" onClick={this.props.prevPage} >Previous</a></li>
            <li className={`page-item ${disabledNext}`}><a className="page-link" onClick={this.props.nextPage} >Next</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    heroes: state.heroes,
    isFetching: state.isFetching,
    total: state.total,
    currentPage: state.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { /* could also use bindActionCreators... :) */
    fetchHeroes: () => {
      dispatch(fetchHeroes());
    },
    toggleBookmark: (id) => {
      dispatch(toggleBookmark(id));
    },
    prevPage: () => {
      dispatch(prevPage());
    },
    nextPage: () => {
      dispatch(nextPage());
    },
    search: (input) => {
      dispatch(search(input.target.value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
