import { Request, Response, NextFunction } from 'express';
import UserService from './user.service';
import {
  CreateUserRequest,
  SearchUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../model/user.model';
import { WebResponse } from '../model/web.model';
import { User } from '@prisma/client';
import { ValidationService } from '@/common/validation.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: CreateUserRequest = req.body;
      const result = await this.userService.create(request);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.get();
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const updateUserRequest: UpdateUserRequest = req.body;
      const user = await this.userService.checkUserMustExistById(userId);
      const updatedUser = await this.userService.update(
        user,
        updateUserRequest,
      );
      res.status(200).json({ data: updatedUser });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      await this.userService.remove(userId);
      res.status(200).json({ data: true });
    } catch (error) {
      next(error);
    }
  };

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nama, provinsi, kota, kecamatan, alamat, page, size } = req.query;

      const request: SearchUserRequest = {
        nama: nama as string | undefined,
        provinsi: provinsi as any,
        kota: kota as any,
        kecamatan: kecamatan as any,
        alamat: alamat as string | undefined,
        page: page ? parseInt(page as string, 10) : 1,
        size: size ? parseInt(size as string, 10) : 10,
      };

      const dummyUser: User = {
        id: 0,
        nama: '',
        provinsi: '',
        kota: '',
        kecamatan: '',
        alamat: '',
      };

      const result = await this.userService.search(dummyUser, request);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
