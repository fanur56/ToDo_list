import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {EditableSpan} from "../EditableSpan";

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {description: 'changed'}
    },
} as ComponentMeta<typeof EditableSpan>;

const EditableSpanStory: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStoryExample = EditableSpanStory.bind({});

EditableSpanStoryExample.args = {
    title : "edit me"
}
