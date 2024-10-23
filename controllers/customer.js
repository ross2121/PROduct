import { StatusCodes } from 'http-status-codes';
// import Customer from '../models/customer.js'; 
import { PrismaClient } from '@prisma/client';
import badrequest from '../errors/badrequest.js'; 
import unauthonticated from '../errors/unauthinticated.js';
import notfound from '../errors/notfound.js';
const prisma=new PrismaClient();
export const updateProfile = async (req, res) => {
    const { id: userId } = req.params;
    const { name, email, password } = req.body; 
    const authenticatedUserId = req.user.id;
    if (userId !== authenticatedUserId) {
        throw new unauthonticated('You can only update your own profile');
    }
    if (!name || !email) {
        throw new badrequest('Please provide all required values');
    }

    const user = await prisma.inventoryManager.findUnique({ where:{
        id:userId
    }
    });

    if (!user) {
        throw new notfound(`No user found with id: ${userId}`);
    }

    // Update the user profile
    const updatedUser = await prisma.inventoryManager.update({
        where:{
            id:userId
        },data:{
            name,
            email,
            password
        }
    })
    res.status(StatusCodes.OK).json({ updatedUser });
};
export const deleteProfile = async (req, res) => {
    const { id: userId } = req.params; 
    const authenticatedUserId = req.user.id; 
    if (userId !== authenticatedUserId) {
        throw new UnauthorizedError('You can only delete your own profile');
    }
    const user = await prisma.inventoryManager.delete({
        where:{
            id:userId
        }
    })

    if (!user) {
        throw new NotFoundError(`No user found with id: ${userId}`);
    }

    res.status(StatusCodes.NO_CONTENT).send();
};

