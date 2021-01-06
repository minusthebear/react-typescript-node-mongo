import React, {FunctionComponent, useEffect, useState} from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import {addTodo, deleteTodo, getTodos, updateTodo} from "../API";

const FormContainer: FunctionComponent = () => {
    const [todos, setTodos] = useState<ITodo[]>([])

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = (): void => {
        getTodos()
            .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
            .catch((err: Error) => console.log(err))
    }

    const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
        e.preventDefault()
        addTodo(formData)
            .then(({ status, data }) => {
                if (status !== 201) {
                    throw new Error('Error! Todo not saved')
                }
                setTodos(data.todos)
            })
            .catch((err) => console.log(err))
    }

    const handleUpdateTodo = (todo: ITodo): void => {
        updateTodo(todo)
            .then(({ status, data }) => {
                if (status !== 200) {
                    throw new Error('Error! Todo not updated')
                }
                setTodos(data.todos)
            })
            .catch((err) => console.log(err))
    }

    const handleDeleteTodo = (_id: string): void => {
        deleteTodo(_id)
            .then(({ status, data }) => {
                if (status !== 200) {
                    throw new Error('Error! Todo not deleted')
                }
                setTodos(data.todos)
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <h1>My Todos</h1>
            <AddTodo saveTodo={handleSaveTodo} />
            {todos.map((todo: ITodo) => (
                <TodoItem
                    key={todo._id}
                    updateTodo={handleUpdateTodo}
                    deleteTodo={handleDeleteTodo}
                    todo={todo}
                />
            ))}
        </>
    )
}

export default FormContainer;