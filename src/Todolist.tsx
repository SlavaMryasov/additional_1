import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import { Button } from './components/Button';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            // addTask();
        }
    }

    const removeTodoListHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTaskHandler = () => {
        props.addTask(props.title, props.id)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId, props.id)
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.id)
    }

    return <div>
        <h3> {props.title}
            <Button onClick={removeTodoListHandler} name="x"/>

        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button onClick={addTaskHandler} name='+'/>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }
                    
                 
                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button onClick={()=>removeTaskHandler(t.taskId)} name='X'/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button  onClick={()=>{changeFilterHandler('all')}} name='All'/>
            <Button  onClick={()=>{changeFilterHandler('active')}} name='Active'/>
            <Button  onClick={()=>{changeFilterHandler('completed')}} name='Completed'/>
        </div>
        <p></p>
        {
            props.students.map((el) => {
                return (
                    <div>{el}</div>
                )
            })
        }
    </div>
}


