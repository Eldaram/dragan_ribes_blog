import { Formik } from "formik"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"

const PostForm = (props) => {
  const {initialValues, validationSchema, handleSubmit} = props

  return (
  <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="title"
          label="Post title"
          placeholder="Enter the subject"
        />
        <FormField
          name="content"
          label="Post content"
          placeholder="Enter the content"
          inputClassName="h-40"
          isTextArea={true}
        />
        <Button type="submit">Post</Button>
      </Form>
    </Formik>
  )
}

export default PostForm