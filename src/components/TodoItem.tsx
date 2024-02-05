import { TodoProps } from "../types/todoProps"

export const TodoItem = ({todo}:TodoProps) => {
  const {text} = todo
  return(
    <li>
      <input type="checkbox" id={text}/>
      <label htmlFor={text}>{text}</label>
      <button type="button">삭제</button>
    </li>
  )
}