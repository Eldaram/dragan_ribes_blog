import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { readResource } from "@/web/services/apiClient"
import { pageValidator } from "@/utils/validators"
import PostList  from "@/web/components/ui/postList"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.validateSync(page),
  },
})
const User = (props) => {
  const {
    query: { userId },
  } = useRouter()
  const {
    isLoading : isUserLoading,
    data: { data: { result: user } = {} } = {}
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => readResource([`users`, userId]),
  })

  if (isUserLoading || !user) {
    return <div className="text-center p-32 animate-bounce">Loading...</div>
  }

  return (
    <div className="py-4 flex flex-col gap-4">
      <h1 className="text-4xl">{user[0]?.userName}</h1>
      <h2 className="text-3xl">Infos</h2>
      Posts : {user[0]?.posts.length}<br />
      Comments : {user[0]?.comments.length}
      <h2 className="text-3xl">Posts</h2>
      <PostList authorId={userId} {...props}/>
    </div>
  )
}

export default User