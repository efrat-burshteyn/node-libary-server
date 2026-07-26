import 'dotenv/config';
import {connectDB} from './confing/db.js';
//מוסיפה בכותרת של התגובה מהשרת הוראות אבטחה לדפדפן
import helmet from 'helmet';
//משמשת להגבלת בקשות חוזרות לממשקי API ציבוריים
import expressRateLimit from 'express-rate-limit';
//הדפסת נתוני כל בקשה שמגיעה לשרת במצב פיתוח
import morgan from 'morgan';
//הוספת אפשרות גישה לשרת מCLIENT
import cors from 'cors';
import express from 'express';
import mainRouter from "./routes/index.route.js";
import {reqCurrentDate,printReqCurrentDate, error,errorNotFound} from './Middlewares/middleware.js'

const  limiter  =  expressRateLimit ( { 
	windowMs : 15  *  60 * 1000 ,  // קבועי SECOND, MINUTE, HOUR ו-DAY זמינים, או השתמשו במספר רגיל עבור אלפיות השנייה 
	limit : 100 ,  // הגבל כל IP ל-100 בקשות לכל `window` (כאן, לכל 15 דקות). 
	standardHeaders : 'draft-8' ,  // draft-6: כותרות `RateLimit-*`; draft-7 & draft-8: כותרת `RateLimit` משולבת 
	legacyHeaders : false ,  // השבת את כותרות `X-RateLimit-*`. 
	ipv6Subnet : 56 ,  // הגדר ל-60 או 64 כדי להיות פחות אגרסיבי, או 52 או 48 כדי להיות יותר אגרסיבי 
	// store: ... , // Redis, Memcached וכו'. ראה להלן. 
} ) 

const app = express();
connectDB();
app.use(limiter);
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(reqCurrentDate);
app.use(printReqCurrentDate);
app.use('/api',mainRouter);
app.use(errorNotFound);
app.use(error);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})














