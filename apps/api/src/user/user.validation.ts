import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly CREATE: ZodType = z.object({
    nama: z.string().min(1).max(256),
    provinsi: z.number(),
    kota: z.number(),
    kecamatan: z.number(),
    alamat: z.string().min(1).max(100),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    nama: z.string().min(1).max(256),
    provinsi: z.number().optional(),
    kota: z.number().optional(),
    kecamatan: z.number().optional(),
    alamat: z.string().min(1).max(20).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    nama: z.string().min(1).optional(),
    provinsi: z.number().optional(),
    kota: z.number().optional(),
    kecamatan: z.number().optional(),
    alamat: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
