// frontend/src/components/ProductList.js
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../app/api'
import { addOrder } from '../features/orders/ordersSlice'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }

    async function fetchProducts() {
      try {
        const res = await api.get('/products')
        setProducts(res.data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setProducts([
          { id: 1, product_name: 'Apple iPhone 15', product_qty: 50, product_price: 79999.0, status: 1 },
          { id: 2, product_name: 'Samsung Galaxy S23', product_qty: 40, product_price: 74999.0, status: 1 },
          { id: 3, product_name: 'OnePlus 11', product_qty: 30, product_price: 57999.0, status: 1 },
          { id: 4, product_name: 'Dell Inspiron Laptop', product_qty: 20, product_price: 65999.0, status: 1 },
          { id: 5, product_name: 'HP Pavilion Laptop', product_qty: 25, product_price: 62999.0, status: 1 },
          { id: 6, product_name: 'Sony WH-1000XM5 Headphones', product_qty: 15, product_price: 29999.0, status: 1 },
          { id: 7, product_name: 'Apple AirPods Pro', product_qty: 60, product_price: 24999.0, status: 1 },
          { id: 8, product_name: 'Samsung 55-inch Smart TV', product_qty: 10, product_price: 55999.0, status: 1 },
          { id: 9, product_name: 'Nike Running Shoes', product_qty: 100, product_price: 4999.0, status: 1 },
          { id: 10, product_name: 'Adidas Hoodie', product_qty: 80, product_price: 2999.0, status: 0 }
        ])
      }
    }

    fetchProducts()
  }, [user, navigate])

  const handleOrder = (productId) => {
    dispatch(addOrder({ product_id: productId, qty: 1 }))
      .unwrap()
      .then(() => {
        alert('Order placed successfully!')
      })
      .catch((err) => {
        console.error('Order error:', err)
        alert('Failed to place order')
      })
  }

  return (
    <div>
      <h2>Available Products</h2>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <strong>{p.product_name}</strong> - ₹{p.product_price} ({p.product_qty} in stock){' '}
              {p.status === 1 ? (
                <button onClick={() => handleOrder(p.id)}>Order</button>
              ) : (
                <span style={{ color: 'red' }}>Not Available</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
