import clsx from "clsx"

const TextArea = ({ field, className, ...otherProps }) => (
  <textarea
    {...otherProps}
    {...field}
    className={clsx("border-2 p-2", className)}
  />
)

export default TextArea
