import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import {usePizza} from '../context';
import { useNavigate } from 'react-router-dom';


const CardModel = ({pizza})=>{

    const {onAddCarritoHandler} = usePizza()
    const navigate = useNavigate();

    const onVerMAsHandler = ()=>{
        navigate(`/${pizza.id}`)
    }
     
    return (
      <Card style={{ width: '100%', marginBottom: '1.5rem', marginTop:'2.5rem' }}>
        {(pizza.img) && <Card.Img variant="top" src={pizza.img}/>} 
        <Card.Body>
        <Card.Title style={{backgroundColor: "rgba(150, 150, 150, 0)"}}>{pizza.name.toUpperCase()}</Card.Title>
        <br />
        <ListGroup className="list-group-flush">              
            {pizza.ingredients.map((ingrediente, index) =>{
                return <ListGroup.Item key={index}>🍕 {ingrediente}</ListGroup.Item>
            })}
          </ListGroup>
          <hr />
          <br />
            <Button variant="primary" 
            className='btn btn-light btn-outline-success p-3'
            style={{float: "left"}}
            onClick={onVerMAsHandler}
            >Ver más</Button>
            <Button variant="primary" 
            className='btn btn-light btn-outline-danger p-3'
            style={{float: "left", marginLeft: "5px"}}
            name={pizza}
            onClick={()=>{onAddCarritoHandler(pizza)}}
            >Añadir</Button>
            <div className="d-flex justify-content-end">
              {
                (pizza.cantidad)? <p className="text-success ms-4 fw-bold fs-5">${(pizza.price / pizza.cantidad).toLocaleString()}</p>
                                : <p className="text-success ms-4 fw-bold fs-5">${(pizza.price).toLocaleString()}</p>
              }
                

          </div>
        </Card.Body>
      </Card>
    );
}

export default CardModel;