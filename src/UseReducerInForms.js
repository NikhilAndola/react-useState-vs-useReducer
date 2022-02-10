import React, { useReducer } from 'react';

const initialValue = {
  username: '',
  email: '',
};

// const reducer = (state, action) => {
//   switch (action.type) {
//     // case 'username':
//     //   return { ...state, username: action.payload };
//     // case 'email':
//     //   return { ...state, email: action.payload };

//     case 'textinput':
//       return {
//         ...state,
//         [action.payload.key]: action.payload.value,
//       };

//     default:
//       throw new Error(`Unknown action type: ${action.type}`);
//   }
// };

const reducer = (state, action) => {
  switch (action.type) {
    case 'textInput':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    // <>
    //   <input
    //     type="text"
    //     value={state.username}
    //     onChange={(event) =>
    //       // dispatch({ type: 'username', payload: event.target.value })
    //       dispatch({ key: 'textinput', value: event.target.value })
    //     }
    //   />
    //   <input
    //     type="text"
    //     value={state.email}
    //     onChange={(event) =>
    //       // dispatch({ type: 'email', payload: event.target.value })
    //       dispatch({ key: 'textinput', value: event.target.value })
    //     }
    //   />
    //   <div>{state.username}</div>
    //   <div>{state.email}</div>
    // </>
    <div>
      <input
        value={state.username}
        onChange={(event) =>
          dispatch({
            type: 'textInput',
            payload: { key: 'username', value: event.target.value },
          })
        }
      />
      <input
        value={state.email}
        onChange={(event) =>
          dispatch({
            type: 'textInput',
            payload: { key: 'email', value: event.target.value },
          })
        }
      />
      <div>{state.username}</div>
      <div>{state.email}</div>
    </div>
  );
};

export default Form;

// Sugar syntax: deconstruct type and payload from action
// This is a quality of life thing. Instead of repeating action.payload (and potentially action.type) everywhere in your reducer, you could directly deconstruct the reducer's second argument, like so:

// const reducer = (state, { type, payload }) => {
//   switch (type) {
//     case 'increment':
//       return { count: state.count + payload };
//     case 'decrement':
//       return { count: state.count - payload };
//     case 'reset':
//       return { count: 0 };
//     default:
//       throw new Error(`Unknown action type: ${type}`);
//   }
// };
// You could even go a step further and also deconstruct the state. This is only handy if your reducer state is small enough, but it can be nice in those cases.

// const reducer = ({ count }, { type, payload }) => {
//   switch (type) {
//     case 'increment':
//       return { count: count + payload };
//     case 'decrement':
//       return { count: count - payload };
//     case 'reset':
//       return { count: 0 };
//     default:
//       throw new Error(`Unknown action type: ${type}`);
//   }
// };