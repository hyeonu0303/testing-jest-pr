import './App.css';
import { Hello } from './components/Hello';
import { User } from './types/user.type';

const user:User = {
  name:"Park",
  age:30
}

const App=()=> {
  return (
    <div className="App">
      <Hello user={user}/>
    </div>
  );
}

export default App;
