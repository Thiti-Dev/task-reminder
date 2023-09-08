import inquirer from 'inquirer'
import Table from 'cli-table'
import { IPromptAnswer } from './shared/interfaces/inquirer.interface.mjs'
import {Action} from './shared/enums/common.mjs'
import {init} from './db/init.mjs'
import { addTask, removeTask, viewTask } from './db/tasks.mjs'

(async() => {
    // database initialization
    await init()


    while(true){
        const answer:IPromptAnswer = await inquirer.prompt({
            type:"list",
            name: 'selectedOption',
            message: 'Actions pane: ',
            choices: [Action.LIST_TASK,Action.ADD_TASK,Action.REMOVE_TASK,Action.EXIT],
        })
    
        const {selectedOption} = answer
    
        switch (selectedOption) {
            case Action.LIST_TASK:
                console.clear()
                const tasks = await viewTask()
                const table = new Table({
                    head: ['ID','NAME','DEADLINE'],
                    //colWidths:[25,25]
                })

                tasks.forEach((data) => {
                    table.push([data.id.toString(), data.name, data.deadLine ? data.deadLine.toLocaleString().toString() : 'NDL'])
                })
                console.log(table.toString());
                console.log("\n")

                break;
            case Action.ADD_TASK:
                const task = await inquirer.prompt({
                    type:"input",
                    name: 'task input',
                    message: 'Enter the task name: ',
                })
                const name = task['task input']
                const [success,taskID] = await addTask(name)
                if(!success) return console.log("Having problem adding the task to list")
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
                if(!taskRemoval) return console.log(`Having problem removing TaskID: ${extractedTaskID}`)
                console.log(`Successfully removed TaskID: ${extractedTaskID}`)
                break;
            case Action.EXIT:
                process.exit(0)
                break;
            default:
                break;
        }
    }
    
})()
