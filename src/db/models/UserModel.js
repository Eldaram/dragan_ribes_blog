import BaseModel from "@/db/models/BaseModel"

class UserModel extends BaseModel {
  static tableName = "users"
  static get relationMappings() {
    return {}
  }
}

export default UserModel
