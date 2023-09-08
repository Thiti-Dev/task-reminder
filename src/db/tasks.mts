import { plainToClass, plainToInstance } from 'class-transformer'
import { Task } from '../shared/dtos/tasks/tasks.dto.mjs'
import { ITask } from '../shared/interfaces/tasks.interface.mjs'
import {dbInstance} from './init.mjs'

// @deprecated
export function addTaskCB(name:string,cb: (success:boolean,createdId?:number) => void){
    const insertionQuery: string = 'INSERT INTO task_lists (name,is_done) VALUES (?,?)'
    dbInstance.run(insertionQuery, [name,0], function(err){
        if(err){
            return cb(false)
        }
        return cb(true,this.lastID)
    })
}

export function addTask(name:string): Promise<[boolean,number|null]>{
    return new Promise((resolve) => { 
        const insertionQuery: string = 'INSERT INTO task_lists (name,is_done) VALUES (?,?)'
        dbInstance.run(insertionQuery, [name,0], function(err){
            if(err){
                return resolve([false,null])
            }
            resolve([true,this.lastID])
        })
    })
}

export function removeTask(id:number): Promise<boolean>{
    return new Promise((resolve) => { 
        const insertionQuery: string = 'DELETE FROM task_lists WHERE id=?'
        dbInstance.run(insertionQuery, [id], function(err){
            if(err){
                return resolve(false)
            }
            resolve(true)
        })
    })
}

export function setTaskDone(id:number): Promise<boolean>{
    return new Promise((resolve) => { 
        const insertionQuery: string = 'UPDATE task_lists SET is_done=1,done_at=CURRENT_TIMESTAMP WHERE id=?'
        dbInstance.run(insertionQuery, [id], function(err){
            if(err){
                return resolve(false)
            }
            resolve(true)
        })
    })
}

export async function viewTask(): Promise<Task[]>{
    return new Promise((resolve, reject) => { 
        const query: string = 'SELECT * from task_lists'
        dbInstance.all(query, function(err,rows: ITask[]){
            if(err) return reject(err)
            resolve(plainToInstance(Task, rows))
        })
     })
}


