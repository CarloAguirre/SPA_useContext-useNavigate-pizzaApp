import {Context, usePizza} from "../context";
import { useContext, useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import "../styles.css"
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const {pizzas, carrito, setTotal, total} = usePizza()
  const totalArray = carrito.map(pizza => pizzas.find(pizzas =>pizzas === pizza)?.price);
  const navigate = useNavigate()
  
  useEffect(() => {
    setTotal(totalArray.reduce((acumulador, numero) => acumulador + numero, 0)) 
  }, [carrito])

  const onClickCarritoHandler = ()=>{
    navigate("/carrito")
  }
  const onClickLogoHandler = ()=>{
    navigate("/")
  }
  
  return (
    <div className="text-color">
      <Navbar style={{backgroundColor:"#17a2b8"}} >
        <Container className="space-between">
          <div>
          <button  onClick={onClickLogoHandler} className="buttons">🍕<span > Pizzeria Mamma Mia!</span></button> 
          </div>
          <div>
          <button onClick={onClickCarritoHandler} className="buttons"><h3><span>🛒</span>${total.toLocaleString()}</h3></button>
          </div>
        </Container>
      </Navbar>
      <div className="bg_pizza"></div>
      <div className="bg_text">
        <h1>¡Pizzeria Mamma Mía!</h1>
        <p>!Tenemos las mejores pizzas que podras encontrar!</p>
      <hr />
      </div>
    </div>
  );
}
