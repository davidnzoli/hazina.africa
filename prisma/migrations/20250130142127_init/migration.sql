-- CreateTable
CREATE TABLE `personels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `postnom` VARCHAR(191) NOT NULL,
    `email_adress` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `sexe` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `poste` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `personels_email_adress_key`(`email_adress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
