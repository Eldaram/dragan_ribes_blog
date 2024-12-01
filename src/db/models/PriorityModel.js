import BaseModel from "@/db/models/BaseModel"
import TaskModel from "@/db/models/TaskModel"

class PriorityModel extends BaseModel {
  static tableName = "status"
  static get relationMappings() {
    return {
        task: {
            modelClass: TaskModel,
            relation: BaseModel.HasManyRelation,
            join: {
              from: "priority.id",
              to: "task.priority_id",
            },
          }
    }
  }
}

export default PriorityModel