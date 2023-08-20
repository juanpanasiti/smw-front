import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { MessagesState } from '../../../types/reducers';
import { Message } from '../../../types/message';
import { getId } from '../../../helpers/messageHelpers';

const initialState: MessagesState = {
    messages: [],
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, { payload }: PayloadAction<Message>) => {
            if (!payload.id) {
                payload.id = getId()
            }
            state.messages.push(payload);
        },
        delMessage: (state, { payload }: PayloadAction<number>) => {
            state.messages = state.messages.filter(msg => msg.id !== payload);
        },
    },
});

export const { addMessage, delMessage } = messagesSlice.actions;
