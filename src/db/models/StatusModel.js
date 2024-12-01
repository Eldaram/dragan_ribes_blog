import BaseModel from "@/db/models/BaseModel"
import TaskModel from "@/db/models/TaskModel"

class StatusModel extends BaseModel {
  static tableName = "status"
  static get relationMappings() {
    return {
        task: {
            modelClass: TaskModel,
            relation: BaseModel.HasManyRelation,
            join: {
              from: "status.id",
              to: "task.status_id",
            },
          }
    }
  }
}

export default StatusModel