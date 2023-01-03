import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Components/Task";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    argTypes: {
        addItem: {description: 'clicked'},
    },
    args: {
        removeTask: action("removeTask"),
        changeTaskTitle: action("changeTaskTitle"),
        changeCheckbox: action("changeCheckbox")
    }
} as ComponentMeta<typeof Task>;

const TaskStory: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDone = TaskStory.bind({});

TaskIsDone.args = {
    task: {
        id: "qwerty",
        title: "task #1",
        isDone: true,
    }
};

export const TaskIsNotDone = TaskStory.bind({});

TaskIsNotDone.args = {
    task: {
        id: "qwerty",
        title: "task #1",
        isDone: false,
    }
};
