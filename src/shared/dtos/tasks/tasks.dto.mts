import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { ITask } from "../../interfaces/tasks.interface.mjs";
import { Expose, Transform } from "class-transformer";
import { CREATED_AT_FIELD, DEADLINE_FIELD, DONE_AT_FIELD, ID_FIELD, IS_DONE_FIELD, NAME_FIELD } from "../../constants/variables.mjs";

export class Task{
    constructor(raw?: ITask){
        if(!raw) return //if being initiated from devious way
        Object.assign(this,raw)
    }

    @Expose({name:ID_FIELD})
    @IsNumber()
    public id: number;

    @Expose({name:NAME_FIELD})
    @IsString()
    public name: string;

    @Expose({name:IS_DONE_FIELD})
    @IsBoolean()
    @Transform((num) => Boolean(num.value))
    public isDone: boolean;

    @Expose({name:CREATED_AT_FIELD})
    @IsDate()
    @Transform((data) => data.value && new Date(data.value))
    public createdAt: Date;

    @Expose({name: DONE_AT_FIELD})
    @IsDate()
    @Transform((data) => data.value && new Date(data.value))
    public doneAt: Date;

    @Expose({name:DEADLINE_FIELD})
    @IsDate()
    @Transform((data) => data.value && new Date(data.value))
    public deadLine: Date;
}