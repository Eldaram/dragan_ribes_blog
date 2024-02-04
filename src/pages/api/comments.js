import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  pageValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        content: descriptionValidator.required(),
        postId: idValidator.required(),
        authorId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: { body }, 
      models: { CommentModel }, 
    }) => {
      const newComment = await CommentModel.query().insertAndFetch(body)

      send(newComment)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
        postId: idValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
      },
      models: { CommentModel },
    }) => {
      const comments = await CommentModel.query().where("postId", "=", postId)

      send(comments)
    },
  ],
})

export default handle
