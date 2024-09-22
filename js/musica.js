// musica.js
let audio = null; // Variable para almacenar el elemento de audio
let musicaReproduciendo = false; // Bandera para verificar si la música ya está reproduciendo

export function musica() {  
    return new Promise((resolve, reject) => {
        // Si la música ya está reproduciendo, no hacer nada
        if (musicaReproduciendo) {
            resolve('La música ya está en reproducción');
            return;
        }

        // Crear y configurar el elemento de audio
        audio = document.createElement('audio');
        audio.src = "./musica/Spice Girls - Wannabe ( Lyrics ) 🎵.mp3";  

        audio.addEventListener('canplaythrough', () => {
            audio.play()
                .then(() => {
                    musicaReproduciendo = true; // Marcar la música como reproducida
                    resolve('Audio reproducido correctamente');
                })
                .catch(error => reject('Error al reproducir el audio: ' + error));
        });

        audio.addEventListener('error', () => {
            reject('No se pudo cargar el archivo de audio');
        });

        // Añadir el elemento audio al DOM
        document.body.appendChild(audio);
    });
}

export function detenerMusica() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        document.body.removeChild(audio);
        audio = null; // Limpiar la variable de audio
        musicaReproduciendo = false; // Marcar la música como no reproducida
    }
}
