import {filterValueType, TodoListType} from "../App";
import {ChangeTodoListFilterAT, todolistsReducer} from "./todolist-reducer";
import {v1} from "uuid";


test('correct todolist should be removed', () => {
    // тестовые данные:
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
    // вызов тестируемой функции:
    const endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todolistId2})
    // cверка результата c ожиданием:
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistsReducer(startState, {type: "ADD-TODOLIST", title: newTodolistTitle, id: v1()})

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action = {
        type: "CHANGE-TODOLIST-TITLE" as const,
        id: todolistId2,
        newTitle: newTodolistTitle
    };

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: filterValueType = "Completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action: ChangeTodoListFilterAT = {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});



