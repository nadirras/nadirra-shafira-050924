import { Request, Response, NextFunction } from 'express';

export type ICallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
