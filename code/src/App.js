import React, {useState, useEffect} from 'react'
import { MyThought } from 'components/MyThought'
import { Cards, count } from 'components/Cards'

export const App = () => {
const [thoughts, setThoughts] = useState([]) 
const [myThought, setMyThought] = useState("")

// send the new message, get the
// response from the API, and then add it to 
// the thoughts array:
useEffect(() => {
  fetch("https://technigo-thoughts.herokuapp.com/")
    .then(res => res.json())
    .then(json => {
      setThoughts(json)
    console.log("thoughts", thoughts)});
}, [])


const handleFormSubmit = (event) => {
  event.preventDefault()
  console.log(myThought)
  // Send the POST request with the input from your form.
 
  fetch('https://technigo-thoughts.herokuapp.com/', { 
    method: 'POST', 
    body: JSON.stringify({ message: myThought }),
    headers: {'Content-Type': 'application/json'},  
  })
    .then((res) => res.json())
    .then((newThought) => {
      console.log("new thought", newThought)
      // Now you have `newThought` which is the response from the
      // API as documented at the top of this readme. You can use
      // it to update the `thoughts` array: 
      setThoughts((previousThoughts) => [newThought, ...previousThoughts])
    })
}

  return (
    <div className = "app">
      
      <form onSubmit={handleFormSubmit}>
      <MyThought myThought={myThought} setMyThought={setMyThought} />
        <button type ="submit"><span>&#9829;</span> Send Happy Thought <span>&#9829;</span></button>
      </form>
      <section className="card-box">
        {thoughts.slice(0, 5).map((thought)=>{
          return (
          <Cards info = {thought} />
          )
        })}
      </section>
    </div>
  )
}
