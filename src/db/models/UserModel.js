import BaseModel from "@/db/models/BaseModel"
import TaskModel from "@/db/models/TaskModel"

class UserModel extends BaseModel {
  static tableName = "users"
  static get relationMappings() {
    return {
      task: {
        modelClass: TaskModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "users.id",
          to: "task.user_id",
        },
      }
    }
  }
}

export default UserModel
