import { createContext, useState, useEffect, useContext } from "react"

import {addPizzaOncarrito} from "./helpers/onClickAddHandler"
import { removePizzaFromCarrito } from "./helpers/onClickRemoveHandler"
import { addPizzaTocarrito } from "./helpers/onAddCarritoHandler"


 const PizzaContext = createContext({})

 export const PizzaProvider = ({ children }) =>{

    const [pizzas, setPizzas] = useState([]);
    const [carrito, setCarrito]= useState([]);
    const [total, setTotal] = useState(0);
    const [pizza, setPizza] = useState([]);
  
    useEffect(() => {
      const pizzasFetch = async()=>{
        const res = await fetch("pizzas.json");
        const data = await res.json();
        setPizzas(data);
      }
      pizzasFetch();
    }, [])


    const onClickAddHandler = ({target})=>{
      addPizzaOncarrito(target, pizzas, carrito, setCarrito, setTotal )
    }

    const onClickRemoveHandler = ({target})=>{
      removePizzaFromCarrito(target, pizzas, carrito, setCarrito, setTotal)
    }

    const onAddCarritoHandler = (pizza)=>{
      addPizzaTocarrito(pizza, pizzas, setCarrito, carrito)
    }   
  
    const globalState = {
        pizzas,
        carrito,
        setCarrito,
        total,
        setTotal,
        onClickAddHandler,
        onClickRemoveHandler,
        onAddCarritoHandler,
        pizza,
        setPizza
      }
        return (
            <PizzaContext.Provider
              value={globalState}
            >
              {children}
            </PizzaContext.Provider>
          );

 }

 export const usePizza = ()=> useContext(PizzaContext)