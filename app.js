import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import adminroutes from "./routes/admin.js";
import bodyParser from "body-parser";
import customerroutes from "./routes/customer.js"
import productroute from "./routes/products.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({
}));



app.use(cors({ credentials: true, origin: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
}));

// app.use("/api/screen", screenroute);
app.use("/api/IM", customerroutes);
app.use("/api/product", productroute);
// app.use("/api/movie", movieroute);
app.use("/api/admin", adminroutes);
// app.use("/api/manager", managerroutes);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running at ${port}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};

start();
