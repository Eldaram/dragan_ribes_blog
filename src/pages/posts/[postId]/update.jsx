import { descriptionValidator, nameValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import { readResource, updateResource } from "@/web/services/apiClient"
import { useQuery, useMutation } from "@tanstack/react-query"
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
const UpdatePage = () => {
  const { session } = useSession()
  const router = useRouter()
  const {
    query: { postId },
  } = router
  const {
    isLoading : isPostLoading,
    data: { data: { result: post } = {} } = {}
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => readResource(["posts", postId]),
  })
  const { mutateAsync } = useMutation({
    mutationFn: (data) => updateResource(`posts/${postId}`, data),
  })
  const handleSubmit = useCallback(
    async ({ title, content, authorId }) => {
      const editedPost = await mutateAsync({
        title,
        content,
        authorId,
      })

      router.push(`/posts/${editedPost.data.result[0].id}`)
    },
    [mutateAsync, router],
  )

  if (isPostLoading || !post) {
    return <div className="text-center p-32 animate-bounce">Loading...</div>
  }

  if (!session || session.user.id !== post[0]?.authorId) {
    const error = new HttpForbiddenError("Forbidden.")
    
    return <Alert variant="danger">{`${error.statusCode}: ${error.message}`}</Alert>
  }

  
  const initialValues = {
    title: post[0]?.title,
    content: post[0]?.content,
    authorId: session.user.id,
  }

  return (
    <PostForm 
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
    />
  )
}

export default UpdatePage
