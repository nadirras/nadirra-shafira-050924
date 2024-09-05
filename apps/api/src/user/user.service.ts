import { PrismaClient, User } from '@prisma/client';
import {
  CreateUserRequest,
  SearchUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../model/user.model';
import { WebResponse } from '@/model/web.model';

const prisma = new PrismaClient();

class UserService {
  private toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      provinsi: user.provinsi,
      nama: user.nama,
      kota: user.kota,
      kecamatan: user.kecamatan,
      alamat: user.alamat,
    };
  }

  async checkUserMustExistById(userId: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(request: CreateUserRequest): Promise<UserResponse> {
    console.log('Request:', request);
    const totalUserWithSameUsername = await prisma.user.count({
      where: {
        nama: request.nama,
      },
    });

    if (totalUserWithSameUsername !== 0) {
      throw new Error('User already exists');
    }

    const user = await prisma.user.create({
      data: {
        nama: request.nama,
        provinsi: request.provinsi,
        kota: request.kota,
        kecamatan: request.kecamatan,
        alamat: request.alamat,
      },
    });

    return this.toUserResponse(user);
  }

  async get(): Promise<UserResponse[]> {
    const users = await prisma.user.findMany();
    return users.map((user) => this.toUserResponse(user));
  }

  async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    const updateData: Partial<User> = {};

    if (request.nama) {
      updateData.nama = request.nama;
    }

    if (request.provinsi) {
      updateData.provinsi = request.provinsi;
    }

    if (request.kota) {
      updateData.kota = request.kota;
    }

    if (request.kecamatan) {
      updateData.kecamatan = request.kecamatan;
    }

    if (request.alamat) {
      updateData.alamat = request.alamat;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: updateData,
    });

    return this.toUserResponse(updatedUser);
  }

  async remove(userId: number): Promise<UserResponse> {
    await this.checkUserMustExistById(userId);
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return this.toUserResponse(deletedUser);
  }

  async search(
    user: User,
    request: SearchUserRequest,
  ): Promise<WebResponse<UserResponse[]>> {
    const filters: any[] = [];

    if (request.nama) {
      filters.push({
        nama: {
          contains: request.nama,
        },
      });
    }

    if (request.provinsi) {
      filters.push({
        provinsi: request.provinsi,
      });
    }

    if (request.kota) {
      filters.push({
        kota: request.kota,
      });
    }

    if (request.kecamatan) {
      filters.push({
        kecamatan: request.kecamatan,
      });
    }

    const skip = (request.page - 1) * request.size;

    const users = await prisma.user.findMany({
      where: {
        id: user.id,
        AND: filters,
      },
      take: request.size,
      skip,
    });

    const total = await prisma.user.count({
      where: {
        id: user.id,
        AND: filters,
      },
    });

    return {
      data: users.map((user) => this.toUserResponse(user)),
      paging: {
        current_page: request.page,
        size: request.size,
        total_page: Math.ceil(total / request.size),
      },
    };
  }
}

export default UserService;
