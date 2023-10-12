import { NextFunction, Request, Response } from 'express';

import AccountService from '../account-service';
import { Account, CreateAccountParams, AccountSearchParams } from '../types';

export default class AccountController {
  public static async createAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, password }: CreateAccountParams = req.body as CreateAccountParams;
      const params: CreateAccountParams = { username, password };
      const account = await AccountService.createAccount(params);
      res.status(201).send(AccountController.serializeAccountAsJSON(account));
    } catch (e) {
      next(e);
    }

  }

  public static async loginAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, password }: AccountSearchParams = req.body as AccountSearchParams;
      const params: AccountSearchParams = { username, password };
      const account=await AccountService.getAccountByUsernamePassword(params);
      
      res.status(201).send({...account,message:"Login Successfull"});
    } catch (e) {
      next(e);
    }
  }

  private static serializeAccountAsJSON(account: Account): unknown {
    return {
      id: account.id,
      username: account.username,
    };
  }
}
