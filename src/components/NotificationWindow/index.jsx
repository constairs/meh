import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

export class NotificationWindow extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.notificationShow !== state.show) {
      return { show: props.notificationShow };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.notificationShow,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
    this.props.onNotificationClose();
  };
  render() {
    const { user, channel, type } = this.props.notification;
    return (
      <div
        className={
          this.state.show ? 'notification-window show' : 'notification-window'
        }
      >
        {type === 'onUserJoined' ? (
          <p>
            {user.nickname === this.props.nickname
              ? `Вас пригласили в групповой канал ${channel.name}`
              : `Пользователь ${user.nickname} присоединился к каналу ${
                  channel.name
                }`}
          </p>
        ) : (
          <p>
            {user.nickname === this.props.nickname
              ? `Вы покинули в групповой канал ${channel.name}`
              : `Пользователь ${user.nickname} покинул канал ${channel.name}`}
          </p>
        )}

        <button className="x-btn" onClick={this.handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    );
  }
}

NotificationWindow.defaultProps = {
  notificationData: {},
  notificationText: '',
};
