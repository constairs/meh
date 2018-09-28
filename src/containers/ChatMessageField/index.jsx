import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Spinner, Text } from 'react-preloading-component';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTimes } from '@fortawesome/free-solid-svg-icons';
import { messageTyping, messageTypingEnd, userTypingStart, userTypingEnd, sendMessage, sendFileMessage } from '../../redux/chat/actions';
import { FileUploadForm } from '../../components/FileUploadForm';
import { ModalWindow } from '../../components/UI/ModalWindow';

export const Field = styled.form`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 0;
  box-shadow: none;
  background-color: #ffffff;
  input {
    width: 100%;
    height: 40px;
    border: 1px solid ${props => props.theme.colors.main};
    border-radius: 3px;
    margin-bottom: 5px;
    padding-left: 5px;
    padding-top: 5px;
  }
  button {
    margin-left: 14px;
    width: auto;
    height: 30px;
  }
  .send-message-btn {
    display: flex;
    span {
      margin-left: 5px;
    }
  }
  .typing-indicator {
    display: flex;
    align-items: center;
    margin-right: 8px;
    .PreLoading-Text {
      margin-left: 6px;
    }
  }
`;

export class MessageField extends React.Component {
  state = {
    messageText: '',
    fileUploadModal: false,
  };

  handleTextInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (this.props.channelType === 'open' && name === 'messageText') {
        this.props.chatActions.messageTyping([
          this.props.channelUrl,
          this.props.channelType,
          this.props.user.userName,
        ]);
      } else if (this.props.channelType === 'group' && name === 'messageText') {
        this.props.chatActions.userTypingStart([this.props.channelUrl, this.props.channelType]);
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const messageData = [
      this.props.channelUrl,
      this.props.channelType,
      'MESG',
      this.props.user.userId,
      this.state.messageText,
    ];
    this.setState({ messageText: '' });
    this.props.chatActions.sendMessage(messageData);

    if (this.props.channelType === 'open') {
      this.props.chatActions.messageTypingEnd();
    } else if (this.props.channelType === 'group') {
      this.props.chatActions.userTypingEnd([this.props.channelUrl, this.props.channelType]);
    }
  };

  handleFileForm = (fileData) => {
    const fileMessageData = [
      this.props.channelUrl,
      this.props.channelType,
      'FILE',
      this.props.user,
      ...fileData
    ];
    this.props.chatActions.sendFileMessage(fileMessageData);
    this.setState({
      fileUploadModal: false,
    });
  };

  fileUploadModal = () => {
    this.setState({ fileUploadModal: !this.state.fileUploadModal });
  };

  render() {
    const {
      messageText,
      fileUploadModal,
    } = this.state;
    const { userTyping, user, membersTyping } = this.props;
    return (
      <div>
        <Field onSubmit={this.handleSubmit}>
          <input
            type="text"
            onInput={this.handleTextInput}
            name="messageText"
            value={messageText}
          />
          {userTyping && userTyping !== user.userName ? (
            <span className="typing-indicator">
              {userTyping}
              <Text
                color="#000000"
                fontSize="1em"
                text="набирает сообщение"
              />
            </span>
            ) : null}
          {membersTyping.length > 0 ? (
            <span className="typing-indicator">
              {membersTyping.map((member, i) => {
                  if (
                    membersTyping.length > 1 &&
                    i !== membersTyping.length - 1
                  ) {
                    return <span key={member.userId}>{member.nickname}, </span>;
                  }
                  return <span key={member.userId}>{member.nickname}</span>;
                })}
              <Text
                color="#000000"
                fontSize="1em"
                text="набирает сообщение"
              />
            </span>
            ) : null}
          <button
            onClick={this.fileUploadModal}
            type="button"
            title="Отправить файл"
            className="file-upload-modal-btn"
          >
            <FontAwesomeIcon icon={faFile} />
          </button>
          <button
            className="send-message-btn"
            type="submit"
            disabled={!messageText}
          >
              Отправить
            {this.props.sendingMessage ? (
              <span>
                <Spinner color="#ffffff" secondaryColor="#40c9ff" size={10} />
              </span>
              ) : null}
          </button>
        </Field>
        <ModalWindow
          className="modal file-upload-modal"
          isOpen={fileUploadModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.fileUploadModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button className="x-btn" onClick={this.fileUploadModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <FileUploadForm onFileSend={this.handleFileForm} />
        </ModalWindow>
      </div>
    );
  }
}

MessageField.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  channelUrl: PropTypes.string.isRequired,
  channelType: PropTypes.string.isRequired,
  userTyping: PropTypes.string.isRequired,
  membersTyping: PropTypes.arrayOf(PropTypes.any),
  sendingMessage: PropTypes.bool.isRequired,
  chatActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

MessageField.defaultProps = {
  membersTyping: [],
};

export const ChatMessageField = connect(
  state => ({
    user: state.persistedUser,
    userTyping: state.chat.userTyping,
    membersTyping: state.chat.membersTyping,
    sendingMessage: state.chat.sendingMessage,
  }),
  dispatch => ({
    chatActions: bindActionCreators({
      messageTyping,
      messageTypingEnd,
      userTypingStart,
      userTypingEnd,
      sendMessage,
      sendFileMessage
    }, dispatch),
  })
)(MessageField);
