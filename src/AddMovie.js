import React, { Component } from 'react';
import axios from 'axios';

export default class AddMovie extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: null,
      newMovieName: ''
    };
    this.addMovie = this.addMovie.bind(this);
  }

  addMovie() {
    this.setState({ loading: true, error: null });
    const newMovie = {
      name: this.state.newMovieName
    };
    axios.post('/api/movies', newMovie).then(response => {
      const addedMovie = response.data;
      this.setState({ newMovieName: '' });
      this.props.onAdd(addedMovie);
    }).catch(error => {
      this.setState({ error });
    }).then(() => {
      this.setState({ loading: false });
    });
  }
  
  render() {
    const { error, loading, newMovieName } = this.state;
    
    return (
      <div>
        <h2>New movie</h2>
        <div>
          New movie name: <input value={newMovieName} onChange={event => this.setState({ newMovieName: event.target.value })} />
          <button onClick={this.addMovie} disabled={loading}>Add movie</button>
          {error && <div>
            Error: {error.message}
          </div>}
        </div>
      </div>
    );
  }
}