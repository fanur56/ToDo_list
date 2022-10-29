import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {EditableSpan} from "../EditableSpan";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const AppWithReduxStory: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;

export const AppWithReduxStoryExample = AppWithReduxStory.bind({});

//AppWithReduxStoryExample.args = {}