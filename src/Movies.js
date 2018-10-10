import React, { Component } from 'react';
import axios from 'axios';
import AddMovie from './AddMovie';

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      loading: true,
      error: null,
      newMovieName: ''
    };
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }
  
  fetchMovies() {
    this.setState({ loading: true, error: null });
    axios.get('/api/movies').then(response => {
      this.setState({ movies: response.data });
    }).catch(error => {
      this.setState({ error });
    }).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { error, loading, movies } = this.state;

    return (
      <div>
        <h1>Movies</h1>
        {error
          ? <div>There was an error fetching the list of movies</div>
          : loading
            ? <div>Loading movies...</div>
            : movies.length
                ? <ul>
                    {movies.map(e => <li key={e.id}>{e.name}</li>)}
                  </ul>
                : <em>No movies</em>
        }
        <AddMovie onAdd={this.fetchMovies} />
      </div>
    );
  }
}