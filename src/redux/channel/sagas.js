import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createOpenChannel,
  updateChannel,
  openChannelList,
  getChannel,
  enterChannel,
  exitChannel,
} from '../../services/sendbird';
import {
  CREATE_OPEN_CHANNEL,
  UPDATE_CHANNEL,
  GET_SELECTED_CHANNEL,
  ENTER_CHANNEL,
  LEAVE_CHANNEL,
} from './types';
import {
  createOpenChannelSuccessed,
  createOpenChannelFailed,
  updateChannelSuccessed,
  updateChannelFailed,
  openChannelsListSuccessed,
  openChannelsListFailed,
  getSelectedChannelSuccessed,
  getSelectedChannelFailed,
  enterChannelSuccessed,
  enterChannelFailed,
  leaveChannelSuccessed,
  leaveChannelFailed,
} from './actions';

import { USER_RECONNECT_SUCCESSED } from '../user/types';

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

export function* updateChannelAsync(action) {
  try {
    const updatedChannel = yield call(updateChannel, ...action.payload);
    yield put(updateChannelSuccessed(updatedChannel));
  } catch (error) {
    yield put(updateChannelFailed(error));
  }
}

export function* watchUpdateChannel() {
  yield takeLatest(UPDATE_CHANNEL, updateChannelAsync);
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
  yield takeLatest(USER_RECONNECT_SUCCESSED, openChannels);
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

export function* leaveChannel(action) {
  try {
    const res = yield call(exitChannel, action.payload);
    yield put(leaveChannelSuccessed(res));
  } catch (error) {
    yield put(leaveChannelFailed(error));
  }
}

export function* watchLeaveChannel() {
  yield takeLatest(LEAVE_CHANNEL, leaveChannel);
}