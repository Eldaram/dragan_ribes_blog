import Alert from "@/web/components/ui/Alert"
import Input from "@/web/components/ui/Input"
import TextArea from "@/web/components/ui/TextArea"
import clsx from "clsx"
import { useField } from "formik"

const FormField = (props) => {
  const {
    name,
    label,
    children,
    className,
    isTextArea,
    inputClassName,
    ...otherProps
  } = props
  const Component = isTextArea ? TextArea : Input
  const [field, { error, touched }] = useField(name)
  const hasError = touched && error

  return (
    <label className={clsx("flex flex-col gap-2", className)}>
      {label && <span className="font-semibold">{label}</span>}
      <Component
        name={name}
        {...field}
        {...otherProps}
        className={clsx({ "border-red-600": hasError }, inputClassName)}
      />
      {hasError && <span className="text-sm text-red-500">{error}</span>}
      {children && <Alert>{children}</Alert>}
    </label>
  )
}

export default FormField
