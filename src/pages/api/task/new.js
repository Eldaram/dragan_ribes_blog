import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { taskValidator, descriptionValidator } from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        taskName: taskValidator.required(),
        description: descriptionValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        body: { taskName, description },
      },
      models: { TaskModel },
    }) => {
      await TaskModel.query().insert({
        taskName,
        description,
      })

      send(true)
    },
  ],
})

export default handle
