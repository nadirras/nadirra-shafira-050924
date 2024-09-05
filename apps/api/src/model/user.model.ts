export interface UserResponse {
  id: number;
  nama: string;
  provinsi?: string;
  kota?: string;
  kecamatan?: string;
  alamat?: string;
}

export interface CreateUserRequest {
  nama: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  alamat: string;
}

export interface UpdateUserRequest {
  id: number;
  nama?: string;
  provinsi?: string;
  kota?: string;
  kecamatan?: string;
  alamat?: string;
}

export interface SearchUserRequest {
  nama?: string;
  provinsi?: string;
  kota?: string;
  kecamatan?: string;
  alamat?: string;
  page: number;
  size: number;
}
