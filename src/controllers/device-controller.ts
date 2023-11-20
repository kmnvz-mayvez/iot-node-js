import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

// import from errors
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const prisma = new PrismaClient()

export const getDevice = async (req: Request, res: Response) => {
    try {
        const response = await prisma.device.findMany()
        res.status(200).json(response)
    } catch (error) {
        throw new DatabaseConnectionError;
    }
}

export const createDevice = async (req: Request, res: Response) => {
    const { title, description, category, authorEmail, value_string, value_number, value_boolean } = req.body;
    try {
        const author = await prisma.user.findUnique({
            where: { email: authorEmail }
        });

        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        await prisma.device.create({
            data: {
                title,
                description,
                category,
                value_number,
                value_boolean,
                value_string,
                author: {
                    connect: {
                        id: author.id
                    }
                }
            }
        });
        res.status(201).json({ msg: "Device Created" });
    } catch (error) {
        throw new NotAuthorizedError;
    }
}

export const getDeviceById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const response = await prisma.device.findUnique({
            where: { id: id }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: 'not found' });
    }
}

export const updateDevice = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, category, description, value_string, value_number, value_boolean } = req.body
    try {
        const response = await prisma.device.update({
            where: { id: id },
            data: {
                title,
                description,
                category,
                value_number,
                value_boolean,
                value_string,
            }
        })
        res.status(201).json(response)
    } catch (error) {
        throw new NotAuthorizedError;
    }
}

export const deleteDevice = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const response = await prisma.device.delete({
            where: { id: id }
        })
        res.status(201).json({ msg: "Device Deleted" })
    } catch (error) {
        throw new NotAuthorizedError;
    }
}