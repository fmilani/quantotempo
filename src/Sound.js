import React, { Component } from 'react';

export default class Sound extends Component {
  componentDidMount() {
    this.audio = new Audio('beep.wav');
    this.audio.loop = true;
    this.audio.play();
  }

  componentWillUnmount() {
    this.audio.pause();
    delete this.audio;
  }

  render() {
    return null;
  }
}
