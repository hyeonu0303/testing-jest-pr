import { ChangeEvent, FormEvent, useState } from "react"

interface TodoFormProps {
  onInsert: (value:string) => void;
}


export const TodoForm = ({onInsert}:TodoFormProps) => {
  const [value, setValue] = useState('');
  
  const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSubmitTodo = (e: FormEvent<HTMLFormElement>) => {
    onInsert(value);
    e.preventDefault();
    setValue('');
  }

  return(
    <form>
      <input placeholder="할 일을 입력하세요" onChange={handleInput} value={value}/>
      <button type="submit">등록하기</button>
    </form>
  )
}