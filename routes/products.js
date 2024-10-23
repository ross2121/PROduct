import express from "express";
import {auth,Adminauthorization} from "../middleware/auth.js";
import {createproduct,deleteproduct,updateproduct,getallproduct,getproductbyId} from "../controllers/product.js";
const router=express.Router();
router.post('/product',[auth,Adminauthorization],createproduct);
router.patch('/product/:id',auth,updateproduct);
router.delete('/product/:id',auth,deleteproduct);
router.get('/product',getallproduct);
router.get('/product/:id',getproductbyId);

export default router;
