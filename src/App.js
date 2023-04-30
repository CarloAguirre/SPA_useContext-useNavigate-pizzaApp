import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import PizzaCard from "./views/PizzaCard";
import CarritoView from "./views/CarritoView";

import { PizzaProvider, usePizza} from "./context";


function App() {

  const { pizzas, carrito, setCarrito, total, setTotal, onClickAddHandler, onClickRemoveHandler, onAddCarritoHandler } = usePizza();

  return (
    <div className="App">
      <PizzaProvider value={{ pizzas, carrito, setCarrito, total, setTotal, onClickAddHandler, onClickRemoveHandler, onAddCarritoHandler }} >
      <BrowserRouter>
        <Navbar />
        <Routes>    
          <>
          <Route path="/" element={<Home />}/>
          <Route path="/carrito" element={<CarritoView />}/>
          <Route path="/*" element={<NotFound />}/>
          <Route path="/:id" element={<PizzaCard />}/>
          </>
        </Routes>
      </BrowserRouter>
      </PizzaProvider>
   
    </div>
  );
}

export default App;
