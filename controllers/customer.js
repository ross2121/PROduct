import bcrypt from 'bcryptjs'; // For password hashing
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client'; 
import badrequest from "../errors/badrequest.js";
import notfound from "../errors/notfound.js";
import unauthonticated from "../errors/unauthinticated.js"
const prisma=new PrismaClient();
export const updateProfile = async (req, res) => {
    const { id: userId } = req.params;
    const ID=parseInt(userId,10);
    const { name, email, password } = req.body;
    const authenticatedUserId = req.user.id;
    // if (userId !== authenticatedUserId) {
    //     throw new unauthonticated('You can only update your own profile');
    // }
    if (!name || !email) {
        throw new badrequest('Please provide all required values');
    }
    const user = await prisma.inventoryManager.findUnique({ 
        where: { id:ID }
    });
    if (!user) {
        throw new notfound(`No user found with id: ${userId}`);
    }
    if (email !== user.email) {
        const emailExists = await prisma.inventoryManager.findUnique({
            where: { email }
        });
        if (emailExists) {
            throw new badrequest('This email is already in use by another user');
        }
    }
    let hashedPassword;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    }
    const updatedUser = await prisma.inventoryManager.update({
        where: {
            id: ID,
        },
        data: {
            name,
            email,
            ...(password && { password: hashedPassword }), // Update password only if provided
        },
    });
    const { password: _, ...userWithoutPassword } = updatedUser; 
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const deleteProfile = async (req, res) => {
    const { id: userId } = req.params; 
        
    // if (userId !== authenticatedUserId) {
    //     throw new unauthonticated('You can only delete your own profile');
    // }
    const ID=parseInt(userId,10);
    
    const user = await prisma.inventoryManager.findUnique({
        where:{
            id:ID
        }
    })
    
    const product=await prisma.product.findMany({
        where:{
            createdby:user.email
        }
    })
    const stockdelete= await prisma.stock.deleteMany({
        where: { productId:product.id },
      });
    const deleteuser=await prisma.inventoryManager.deleteMany({
        where:{
            id:ID
        }
    })

    if (!user) {
        throw new notfound(`No user found with id: ${userId}`);
    }

    res.status(StatusCodes.NO_CONTENT).json();
};

