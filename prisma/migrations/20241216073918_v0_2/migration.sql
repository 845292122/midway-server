/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tenant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Permission` DROP FOREIGN KEY `Permission_tenantId_fkey`;

-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_tenantId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_tenantId_fkey`;

-- DropTable
DROP TABLE `Permission`;

-- DropTable
DROP TABLE `Role`;

-- DropTable
DROP TABLE `Tenant`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `tenant` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `contact` VARCHAR(30) NULL,
    `phone` VARCHAR(20) NULL,
    `company` VARCHAR(50) NULL,
    `licenseNumber` VARCHAR(50) NULL,
    `address` VARCHAR(255) NULL,
    `remark` TEXT NULL,
    `isTrial` TINYINT NULL DEFAULT 1,
    `trialStartDate` DATETIME NULL DEFAULT NOW(),
    `trialEndDate` DATETIME NULL DEFAULT NOW(),
    `startDate` DATETIME NULL,
    `endDate` DATETIME NULL,
    `accountCount` TINYINT NULL DEFAULT 5,
    `status` INTEGER NULL DEFAULT 1,
    `delFlag` TINYINT NOT NULL DEFAULT 0,
    `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
    `updatedAt` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    INDEX `tenant_name_company_delFlag_idx`(`name`, `company`, `delFlag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tenantId` INTEGER UNSIGNED NULL,
    `name` VARCHAR(100) NULL,
    `status` INTEGER NULL DEFAULT 1,
    `delFlag` TINYINT NOT NULL DEFAULT 0,
    `createBy` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
    `updatedAt` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    INDEX `role_tenantId_name_status_delFlag_idx`(`tenantId`, `name`, `status`, `delFlag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER UNSIGNED NULL,
    `tenantId` INTEGER UNSIGNED NULL,
    `permission` VARCHAR(255) NULL,
    `status` INTEGER NULL DEFAULT 1,
    `delFlag` TINYINT NOT NULL DEFAULT 0,
    `createBy` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
    `updatedAt` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    INDEX `permission_parentId_tenantId_permission_idx`(`parentId`, `tenantId`, `permission`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tenantId` INTEGER UNSIGNED NULL,
    `roleId` INTEGER UNSIGNED NULL,
    `name` VARCHAR(50) NULL,
    `phone` VARCHAR(30) NULL,
    `password` VARCHAR(255) NULL,
    `status` INTEGER NULL DEFAULT 1,
    `delFlag` TINYINT NOT NULL DEFAULT 0,
    `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
    `updatedAt` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    INDEX `user_tenantId_roleId_name_phone_idx`(`tenantId`, `roleId`, `name`, `phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `oper_log` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tenantId` INTEGER UNSIGNED NULL,
    `type` INTEGER NULL DEFAULT 0,
    `method` VARCHAR(191) NULL,
    `operName` VARCHAR(191) NULL,
    `operParam` TEXT NULL,
    `operResult` TEXT NULL,
    `status` TINYINT NULL,
    `errorMsg` TEXT NULL,
    `operTime` TIMESTAMP NOT NULL DEFAULT NOW(),
    `costTime` BIGINT UNSIGNED NOT NULL,

    INDEX `oper_log_tenantId_type_operName_idx`(`tenantId`, `type`, `operName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `role` ADD CONSTRAINT `role_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `permission_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oper_log` ADD CONSTRAINT `oper_log_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
