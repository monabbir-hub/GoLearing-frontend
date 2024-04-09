export default function Checkbox({
  ans_id,
  q_id,
  a_id,
  className,
  text,
  onChange,
  disabled,
  type,
  checked,
  ...rest
}) {
  return (
    <label className={className}>
      <input
        type='checkbox'
        {...rest}
        onChange={() => onChange(q_id, a_id)}
        checked={checked}
        disabled={disabled}
      />{' '}
      <span>{text}</span>
    </label>
  )
}
