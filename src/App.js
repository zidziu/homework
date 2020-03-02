import React, { Component } from "react";
import "./App.css";
import Movie from "./components/Movie";
import Search from "./components/Search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_list: []
    };
  }

  componentDidMount() {
  }


  render() {
    return (
      <React.Fragment>
        <Search />
      {this.state.movie_list.map((item, index) => (
        <Movie name={item.Name} rating={item.Rating} year={item.Year}></Movie>
      ))}
    </React.Fragment>
    );
  }
}

export default App;
