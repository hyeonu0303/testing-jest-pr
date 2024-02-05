import { User } from "../types/user.type"

interface UserProps {
  user:User
}

export const Hello:React.FC<UserProps> = ({user}) => {
  return user.name ? <h1>Hello! {user.name}</h1>:<button>Login</button>
}

