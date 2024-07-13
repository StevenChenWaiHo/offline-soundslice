let domain = window.location.hostname;
let port = 5000;
let url = `http://${domain}:${port}`;
const songL = []

document.addEventListener('DOMContentLoaded', async () => {
    const songList = document.getElementById('song-list');
    console.log(songL)
    
    

    // Fetch songs from the API
    fetch(url + '/api/songs', {
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("HTTP status " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        console.log(JSON.stringify(data))
        if (data.songs) {
            data.songs.forEach(song => {
                const songItem = document.createElement('div');
                songItem.className = 'song-item';
                songItem.innerHTML = `<a href="app_shell.html?song=${song}">${song}</a>`;
                songList.appendChild(songItem);
            });
        }
    })
    .catch((error) => {
        alert(error);
    });

})


const addButton = document.getElementById('add-button');
const addSongForm = document.getElementById('add-song-form');
const songForm = document.getElementById('song-form');
const songList = document.getElementById('song-list');

addButton.addEventListener('click', () => {
    addSongForm.style.display = 'block';
});

songForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const songName = document.getElementById('song-name').value;
    const artistName = document.getElementById('artist-name').value;

    if (songName && artistName) {
        const newSongItem = document.createElement('div');
        newSongItem.className = 'song-item';
        newSongItem.innerHTML = `<a href="#">${songName}</a> by ${artistName}`;
        songList.appendChild(newSongItem);

        document.getElementById('song-name').value = '';
        document.getElementById('artist-name').value = '';
        addSongForm.style.display = 'none';
    }
});