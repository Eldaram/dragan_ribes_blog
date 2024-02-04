import { Formik, Form as FormikForm } from "formik"
import FormField from "@/web/components/ui/FormField"
import Button from "@/web/components/ui/Button"

const LineForm = (props) => {
  const { initialValues, validationSchema, handleSubmit } = props

  return <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    <FormikForm className="grid grid-cols-5 gap-4 w-full max-w-full">
      <FormField
        name="content"
        label="Add your comment"
        placeholder="Enter a comment"
        className="col-span-4"
      />
      <Button type="submit" className="h-11 mt-8">Comment</Button>
    </FormikForm>
  </Formik> 
}

export default LineForm