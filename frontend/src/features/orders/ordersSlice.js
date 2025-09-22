// frontend/src/features/orders/ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../app/api'

// fetch all orders
export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  const res = await api.get('/orders')
  return res.data
})

// place new order
export const addOrder = createAsyncThunk('orders/add', async ({ product_id, qty }) => {
  const res = await api.post('/orders', { product_id, qty })
  return res.data
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.list = action.payload
        state.status = 'succeeded'
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.list.push(action.payload) // add the new order to state
      })
  }
})

export default ordersSlice.reducer
