import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import { AddEditOrder, MyOrders } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/my-orders" replace />} />
      <Route path="my-orders" element={<MyOrders />}></Route>
      <Route path="add-order/:id" element={<AddEditOrder />}></Route>
    </Routes>
  );
}

export default App;
