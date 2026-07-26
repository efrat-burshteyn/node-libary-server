import {Router} from "express";
import { schemas } from "../Middlewares/schema.js";
import { bookSchema } from "../schema.js";
import { Client, getAllBooks ,getOneBook ,postBook, updateBook ,borrowBook,getBooksByCategory, returnBook ,deleteBook}
from "../controllers/book.controllers.js";
const router =Router();
 
router.get('/welcome',Client);

router.get('/',getAllBooks);

router.get('/:id', getOneBook);

router.post('/',schemas(bookSchema),postBook);

router.patch('/:id',schemas(bookSchema), updateBook);

router.patch('/:id/borrow/:userId', borrowBook);

router.get('/category/:category', getBooksByCategory);

router.patch('/:id/return/:userId',returnBook);

router.delete('/:id',schemas(bookSchema),deleteBook);

export default router;