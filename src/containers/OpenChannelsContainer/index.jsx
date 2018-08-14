import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import * as chatActions from '../../redux/chat/actions';
import { CreateChannelForm } from '../../components/CreateChannelForm';
import { ChannelList } from '../../components/ChannelList';
import { Channel } from '../../components/Channel';

import './index.css';

class OpenChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  handleOpenChannel = (formData) => {
    this.props.chatActions.createOpenChannel(formData);
  }

  handleOpenChList = () => {
    this.props.chatActions.openChannelsList();
  }

  handleEnterChannel = (channelUrl) => {
    this.props.chatActions.enterChannel(channelUrl);
  }

  handleMessageSend = (messageData) => {
    this.props.chatActions.sendMessage(messageData);
  }

  heandleGetMessage = (channelUrl) => {
    this.props.chatActions.getMessages(channelUrl);
  }

  handleUpdateChannel = (channelUrl) => {
    // this.props.chatActions.updateMessages(channelUrl);
  }

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  }

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    const { channelsList, channel, messages } = this.props.chat;
    return (
      <div className="page channel-page">
        {this.props.chat.fetching ?
          <div className="preloader">
            <Spinner
              color="#80f0c1"
              secondaryColor="#f7a2c9"
              size="200"
            />
          </div>
          : null
        }
        { this.state.modalOpen ?
          <div className="modal-wrap">
            <div className="modal">
              <button className="x-btn" onClick={this.handleCloseModal}>x</button>
              <CreateChannelForm onCreateChannel={this.handleOpenChannel} />
            </div>
          </div>
          :
          null
        }
        { channelsList ?
          <ChannelList selectedChan={this.handleEnterChannel} channels={channelsList} />
          :
          null
        }
        { channel ?
          <Channel
            onMessageSend={this.handleMessageSend}
            onUpdateChannelChat={this.handleUpdateChannel}
            onGetMessages={this.heandleGetMessage}
            onEnter={this.handleEnterChannel}
            user={this.props.user}
            channel={channel}
            messages={messages}
          />
        :
          null
        }
        <button onClick={this.handleOpenModal}>Создать открытый канал</button>
        <button onClick={this.handleOpenChList}>Список открытых каналов</button>
      </div>
    );
  }
}

OpenChannel.propTypes = {
  chatActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    chat: state.chatReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(chatActions, dispatch)
  };
}

export const OpenChannelsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenChannel);
