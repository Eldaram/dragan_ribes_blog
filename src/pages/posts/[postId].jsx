import { descriptionValidator } from "@/utils/validators"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@tanstack/react-query"
import { readResource, createResource } from "@/web/services/apiClient"
import PostHeadline from "@/web/components/PostHeadline"
import { object } from "yup"
import { useCallback } from "react"
import { useSession } from "@/web/components/SessionContext"
import Comments from "@/web/components/ui/Comments"

const validationSchema = object({
  content: descriptionValidator.required().label("Comment content"),
})
const initialValues = {
  content: "",
  authorId: 1,
}
const Post = () => {
  const { session } = useSession()
  const {
    query: { postId },
  } = useRouter()
  const {
    isLoading : isPostLoading,
    data: { data: { result: post } = {} } = {}
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => readResource(["posts", postId]),
  })
  const { mutateAsync } = useMutation({
    mutationFn: (data) => createResource("comments", data),
  })
  const handleSubmit = useCallback(
    async ({ content, authorId }) => {
      await mutateAsync({
        content,
        postId,
        authorId,
      })
    },
    [mutateAsync, postId],
  )

  if (isPostLoading || !post) {
    return <div className="text-center p-32 animate-bounce">Loading...</div>
  }

  initialValues.authorId = session.user.id

  return (
    <div className="py-4 flex flex-col gap-4">
      <PostHeadline 
        data={post[0]} 
        longVersion={true}
        isEditable={session.user.id === post[0]?.authorId}
      />
      <Comments 
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        auth={session}
        commentsData={post[0].comments}
      />
    </div>
  )
}

export default Post