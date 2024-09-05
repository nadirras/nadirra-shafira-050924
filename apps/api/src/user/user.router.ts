import { Router } from 'express';
import { UserController } from './user.controller';
import { ValidationService } from '@/common/validation.service';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.userController.create);
    this.router.get('/', this.userController.get);
    this.router.patch('/:userId', this.userController.update);
    this.router.delete('/:userId', this.userController.remove);
    this.router.get('/search', this.userController.search);
  }

  getRouter(): Router {
    return this.router;
  }
}
