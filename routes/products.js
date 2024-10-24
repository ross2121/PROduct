import express from "express";
import {auth,Adminauthorization} from "../middleware/auth.js";
import {createproduct,deleteproduct,updateproduct,getallproduct,getproductbyId,emailid,getProductsByEmail,getalluser,product

} from "../controllers/product.js";
const router=express.Router();
router.post('/product',[auth],createproduct);
router.patch('/product/:id',auth,updateproduct);
router.delete('/product/:id',auth,deleteproduct);
router.get('/product',getallproduct);
router.get('/product/:id',getproductbyId);
router.get('/user/:id',emailid);
// router.get('/product/user',getProductsByEmail);
router.get('/pri/:email',getProductsByEmail);
router.get('/users',[auth,Adminauthorization],getalluser);
router.get('/products/:id',[auth],product);
export default router;
