import Tv from '../assets/svgs/Logo.svg'
import SignIn from '../assets/svgs/Menu.svg'
import Search from '../assets/svgs/Search.svg'
import Tomato from '../assets/svgs/tomato.svg'
import Imdb from '../assets/svgs/imdb.svg'
import Youtube from '../assets/svgs/Play.svg'
import { Dna } from  'react-loader-spinner'
import Favorite from '../assets/svgs/Favorite.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function randomTomatoRating(){
    const minRating = 60;
    const maxRating = 100;
    const randomTomatoNum = Math.floor(Math.random() * (maxRating - minRating + 1)) + minRating;

    return randomTomatoNum
}

export default function Main(){
    const [movies, setMovies] = useState([])
    const [genreMap, setGenreMap] = useState(new Map())
    const [searchQuery, setSearchQuery] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null)
        if (searchQuery) {
            setLoading(true)
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=1cab98bcd1d5bcc40677aefac1bf3f85&language=en-US&query=${searchQuery}`)
                .then(res => res.json())
                .then(data => {
                    setMovies(data.results)
                    setLoading(false)
                })
                .catch(err => {
                    setError(`${err}. Please try again later.`)
                    setLoading(false)
                });
        } else {
            setLoading(true)
            fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=1cab98bcd1d5bcc40677aefac1bf3f85&language=en-US&page=1&append_to_response=images,production_countries,release_date`)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results.slice(0, 10))
                setLoading(false)
            })
            .catch(err => {
                    setError(`${err}. Please try again later.`)
                    setLoading(false)
                })
        }
    }, [searchQuery])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=1cab98bcd1d5bcc40677aefac1bf3f85&language=en-US`)
          .then((res) => res.json())
          .then((data) => {
            const genreMap = new Map(data.genres.map((genre) => [genre.id, genre.name]));
            setGenreMap(genreMap);
          })
          .catch(err => setError(`Error fetching genre list: ${err} Please try again later.`));
    }, []);


    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSearchClick = () => {
        setSearchQuery(searchInput)
    }


    return(
        <>
            <section className="hero">
                <div className="heroInner">
                    <div className="heroTop">
                        <img src={Tv} alt="logo" />
                        <div className='searchBox'>
                            <input
                                type="text"
                                name="search"
                                placeholder='what do you want to watch?'
                                value={searchInput}
                                onChange={handleInputChange}
                            />
                            <img
                                src={Search}
                                alt='search icon'
                                className='searchIcon'
                                onClick={handleSearchClick}
                            />
                        </div>
                        <div className='signIn'>
                            <p>Sign In</p>
                            <img src={SignIn} alt='sign in' />
                        </div>
                    </div>
                    <div className="heroSecond">
                        <h1>John Wick 3:</h1>
                        <h1>Parabellum</h1>
                        <div className='johnWick3'>
                            <div className='johnWick3Inner'>
                                <img src={Imdb} /> <span>860/100</span>
                            </div>
                            <div className='johnWick3Inner'>
                                <img src={Tomato} /> <span>97%</span>
                            </div>
                        </div>
                        <p>
                            John Wick is on the run after killing a member of
                            the internatonal assassins&apos; guild and with a $14 million
                            price tag on his head, he is the target of hit men and
                            women everywhere.
                        </p>
                        <button className='youtube'>
                            <img src={Youtube} alt='youtube play button' />
                            WATCH TRAILER
                        </button>
                    </div>
                    <div className='sideNum'>
                        <div>1</div>
                        <div>2</div>
                        <div className='brightNum'>3</div>
                        <div>4</div>
                        <div>5</div>
                    </div>
                </div>
            </section>
            <section className="main">
                <div className="mainInner">
                    <div className="featuredPosts">
                        <h2>Featured Movie</h2>
                        <p className="seeMore">see more &gt;</p>
                    </div>
                    <div className="moviesCardsWrapper">
                        {loading ? (
                            <div className='loader'>
                                <Dna
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="dna-loading"
                                    wrapperClass="dna-wrapper"
                                />
                                <h3>Loading, Please wait...</h3>
                            </div>
                        ) : error ? (
                            <h2 className='error'>{error}</h2>
                        ) : (movies.map(movie => (
                            <Link to={`/${movie.id}`} key={movie.id}>
                                <div className="movieCard" data-testid="movie-card">
                                    <img src={Favorite} alt="favorite icon" className="favorite" />
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={`${movie.title} Poster`}
                                        className="poster"
                                        data-testid="movie-poster"
                                    />
                                    <p className="grayOut">USA, <span data-testid="movie-release-date">{new Date(movie.release_date).getFullYear()}</span></p>
                                    <h2 data-testid="movie-title">{movie.title}</h2>
                                    <div className="cardStat">
                                        <div className="cardStatInner">
                                            <img src={Imdb} alt="IMDb icon" /> <span className="grayOut">{movie.vote_average}/10</span>
                                        </div>
                                        <div className="cardStatInner">
                                            <img src={Tomato} alt="Rotten Tomatoes icon" /> <span className="grayOut">{randomTomatoRating()}%</span>
                                        </div>
                                    </div>
                                    <p className="grayOut">
                                        {movie.genre_ids.map(genreId => genreMap.get(genreId)).join(', ')}
                                    </p>
                                </div>
                            </Link>
                        )))}
                    </div>
                </div>
            </section>
        </>
    )
}