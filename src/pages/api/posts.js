import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  nameValidator,
  pageValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        title: nameValidator.required(),
        content: descriptionValidator.required(),
        authorId: idValidator.required(),
      },
    }),
    async ({ 
      send, 
      input: { body }, 
      models: { PostModel }, 
    }) => {
      const newProduct = await PostModel.query().insertAndFetch(body)

      send(newProduct)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
        authorId: idValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { page, authorId},
      },
      models: { PostModel },
    }) => {
      let query = PostModel.query()

      if (authorId) {
        query = query.where("authorId", "=", authorId)
      }

      const posts = await query
        .clone()
        .withGraphFetched("author")
        .page(page)
      const [{ count }] = await query.clone().count()

      send(posts, { count })
    },
  ],
})

export default handle
