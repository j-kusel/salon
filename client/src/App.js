/*  Importing React allows JSX to work.
    Importing { Component } shortens React.Component syntax to Component.
    Using Component, we can define functions/classes with special features like
    statefulness. */
import React, { Component } from 'react';
/*  Import front-end framework tools for React. */
import { Grid, Row, Col } from 'react-bootstrap';
/*  Import HTTP client axios */
import axios from 'axios';
/*  Import for real-time data transfer */
import io from 'socket.io-client';

import TextEdit from './components/TextEdit.js';
import './css/index.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hash: window.location.pathname,
        editable: -1,
        token: '',
        posts: []
    }

    this.connectSocket = this.connectSocket.bind(this);

    axios.get('http://localhost:8500' + this.state.hash)
        .then((res) => {
            this.connectSocket(res);
        })
        .catch((err) => {
            console.log(err);
        });
  }

  connectSocket(result) {
      this.socket = io('localhost:8500', {
          query: 'token=' + result.data.token
      });

      this.setState((oldState) => (
          {
              token: result.data.token,
              editable: result.data.editor
          }
      ));

      var self = this;

      this.socket
          .on('connect', () => {
              console.log('authenticated');
          })
          .on('disconnect', () => console.log('disconnected'))
          .on('update', (posts) => self.setState((oldState) => ({posts: posts})))
          .on('save_status', (status) => console.log(status));

      this.saver = (_id, BODY) => this.socket.emit('save', {_id, BODY});

  }

  render() {

    var editors = (this.state.posts || (new Array(10)).fill(0))
        .map((post, index) => {
            var id = post ? post._id : index;
            return (<TextEdit className="col-sm-3" key={id} id={id} save={this.saver} body={post.BODY} readOnly={id !== this.state.editable} />);
        });

    return (
      <div className="App" id='app'>
        {editors}
      </div>
    );
  }
}

export default App;
