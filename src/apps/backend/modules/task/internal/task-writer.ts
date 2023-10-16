import {
  CreateTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  Task,
  TaskWithNameExistsError,
  UpdateTaskParams,
  TaskNotFoundError,
  UpdateTaskStatusParams,
} from '../types';

import TaskRepository from './store/task-repository';
import TaskReader from './task-reader';
import TaskUtil from './task-util';

export default class TaskWriter {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    
    const existingTask = await TaskRepository.taskDB.findOne({
      account: params.accountId,
      name: params.name,
      active: true,
    });

    if (existingTask) {
      throw new TaskWithNameExistsError(params.name);
    }

    const createdTask = await TaskRepository.taskDB.create({
      account: params.accountId,
      name: params.name,
      active: true,
      isComplete:false,
    });

    return TaskUtil.convertTaskDBToTask(createdTask);
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {

    const taskParams: GetTaskParams = {
      accountId: params.accountId,
      taskId: params.taskId,
    };
    
    console.log('delete writer');
    const task = await TaskReader.getTaskForAccount(taskParams);
    if(task.active==='false')
    throw new TaskNotFoundError(params.taskId);
    await TaskRepository.taskDB.findOneAndUpdate(
      {
        _id: task.id,
      },
      {
        $set: {
          active: false,
        },
      },
    );
  }
  public static async updateTasksForIdAndAccount(params:UpdateTaskParams): Promise<Task> {
    
    console.log(params.accountId+params.description+params.taskId);
    const updatedTask=await TaskRepository.taskDB.findOneAndUpdate(
      {
        _id: params.taskId,
        account: params.accountId
      },
      { 
      $set:{
        name:params.description,
      },
    }, 
    {
      new :true
    });
      if(!updatedTask){
        throw new TaskNotFoundError(params.taskId);
      }
      return TaskUtil.convertTaskDBToTask(updatedTask);
    
  }
  public static async updateTasksStatusForIdAndAccount(params:UpdateTaskStatusParams): Promise<Task> {
    
    console.log(params.accountId+params.isComplete+params.taskId);
    const updatedTask=await TaskRepository.taskDB.findOneAndUpdate(
      {
        _id: params.taskId,
        account: params.accountId
      },
      { 
      $set:{
        isComplete:params.isComplete,
      },
    }, 
    {
      new :true
    });
      if(!updatedTask){
        throw new TaskNotFoundError(params.taskId);
      }
      return TaskUtil.convertTaskDBToTask(updatedTask);
    
  }

}
