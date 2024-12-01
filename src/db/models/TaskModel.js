import BaseModel from "@/db/models/BaseModel"
import UserModel from "./UserModel"
import PriorityModel from "./PriorityModel"
import StatusModel from "./StatusModel"

class TaskModel extends BaseModel {
  static tableName = "task"
  static get relationMappings() {
    return {
        parent: {
            modelClass: TaskModel,
            relation: BaseModel.HasOneThroughRelation,
            join: {
              from: "task.id",
              through: {
                from: "subtask.id_children",
                to: "subtask.id_parent",
              },
              to: "task.id",
            },
        },
        subtask: {
            modelClass: TaskModel,
            relation: BaseModel.HasManyRelation,
            join: {
                from: "task.id",
                through: {
                  from: "subtask.id_parent",
                  to: "subtask.id_children",
                },
                to: "task.id",
            },
        },
        user: {
            modelClass: UserModel,
            relation: BaseModel.BelongsToOneRelation,
            join: {
                from: "task.user_id",
                to: "users.id"
            },
        },
        priority: {
            modelClass: PriorityModel,
            relation: BaseModel.BelongsToOneRelation,
            join: {
                from: "task.priority_id",
                to: "priority.id"
            },
        },
        status: {
            modelClass: StatusModel,
            relation: BaseModel.BelongsToOneRelation,
            join: {
                from: "task.status_id",
                to: "status.id"
            },
        }, 
    }
  }
}

export default TaskModel