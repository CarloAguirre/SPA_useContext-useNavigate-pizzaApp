
export const onAddCarritoHandler = (pizzas, carrito, pizza, setCarrito)=>{
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