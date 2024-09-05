'use client';
import { getUsers, updateUser, deleteUser } from '@/lib/user';
import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';

interface User {
  id: number;
  provinsi: string;
  nama: string;
  kota: string;
  kecamatan: string;
  alamat: string;
}

export default function ListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editUserData, setEditUserData] = useState<Partial<User>>({});

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const fetchData = async () => {
    try {
      const response = await getUsers();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data.data); // Adjust this according to your API response structure
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setEditUserData(user);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (editingUserId !== null) {
      try {
        await updateUser(editingUserId, editUserData);

        // After saving, reset the editing state and refresh data
        setEditingUserId(null);
        await fetchData(); // Refresh the user data
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);

      // Remove the user from the state and refresh data
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="table-container h-screen">
      <table className="table">
        <caption>User List</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Provinsi</th>
            <th>Kota</th>
            <th>Kecamatan</th>
            <th>Alamat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nama}</td>
                <td>{user.provinsi}</td>
                <td>{user.kota}</td>
                <td>{user.kecamatan}</td>
                <td>{user.alamat}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(user)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      {editingUserId !== null && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <input
            type="text"
            name="nama"
            value={editUserData.nama || ''}
            onChange={handleInputChange}
            placeholder="Nama"
          />
          <input
            type="text"
            name="provinsi"
            value={editUserData.provinsi || ''}
            onChange={handleInputChange}
            placeholder="Provinsi"
          />
          <input
            type="text"
            name="kota"
            value={editUserData.kota || ''}
            onChange={handleInputChange}
            placeholder="Kota"
          />
          <input
            type="text"
            name="kecamatan"
            value={editUserData.kecamatan || ''}
            onChange={handleInputChange}
            placeholder="Kecamatan"
          />
          <input
            type="text"
            name="alamat"
            value={editUserData.alamat || ''}
            onChange={handleInputChange}
            placeholder="Alamat"
          />
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={() => setEditingUserId(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
