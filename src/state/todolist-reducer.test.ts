import {
    AddTodoListAC,
    ChangeTodoListFilterAC, ChangeTodoListTitleAC, filterValueType,
    RemoveTodoListAC, TodolistDomainType,
    todolistsReducer
} from "./todolist-reducer";
import {v1} from "uuid";

// тестовые данные:
let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", entityStatus:"idle"}
    ]
})

test('correct todolist should be removed', () => {

    // вызов тестируемой функции:
    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId2))
    // cверка результата c ожиданием:
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});


test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";
    let newTodolistId = "newTodolistId"

    const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle, newTodolistId))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].id).toBe(newTodolistId);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: filterValueType = "Completed";

    const endState = todolistsReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});



