window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;

let source;

let element1 = document.querySelector('#graph1');
let graphicsCtx1 = element1.getContext( '2d' );
let element2 = document.querySelector('#graph2');
let graphicsCtx2 = element2.getContext( '2d' );

navigator.mediaDevices.getUserMedia( {
    audio: true
}).then( stream => {
    source = audioCtx.createMediaStreamSource( stream );
    console.log(source);
    source.connect( analyser );
}).catch(err => {
    console.log(err);
});

document.querySelector( '#btn1' ).addEventListener( 'click', () => {
    // 時間領域の波形データを取得
    let dataArray = new Uint8Array( analyser.fftSize );
    analyser.getByteTimeDomainData( dataArray );
    // dataArray: Unsigned Int（8bit）なので，範囲は0〜255，128が振幅0
    console.log( dataArray );

    // 周波数領域のデータを取得
    let fftArray = new Uint8Array( analyser.frequencyBinCount );
    analyser.getByteFrequencyData( fftArray );
    console.log( fftArray );

    // 時間領域のグラフ描画
    console.log( "graph" );
    graphicsCtx1.beginPath();
    graphicsCtx1.moveTo( 0, 256 );
    for( let x=1; x<dataArray.length; x++ ) {
        graphicsCtx1.lineTo( x, 256+(128-dataArray[x])*4 );
    }
    graphicsCtx1.stroke();

    // 周波数領域のグラフ描画
    graphicsCtx2.beginPath();
    graphicsCtx2.moveTo( 0, 400 );
    for( let x=1; x<fftArray.length; x++ ) {
        graphicsCtx2.lineTo( x*2, 400-(fftArray[x])*2 );
    }
    graphicsCtx2.stroke();
});

