import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext } from 'react';
import {Context, usePizza} from '../context';

import "../styles.css"

export const SelectedPizza = ({ id }) => {
  const { pizzas, carrito, setCarrito } = usePizza()

  const [pizza, setPizza] = useState([])

  const onAddCarritoHandler = ()=>{
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

  useEffect(() => {
    const selectedPizza = pizzas.find(pizza => pizza.id === id)
    setPizza(selectedPizza)
  }, [id]);

  return (
    <div>
    <Card style={{ width: '100%', marginBottom: '1.5rem', marginTop:'2.5rem'}} className='card_selected'>
      <div style={{backgroundImage: `url(${pizza.img})`, minWidth: "40vw", backgroundRepeat: "no-repeat"}}>
      </div>
      <div>
        <Card.Body>
          <Card.Title><strong>{pizza.name}</strong></Card.Title>
          <Card.Text className='text-dark text-opacity-50 fw-semibold mx-auto'>{pizza.desc}</Card.Text>
          <br />
          <ListGroup className="list-group-flush">              
          {pizza && pizza.ingredients && pizza.ingredients.map((ingrediente, index) =>{
            return <ListGroup.Item key={index}>🍕 {ingrediente}</ListGroup.Item>
          })}
            </ListGroup>
            <br />
              <p className="text-success ms-4 fw-bold fs-5">
                {
                (pizza.cantidad)? <p>Precio: ${(pizza.price / pizza.cantidad)}</p> : <p>Precio: ${(pizza.price)}</p>
                }
                  <span>
                    <Button variant="primary" 
                    className='btn btn-light btn-outline-danger p-3'
                    style={{float: "right", marginBottom: "1rem"}}
                    onClick={onAddCarritoHandler}
                    >Añadir</Button>
                  </span>
              </p>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};
