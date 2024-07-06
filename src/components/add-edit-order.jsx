import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, TextField } from "@mui/material";

const AddEditOrder = () => {
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKENDSERVICEURL;

  const [formData, setFormData] = useState({
    price: 0,
    productName: "",
    quantity: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(`${backendUrl}/${id}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();

        setFormData({
          price: data.price,
          productName: data.productName,
          quantity: data.quantity,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (id !== "new") fetchData(id);
  }, [id, backendUrl]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      // Handle success, e.g., show success message or redirect

      navigate("/my-orders");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      // Handle success, e.g., show success message or redirect

      navigate("/my-orders");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={id !== "new" ? handleSubmit : handleSubmitCreate}>
      <TextField
        label="Price"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required="true"
      />
      <TextField
        label="Product Name"
        name="productName"
        value={formData.productName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required="true"
      />
      <TextField
        label="Quantity"
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required="true"
      />

      <Button type="submit" variant="contained" color="secondary">
        Save Changes
      </Button>
    </Box>
  );
};

export default AddEditOrder;
