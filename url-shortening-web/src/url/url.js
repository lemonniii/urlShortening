import React, {Component} from 'react';
import './url.css';

import '../visitors/visitor';
//import DataService from '../services/data-service';
//import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

class Url extends Component {
  render() {
    return (
      <div >
        <p>Long Url: {this.props.long}</p>
        <p>Short Url: {this.props.short}</p>
        <p>Number of Visits: {this.props.numVisits}</p>
        <div>
          {this.props.visitors}
        </div>
      </div>
    );
  }
}

export default Url;
