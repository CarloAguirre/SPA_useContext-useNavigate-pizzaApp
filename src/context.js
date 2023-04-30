import { createContext, useState, useEffect, useContext } from "react"


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
      const selectedPizza = pizzas.find(p => p.name === target.name);
      const carritoPizzaFind = carrito.find(pizza => pizza.name === selectedPizza.name)
      const carritoPizzaIndex = carrito.findIndex(pizza => pizza.name === selectedPizza.name)
      const newCarrito = [...carrito]
      
      if(carritoPizzaFind){
        newCarrito[carritoPizzaIndex].price += (selectedPizza.price / (newCarrito[carritoPizzaIndex].cantidad))
        newCarrito[carritoPizzaIndex].cantidad += 1
        setCarrito(newCarrito);
        let totalArray = carrito.map(pizza => pizzas.find(pizzas =>pizzas === pizza)?.price);
        setTotal(totalArray.reduce((acumulador, numero) => acumulador + numero, 0)) 
      }   
    }

    const onClickRemoveHandler = ({ target }) => {
      const selectedPizza = pizzas.find(p => p.name === target.name);
      const carritoPizzaFind = carrito.find(pizza => pizza === selectedPizza)
      const carritoPizzaIndex = carrito.findIndex(pizza => pizza === selectedPizza)
      const newCarrito = [...carrito]

      if(carritoPizzaFind && carritoPizzaFind.cantidad >=2){
        newCarrito[carritoPizzaIndex].price -= (selectedPizza.price / (newCarrito[carritoPizzaIndex].cantidad))
        newCarrito[carritoPizzaIndex].cantidad -=1
        setCarrito(newCarrito)
        let totalArray = carrito.map(pizza => pizzas.find(pizzas =>pizzas === pizza)?.price);
        setTotal(totalArray.reduce((acumulador, numero) => acumulador - numero, 0)) 
      }else{
        newCarrito.splice(carritoPizzaIndex, 1)
        setCarrito(newCarrito)
      }
      
    };  

    const onAddCarritoHandler = (pizza)=>{
      const selectedPizza = pizzas.find(p => p.name === pizza.name);
      const selectedPizzaOnCarrito = carrito.find(p => p.name === selectedPizza.name)
      const carritoPizzaIndex = carrito.findIndex(pizza => pizza === selectedPizza)
      if(selectedPizzaOnCarrito){
        const newCarrito =[...carrito]
        newCarrito[carritoPizzaIndex]["cantidad"] += 1;
        newCarrito[carritoPizzaIndex]["price"] += pizza.price/(pizza.cantidad - 1) ;
        setCarrito(newCarrito)
      }else{
        pizza["cantidad"] = 1;
        setCarrito([
            ...carrito,
            pizza
        ])
      }
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