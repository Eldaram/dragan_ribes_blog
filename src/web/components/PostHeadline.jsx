import Link from "@/web/components/ui/Link"
import Button from "@/web/components/ui/Button"
import { useRouter } from "next/router"

const PostHeadline = ({ data, longVersion = false, isEditable = false }) => {
  const router = useRouter()
  const goToEdit = () => {
    router.push(`/posts/${data.id}/update`)
  }

  return (
    <article className="flex flex-col gap-4">
      <h1 className="text-2xl">
        <div className="flex gap-4">
          {
            longVersion ? 
            data.title
            : 
            <Link href={`/posts/${data.id}`}>{data.title}</Link>
          }
          {
            isEditable ?
            <Button variant="secondary" size="sm" onClick={goToEdit}>
              Edit
            </Button>
            :
            null
          }
        </div>
      </h1>
      <p>{longVersion ? data.content : `${data.content?.substring(0, 20)}...` }</p>
      <address>
        <Link href={`/users/${data.authorId}`}>{data.author.userName}</Link><br />Views: {data.views}
      </address>
    </article>
  )
}

export default PostHeadline
