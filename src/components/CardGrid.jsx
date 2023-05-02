import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardModel from './CardModel';

import {usePizza} from '../context';

const CardGrid = ()=> {
    const {pizzas} = usePizza()
    
  return (
    <Container>
    <Row>
        {pizzas.map((pizza, index)=>{
          
            return <Col xs={12} md={6} lg={4} key={index}> {<CardModel pizza={pizza}/>} </Col>
        })}
    </Row>
  </Container>
);
}

export default CardGrid;