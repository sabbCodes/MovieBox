import Tv from '../assets/svgs/Logo.svg'
import Home from '../assets/svgs/Home.svg'
import Movie from '../assets/svgs/Movie Projector.svg'
import TvSeries from '../assets/svgs/Tv Show.svg'
import Upcoming from '../assets/svgs/Calendar.svg'
import Logout from '../assets/svgs/Logout.svg'
import Tickets from '../assets/svgs/Two Tickets.svg'
import List from '../assets/svgs/List.svg'
import ListWhite from '../assets/svgs/List-white.png'
import Star from '../assets/images/star.png'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function getDirectorName(crew) {
    const director = crew.find((member) => member.job === 'Director');
    return director ? director.name : 'Director not available';
}

function getStarsNames(cast) {
    const stars = cast.slice(0, 3);
    return stars.length > 0 ? stars.map((star) => star.name).join(', ') : 'Stars not available';
}

function getWritersNames(crew) {
    const writers = crew.filter((member) => member.job === 'Screenplay');
    return writers.length > 0 ? writers.map((writer) => writer.name).join(', ') : 'Writers not available';
}

export default function MovieDetail(){
    const [movieDetails, setMovieDetails] = useState({})
    const [trailerKey, setTrailerKey] = useState('')
    const { id } = useParams()

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1cab98bcd1d5bcc40677aefac1bf3f85&language=en-US&append_to_response=credits&append_to_response=videos`)
          .then((res) => res.json())
          .then((data) => {
            setMovieDetails(data)
          })
          .catch((error) => {
            console.error("Error fetching movie details:", error)
          })
    }, [id])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1cab98bcd1d5bcc40677aefac1bf3f85&language=en-US&append_to_response=credits,videos`)
            .then((res) => res.json())
            .then((data) => {
            setMovieDetails(data)

            if (data.videos && data.videos.results.length > 0) {
                const trailer = data.videos.results.find((video) => video.type === 'Trailer');

                if (trailer) {
                    setTrailerKey(trailer.key)
                }
            }
            })
            .catch((error) => {
            console.error("Error fetching movie details:", error)
            })
    }, [id])

    return(
        <section className="movieDetail">
            <div className="sideBar">
                <img src={Tv} />
                <div className='sideBarNav'>
                    <div className='sideBarNavItems'>
                        <img src={Home} />
                        <h3>Home</h3>
                    </div>
                    <div className='sideBarNavItems movieNav'>
                        <img src={Movie} />
                        <h3>Movies</h3>
                    </div>
                    <div className='sideBarNavItems'>
                        <img src={TvSeries} />
                        <h3>TV Series</h3>
                    </div>
                    <div className='sideBarNavItems'>
                        <img src={Upcoming} />
                        <h3>Upcoming</h3>
                    </div>
                </div>
                <div className='playQuizies'>
                    <p className='bold'>Play movie quizes and earn free tickets</p>
                    <p>50k people are already playing</p>
                    <button>start playing</button>
                </div>
                <div className='logout'>
                    <img src={Logout} />
                    <h3>Log out</h3>
                </div>
            </div>
            <div className="mainDetail">
                <div className='mainDetailTrailer'>
                    {trailerKey && (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            // frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    )}
                </div>
                <div className='mainDetailSub'>
                    <div className='mainDetailSubTop'>
                        <div className='mainDetailSubTopLeft'>
                            <h3>
                                <span data-testid="movie-title">{movieDetails.title}</span> ·
                                <span data-testid="movie-release-date"> {new Date(movieDetails.release_date).toUTCString()}</span> ·
                                {movieDetails.adult ? 'R' : ' PG-13'} ·
                                <span data-testid="movie-runtime"> {movieDetails.runtime}</span>m
                            </h3>
                            {movieDetails.genres && (
                                <>
                                    {movieDetails.genres.map((genre, index) => (
                                        <span className='genre' key={index}>
                                            {genre.name}
                                        </span>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className='mainDetailSubTopRight'>
                            <img src={Star} /> <span className='rating'>8.5</span><strong> | 350k</strong>
                        </div>
                    </div>
                    <div className='mainDetailSubBottom'>
                        <div className='mainDetailSubBottomLeft'>
                            <p data-testid="movie-overview">{movieDetails.overview}</p>
                            <div>
                                <p>Director: <span className='movieProducersInfo'>{getDirectorName(movieDetails.credits?.crew || [])}</span></p>
                                <p>Writer(s): <span className='movieProducersInfo'>{getWritersNames(movieDetails.credits?.crew || [])}</span></p>
                                <p>Stars: <span className='movieProducersInfo'>{getStarsNames(movieDetails.credits?.cast || [])}</span></p>
                                <div className='topRated'>
                                    <p className='topRatedBut'>Top Rated movie #65</p>
                                    <span className='topRatedSide'>Awards 9 nominations</span>
                                    <span className='topRatedSideArrow'>&darr;</span>
                                </div>
                            </div>
                        </div>
                        <div className='mainDetailSubBottomRight'>
                            <div className='showtime'>
                                <img src={Tickets} />
                                <p>See Showtimes</p>
                            </div>
                            <div className='moreOptions'>
                                <img src={List} />
                                <p>More watch options</p>
                            </div>
                            <div className='mainDetailSubBottomLeftImages'>
                                <img src="https://image.tmdb.org/t/p/w500/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg" className='mainDetailSubBottomLeftImagesFirst'/>
                                <img src="https://image.tmdb.org/t/p/w500/mfnkSeeVOBVheuyn2lo4tfmOPQb.jpg" />
                                <img src="https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg" className='mainDetailSubBottomLeftImagesLast'/>
                                <div className='mainDetailSubBottomLeftImagesOverlay'>
                                    <img src={ListWhite} />
                                    <p>The Best Movies & Shows in September</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}