import Todo from "../models/todo.model.js";
import mongoose from "mongoose";

//Create TODO- POST API
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        //validation
        if ( !title || title.trim() === "" ) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        const todo = await Todo.create({
            title,
            description,
        })

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
};

//Get all TODO- GET API
export const getTodos = async (req, res) => {
    try{
        //Query Param
        const {search, sort, page=1, limit=10} = req.query;

        //Base query
        let query = {};

        //Search by title
        if(search){
            query.title = { $regex: search, $options: "i" }; //i for case insensitive
        }

        //Sorting
        let sortOption = {};
        if(sort === "asc") sortOption.createdAt = 1; //1 for ascending order
        else sortOption.createdAt = -1; //-1 for descending order defaulf  

        //Pagination
        const skip = (page - 1) * limit;

        const todos = await Todo.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        const totalTodos = await Todo.countDocuments(query);

        return res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            total: totalTodos,
            page: Number(page),
            limit: Number(limit),
            data : todos,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
};

//Get TODO by ID- GET API
export const getTodoById = async (req, res) => {
    try{
        const { id } = req.params;

        //Validate ID based on mongoose
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            });
        }

        const todo = await Todo.findById(id);

        //If todo not found
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        //If todo found
        return res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            data: todo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
};

//Update TODO by ID- PUT API
export const updateTodo = async (req, res) => {
    try{
        const { id } = req.params;
        const { title, description } = req.body;

        //Validate ID based on mongoose
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            });
        }

        //Valid Input
        if ( !title || title.trim() === "" ) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        //Update todo
        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true } //to return the updated document
        );

        //If todo not found
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        //If todo found and updated
        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
};