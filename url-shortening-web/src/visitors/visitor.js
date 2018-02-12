import React, {Component} from 'react';
//import DataService from '../services/data-service';
//import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

class Visitor extends Component {
  render() {
    return (
      <div>
        <table className="table continuous">
          <tbody>
            <tr>
              <td style={{width: '35%'}}>{this.props.ip}</td>
              <td style={{width: '45%'}}>{this.props.time}</td>
              <td style={{width: '20%'}}>{this.props.device}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Visitor;
