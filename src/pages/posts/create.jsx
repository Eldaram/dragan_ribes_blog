import { descriptionValidator, nameValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { object } from "yup"
import { HttpForbiddenError } from "@/api/errors"
import Alert from "@/web/components/ui/Alert"
import PostForm from "@/web/components/PostForm"

const validationSchema = object({
  title: nameValidator.required().label("Post title"),
  content: descriptionValidator.required().label("Post content"),
})
const initialValues = {
  title: "",
  content: "",
  authorId: 1,
}
const CreatePage = () => {
  const { session } = useSession()
  const router = useRouter()
  const { mutateAsync } = useMutation({
    mutationFn: (data) => createResource("posts", data),
  })
  const handleSubmit = useCallback(
    async ({ title, content, authorId }) => {
      const post = await mutateAsync({
        title,
        content,
        authorId,
      })

      router.push(`/posts/${post.data.result[0].id}`)
    },
    [mutateAsync, router],
  )

  if (!session) {
    const error = new HttpForbiddenError("Forbidden, please sign-in.")
    
    return <Alert variant="danger">{`${error.statusCode}: ${error.message}`}</Alert>
  }

  initialValues.authorId = session.user.id

  return (
    <PostForm 
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreatePage
