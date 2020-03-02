import React, { Component } from "react";
import axios from "axios";
import Movie from "./Movie";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_list: [],
      inputValue: "",
      shouldHideResults: true
    };
  }

  getStyle = () => {
    return {
      backgroundColor: this.state.inputValue == "" ? "transparent" : "#fafafc"
    };
  };

  getBtnStyle = () => {
    if (!this.state.inputValue == "") {
      return { display: "none" };
    }
  };

  getMovieListStyle = () => {
    if (!this.state.shouldHideResults) {
      return {
        border: "1px solid #cfd1d5",
        position: "absolute",
        left: "40px",
        background: "#fafafc",
        width: "100%"
      };
    } else {
      return {
        display: "none"
      };
    }
  };

  performSearch(e) {
    this.setState({
      inputValue: e.target.value
    });

    let searchInput = this.state.inputValue;

    if (searchInput.length < 3) {
      this.setState({
        movie_list: []
      });
      return;
    }

    axios
      .get(
        ` https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MM_KEY}&language=en-US&query=${searchInput}}`
      )
      .then(res => {
        console.log(res.data);
        let myMovies = [];

        this.setState({
          shouldHideResults: false
        });

        res.data.results.slice(0, 8).map((item, index) => {
          let movie = {
            Name: item.original_title,
            Rating: item.vote_average
          };
          if (item.release_date && item.release_date.length >= 4)
            movie.Year = item.release_date.slice(0, 4);
          myMovies.push(movie);
        });

        this.setState({
          movie_list: myMovies
        });

        console.log(this.state.movie_list);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  setSearchText(title) {
    this.setState({
      inputValue: title
    });
    this.setState({
      shouldHideResults: true
    });
  }

  render() {
    return (
      <div className="container">
        <div className="input-container">
          <div className="search-container">
            <div className="search-input">
              <input
                type="text"
                className="input"
                placeholder="Enter movie name"
                onChange={this.performSearch.bind(this)}
                value={this.state.inputValue}
                style={this.getStyle()}
              ></input>
              <div className="movies" style={this.getMovieListStyle()}>
                {this.state.movie_list.map((item, index) => (
                  <Movie
                    setSearchText={this.setSearchText.bind(this)}
                    name={item.Name}
                    rating={item.Rating}
                    year={item.Year}
                  ></Movie>
                ))}
              </div>
            </div>
            <i className="fas fa-film fa-lg fa-fw"></i>
          </div>
          <div className="btn-search" style={this.getBtnStyle()}>
            <i className="fas fa-search fa-lg fa-fw"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
