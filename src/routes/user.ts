import express from "express"
import { getUser, getUserById, createUser, deleteUser, updateUser  } from "../controllers/user-controller"

const router = express.Router()

router.get('/user', getUser)
router.get('/user/:id', getUserById)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export { router as userRouter };