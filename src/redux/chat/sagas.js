import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  createOpenChannel,
  openChannelList,
  getChannel,
  enterChannel,
  sendMessage,
  getMessages
} from '../../services/sendbird';
import {
  CREATE_OPEN_CHANNEL,
  OPEN_CHANNELS_LIST,
  GET_SELECTED_CHANNEL,
  ENTER_CHANNEL,
  SEND_MESSAGE,
  GET_MESSAGES,
} from './types';
import {
  createOpenChannelSuccessed,
  createOpenChannelFailed,
  openChannelsListSuccessed,
  openChannelsListFailed,
  getSelectedChannelSuccessed,
  getSelectedChannelFailed,
  enterChannelSuccessed,
  enterChannelFailed,
  sendMessageSuccessed,
  sendMessageFailed,
  getMessagesSuccessed,
  getMessagesFailed,
} from './actions';

export function* createChannelAsync(action) {
  try {
    const createdChannel = yield call(createOpenChannel, ...action.payload);
    yield put(createOpenChannelSuccessed(createdChannel));
  } catch (error) {
    yield put(createOpenChannelFailed(error));
  }
}

export function* watchCreateChannel() {
  yield takeLatest(CREATE_OPEN_CHANNEL, createChannelAsync);
}

export function* openChannels() {
  try {
    const channelList = yield call(openChannelList);
    yield put(openChannelsListSuccessed(channelList));
  } catch (error) {
    yield put(openChannelsListFailed(error));
  }
}

export function* watchOpenChannels() {
  yield takeLatest(OPEN_CHANNELS_LIST, openChannels);
}

export function* selectChannel(action) {
  try {
    const channel = yield call(getChannel, action.channelUrl);
    yield put(getSelectedChannelSuccessed(channel));
  } catch (error) {
    yield put(getSelectedChannelFailed(error));
  }
}

export function* watchGetChannel() {
  yield takeLatest(GET_SELECTED_CHANNEL, selectChannel);
}

export function* enterSelectedChannel(action) {
  try {
    const channel = yield call(enterChannel, action.payload);
    yield put(enterChannelSuccessed(channel));
  } catch (error) {
    yield put(enterChannelFailed(error));
  }
}

export function* watchEnterChannel() {
  yield takeLatest(ENTER_CHANNEL, enterSelectedChannel);
}

export function* sendMessageAsync(action) {
  try {
    const sendRes = yield call(sendMessage, ...action.messageData);
    yield put(sendMessageSuccessed(sendRes));
  } catch (error) {
    yield put(sendMessageFailed(error));
  }
}

export function* watchSendMessage() {
  yield takeLatest(SEND_MESSAGE, sendMessageAsync);
}

export function* getMessagesAsync(action) {
  try {
    const messages = yield call(getMessages, action.channelUrl);
    yield put(getMessagesSuccessed(messages));
  } catch (error) {
    yield put(getMessagesFailed(error));
  }
}

export function* watchGetMessages() {
  yield takeEvery(GET_MESSAGES, getMessagesAsync);
}
