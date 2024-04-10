import {useState, useCallback,useEffect,useRef} from 'react';

//when we want to take reference useref is used
function App() {
  const [length, setLength]=useState(8);
  const [numallowed, setNumallowed]=useState(false);
  const [charallowed, setCharallowed]=useState(false);
  const [password, setPassword]=useState("");
  
   //ref hook
   const passwordref=useRef(null);



  //on clicking number or character or length new pass should be generated
  //so we have to call this method multiple times so have to use
  //one hook over here wich is callback hook
  //useCallback hook takes two parameters first is function and second is dependencies
  //that is the variable which should be affected by that function execution
  //to prevent unncessary reenders multiple times we use this hook it is used to memoize the function in react to keep this values in cache
  const passwordGenerator=useCallback(()=>{
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      //as password will be consisting of random of this characters 
      //so we have to select characters from this string using loop but based on length pprovided by user
      
      if(numallowed){
        str+="0123456789"
      }
      if(charallowed){
        str+="!@#$%^&*_-+={}[]~`"
      }
      for(let i=1; i<=length; i++){
        let char=Math.floor(Math.random()*str.length+1);
        pass+=str.charAt(char)
     }
     setPassword(pass);

  },[length,numallowed, charallowed,setPassword ])  //for more optimisation we provided set password not necessary
  

  //for use ref
  const copyPassToClipboard=useCallback(()=>{
      //as in javascript everything is on window obj so we can access window obj
      //but in node js everything is on server so cant use window obj
      window.navigator.clipboard.writeText(password);
      passwordref.current?.select();    //to give it selection effect we can use ref
      //we can also give it range
      passwordref.current?.setSelectionRange(0,3);
  },[password]);
  //as here dependency is only on password



  //use effect hook
  //it also takes two parameters one is fnction and second is dependencies
  //after making changes in given things the effect will be on passwordgenerator method so in useeffect hook we call that method
  useEffect(()=>{
    passwordGenerator()
},[length, numallowed,charallowed,passwordGenerator]);

  return (
    <>
       <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>password Generator</h1>
         <div className="flex shadow rounded-lg overflow-hidden mb-4">
           <input type="text"
                   value={password}
                   className='outline-none w-full py-1 px-3'
                   placeholder='password'
                   readOnly
                   ref={passwordref}
            />
            <button onClick={copyPassToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>  
         </div>
         <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
                 type="range"
                 min={6}
                 max={100}
                 value={length}
                 className='cursor-pointer'
                 onChange={(e)=>{
                  setLength(e.target.value)
                 }}
              />
              <label>Length:{length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input
                  type="checkbox"
                  defaultChecked={numallowed}
                  id="numberInput"
                  onChange={()=>{
                    setNumallowed((prev)=>!prev);   //whatever the pev vallue will be reverse it
                    //i.e from true to false and vice versa as it is checkbox
                  }}
                />
                <label>number</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input
                  type="checkbox"
                  defaultChecked={charallowed}
                  id="charInput"
                  onChange={()=>{
                    setCharallowed((prev)=>!prev);  
                    //we can pass the callback function to setfunction in this callback yiu get access to previous value
                    //whatever the pev vallue will be reverse it
                    //i.e from true to false and vice versa as it is checkbox
                  }}
                />
                <label>character</label>
            </div>
         </div>
       </div>
    </>
  );
}

export default App;
