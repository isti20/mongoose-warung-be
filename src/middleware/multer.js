import multer from "multer";
import path from "path";
import messages from "../utils/messages.js";

// multer
const Upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        // image
        let ext = path.extname(file.originalname);

        if (![".jpg", ".jpeg", ".png"].includes(ext)) {
            cb(
                { message: "Extension image must be jpg/jpeg/png", code: "wrongtype"},
                false
            );
            return;
        };

        cb(null, true);
    },
});

// middleware
const uploadImg = (req, res, next) => {
    const upload = Upload.single("product_img");

    upload(req, res, (err) => {
        if (err) {
            const { message, code } = err;
            if (code === "wrongtype") {
                messages(res, 400, message);
            } else {
                messages(res, 500, "Something wrong when upload image", err);
            }
        } else {
            next();
        }
    });
};

export default uploadImg;