import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

const initState = {
  fetching: false,
  sendingMessage: false,
};

const createOpenChannel = (state, formData) => ({
  ...state,
  formData,
  fetching: true,
});

const createOpenChannelSuccessed = (state, channelData) => ({
  ...state,
  channelData,
  fetching: false,
});

const createOpenChannelFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const openChannelsList = state => ({
  ...state,
  fetching: true,
});

const openChannelsListSuccessed = (state, channelsList) => ({
  ...state,
  channelsList,
  fetching: false,
});

const openChannelsListFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const sendMessage = state => ({
  ...state,
  sendingMessage: true,
});

const sendMessageSuccessed = (state, updMessages) => ({
  ...state,
  messages: updMessages,
  sendingMessage: false
});

const sendMessageFailed = (state, error) => ({
  ...state,
  error,
  sendingMessage: false
});

const enterChannel = (state, channelUrl) => ({
  ...state,
  channelUrl,
  fetching: true,
});

const enterChannelSuccessed = (state, channel) => ({
  ...state,
  channel,
  fetching: false,
});

const enterChannelFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const getMessages = state => ({
  ...state,
  fetching: true,
});

const getMessagesSuccessed = (state, messages) => ({
  ...state,
  messages,
  fetching: false,
});

const getMessagesFailed = (state, error) => ({
  ...state,
  error,
  fetching: false,
});

const handlers = {
  [TYPES.CREATE_OPEN_CHANNEL]: createOpenChannel,
  [TYPES.CREATE_OPEN_CHANNEL_SUCCESSED]: createOpenChannelSuccessed,
  [TYPES.CREATE_OPEN_CHANNEL_FAILED]: createOpenChannelFailed,
  [TYPES.OPEN_CHANNELS_LIST]: openChannelsList,
  [TYPES.OPEN_CHANNELS_LIST_SUCCESSED]: openChannelsListSuccessed,
  [TYPES.OPEN_CHANNELS_LIST_FAILED]: openChannelsListFailed,
  [TYPES.ENTER_CHANNEL]: enterChannel,
  [TYPES.ENTER_CHANNEL_SUCCESSED]: enterChannelSuccessed,
  [TYPES.ENTER_CHANNEL_FAILED]: enterChannelFailed,
  [TYPES.SEND_MESSAGE]: sendMessage,
  [TYPES.SEND_MESSAGE_SUCCESSED]: sendMessageSuccessed,
  [TYPES.SEND_MESSAGE_FAILED]: sendMessageFailed,
  [TYPES.GET_MESSAGES]: getMessages,
  [TYPES.GET_MESSAGES_SUCCESSED]: getMessagesSuccessed,
  [TYPES.GET_MESSAGES_FAILED]: getMessagesFailed,
};

export const chatReducer = createReducer(initState, handlers);
