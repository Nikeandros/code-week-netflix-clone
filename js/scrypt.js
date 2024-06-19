const API_KEY = '3f25e4a41822ba6daad2102a6b8223da';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

document.querySelectorAll('.btn-play').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'player.html';
    });
});


const contentRows = document.querySelectorAll('.content-row'); 
const leftBtns = document.querySelectorAll('.left-btn'); 
const rightBtns = document.querySelectorAll('.right-btn'); 


leftBtns.forEach((leftBtn, index) => {
    leftBtn.addEventListener('click', () => {
        contentRows[index].scrollLeft -= 200; 
    });
});


rightBtns.forEach((rightBtn, index) => {
    rightBtn.addEventListener('click', () => {
        contentRows[index].scrollLeft += 200; 
    });
});

async function fetchMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch popular movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}


async function fetchLatestReleases() {
    try {
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch latest releases');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}


async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


function showModal(movie) {
    const modal = document.getElementById("movieModal");
    const movieDetails = document.getElementById("movieDetails");

    const genres = movie.genres.map(genre => genre.name).join(', ');

    movieDetails.innerHTML = `
        <div class="movie-info">
            <img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}" class="movie-poster">
            <div class="button-group">
                <button class="btn btn-play"><i class="fa fa-play"></i> Play</button>
                <button class="btn btn-like"><i class="fa fa-thumbs-up"></i> Like</button>
                <button class="btn btn-dislike"><i class="fa fa-thumbs-down"></i> Dislike</button>
            </div>
            <h2>${movie.title}</h2>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <p><strong>Rating:</strong> ${movie.vote_average}</p>
            <p><strong>Genres:</strong> ${genres}</p>
            <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
            <p class="movie-description">${movie.overview}</p>
        </div>
    `;

    modal.style.display = "block"; 
}


document.querySelector(".close").addEventListener('click', () => {
    const modal = document.getElementById("movieModal");
    modal.style.display = "none"; 
});


document.getElementById('movieDetails').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-play')) {
        
    } else if (event.target.classList.contains('btn-like')) {
        
    } else if (event.target.classList.contains('btn-dislike')) {
        
    }
});




function closeModal() {
    const modal = document.getElementById("movieModal");
    modal.style.display = "none";
}


async function displayMovies() {
    try {
        const movies = await fetchMovies();
        const movieContainer = document.getElementById('popular-movies');
        movieContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `<img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">`;
            movieDiv.addEventListener('click', async () => {
                const movieDetails = await fetchMovieDetails(movie.id);
                showModal(movieDetails);
            });
            movieContainer.appendChild(movieDiv);
        });
        console.log('Popular movies displayed:', movies);
    } catch (error) {
        console.error('Error displaying popular movies:', error);
    }
}


async function displayLatestReleases() {
    try {
        const movies = await fetchLatestReleases();
        const movieContainer = document.getElementById('latest-releases');
        movieContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `<img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">`;
            movieDiv.addEventListener('click', async () => {
                const movieDetails = await fetchMovieDetails(movie.id);
                showModal(movieDetails);
            });
            movieContainer.appendChild(movieDiv);
        });
        console.log('Latest releases displayed:', movies);
    } catch (error) {
        console.error('Error displaying latest releases:', error);
    }
}


async function updateHeroContent() {
    try {
        const movie = await fetchRandomMovie();
        if (!movie) {
            throw new Error('No movie found');
        }
        const heroContent = document.querySelector('.hero-content');
        heroContent.innerHTML = `
            <h1>${movie.title}</h1>
            <p>${movie.overview}</p>
            <button class="btn play"><i class="fa fa-play"></i> Play</button>
            <button class="btn info"><i class="fa fa-info-circle"></i> More Info</button>
        `;
        document.querySelector('.hero').style.backgroundImage = `url(${IMG_BASE_URL}${movie.backdrop_path})`;
    } catch (error) {
        console.error('Error updating hero content:', error);
    }
}


async function fetchRandomMovie() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch popular movies');
        }
        const data = await response.json();
        const movies = data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        return randomMovie;
    } catch (error) {
        console.error(error);
        return null;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    displayMovies();
    displayLatestReleases();
    updateHeroContent();
});


window.addEventListener('click', (event) => {
    const modal = document.getElementById("movieModal");
    if (event.target === modal) {
        closeModal();
    }
});


document.querySelector(".close").addEventListener('click', closeModal);


async function fetchRandomMovie() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch popular movies');
        }
        const data = await response.json();
        const movies = data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        return randomMovie;
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function updateHeroContent() {
    try {
        const movie = await fetchRandomMovie();
        if (!movie) {
            throw new Error('No movie found');
        }
        const heroContent = document.querySelector('.hero-content');
        heroContent.innerHTML = `
            <h1>${movie.title}</h1>
            <p>${movie.overview}</p>
            <button class="btn play"><i class="fa fa-play"></i> Play</button>
            <button class="btn info"><i class="fa fa-info-circle"></i> More Info</button>
        `;
        document.querySelector('.hero').style.backgroundImage = `url(${IMG_BASE_URL}${movie.backdrop_path})`;
        

        
        setInterval(async () => {
            const newMovie = await fetchRandomMovie();
            if (newMovie) {
                heroContent.innerHTML = `
                    <h1>${newMovie.title}</h1>
                    <p>${newMovie.overview}</p>
                    <button class="btn play"><i class="fa fa-play"></i> Play</button>
                    <button class="btn info"><i class="fa fa-info-circle"></i> More Info</button>
                `;
                document.querySelector('.hero').style.backgroundImage = `url(${IMG_BASE_URL}${newMovie.backdrop_path})`;
            }
        }, 5000); 
    } catch (error) {
        console.error('Error updating hero content:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    updateHeroContent();
});


async function fetchActionMovies() {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
        if (!response.ok) {
            throw new Error('Failed to fetch action movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching action movies:', error);
        return [];
    }
}


async function fetchThrillerMovies() {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=53`);
        if (!response.ok) {
            throw new Error('Failed to fetch thriller movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching thriller movies:', error);
        return [];
    }
}


async function fetchFantasyMovies() {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=14`);
        if (!response.ok) {
            throw new Error('Failed to fetch fantasy movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching fantasy movies:', error);
        return [];
    }
}


async function fetchAnimationMovies() {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`);
        if (!response.ok) {
            throw new Error('Failed to fetch animation movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching animation movies:', error);
        return [];
    }
}


async function displayActionMovies() {
    try {
        const movies = await fetchActionMovies();
        const movieContainer = document.getElementById('action-movies');
        movieContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `<img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">`;
            movieDiv.addEventListener('click', async () => {
                const movieDetails = await fetchMovieDetails(movie.id);
                showModal(movieDetails);
            });
            movieContainer.appendChild(movieDiv);
        });
        console.log('Action movies displayed:', movies);
    } catch (error) {
        console.error('Error displaying action movies:', error);
    }
}


async function displayThrillerMovies() {
    try {
        const movies = await fetchThrillerMovies();
        const movieContainer = document.getElementById('thriller-movies');
        movieContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `<img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">`;
            movieDiv.addEventListener('click', async () => {
                const movieDetails = await fetchMovieDetails(movie.id);
                showModal(movieDetails);
            });
            movieContainer.appendChild(movieDiv);
        });
        console.log('Thriller movies displayed:', movies);
    } catch (error) {
        console.error('Error displaying thriller movies:', error);
    }
}


async function displayFantasyMovies() {
    try {
        const movies = await fetchFantasyMovies();
        const movieContainer = document.getElementById('fantasy-movies');
        movieContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `<img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">`;
            movieDiv.addEventListener('click', async () => {
                const movieDetails = await fetchMovieDetails(movie.id);
                showModal(movieDetails);
            });
            movieContainer.appendChild(movieDiv);
        });
        console.log('Fantasy movies displayed:', movies);
    } catch (error) {
        console.error('Error displaying fantasy movies:', error);
    }
}


async function displayAnimationMovies() {
    try {
        const movies = await fetchAnimationMovies();
        const movieContainer = document.getElementById('animation-movies');
        movieContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `<img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">`;
            movieDiv.addEventListener('click', async () => {
                const movieDetails = await fetchMovieDetails(movie.id);
                showModal(movieDetails);
            });
            movieContainer.appendChild(movieDiv);
        });
        console.log('Animation movies displayed:', movies);
    } catch (error) {
        console.error('Error displaying animation movies:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    displayMovies(); // Existing function to display popular movies
    displayLatestReleases(); // Existing function to display latest releases
    displayActionMovies(); // Display action movies
    displayThrillerMovies(); // Display thriller movies
    displayFantasyMovies(); // Display fantasy movies
    displayAnimationMovies(); // Display animation movies
});
