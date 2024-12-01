import { pageValidator } from "@/utils/validators"
import PostList  from "@/web/components/ui/postList"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.validateSync(page),
  },
})
const IndexPage = (props) => (
    <></>
  )

export default IndexPage
