import { taskValidator, descriptionValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import { useRouter } from "next/router"
import Alert from "@/web/components/ui/Alert"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import SubmitButton from "@/web/components/ui/SubmitButton"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { object } from "yup"

const initialValues = {
  taskName: "",
  description: "",
  userId: 1,
}
const validationSchema = object({
  taskName: taskValidator.required().label("Task name"),
  description: descriptionValidator,
})
const NewTaskPage = () => {
  const { session } = useSession()
  const router = useRouter()

  if (!session) {
    const error = new HttpForbiddenError("Forbidden, please sign-in.")
    
    return <Alert variant="danger">{`${error.statusCode}: ${error.message}`}</Alert>
  }

  initialValues.userId = session.user.id

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (data) => createResource("task", data),
  })
  const handleSubmit = async ({ taskName, description }) => {
    await mutateAsync({ taskName, description })

    router.push(`/`)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="taskName"
          type="text"
          placeholder="What should you do?"
          label="Task name"
        />
        <FormField
          name="description"
          placeholder="Enter some details..."
          isTextArea={true}
          label="Description"
        />
        <SubmitButton>Create Task</SubmitButton>
      </Form>
    </Formik>
  )
}

export default NewTaskPage
