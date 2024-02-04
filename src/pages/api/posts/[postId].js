import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  idValidator,
  nameValidator,
  descriptionValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        postId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
      },
      models: { PostModel },
    }) => {
      const post = await PostModel.query()
        .findById(postId)
        .withGraphFetched("[author, comments.[author]]")
        .throwIfNotFound()

      send(post)
    },
  ],
  PATCH: [
    validate({
      query: {
        postId: idValidator.required(),
      },
      body: {
        title: nameValidator,
        content: descriptionValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
        body,
      },
      models: { PostModel },
    }) => {
      const updatedPost = await PostModel.query()
        .updateAndFetchById(postId, body)
        .throwIfNotFound()

      send(updatedPost)
    },
  ],
})

export default handle
