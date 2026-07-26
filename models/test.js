import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Book } from "./book.model.js";

async function testDB() {
    try {
        // התחברות ל-MongoDB (התאמי את מחרוזת ההתחברות לפי הפרויקט שלך)
        await mongoose.connect("mongodb://localhost:27017/libraryDB");
        console.log("Connected to MongoDB successfully!");

        // יצירת ספר חדש בדיקה
        const newBook = new Book({
            name: "JavaScript asics",
            price: 50,
            categories: ["Math"], // חייב להיות אחד מהערכים ב-enum
            detailsAuthor: {
                name: "John Doe",
                email: "john@example.com"
            }
        });
        
        await newBook.save();
        console.log("Book saved successfully:", newBook);

        // יצירת משתמש בדיקה
        const newUser = new User({
            username: "Alie",
            email: "alice@example.com",
            phone: "050-1234567",
            password: "1234"
        });

        await newUser.save();
        console.log("User saved successfully:", newUser);

    } catch (error) {
        console.error("Validation or connection error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

testDB();