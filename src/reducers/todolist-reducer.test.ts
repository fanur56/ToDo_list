import {TodoListType} from "../App";
import {todolistsReducer} from "./todolist-reducer";
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
