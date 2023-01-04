import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "5681cc7e-1c04-4d08-8e39-18a3f5b202e6"
    }
});

export const todolistsAPI = {
    getTodolists() {
       return instance.get("todo-lists")
    },
    postTodolist() {
        return instance.post("todo-lists", {title: "List"})
    },
    deleteTodolist(){
        return instance.delete(`todo-lists/f85621ea-788e-41ad-9bfe-5174e4a8be48`)
    },
    putTodolist(){
        return instance.put("todo-lists/d6373953-3948-4366-808f-ed2e1a8932b8", {title: "Yo"})
    }
}