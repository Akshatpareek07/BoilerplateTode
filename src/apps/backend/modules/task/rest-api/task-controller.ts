import {
  NextFunction, Request, Response,
} from 'express';

import TaskService from '../task-service';
import {
  Task,
  CreateTaskParams,
  GetAllTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  UpdateTaskParams,
  UpdateTaskStatusParams,
} from '../types';

export default class TaskController {
  public static async createTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: CreateTaskParams = {
        accountId: req.params.accountId,
        name: req.body.name as string,
      };
      const task: Task = await TaskService.createTask(params);
      res.status(201).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }

  public static async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: DeleteTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
        active: true
      };

      await TaskService.deleteTask(params);
      res.status(204).send({message:"Deleted Successfully"});
    } catch (e) {
      next(e);
    }
  }

  public static async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise <void> {
    try {
      const page = +req.query.page;
      const size = +req.query.size;
      const params: GetAllTaskParams = {
        accountId: req.params.accountId,
        page,
        size,
      };
      const tasks = await TaskService.getTasksForAccount(params);
      res.status(200).send(tasks.map((task) => TaskController.serializeTaskAsJSON(task)));
    } catch (e) {
      next(e);
    }
  }

  public static async getTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: GetTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
      };
      const task = await TaskService.getTaskForAccount(params);
      res.status(200).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }

  public static async updateTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {

    try {
      const params: UpdateTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
        description:req.body.description
      };
      const task = await TaskService.updateTasksForIdAndAccount(params);
      res.status(200).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }
  public static async updateTaskStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {

    try {
      const params: UpdateTaskStatusParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
        isComplete:req.body.isComplete
      };
      const task = await TaskService.updateTasksStatusForIdAndAccount(params);
      res.status(200).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }
  

  private static serializeTaskAsJSON(task: Task): unknown {
    return {
      id: task.id,
      account: task.account,
      name: task.name,
      isComplete:task.isComplete,
      active:task.active
    };
  }
}
