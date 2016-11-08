import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var imgPath = this.props.movie.poster_path;

        return (
            <div>
                <h2>{this.props.movie.title}</h2>
                <p>{this.props.movie.release_date}</p>
                <p>{this.props.movie.overview}</p>
                <img src={"http://image.tmdb.org/t/p/w154/" + imgPath} alt="imageOfMovie"/>
            </div>
        );
    }

}