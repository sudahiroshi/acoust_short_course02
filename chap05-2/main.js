async function main() {
  try {
    const buttonStart = document.querySelector("#buttonStart");
    const buttonStop = document.querySelector("#buttonStop");
    const audio = document.querySelector("#audio");

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const [track] = stream.getAudioTracks();
    const settings = track.getSettings();

    const audioContext = new AudioContext();
    await audioContext.audioWorklet.addModule("audio-recorder.js"); // <3>

    const mediaStreamSource = audioContext.createMediaStreamSource(stream); // <4>
    const audioRecorder = new AudioWorkletNode(audioContext, "audio-recorder"); // <5>
    const buffers = [];

let graphicsCtx = document.querySelector('#graph1').getContext( '2d' );
    audioRecorder.port.addEventListener("message", (event) => {
      // <6>
      buffers.push(event.data.buffer);
    });
    audioRecorder.port.start(); // <7>

    mediaStreamSource.connect(audioRecorder); // <8>
    audioRecorder.connect(audioContext.destination);

    buttonStart.addEventListener("click", (event) => {
      buttonStart.setAttribute("disabled", "disabled");
      buttonStop.removeAttribute("disabled");

      const parameter = audioRecorder.parameters.get("isRecording");
      parameter.setValueAtTime(1, audioContext.currentTime); // <9>

      buffers.splice(0, buffers.length);
    });

    buttonStop.addEventListener("click", (event) => {
      buttonStop.setAttribute("disabled", "disabled");
      buttonStart.removeAttribute("disabled");

      console.log(buffers);

          // グラフ描画
    console.log( "graph" );
    graphicsCtx.beginPath();
    graphicsCtx.moveTo( 0, 256 );
    // for( let x=1; x<buffers.length; x++ ) {
    //     graphicsCtx.lineTo( x, 256+(buffers[x] * 200.0) );
    // }
    let x = 0;
    for( let box of buffers ) {
//      console.log( box );
      for( let number of box ) {
        graphicsCtx.lineTo( x, 256+(number * 200.0 ) );
        x += 1;
      }
    }
    graphicsCtx.stroke();
    });
  } catch (err) {
    console.error(err);
  }
}

main();
