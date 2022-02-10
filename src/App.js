import React, { useState, useReducer } from 'react';
import './style.css';
import Form from './UseReducerInForms';

/** Analogy for UseReducer in terms of Backend */

// initial state of the database
const initialState = { count: 0 };

// API logic: how to update the database when the
// 'increment' API endpoint is called
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - action.payload };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export default function App() {
  const [num, setNum] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <div>
        <h2>UseState in Action</h2>
        <button onClick={() => setNum(num - 1)}>-</button>
        <span>Number: {num}</span>
        <button onClick={() => setNum((oldState) => oldState + 1)}>+</button>
      </div>

      {/* ************************************************* */}

      <div>
        <h2>Magic of useReducer</h2>
        <button onClick={() => dispatch({ type: 'decrement', payload: 1 })}>
          -
        </button>
        <span>Count: {state.count} </span>
        <button onClick={() => dispatch({ type: 'increment', payload: 1 })}>
          +
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
      <Form />
    </div>
  );
}

// Keep in mind that you'll never have to provide the arguments to the reducer yourself. This is handled by the useReducer hook automatically: the state is known, and the action is just the argument of dispatch which is passed along to the reducer as its second argument.

// The state has whatever format you want (usually an object, but it can be anything really). The action can also be whatever you want, but there's some very commonly used convention on how to structure it and I advise you to follow those conventions- we'll be learning about them later. At least until you're familiar with them and confident that departing from those is really what you want.

// So conventionally, the action is an object with one required property and one optional property:
// type is the required property (analogous to the API endpoint). It tells the reducer what piece of logic it should be using to modify the state.
// payload is the optional property (analogous to the body of the HTTP POST request, if any). It provides additional information to the reducer on how to modify the state.
// In our previous example of a counter, state was an object with a single count property. action is an object whose type can be 'increment', and whose payload is the amount by which you want to increment the counter.

// One important thing to note on dispatch is that React guarantees that its identity won't change between renders. That means that you don't need to put it in dependency arrays (and if you do, it won't ever trigger the dependency array). This is the same behaviour as the setState function from useState.
// The reducer should throw an error for unknown action types
// In our counter example we had a switch statement with three cases: "increment", "decrement" and "reset". If you did write this into your code editor, you might have noticed ESLint being mad at you.

// ESLint (rightly) wants switch statements to have a default case. So, what should be the reducer default case when it's handling an unknown action type?

// But I really don't like that. Either the action type is something you expect and should have a case for, or it's not, and returning the state is not what you want. This is basically creating a silent error when an incorrect action type is provided, and silent errors can be very hard to debug.
