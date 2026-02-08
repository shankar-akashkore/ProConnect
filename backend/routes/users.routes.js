import { Router } from "express";
import { login, register, uploadProfilePicture, updateUserProfile, getUserAndProfile} from "../controllers/user.controller.js";
import multer from "multer";
// import { uploadProfilePicture } from "../controllers/profile.controller.js";


const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})


const upload = multer({ storage: storage })

router.route('/update_profile_picture').post(upload.single('profile_picture'), uploadProfilePicture);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user_update').post(updateUserProfile);
router.route('/get_user_and_profile').get(getUserAndProfile);

export default router;
