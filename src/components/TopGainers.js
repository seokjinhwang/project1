import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getTopGainers } from "../services/upbitService";

function TopGainers() {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGainers = async () => {
      try {
        const data = await getTopGainers();
        setGainers(data);
      } catch (error) {
        console.error("Error fetching gainers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGainers();
    const interval = setInterval(fetchGainers, 60000); // 1분마다 업데이트

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        상승률 TOP 10
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>티커</TableCell>
              <TableCell>이름</TableCell>
              <TableCell align="right">현재가</TableCell>
              <TableCell align="right">변동가</TableCell>
              <TableCell align="right">변동률</TableCell>
              <TableCell align="right">24시간 거래량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gainers.map((coin) => (
              <TableRow key={coin.ticker}>
                <TableCell>{coin.ticker}</TableCell>
                <TableCell>{coin.marketName}</TableCell>
                <TableCell align="right">
                  {coin.currentPrice.toLocaleString()}원
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color:
                      coin.changePrice >= 0 ? "success.main" : "error.main",
                  }}
                >
                  {coin.changePrice >= 0 ? "+" : ""}
                  {coin.changePrice.toLocaleString()}원
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: coin.changeRate >= 0 ? "success.main" : "error.main",
                  }}
                >
                  {coin.changeRate >= 0 ? "+" : ""}
                  {coin.changeRate.toFixed(2)}%
                </TableCell>
                <TableCell align="right">
                  {coin.accTradeVolume24h.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TopGainers;
