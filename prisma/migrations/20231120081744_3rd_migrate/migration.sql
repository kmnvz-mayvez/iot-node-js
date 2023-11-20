/*
  Warnings:

  - You are about to drop the column `value` on the `device` table. All the data in the column will be lost.
  - Added the required column `category` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value_boolean` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value_number` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value_string` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `device` DROP COLUMN `value`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `value_boolean` BOOLEAN NOT NULL,
    ADD COLUMN `value_number` INTEGER NOT NULL,
    ADD COLUMN `value_string` VARCHAR(191) NOT NULL;
