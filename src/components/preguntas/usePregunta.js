// import { useState, useReducer } from "react"

// const initialValues = {
//   preg: "",
//   resp: "",
//   tipo: "Normal",
//   // id: "",
//   curso: "",
//   //opciones:
//   a: "",
//   b: "",
//   c: "",
//   d: "",
//   correcta: "a",
//   titulo: "",
//   seccion: "",
// }

// const initialState = {
//   resultado: []
// };

// export const usePreguntaForm = (inicial) => {

//   const [datosPregunta, setDatosPregunta] = useState(inicial)
//   const [habilitarMultiple, setHabilitarMultiple] = useState(false)

//   const handleChange = ({ target }) => {
//     setDatosPregunta({
//       ...datosPregunta,
//       [target.name]: target.value
//     })
//     if (target.name == "titulo") {
//       setDatosPregunta({
//         ...datosPregunta,
//         [target.name]: target.value,
//         seccion: ""
//       })
//     }

//   }

//   ///RESULTADOS
//   // const [results, setResults] = useState(datosPregunta.resultado || []);
//   // const preguntaReducer = (state, action) => {
//   //   switch (action.type) {
//   //     case 'ADD_RESULT':
//   //       return { ...state, resultado: state.resultado.concat(0) };
//   //     default:
//   //       return state;
//   //   }
//   // };

//   // const PreguntaCrear = () => {
//   //   const [datosPregunta, dispatch] = useReducer(preguntaReducer, initialState);

//   //   const handleAddResult = () => {
//   //     dispatch({ type: 'ADD_RESULT' });
//   //   };


//   const handleChangeResultado = (index, newValue) => {
//     const newResults = [...datosPregunta.resultado];
//     newResults[index] = newValue;
//     // setResults(newResults);
//     setDatosPregunta({
//       ...datosPregunta,
//       resultado: newResults
//     })
//   };

//   // const handleOnAdd = () => {
//   //   setRows(datosPregunta.resultado.concat(0));
//   // };

//   const handleAddResult = () => {

//     setDatosPregunta({...datosPregunta, resultado: datosPregunta.resultado.concat(0)});
//   };
//   ///RESULTADOS^^^

//   const handleChangeTipo = ({ target }) => {
//     setDatosPregunta({
//       ...datosPregunta,
//       [target.name]: target.value
//     })
//     if (target.value == "Multiple") {
//       setHabilitarMultiple(true)
//       // console.log(target.value)
//     } else {
//       setHabilitarMultiple(false)
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //setDatosPregunta(initialValues)
//     console.log(datosPregunta, initialValues)
//   }

//   return {
//     datosPregunta,
//     habilitarMultiple,
//     handleChangeTipo,
//     handleChange,
//     handleChangeResultado,
//     handleAddResult,
//     handleSubmit
//   }
// }
import { useReducer } from "react";

const initialValues = {
  preg: "",
  resp: "",
  tipo: "Normal",
  curso: "",
  a: "",
  b: "",
  c: "",
  d: "",
  correcta: "a",
  titulo: "",
  seccion: "",
  resultado: []
};

const preguntaReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_MULTIPLE":
      return { ...state, tipo: action.value, resultado: [] };
    case "ADD_RESULT":
      return { ...state, resultado: [...state.resultado, 0] };
    case "REMOVE_RESULT":
      const updatedResults = state.resultado.filter((_, index) => index !== action.index);
      return { ...state, resultado: updatedResults };
    case "CHANGE_RESULT":
      const newResults = [...state.resultado];
      newResults[action.index] = Number(action.value);
      return { ...state, resultado: newResults };
    default:
      return state;
  }
};

export const usePreguntaForm = (inicial) => {
  const [datosPregunta, dispatch] = useReducer(preguntaReducer, inicial);
  const habilitarMultiple = datosPregunta.tipo === "Multiple";

  const handleChange = ({ target }) => {
    dispatch({ type: "CHANGE_FIELD", field: target.name, value: target.value });
    if (target.name === "titulo") {
      dispatch({ type: "CHANGE_FIELD", field: "seccion", value: "" });
    }
  };

  const handleChangeTipo = ({ target }) => {
    dispatch({ type: "TOGGLE_MULTIPLE", value: target.value });
  };

  const handleChangeResultado = (index, newValue) => {
    dispatch({ type: "CHANGE_RESULT", index, value: newValue });
  };

  const handleAddResult = () => {
    dispatch({ type: "ADD_RESULT" });
  };

  const handleRemoveResult = (index) => {
    dispatch({ type: "REMOVE_RESULT", index });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(datosPregunta);
  };

  return {
    datosPregunta,
    habilitarMultiple,
    handleChangeTipo,
    handleChange,
    handleChangeResultado,
    handleAddResult,
    handleRemoveResult,
    handleSubmit
  };
};
