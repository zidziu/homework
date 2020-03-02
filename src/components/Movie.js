import React from "react";

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }
  setSearchInput(e) {
    this.props.setSearchText(this.props.name);
  }

  render() {
    return (
      <div  onClick={this.setSearchInput.bind(this)} className="movieCard">
        <h6><strong>{this.props.name}</strong></h6>
        <p>
          {this.props.rating} Rating, {this.props.year}{" "}
        </p>
      </div>
    );
  }
}

export default Movie;
