const todo = require("../models/todoModel")

const todoAdd = async (req, res) => {
    try {
        const _todo = await todo.findOne({name: req.body.name})

        if (_todo) {
            return res.status(400).json({
                success: false,
                message: "There is a record with this name"
            })
        }
        const todoAdd = new todo(req.body)

        await todoAdd.save()
        .then(() => {
            return res.status(201).json(todoAdd)
        })
        .catch((err) => {
            return res.status(400).json({
                success: false,
                message: "There is an error while creating record: " + err
            })
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Record did not creat!"
        })
    }
}

const todoGetAll = async (req, res) => {
    const { page } = req.query
    const limit = 2
    const skip = Number(page - 1) * limit
    try {
        const todoGetAll = await todo.find({}).limit(limit).skip(skip)
        return res.status(200).json({
            success: true,
            data: todoGetAll
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "no record brought!"
        })
    }
}

const todoUpdate = async (req, res) => {
    const { id } = req.params
    try {
        const todoUpdate = await todo.findByIdAndUpdate(id, req.body)
        if (todoUpdate) {
            return res.status(200).json ({
                success: true,
                message: "successfully updated"
            })
        }
        else return res.status(400).json({
            success: false,
            message: "record is not updated"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "record is not updated!"
        })
    }
}

const todoDelete = async (req, res) => {
    const { id } = req.params 
    try {
        const todoDelete = await todo.findByIdAndDelete(id)
        if (todoDelete) {
            return res.status(200).json({
                success: true,
                message: "record successfully deleted"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "record could not be deleted"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "record could not be deleted" + err
        })
    }
}

const todoGet = async (req, res) => {
    const { id } = req.params
    const todoGet = await todo.findById(id)
    if (todoGet) {
        return res.status(200).json(todoGet)
    }
    else {
        return res.status(404).json({
            success: false,
            message: "record did not defined"
        })
    }

}

module.exports = {
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGet
}