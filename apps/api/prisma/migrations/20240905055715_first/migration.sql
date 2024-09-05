-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(256) NOT NULL,
    `kota` VARCHAR(100) NOT NULL,
    `kecamatan` VARCHAR(100) NOT NULL,
    `alamat` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
