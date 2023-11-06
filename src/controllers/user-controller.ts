import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

// import from errors
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const prisma = new PrismaClient()

// get connection from prisma
export const getUser = async (req: Request, res: Response) => {
    try {
        const response = await prisma.user.findMany();
        res.status(200).json(response)
    } catch {
        throw new DatabaseConnectionError;
    }
}

// create a new users
export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
                device: true
            }
        })

        if (user) return res.status(200).json({ 'pesan': 'email sudah terdaftar' })

        const response = await prisma.user.create({
            data: {
                name,
                email
            },
            include: {
                device: true
            }
        })

        const data = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return res.status(200).json(data)


    } catch (error) {
        throw new NotAuthorizedError;
    }
}

// get user by id
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await prisma.user.findUnique({
            where: { id: id }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: 'Not Found' });
    }
}

// update user by id
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body

    try {
        const response = await prisma.user.update({
            where: { id: id },
            data: { name, email }
        })
        res.status(201).json({ msg: "User Updated" })
    } catch (error) {
        throw new NotAuthorizedError;
    }
}

// delete user by id 
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        await prisma.device.deleteMany({
            where: {
                authorId: id,
            }
        })

        await prisma.user.delete({
            where: { id: id },
            include: {
                device: true
            }
        })

        res.status(201).json({ msg: "User Deleted" })
    } catch (error) {
        throw new NotAuthorizedError;
    }
}