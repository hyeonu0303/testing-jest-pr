import { UserType } from "./fn.test";

export interface Car {
  name:string;
  brand:string;
  color:string;
}


export const fn = {
  add: (num1 :number, num2:number):number => num1+num2,
  makeUser : (name:string,age:number) => ({name,age}),
  throwErr : () => {
    throw new Error("xx");
  },
  getName:(callback:any)=>{
    const name = "Mike";
    setTimeout(()=>{
      callback(name)
    },3000)
  },
  getAge: ()=> {
    const age = 30;
    return new Promise((res,rej)=>{
      setTimeout(()=>{
        res(age);
      },3000)
    })
  },
  connectUserDb : () => {
    return new Promise<UserType>(res=>{
      setTimeout(()=>{
        res({
          name:"Mike",
          age:30,
          gender:"male"
        });
      }, 500)
    })
  },
  disconnectDb:()=>{
    return new Promise((res)=>{
      setTimeout(()=>{
        res({})
      },500)
    })
  },
  connectCarDb:()=>{
    return new Promise<Car>((resolve,reject)=>{
      setTimeout(()=>{
        resolve({
          name:"z4",
          brand:"bmw",
          color:"red"
        })
      },500)
    })
  }
}


