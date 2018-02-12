import React, { Component } from 'react';
import './App.css';

import Visitor from '../visitors/visitor';

import HttpService from '../services/http-services';

const http = new HttpService();

class App extends Component {

  constructor(props) {
    super(props);
    http.getUrls();

    this.state = {
      word: 'apple',
      shortUrl: '',
      longUrl: '',
      visitors: [],
      numVisits: 0,
      showDetails: false,
    };

    this.getShort = this.getShort.bind(this);
    this.visitorList = this.visitorList.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }

  visitorList = () => {
    const list = this.state.visitors.map((visitor) =>
      <div key={visitor._id}>
        <Visitor ip={visitor.ip} time={visitor.timestamp} device={visitor.deviceType} />
      </div>
    );
    return (list);
  }

  handleChange(value) {
    this.setState({
      word: value
    });
  }

  getShort = (url) => {
    var self = this;
    this.toggleOff();

    http.fetchShort(url).then(data => {
      self.setState({
        shortUrl: data.shortUrl,
        longUrl: data.longUrl,
      })
    }, err => {

    });
  }

  addVisitor = (shortUrl) => {
//    var self = this;
    http.addVisitor(shortUrl).then(data => {

    }, err => {

    });
  }

  toggleOff = () => {
    var toggle = document.getElementsByClassName("infoBox")[0].firstElementChild;
    toggle.className = "hide";
  }

  toggleOn = () => {
    var toggle = document.getElementsByClassName("infoBox")[0].firstElementChild;
    toggle.className = "show";
  }

  urlGetInfo = () => {
    var self = this;
    http.urlGetInfo(this.state.shortUrl).then(data => {
      self.setState({
        visitors: data.visitors,
        numVisits: data.numVisits,
        show: true,
      })
      self.toggleOn();
    }, err => {

    });
  }

  redirect() {
    window.open(this.state.longUrl, '_blank');
    http.addVisitor(this.state.shortUrl).then(data => {

    }, err => {

    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">URL Shortener</h1>
        </header>

        <div className="container url">
          <div>
            <textarea name="Long Url" value={this.state.new} className="longUrl" placeholder="Please enter URL to be shortened here..." onChange={(e) => this.handleChange(e.target.value)} />

            <div className="button_container">
              <button className='button' onClick={() => { this.getShort(this.state.word)}}>Shorten</button>
            </div>
          </div>

          <div>
            <textarea name="Short Url" id="shortUrl" placeholder="Shortened URL will be displayed here." value={this.state.shortUrl} readOnly />

            <div className="button_container">

              <button className='button' onClick={() => { this.redirect()}}>Redirect</button>

              <button className='button' onClick={() => this.urlGetInfo()}>Get Info</button>
            </div>
          </div>

          <div className="container infoBox">
            <div className="hide">
              <table className="table">
                <caption className="topCaption">URL Basic Information</caption>
                <thead>
                  <tr>
                    <th className="w-50"></th>
                    <th className="w-50">Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="w-50">Long Url </th>
                    <td className="w-50">{this.state.longUrl}</td>
                  </tr>
                  <tr>
                    <th className="w-50">Short Url </th>
                    <td className="w-50">{this.state.shortUrl}</td>
                  </tr>
                  <tr>
                    <th className="w-50">Number of Visits </th>
                    <td className="w-50">{this.state.numVisits}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <table className="table">
                  <caption className="topCaption">Visitor Information</caption>
                  <thead>
                    <tr>
                      <th style={{width: '35%'}}>Visitor IP</th>
                      <th style={{width: '45%'}}>Time Visited</th>
                      <th style={{width: '20%'}}>Device Type</th>
                    </tr>
                  </thead>
                </table>
                 {this.visitorList()}
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
