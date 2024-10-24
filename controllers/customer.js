// import bcrypt from 'bcryptjs'; // For password hashing
// import { StatusCodes } from 'http-status-codes';
// import { PrismaClient } from '@prisma/client'; // Assuming you have a Prisma client instance
// import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors'; // Assuming you have custom error classes
// const prisma=new PrismaClient();
// export const updateProfile = async (req, res) => {
//     const { id: userId } = req.params;
//     const { name, email, password } = req.body;
//     const authenticatedUserId = req.user.id;
//     if (userId !== authenticatedUserId) {
//         throw new UnauthorizedError('You can only update your own profile');
//     }
//     if (!name || !email) {
//         throw new BadRequestError('Please provide all required values');
//     }
//     const user = await prisma.inventoryManager.findUnique({ 
//         where: { id: userId }
//     });
//     if (!user) {
//         throw new NotFoundError(`No user found with id: ${userId}`);
//     }
//     if (email !== user.email) {
//         const emailExists = await prisma.inventoryManager.findUnique({
//             where: { email }
//         });
//         if (emailExists) {
//             throw new BadRequestError('This email is already in use by another user');
//         }
//     }
//     let hashedPassword;
//     if (password) {
//         const salt = await bcrypt.genSalt(10);
//         hashedPassword = await bcrypt.hash(password, salt);
//     }
//     const updatedUser = await prisma.inventoryManager.update({
//         where: {
//             id: userId,
//         },
//         data: {
//             name,
//             email,
//             ...(password && { password: hashedPassword }), // Update password only if provided
//         },
//     });

//     // 7. Send the response with the updated user (excluding the password)
//     const { password: _, ...userWithoutPassword } = updatedUser; // Remove password from response
//     res.status(StatusCodes.OK).json({ user: userWithoutPassword });
// };

// export const deleteProfile = async (req, res) => {
//     const { id: userId } = req.params; 
//     const authenticatedUserId = req.user.id; 
//     if (userId !== authenticatedUserId) {
//         throw new UnauthorizedError('You can only delete your own profile');
//     }
//     const user = await prisma.inventoryManager.delete({
//         where:{
//             id:userId
//         }
//     })

//     if (!user) {
//         throw new NotFoundError(`No user found with id: ${userId}`);
//     }

//     res.status(StatusCodes.NO_CONTENT).send();
// };

