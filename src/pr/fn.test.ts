import { Car, fn } from "./fn";

test('1은 1이야',()=>{
  expect(1).toBe(1) //검증할값 toBe에 기대값
})

test('2 더하기 3은 5야', ()=> {
  expect(fn.add(2,3)).toBe(5); //toBe => matcher
})
test('3 더하기 3은 5야', ()=> {
  expect(fn.add(3,3)).not.toBe(5);
})


test('이름과 나이를 전달받아서 객체를 반환해줘', ()=>{
  expect(fn.makeUser('Park',26)).toStrictEqual({name:'Park',age:26}) //재귀나 객체는 toEqual
})

//toBeNull
//toBeUndefined
//toBeDefined
test('null은 null입니다.',()=>{
  expect(null).toBeNull();
})

//toBeTruthy
// toBeFalsy
test('0은 false 입니다', ()=>{
  expect(fn.add(1,-1)).toBeFalsy();
})

//아이디가 길거나 작거나할때 사용할 수 있음
// toBeGreaterThan 크다
// toBeGreaterThanOrEqual 크거나 작다
// toBeLessThan 작다
// toBeLessThanOrEqual 작거나 같다

test('ID는 10자 이하여야합니다',()=>{
  const id="the_black"
  expect(id.length).toBeLessThan(10)
})
test('비밀번호는 4자리',()=>{
  const pw="1234"
  expect(pw.length).toEqual(4);
})
test('0.1더하기 02는 0.3입니다',()=>{
  expect(fn.add(0.1,0.2)).toBeCloseTo(0.3);
})

test("hello world 에 a 라는 글자가 있나?",()=>{
  expect("hello world").toMatch(/H/i);
})

//배열 특정요소볼려면
//toContain
test('유저리스트에 Mike가 있나?',()=>{
  const user = "Mike";
  const userList = ["Tom","Mike","kai"];
  expect(userList).toContain(user)
})


test("이거 에러 나나요?",()=>{
  expect(()=>fn.throwErr()).toThrow('xx')
})

//비동기코드테스트

test("3초후에 받아온 이름은 Mike",done=>{ //done을 넣어야 비동기함수가 실행되고나서 실행됨
  function callback(name:string){
    expect(name).toBe("Mike");
    done() //done을 안넣으면 실패하게됨
    // try{}catch(){} 
  }
  fn.getName(callback);
})


test("3초후에 받아온 나이 30",()=>{ //done을 넣어야 비동기함수가 실행되고나서 실행됨
  //기존 promise를 사용할때 
  // return fn.getAge().then(age=>{ //promise는 return을 적어야함
  //   expect(age).toBe(30)
  // })

  return expect(fn.getAge()).resolves.toBe(30);
})

test("async await테스트",async()=>{
  // const age = await fn.getAge();
  // expect(age).toBe(30);
  await expect(fn.getAge()).resolves.toBe(30);
})


//계속할당돼서 10이 되는 문제점 발생
let num = 10;
//문제해결
beforeEach(()=>{ //테스트전에 실행
  num=0
})

// afterEach(()=>{ //테스트후에실행되므로 2번째부터 성공함 num 초기값 10이어서
//   num=0
// })

test("0더하기 1은 1이야", () => {
  num = fn.add(num,1);
  expect(num).toBe(1);
})
test("0더하기 2은 2이야", () => {
  num = fn.add(num,2);
  expect(num).toBe(2);
})
test("0더하기 3은 3이야", () => {
  num = fn.add(num,3);
  expect(num).toBe(3);
})
test("0더하기 4은 4이야", () => {
  num = fn.add(num,4);
  expect(num).toBe(4);
})

export interface UserType {
  name:string;
  age:number;
  gender:string
}

let user:UserType;
beforeAll(async()=>{ //밑에부분 실행하기전에 실행
  user = await fn.connectUserDb();
})
afterAll(()=>{ //밑에부분 실행한후에 실행
  return fn.disconnectDb();
})

test("이름은 Mike",()=>{
  expect(user.name).toBe("Mike");
  expect(user.age).toBe(30);
  expect(user.gender).toBe("male")
})

describe("Car관련직업", () => {
  let car:Car;

  beforeAll(async () => {
    car = await fn.connectCarDb();
  })

  afterAll(async () => {
    await fn.disconnectDb();
  })
  
  test("자동차이름은 z4", () => {
    expect(car.name).toBe("z4");
  })

  test("브랜드이름은 bmw", ()=>{
    expect(car.brand).toBe("bmw");
  })

  test("차 색은 red",()=>{
    expect(car.color).toBe("red");
  })
})

//test.only (only)를 붙이면 그것만 실행 
//skip을 붙이면 건너띄고 실행됨


//mock function
const mockFn = jest.fn() //테스트하기위해 흉내만 내는 함수

mockFn();
mockFn(1); //mock이란 프로퍼티안에 calls 배열이있음
test('dd',()=>{
  console.log(mockFn.mock.calls);
  expect("dd").toBe("dd");
});

test("함수는 2번 호출됩니다.", () => {
  expect(mockFn.mock.calls.length).toBe(2);
});

test("2번째로 호출된 함수에 전달된 첫번째 인수는 1",()=>{
  expect(mockFn.mock.calls[1][0]).toBe(1);
})

const mockFn1 = jest.fn(num => num + 1);
function forEachAdd1(arr:number[]){
  arr.forEach(num => {
    mockFn(num + 1)
  })
}

forEachAdd1([10,20,30])

test("함수 호출은 3번 됩니다.", () => {
  expect(mockFn1.mock.calls.length).toBe(3)
})

test("전달된 값은 11,21,31입니다.", ()=>{
  expect(mockFn1.mock.calls[0][0]).toBe(11);
  expect(mockFn1.mock.calls[1][0]).toBe(21);
  expect(mockFn1.mock.calls[2][0]).toBe(31);
})

mockFn1(10);




