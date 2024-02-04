import BaseModel from "@/db/models/BaseModel"
import PostModel from "@/db/models/PostModel"
import CommentModel from "@/db/models/CommentModel"

class UserModel extends BaseModel {
  static tableName = "users"
  static get relationMappings() {
    return {
      posts: {
        modelClass: PostModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "users.id",
          to: "posts.authorId",
        },
      },
      comments: {
        modelClass: CommentModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "users.id",
          to: "comments.authorId",
        },
      },
    }
  }
}

export default UserModel
