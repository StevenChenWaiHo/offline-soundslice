let domain = window.location.hostname;
let port = 5000;
let url = `http://${domain}:${port}`;
const songL = []

document.addEventListener('DOMContentLoaded', async () => {
    const songList = document.getElementById('song-list');
    console.log(songL)
    // Fetch songs from the API
    fetch(url + '/api/songs', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
                    songItem.innerHTML = `<a href="app_shell.html?song=${encodeURIComponent(song.name)}">${song.name}</a>  by ${song.artist}`;
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
var formShown = false;

addButton.addEventListener('click', () => {
    formShown = !formShown
    addSongForm.style.display = formShown ? 'block' : 'none';
    addButton.textContent = formShown ? 'close' : 'add'
});

songForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const songName = document.getElementById('song-name').value;
    const artistName = document.getElementById('artist-name').value;
    const sheetData = document.getElementById('sheet-data').value;

    const formData = new FormData();
    formData.append('metadata', JSON.stringify({
        
    }));

    fetch(url + '/api/songs', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: songName,
            artist: artistName,
            sheetData: sheetData
          })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                alert('Success: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert('An error occurred. Please try again.');
        });
});