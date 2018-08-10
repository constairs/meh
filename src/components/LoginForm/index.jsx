import React from 'react';

import './index.css';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userNick: '',
      disabledBtn: true
    };
  }

  handleTextInput = (e) => {
    if (e.target.name === 'userId') {
      this.setState({ userId: e.target.value, disabledBtn: false });
    }
    if (e.target.name === 'userNick') {
      this.setState({ userNick: e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      userId: this.state.userId,
      userNick: this.state.userNick
    };
    this.props.onLogin(formData);
    this.setState({ userId: '', userNick: '' });
  }

  render() {
    // const { nickname, isActive } = this.props.data.user;
    return (
      <div className="form login-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="userId">
            <span>UserId</span>
            <input id="userId" name="userId" value={this.state.userId} onChange={this.handleTextInput} type="text" />
          </label>
          <label htmlFor="userLogin">
            <span>UserNick</span>
            <input id="userNick" name="userNick" value={this.state.userNick} onChange={this.handleTextInput} type="text" />
          </label>
          <button disabled={this.state.disabledBtn}>Login</button>
        </form>
      </div>
    );
  }
}