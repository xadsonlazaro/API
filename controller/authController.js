import User from "../models/User.js"; 
import bcrypt, { hash } from "bcryptjs"; 
import { request, response } from "express";
import jwt from "jsonwebtoken"; 

export const register = async (request, response) => { 
    const { username, password} =  
    request.body; 
    try { 
        const hashed = await 
        User.create({ username, password: 
            hash });
            response.status(201).json({message: 'Usuário criado com sucesso'});  
    } catch (err) { 
        response.status(400).json({error: 'Erro ao registar Usuário'}); 
    }
}; 

export const login = async (request, response) => { 

    const { username, password} = request.body; 
    try { 
        const user = await 
        User.findOne({ username }); 
        if (!user || !(await 
        bcrypt.compare(password, 
    user.password))) { 
        return 
        response.status(401).json({error:  
            'Credencias inválidas' }); 
    }
    const token = jwt.sign({ 
         id: user._id }, process.env.JWT_SECRET,  
         {expiresIn: '1h' }); 
         response.json({message: 'Login bem-sucedido', token}); 
          } catch (err) { 
            response.status(500).json({error: 'Erro no login' });  
   } 
 }; 

 export const getUsers = async (request, response) => { 
    try { 
        const users = await 
        User.find().select(`-password`); 
        response.json(users); 
         } catch (err) {
            response.status(500).json({error: 'Erro ao buscar usuários'}) 
    }
 }; 