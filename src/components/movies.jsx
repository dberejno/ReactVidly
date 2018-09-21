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
    pageSize: 4,
    currentPage: 1,
    genres: [],
    currentGenre: 1
  };

  handleDelete = movie => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
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

    let moviesbyGenre = allMovies.filter(m => m.genre.name === "Action");
    const movies = paginate(moviesbyGenre, currentPage, pageSize);

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres.map(g => g.name)}
              currentItem={currentGenre}
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
    const genres = [{ _id: "0", name: "All Genres" }, ...getGenres()];
    this.setState({ movies, genres });
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
