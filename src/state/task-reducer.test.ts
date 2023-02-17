import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./task-reducer";
import {TaskStateType} from "../App";

let startState: TaskStateType;
enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId1"
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId1"
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId1"
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId2"
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId2"
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId2"
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId1"
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId1"
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId1"
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId2"
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: TaskPriorities.Low, description: "", todoListId: "todolistId2"
            }
        ]
    });
});


test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        description: "",
        title: "juice",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "todolistId2",
        todoListId: "",
        order: 0,
        addedDate: ""
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId1"][2].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", "coffee", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("coffee");
});

/*test('new array should be added when new todolist is added', () => {

    const action = AddTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});*/








