import React, { Component } from 'react';
import TextEdit from './components/TextEdit.js';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import './css/index.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hash: window.location.pathname,
        editable: -1,
        token: ''
    }

    this.connectSocket = this.connectSocket.bind(this);

    axios.get('http://localhost:8500' + this.state.hash)
        .then((res) => {
            console.log(res);
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
              editable: parseInt(result.data.editor)
          }
      ));

      this.socket
          .on('connect', () => console.log('authenticated'))
          .on('disconnect', () => console.log('disconnected'));

  }

  render() {

    var editors = (new Array(10)).fill(0).map((x, index) => <TextEdit className="col-sm-3" key={index} readOnly={index !== this.state.editable} />)

    return (
      <div className="App" id='app'>
        {editors}
        
      </div>
    );
  }
}

export default App;
