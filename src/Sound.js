import { Component } from 'react';

export default class Sound extends Component {
  constructor(props) {
    super(props);
    this.audio = new Audio('/beep.wav');
    this.audio
      .play()
      .then(() => {
        console.log('Alarm sound ready');
      })
      .catch(error => {
        console.log('Error with alarm sound' + error);
      });
    this.audio.muted = true;
    this.audio.loop = true;
  }

  componentWillUnmount() {
    this.audio.pause();
    delete this.audio;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.play && nextProps.play) {
      this.audio.muted = false;
    } else if (this.props.play && !nextProps.play) {
      this.audio.muted = true;
    }
  }

  render() {
    return null;
  }
}
