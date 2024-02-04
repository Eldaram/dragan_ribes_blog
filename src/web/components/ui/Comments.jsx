import Link from "@/web/components/ui/Link"
import LineForm from "@/web/components/ui/lineForm"

const Comments = (props) => {
  const { initialValues, validationSchema, handleSubmit, auth, commentsData } = props

  return (
    <>
      {auth ? 
      <LineForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
      />
      : 
      null}
      <h1 className="text-xl">Comments</h1>
      <ul className="flex flex-col gap-8">
        {commentsData.map(( {id, content, author} ) => (
          <li key={id}>
            <p>{content}</p>
            <address>
            <Link href={`/users/${author.id}`}>{author.userName}</Link>
            </address>
          </li>
        ))}
      </ul>
    </>
    )
}

export default Comments