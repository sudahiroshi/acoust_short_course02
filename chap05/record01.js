window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;

let source;

navigator.mediaDevices.getUserMedia( {
    audio: true
}).then( stream => {
    source = audioCtx.createMediaStreamSource( stream );
    source.connect( analyser );
}).catch(err => {
    console.log(err);
});

document.querySelector( '#btn1' ).addEventListener( 'click', () => {
    // 波形データを取得
    let dataArray = new Uint8Array( analyser.fftSize );
    analyser.getByteTimeDomainData( dataArray );
    // dataArray: Unsigned Int（8bit）なので，範囲は0〜255，128が振幅0
    console.log( dataArray );
});

