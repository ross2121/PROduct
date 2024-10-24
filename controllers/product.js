import { PrismaClient } from "@prisma/client";
import badrequest from "../errors/badrequest.js";
import notfound from "../errors/notfound.js";
import { StatusCodes } from "http-status-codes";
// import badrequest from "../errors/badrequest.js";
const prisma=new PrismaClient();
export const createproduct=async(req,res)=>{
    const{name,SKU,description, price,stock,CreatedBY}=req.body;
    // console.log("dsdsa");
    // req.body.Agent=Admin._id;
    // const user=await User.findById(req.user.id);
    if(!name||!SKU||!description||!price||!stock){
        throw new badrequest("Please provode  all values");
    }
    let PREVSTOCK=0;
    const prev_stock=await prisma.product.findFirst({
        where:{
            name:name
        }
    })
    const product=await prisma.product.create({
        data:{
            name,
            SKU,
            description,
            price,
            stock,
            CreatedBY,
        }
    });
    
    if(prev_stock){
        PREVSTOCK=prev_stock.stock;
    }
    const Stock=await prisma.stock.create({
        data:{
            previousQuantity:PREVSTOCK,
            newQuantity:stock,
            productId:product.id
        }
    })
    res.status(StatusCodes.CREATED).json({product,Stock});
};
export const updateproduct = async (req, res) => {
    const { id: productid } = req.params; 
    const{name,SKU,description, price,stock}=req.body;
     const Productid=parseInt(productid,10);
    if (!name || !SKU||!description||!price||!stock) {
        throw new badrequest('Please provide all values');
    }
    let PREVSTOCK=0;
    const prev_stock=await prisma.product.findFirst({
        where:{
            name:name
        }
    })
    if(prev_stock){
        PREVSTOCK=prev_stock.stock;
    }
     const  product = await prisma.product.findUnique({
        where:{
            id:Productid
        }
    })
    if (!product) {
        throw new NotFoundError(`No  product with id: ${productid}`);
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
    const Stock=await prisma.stock.create({
        data:{
            previousQuantity:PREVSTOCK,
            newQuantity:stock,
            productId:product.id
        }
    })
    
    res.status(StatusCodes.OK).json({ updatedproduct,Stock });
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
        throw new notfound("No  product is found");
    }
       const deleteproduct=await  prisma.product.delete({
        where:{
            id:Productid
        }
       })
     res.status(StatusCodes.OK).json({deleteproduct});
    
}
export const random=async(req,res)=>{
       const property=await  product.aggregate([{$sample:{size:40}}]).populate("Agent","name image").populate("property");
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
export const getProductsByEmail = async (req, res, next) => {
        // const  {email } = req.body;
        // const product=await prisma.product.findMany();
        // return res.status(200).json(product);
       
        const { email:email } = req.params;

// Use findMany when searching for multiple products by CreatedBY (email)
const products = await prisma.product.findMany({
  where: {
    CreatedBY: email,
  },
});

// Handle cases where no products are found
if (products.length === 0) {
  return res.status(404).json({ message: "No products found for this user" });
}

res.status(200).json(products);
        // res.status(200).json(products);

};
  
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


