import { Container } from "react-bootstrap";

import { SelectedPizza } from "../components/SelectedPizza";
import { useParams } from "react-router-dom";

export default () => {

  const {id} = useParams()

  return (
    <Container className="pt-5">
      <SelectedPizza id={id}/>
    </Container>
  );
};
