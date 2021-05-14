import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Cards from '../Cards/Cards.js';
import MovieInfo from '../MovieInfo/MovieInfo';
import { getMovies, getSingleMovie } from '../../APIFetch'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      displayMovieInfo: false
    }
  }

  componentDidMount() {
    getMovies()
    .then(data => this.setState({movies: data.movies}))
  }

  showSelectedMovie = (id) => {
    getSingleMovie(id)
    .then(data => this.setState({selectedMovie: data.movie})
    )
  }

  handleClick = event => {
    this.showSelectedMovie(event.target.id)
    this.setState({
      displayMovieInfo: !this.state.displayMovieInfo
    });
  }

  render() {
    return (
        <div>
          <Nav />
          <body>
          <div className="card-container">
          {this.state.displayMovieInfo &&
            <MovieInfo
            selectedMovie={this.state.selectedMovie}
            handleClick={this.handleClick}
            />
          }
          {!this.state.displayMovieInfo &&
            <Cards
            movies={this.state.movies}
            handleClick={this.handleClick}
            />
          }
          </div>
          </body>
        </div>
    )
  }
}


export default App;
