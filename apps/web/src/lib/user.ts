import { FormFieldData } from '@/app/type/form.type';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// export const postUsers = async (data: FormFieldData) => {
//   const response = await axios.post(
//     `${API_URL}/users`,
//     { data },
//     {
//       withCredentials: true,
//     },
//   );
//   return response.data;
// };

export const postUsers = async (data: FormFieldData) => {
  const response = await fetch('http://localhost:8000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
  }

  return response;
};

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
  }

  return response;
};

export async function updateUser(userId: number, userData: any) {
  return fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
}

export async function deleteUser(userId: number) {
  return fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
  });
}
