import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header";
import Notification from "./components/Notification/notification";
import Main from "./components/main";
import SearchResult from "./components/Search/searchResult";
import ProductDetails from "./components/Products/productDetails";
import CartTab from "./components/Cart/cartTab";
import ProfileTab from "./components/Profile/profileTab";
import NotFound from "./components/NotFound/notFound";
import ContextProvider from "./components/services/globalContext";
import { getItems, getUser } from "./components/services/localStorageServices";

function App() {
  const [user, setUser] = useState(getUser());
  const [totalProducts, setTotalProducts] = useState(0);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setTotalProducts(
      getItems(user.email).reduce((acc, { count }) => acc + count, 0)
    );
    const timer = setTimeout(() => {
      setAlert(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [alert, user]);

  const handleAlert = (message) => {
    setAlert(message);
  };

  return (
    <BrowserRouter>
      <ContextProvider
        value={{
          totalProducts,
          setTotalProducts,
          handleAlert,
          user,
          setUser,
        }}
      >
        <Header />
        {alert && <Notification text={alert} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/products/:query" element={<SearchResult />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartTab />} />
          <Route path="/profile" element={<ProfileTab />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
