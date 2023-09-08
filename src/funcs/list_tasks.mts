import Table from "cli-table";
import { viewTask } from "../db/tasks.mjs";

export async function listTasks(showFinishedTask:boolean){
    console.clear()
    const tasks = await viewTask(showFinishedTask)
    const table = new Table({
        head: ['ID','NAME','DEADLINE'],
        //colWidths:[25,25]
    })

    tasks.forEach((data) => {
        table.push([data.id.toString(), data.name, data.deadLine ? data.deadLine.toLocaleString().toString() : 'NDL'])
    })
    console.log(table.toString());
    console.log("\n")
}