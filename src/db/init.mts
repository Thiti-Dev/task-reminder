import sqlite3 from 'sqlite3'


const dbFileName = 'task_reminder.db'

const dbInstance = new sqlite3.Database(dbFileName)

function init(){
    return new Promise((resolve,reject) => { 
        dbInstance.serialize(() => {
            console.log("Initializing the sqlite3")

            dbInstance.get("SELECT name FROM sqlite_master WHERE type='table' AND name='task_lists'", (err,row) => {
                if(err){
                    reject('Error checking for table: ' + err.message)
                }

                if(!row){
                    //create the table
                    dbInstance.run(`
                    CREATE TABLE task_lists (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name varchar(255),
                        is_done INTEGER CHECK (is_done IN (0, 1)),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        done_at TIMESTAMP,
                        deadline DATE
                      );
                    `, (err) => {
                        if(err){
                            reject('Error creating table: '+err.message)
                        }else{
                            console.log('task_lists table successfully created')
                            resolve(true);

                        }

                    })
                }else{
                    console.log("Tables loaded")
                    resolve(true);
                }
            })

        })
     })
}




export {
    dbInstance,
    init
}