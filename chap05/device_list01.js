document.querySelector('#btn1').addEventListener('click', () => {
    navigator.mediaDevices.enumerateDevices().then( (devices) => {
        console.log( devices );
    })
})