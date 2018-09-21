import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 2,
    currentPage: 1,
    genres: [],
    currentGenre: null
  };

  handleDelete = movie => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
    //this.handlePageChange
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      currentGenre
    } = this.state;

    if (allMovies.length === 0)
      return <span>There are no movies in the database.</span>;

    let moviesbyGenre =
      currentGenre._id === "0"
        ? allMovies
        : allMovies.filter(m => m.genre._id === currentGenre._id);

    /*     if (moviesbyGenre.length <= pageSize && currentPage > 1)
      this.handlePageChange(currentPage - 1); */
    const movies = paginate(moviesbyGenre, currentPage, pageSize);

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              currentItem={currentGenre}
              onItemChange={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <span>Showing {allMovies.length} movies in the database.</span>

            <table className="table">
              {this.renderHeader()}
              <tbody>
                {movies.map(m => (
                  <tr key={m._id}>
                    <td>{m.title}</td>
                    <td>{m.genre.name}</td>
                    <td>{m.numberInStock}</td>
                    <td>{m.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={m.liked}
                        onClick={() => this.handleLike(m)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleDelete(m)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              itemsCount={moviesbyGenre.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const movies = getMovies();
    const currentGenre = { _id: "0", name: "All Genres" };
    const genres = [currentGenre, ...getGenres()];
    this.setState({ movies, currentGenre, genres });
  }

  renderHeader() {
    return (
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th />
          <th />
        </tr>
      </thead>
    );
  }
}

export default Movies;
