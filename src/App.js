import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import PortfolioForm from "./components/PortfolioForm";
import PortfolioList from "./components/PortfolioList";
import TopGainers from "./components/TopGainers";
import { getCurrentPrices } from "./services/upbitService";

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [currentPrices, setCurrentPrices] = useState({});

  useEffect(() => {
    // Load portfolio from localStorage
    const savedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    setPortfolio(savedPortfolio);

    // Fetch current prices
    const fetchPrices = async () => {
      if (savedPortfolio.length > 0) {
        const tickers = savedPortfolio.map((item) => item.ticker).join(",");
        const prices = await getCurrentPrices(tickers);
        setCurrentPrices(prices);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAddPortfolio = (newItem) => {
    const updatedPortfolio = [...portfolio, newItem];
    setPortfolio(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
  };

  const handleDeletePortfolio = (index) => {
    const updatedPortfolio = portfolio.filter((_, i) => i !== index);
    setPortfolio(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          포트폴리오 트래커
        </Typography>
        <Box sx={{ mb: 4 }}>
          <TopGainers />
        </Box>
        <PortfolioForm onAdd={handleAddPortfolio} />
        <PortfolioList
          portfolio={portfolio}
          currentPrices={currentPrices}
          onDelete={handleDeletePortfolio}
        />
      </Box>
    </Container>
  );
}

export default App;
