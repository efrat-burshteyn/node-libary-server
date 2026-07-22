import  {Book} from '../models/book.model.js';
import  {User} from '../models/user.model.js';

export const Client=(req, res)=>{
  res.json('Hello Client!!!')
};
export const getAllBooks=async(req, res,next)=>{
  try{
  const {search='',limit=5, page=1}= req.query;
  const query={name: {$regex: search, $options: 'i'}};
  const books=await Book.find(query)
                        .limit(Number(limit))
                        .skip((Number(page)-1)*Number(limit));
  res.json(books)
  }
  catch(error){
    next(error);
  }
};

export const getBooksByCategory = async(req,res,next)=>{
try{
  const {category} = req.params;
  const books = await Book.find({category});
  res.json(books);

}
 catch(error){
    next(error);
  }
};

export const getOneBook=async(req, res,next)=>{
  try{
    const book= await Book.findById(req.params.id);
     if(!book){
      const error =new Error("אין ספר כזה!");
      error.status=404;
      next(error);
     }
      res.json(book);
    }
    catch(error){
      next(error);
    }
};
export const postBook=async(req, res,next)=>{
  try{
    await Book.create(req.body);
    res.status(201).json({message:"הספר נוסף בהצלחה!"});
  }
    catch(error){
      next(error);
    }
};
export const updateBook = async(req, res,next)=>{
try{
  const updateBook=await Book.findByIdAndUpdate(req.params.id,
                                               req.body,
                                              {new: true,runValidators: true});
  if(!updateBook){
    const error =new Error("אין ספר כזה!");
      error.status=404;
     return next(error);
  }
  res.json(updateBook);
}
   catch(error){
      next(error);
    }
  }; 
export const borrowBook = async(req, res,next)=>{
  try{
    const book = await Book.findById(req.params.id);
    const user = User.find(u=>u.id==parseInt(req.params.userId));
    if(!book||!user){
      const error =new Error("אין ספר/משתמש כזה!");
      error.status=404;
       return next(error);
    }
    if(book.isAvailable){
      const error =new Error(" הספר מושאל!");
      error.status=404;
      next(error);
    }
      book.isAvailable=true;
      await book.save();
      user.borrowedBooks.push(book._id);
        res.json(book);
    } 
    catch (error){
      next(error);
    }
};
export const returnBook=async(req, res,next)=>{
  try{
    const book = await Book.findById((req.params.id));
    const user = users.find(u=>u.id==parseInt(req.params.userId));
   if(!book|| !user){
      const error =new Error("אין ספר/משתמש כזה!");
      error.status=404;
      return next(error);
 } 
     book.isAvailable=false;
      await book.save();
      user.borrowedBooks=user.borrowedBooks.filter(id=>id.toString()!==book.id.toString());
      res.status(200).json(book)
    } 
     catch (error){
      next(error);
    }
};
export const deleteBook=async(req, res,next)=>{
  try{
    const book=await Book.findByIdAndDelete(req.params.id)
  if(!book){
    const error =new Error("אין ספר כזה!");
    error.status=404;
    return next(error);
  }
    res.status(204).send();
 } 
    catch (error){
      next(error); 
    } 
};
