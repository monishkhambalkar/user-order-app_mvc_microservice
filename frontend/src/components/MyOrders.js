import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchOrders } from '../features/orders/ordersSlice'

export default function MyOrders() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const { list: orders, status } = useSelector((state) => state.orders)

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }
    dispatch(fetchOrders())
  }, [user, dispatch, navigate])

  return (
    <div>
      <h2>My Orders</h2>

      {status === 'idle' || status === 'loading' ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: '10px' }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.product_name}</td>
                <td>{o.qty}</td>
                <td>{o.product_price}</td>
                <td style={{ color: o.status === 'completed' ? 'green' : 'orange' }}>
                  {o.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
