import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const MyOrders = () => {
  const backendUrl = import.meta.env.VITE_BACKENDSERVICEURL;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendUrl, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [backendUrl]);
  const handleDelete = async (id) => {
    const response = await fetch(
      backendUrl +
        `/${id}
    `,

      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <>
      <Typography variant="h2">Orders</Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1000,
          margin: "0 auto",
          backgroundColor: "#e3f2fd", // Color de fondo azul claro
        }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order Code</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Final Price</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.finalPrice}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  <Link
                    to={`/add-order/${order.id}`}
                    style={{ textDecoration: "none" }}>
                    <IconButton aria-label="edit" sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                  </Link>

                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(order.id)}
                    sx={{ ml: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab
        component={Link}
        to="/add-order/new"
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default MyOrders;
