-- CreateTable
CREATE TABLE `Tenant` (
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

    INDEX `Tenant_name_company_delFlag_idx`(`name`, `company`, `delFlag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tenantId` INTEGER UNSIGNED NULL,
    `name` VARCHAR(100) NULL,
    `status` INTEGER NULL DEFAULT 1,
    `delFlag` TINYINT NOT NULL DEFAULT 0,
    `createBy` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
    `updatedAt` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    INDEX `Role_tenantId_name_status_delFlag_idx`(`tenantId`, `name`, `status`, `delFlag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
