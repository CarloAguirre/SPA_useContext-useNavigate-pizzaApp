import { useContext} from "react";

import Button from 'react-bootstrap/Button';
import { usePizza } from "../context";

export default function Carrito() {
  const {carrito, total, onClickAddHandler, onClickRemoveHandler} = usePizza()

  return (
    <div className="mt-5">
      <div className="container mt-4 shadow-lg p3 mb-5 bg-body rounded">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Pizza</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((pizza, index) => (
              <tr key={index}>
                <td><span><img src={pizza.img} style={{height: "40px", width: "50px", marginRight: "10px"}}></img></span>{pizza.name}</td>
                <td>${pizza.price}
                <Button variant="danger" 
                className='btn btn-light btn-outline-danger mx-2'
                name={pizza.name}
                onClick={onClickRemoveHandler}
                >-</Button>{pizza.cantidad}
                <Button variant="primary" 
                name={pizza.name}
                className='btn btn-light btn-outline-primary mx-2'
                onClick={onClickAddHandler}
                >+</Button> 
                </td>
              </tr>
            ))}
            <h2 className="my-3">Total: ${(total).toLocaleString()}</h2>
            {(total !== 0)&&
            <Button variant="primary" 
            className='btn btn-success p-3 mb-3'
            >Ir a pagar</Button>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
