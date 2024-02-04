import { pageValidator } from "@/utils/validators"
import PostList  from "@/web/components/ui/postList"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.validateSync(page),
  },
})
const IndexPage = (props) => (
    <PostList {...props}/>
  )

export default IndexPage
