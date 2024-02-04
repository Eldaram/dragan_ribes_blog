import { emailValidator, passwordValidator, nameValidator } from "@/utils/validators"
import Alert from "@/web/components/ui/Alert"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import SubmitButton from "@/web/components/ui/SubmitButton"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { object } from "yup"

const initialValues = {
  userName: "",
  email: "",
  password: "",
}
const validationSchema = object({
  userName: nameValidator.required().label("User name"),
  email: emailValidator.required().label("E-mail"),
  password: passwordValidator.required().label("Password"),
})
const SignUpPage = () => {
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (data) => createResource("users", data),
  })
  const handleSubmit = async ({ userName, email, password }) => {
    await mutateAsync({ userName, email, password })
  }

  if (isSuccess) {
    return (
      <Alert>
        We have sent you a validation link! Please check your spam too~!
      </Alert>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="userName"
          type="userName"
          placeholder="Enter your user name"
          label="User name"
        />
        <FormField
          name="email"
          type="email"
          placeholder="Enter your e-mail"
          label="E-mail"
        />
        <FormField
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
        />
        <SubmitButton>Sign Up</SubmitButton>
      </Form>
    </Formik>
  )
}

export default SignUpPage
