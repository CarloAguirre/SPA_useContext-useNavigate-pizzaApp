export const removePizzaFromCarrito = (target, pizzas, carrito, setCarrito, setTotal ) => {
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