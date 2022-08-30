# WebAudio APIによる録音

少し前まで使用できていたScriptProcessorが，今後使えなくなるとのことで，別の録音方法を調べた．
その結果，AudioWorkletを使用することで録音できることが分かった．
そもそもAudioWorkletは，鳴らしている音に効果を与えるものなので，この使用方法の正しさは何とも言えない．

このプログラムは，下記URLに用いられているソースコードを流用して，不要な箇所を削っている．
https://zenn.dev/tatsuyasusukida/articles/097321c14ec6f5