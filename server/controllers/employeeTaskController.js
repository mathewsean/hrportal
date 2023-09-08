import Task from '../models/taskModel.js'

export const updateTask = async(req, res) => {
  try {

    const {taskId} = req.params
    const {status} = req.body

    const updateTaskStatus = await Task.findOneAndUpdate(
      {_id:taskId},
      {$set:{status:status}}
    )

    if(updateTaskStatus){
      return res.status(200).json({message: "Task updated succesfully"})
    }
    
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}