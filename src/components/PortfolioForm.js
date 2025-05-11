import React, { useState } from "react";
import { Paper, TextField, Button, Grid, Typography } from "@mui/material";

function PortfolioForm({ onAdd }) {
  const [formData, setFormData] = useState({
    ticker: "",
    purchasePrice: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.ticker || !formData.purchasePrice || !formData.quantity) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const newItem = {
      ticker: formData.ticker.toUpperCase(),
      purchasePrice: parseFloat(formData.purchasePrice),
      quantity: parseFloat(formData.quantity),
    };

    onAdd(newItem);
    setFormData({
      ticker: "",
      purchasePrice: "",
      quantity: "",
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        추가
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="티커"
              name="ticker"
              value={formData.ticker}
              onChange={handleChange}
              placeholder="예: KRW-BTC"
              helperText="티커 형식으로 입력 (예: KRW-BTC)"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="매수가격"
              name="purchasePrice"
              type="number"
              value={formData.purchasePrice}
              onChange={handleChange}
              placeholder="예: 50000000"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="수량"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="예: 0.1"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              추가
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default PortfolioForm;
