
import express, { request, response } from "express"; 
import jwt from 'jsonwebtoken'; 
import { register, login, getUsers } from "../controller/authController.js";

const routes = express.Router(); 

const authMiddleware = (request, response, next) => { 
    const authHeader = request.headers.authorization; 
    if (!authHeader) return 
    response.status(401).json({ error: 'Token não enviado' }); 

    const token = authHeader.split('  ') 
    [1]; 
    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        request.user = decoded; 
        next(); 
         } catch { 
            response.status(401).json({error: 'Token inválido' }); 
         }
    }; 

    routes.post('/register', register); 
    routes.post('/login', login); 
    routes.get('/users', authMiddleware, getUsers); 

    export default routes; 