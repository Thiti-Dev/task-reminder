import inquirer from 'inquirer'
import { IPromptAnswer } from './shared/interfaces/inquirer.interface.mjs'
import {Action} from './shared/enums/common.mjs'
import {init} from './db/init.mjs'
import { addTask, removeTask, setTaskDone, viewTask } from './db/tasks.mjs'
import { listTasks } from './funcs/list_tasks.mjs'

(async() => {
    // database initialization
    await init()


    while(true){
        const answer:IPromptAnswer = await inquirer.prompt({
            type:"list",
            name: 'selectedOption',
            message: 'Actions pane: ',
            choices: [Action.LIST_TASK,Action.LIST_FINISHED_TASK,Action.DONE_TASK,Action.ADD_TASK,Action.REMOVE_TASK,Action.EXIT],
        })
    
        const {selectedOption} = answer
    
        switch (selectedOption) {
            case Action.LIST_TASK:
                await listTasks(false)
                break;
            case Action.LIST_FINISHED_TASK:
                await listTasks(true)  
                break;
            case Action.ADD_TASK:
                const task = await inquirer.prompt({
                    type:"input",
                    name: 'task input',
                    message: 'Enter the task name: ',
                })
                const name = task['task input']
                const [success,taskID] = await addTask(name)
                if(!success) {console.log("Having problem adding the task to list");continue}
                console.log(`Successfully added task ID:${taskID}`)
                break;
            case Action.REMOVE_TASK:
                const tasksLists = await viewTask()
                const removingAttempt:IPromptAnswer = await inquirer.prompt({
                    type:"list",
                    name: 'selectedOption',
                    message: 'Actions pane: ',
                    choices: tasksLists.map((task) => `ID:${task.id}) ${task.name}`),
                })

                const removedElementText = removingAttempt.selectedOption
                const regex = /ID:(\d+)/;
                const match = removedElementText.match(regex);
                if(!match) return console.log(`This can't be happening`)
                const extractedTaskID = parseInt(match[1]);
                const taskRemoval = await removeTask(extractedTaskID)
                if(!taskRemoval) {console.log(`Having problem removing TaskID: ${extractedTaskID}`) ; continue}
                console.log(`Successfully removed TaskID: ${extractedTaskID}`)
                break;
            case Action.DONE_TASK:
                const targetingTask = await inquirer.prompt({
                    type:"input",
                    name: 'task input',
                    message: 'Enter the TaskID: ',

                })
                const targetingTaskID = parseInt(targetingTask['task input'])
                if(typeof targetingTaskID !== 'number' || isNaN(targetingTaskID)) {console.log(`Not a valid number`); continue}
                const isSetTaskDoneOperationSuccess = await setTaskDone(targetingTaskID)
                if(!isSetTaskDoneOperationSuccess){console.log("Having problem setting the task as done") ; continue}
                console.log(`Successfully set TaskID: ${targetingTaskID} as done`)
                break;
            case Action.EXIT:
                process.exit(0)
                break;
            default:
                break;
        }
    }
    
})()
