import express from "express";
import { Register,Login,logout,generaotp,googleAuthSignIn,verifyotp,resetpassword,finduserbyemail,createResetSession,getuser,updateuser,deleateuser,getuserbyid,finduser,userbyid} from "../controllers/adminauth.js";
import { auth,authorizemanager} from "../middleware/auth.js";
import { updateProfile,deleteProfile } from "../controllers/customer.js";

const router=express.Router();
router.post("/signup", Register, async (req, res, next) => {
    // After registering, move to OTP generation
    try {
        await generaotp(req, res);
        // await verifyotp(req,res);
    } catch (error) {
        next(error);
    }
});
router.post("/login",Login);
router.post("/logout",logout);
router.post("/google",googleAuthSignIn);
router.get("/findbyemail",finduserbyemail);
router.get("/generateotp",generaotp);
router.post("/verifyotp",verifyotp);
router.get("/createresetsession",createResetSession);
router.get("/user/:id",finduser);
router.patch("/user/:id",[authorizemanager],updateProfile);
router.delete("/user/:id",[authorizemanager],deleteProfile);
router.get("/user",getuser);
router.get("/users/:id",userbyid);
// router.get("/user/:id",[authorizemanager],getuserbyid);

// router.get("/updateprofile",auth,update);
router.put("/forgotpassword",resetpassword);
export default router;




