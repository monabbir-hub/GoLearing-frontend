import classes from '../styles/Answers.module.css'
import Checkbox from './Checkbox'

export default function Answers({
  ans_id,
  q_id,
  a_id,
  text,
  onChange,
  ansType,
  disabled,
  checked,
}) {
  console.log('disabled',disabled);
  return (
    <div>
      <Checkbox
        ans_id={ans_id}
        q_id={q_id}
        a_id={a_id}
        className={`${classes.answer} ${
          ansType === 'correct'
            ? classes.correct
            : ansType === 'wrong'
            ? classes.wrong
            : null
        }`}
        text={text}
        type='result'
        onChange={onChange}
        disabled={disabled}
        checked={checked}
      />
    </div>
  )
}
