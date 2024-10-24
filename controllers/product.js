import { PrismaClient } from "@prisma/client";
import badrequest from "../errors/badrequest.js";
import notfound from "../errors/notfound.js";
import { StatusCodes } from "http-status-codes";
// import badrequest from "../errors/badrequest.js";
const prisma=new PrismaClient();
export const createproduct=async(req,res)=>{
    const{name,SKU,description, price,stock,Created}=req.body;
    // console.log("dsdsa");
    // req.body.Agent=Admin._id;
    // const user=await User.findById(req.user.id);
    if(!name||!SKU||!description||!price||!stock){
        throw new badrequest("Please provode  all values");
    }
    const product=await prisma.product.create({
        data:{
            name,
            SKU,
            description,
            price,
            stock,
            Created
        }
    });
    console.log("dasd");
    res.status(StatusCodes.CREATED).json({product});
};
export const updateproduct = async (req, res) => {
    const { id: productid } = req.params; 
    const{name,SKU,description, price,stock}=req.body;
     const Productid=parseInt(productid,10);
    if (!name || !SKU||!description||!price||!stock) {
        throw new badrequest('Please provide all values');
    }

    const cinema = await prisma.product.findUnique({
        where:{
            id:Productid
        }
    })
    
    if (!cinema) {
        throw new NotFoundError(`No cinema with id: ${productid}`);
    }
    const updatedproduct = await  prisma.product.update(
       {
        where:{
            id:Productid
        },data:{
           name,
           SKU,
           stock,
           price,
           description
        }
       }
        
    );

    res.status(StatusCodes.OK).json({ updatedproduct });
};

export const deleteproduct=async(req,res)=>{
     const {id:productid}=req.params;
     const Productid=parseInt(productid,10);
    const product=await prisma.product.findUnique({
        where:{
            id:Productid
        },
    })
    if(!product){
        throw new notfound("No Cinema is found");
    }
       const deleteproduct=await  prisma.product.delete({
        where:{
            id:Productid
        }
       })
     res.status(StatusCodes.OK).json({deleteproduct});
    
}
export const random=async(req,res)=>{
       const property=await Cinema.aggregate([{$sample:{size:40}}]).populate("Agent","name image").populate("property");
        res.status(200).json({property});
}


export const getallproduct=async(req,res,next)=>{
    try{
         const product=await prisma.product.findMany();
         return res.status(200).json(product);
    }catch(err){
        next(err);
    }
};
export const getproductbyId=async(req,res,next)=>{
    try {
        const {id:productid}=req.params;
        const Product=parseInt(productid,10);
        const product=await prisma.product.findUnique({
            where:{
                id:Product
            }
        })
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
}
export const emailid=async(req,res,next)=>{
    const {id:userid}=req.params
    const id = parseInt(userid, 10);
try {
  const inventoryManager = await prisma.inventoryManager.findUnique({
    where: {
      id: id
    }
  });
  if (inventoryManager) {
    return res.status(200).json(inventoryManager.email); 
  }
  const adminUser = await prisma.admin.findUnique({
    where: {
      id: id
    }
  });
  if (adminUser) {
    return res.status(200).json(adminUser.email); 
  }
  return res.status(404).json({ message: 'User not found' });

} catch (error) {
  return res.status(500).json({ message: 'Server error', error: error.message });
}

}


