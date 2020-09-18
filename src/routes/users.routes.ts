import { Router, response } from 'express'
import CreateUserService from '../services/CreateUserService'

import UpdateUserAvatarService from '../services/UpdateUsersAvatarService'

import multer from 'multer'

import uploadConfig from '../config/upload'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {

        const { name, email, password } = request.body;
        const createUser = new CreateUserService();
        const user = await createUser.execute({
            name, 
            email,
            password,            
        });
        
        return response.json(user)
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),async (request, response) =>{
       // try {
            const updateUserAvatarService = new UpdateUserAvatarService();

            const user = await updateUserAvatarService.execute({
                user_id: request.user.id,
                avatarFileName: request.file.filename,
            })
            
            return response.json(user)
       // }
        //  catch (err){
        //     return response.status(400).json({ error: err.message })
        // }
})

export default usersRouter;