import { Router, type Request, type Response } from "express";

const router = Router()


router.post('/auth/register', (req: Request, res: Response) =>{
    console.log('User Register API hit')
    res.send('register api')
})


export default router;
