
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import MyOrders from './components/MyOrders';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/show-orders" element={<MyOrders/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;


