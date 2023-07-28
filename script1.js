const apiKey = 'fdb300f4';
const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const movieDetails = document.getElementById('movieDetails');

function fetchMovieData(movieTitle) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === 'False') {
        movieDetails.innerHTML = '<p>Movie not found or invalid input</p>';
      } else {
        const title = data.Title;
        const poster = data.Poster;
        const html = `
          <h2>${title}</h2>
          <img src="${poster}" alt="${title} Poster">
        `;
        movieDetails.innerHTML = html;
      }
    })
    .catch((error) => {
      console.error('Error fetching movie data:', error);
    });
}

searchBtn.addEventListener('click', () => {
  const movieTitle = movieInput.value;
  fetchMovieData(movieTitle);
});

movieInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const movieTitle = movieInput.value;
    fetchMovieData(movieTitle);
  }
});