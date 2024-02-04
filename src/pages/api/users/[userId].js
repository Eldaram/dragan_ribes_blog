import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  idValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { userId },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query()
        .findById(userId)
        .withGraphFetched("[posts, comments]")
        .throwIfNotFound()

      send(user)
    },
  ],
})

export default handle
