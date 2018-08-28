import React from 'react';
import PropTypes from 'prop-types';
import { ChatBox } from '../ChatBox';

import './index.scss';

export class Channel extends React.Component {
  handleLeaveBtn = () => {
    this.props.onLeave(this.props.channel.url);
  };

  render() {
    const { name, participantCount } = this.props.channel;
    return (
      <div className="channel-item">
        <div className="channel-header">
          <div className="channel-info">
            <div className="img-place">
              <img
                src={
                  this.props.channel.coverUrl
                    ? this.props.channel.coverUrl
                    : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
                }
                alt={name}
              />
            </div>
            <div>
              <h1 className="channel-name">{name}</h1>
              <p className="channel-users">Online: {participantCount}</p>
            </div>
          </div>
          <div className="channel-users-list">
            <ul className="users-list">
              {this.props.participants.map((cur, i) => (
                <li
                  style={{ transform: `translateX(calc(${i}*(50%)))` }}
                  key={cur.userId}
                >
                  <div className="img-place">
                    <img
                      src={cur.profileUrl}
                      title={cur.nickname}
                      alt={cur.nickname}
                    />{' '}
                    {cur.connectionStatus === 'online' ? (
                      <span className="connection-status online" />
                    ) : (
                      <span className="connection-status" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* <button onClick={this.handleLeaveBtn}>Покинуть канал</button> */}
        </div>
        <ChatBox currentChannel={this.props.channel} />
      </div>
    );
  }
}

Channel.defaultProps = {
  participants: [],
};

Channel.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
  onLeave: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.any),
};
