// eslint-disable-next-line max-classes-per-file
import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"
import PostModel from "@/db/models/PostModel"

class CommentModel extends BaseModel {
  static tableName = "comments"
  static get relationMappings() {
    return {
      author: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "comments.authorId",
          to: "users.id",
        },
      },
      posts: {
        modelClass: PostModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
    }
  }
}

export default CommentModel
