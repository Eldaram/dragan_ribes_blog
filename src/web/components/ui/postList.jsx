import PostHeadline from "@/web/components/PostHeadline"
import Pagination from "@/web/components/ui/Pagination"
import config from "@/web/config"
import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"

const PostList = (props) => {
  const { page, authorId } = props
  const {
    isLoading : isPostLoading,
    data: { data: { result: posts, meta: { count } = {} } = {} } = {},
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => readResource("posts", { params: { page, authorId } }),
  })
  const countPages = Math.ceil(count / config.pagination.limit)

  if (isPostLoading || !posts ) {
    return <div className="text-center p-32 animate-bounce">Loading...</div>
  }

  return (
    <div className="py-4 flex flex-col gap-16">
      <ul className="flex flex-col gap-8">
        {posts.map(({ id, title, content, authorId: postAuthorId, author }) => (
          <li key={id}>
            <PostHeadline data={ {id, title, content, authorId: postAuthorId, author } }/>
          </li>
        ))}
      </ul>
      <Pagination pathname="/" page={page} countPages={countPages} />
    </div>
  )
}

export default PostList