import React from 'react';
import PropTypes from 'prop-types';

export class CreateChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelName: '',
      coverUrl: '',
      coverFile: '',
    };
  }

  handleInput = (e) => {
    const curInput = e.target;
    const curName = curInput.name;
    const curValue = curInput.value;
    this.setState({ [curName]: curValue });
  }

  handleFilesLoad = (file) => {
    this.setState({ coverFile: file });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = [
      this.state.channelName,
      this.state.coverUrl,
      this.state.coverFile,
    ];
    this.setState({
      channelName: '',
      coverUrl: '',
      coverFile: '',
    });
    this.props.onSubmitForm(formData);
  }

  render() {
    return (
      <div className="form create-channel-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="channelName">
            <span>Name</span>
            <input id="channelName" name="channelName" value={this.state.channelName} onChange={this.handleInput} type="text" />
          </label>
          <label htmlFor="coverUrl">
            <span>Cover Url</span>
            <input id="coverUrl" name="coverUrl" value={this.state.coverUrl} onChange={this.handleInput} type="text" />
          </label>
          <button disabled={!this.state.channelName}>Создать</button>
        </form>
      </div>
    );
  }
}

CreateChannelForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired
};
