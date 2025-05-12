import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function PortfolioList({ portfolio, currentPrices, onDelete }) {
  const calculateProfit = (item) => {
    const currentPrice = currentPrices[item.ticker] || 0;
    const totalPurchase = item.purchasePrice * item.quantity;
    const currentTotal = currentPrice * item.quantity;
    const profit = currentTotal - totalPurchase;
    const profitPercentage = (profit / totalPurchase) * 100;

    return {
      profit,
      profitPercentage,
    };
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom></Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>티커</TableCell>
              <TableCell align="right">매수가격</TableCell>
              <TableCell align="right">수량</TableCell>
              <TableCell align="right">현재가격</TableCell>
              <TableCell align="right">수익금</TableCell>
              <TableCell align="right">수익률</TableCell>
              <TableCell align="center">삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolio.map((item, index) => {
              const { profit, profitPercentage } = calculateProfit(item);
              const currentPrice = currentPrices[item.ticker] || 0;

              return (
                <TableRow key={index}>
                  <TableCell>{item.ticker}</TableCell>
                  <TableCell align="right">
                    {item.purchasePrice.toLocaleString()}원
                  </TableCell>
                  <TableCell align="right">
                    {item.quantity.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {currentPrice.toLocaleString()}원
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: profit >= 0 ? "success.main" : "error.main",
                    }}
                  >
                    {profit.toLocaleString()}원
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: profit >= 0 ? "success.main" : "error.main",
                    }}
                  >
                    {profitPercentage.toFixed(2)}%
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => onDelete(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PortfolioList;
