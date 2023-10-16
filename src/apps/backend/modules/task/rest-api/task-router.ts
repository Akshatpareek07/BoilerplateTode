import { Router } from 'express';

import AccountAuthMiddleware from '../../access-token/rest-api/account-auth-middleware';

import TaskController from './task-controller';

export default class TaskRouter {
  public static getRoutes(): Router {
    const router = Router({ mergeParams: true });
    // console.log("routs");

    router.post('/', AccountAuthMiddleware.ensureAccess, TaskController.createTask);
    router.get('/', AccountAuthMiddleware.ensureAccess, TaskController.getAllTasks);
    router.get('/:id', AccountAuthMiddleware.ensureAccess, TaskController.getTask);
    router.delete('/:id', AccountAuthMiddleware.ensureAccess, TaskController.deleteTask);
    router.patch('/:id',AccountAuthMiddleware.ensureAccess, TaskController.updateTask);
    router.patch('/status/:id',AccountAuthMiddleware.ensureAccess, TaskController.updateTaskStatus);
    
    return router;
  }
}
