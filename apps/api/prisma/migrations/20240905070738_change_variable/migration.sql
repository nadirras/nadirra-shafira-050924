/*
  Warnings:

  - You are about to alter the column `kota` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `kecamatan` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to drop the `samples` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `kota` INTEGER NOT NULL,
    MODIFY `kecamatan` INTEGER NOT NULL;

-- DropTable
DROP TABLE `samples`;
