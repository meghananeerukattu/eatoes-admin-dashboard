import React, { useEffect, useState } from "react";
import "./App.css";
import useDebounce from "./hooks/useDebounce";
import Orders from "./pages/Orders";

function App() {
  const [page, setPage] = useState("menu");
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const fetchMenu = () => {
    const url = debouncedSearch
      ? `http://localhost:5000/api/menu/search?q=${debouncedSearch}`
      : "http://localhost:5000/api/menu";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (page === "menu") {
      fetchMenu();
    }
  }, [debouncedSearch, page]);

  const toggleAvailability = async (id) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) =>
        item._id === id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );

    try {
      await fetch(
        `http://localhost:5000/api/menu/${id}/availability`,
        { method: "PATCH" }
      );
    } catch (error) {
      console.error(error);
      fetchMenu();
    }
  };

  return (
    <div className="container">
      {/* 🔹 Navigation */}
      <div className="header">
        <h1>Restaurant Admin Dashboard</h1>

        <div>
          <button
            onClick={() => setPage("menu")}
            style={navBtn(page === "menu")}
          >
            Menu
          </button>
          <button
            onClick={() => setPage("orders")}
            style={navBtn(page === "orders")}
          >
            Orders
          </button>
        </div>
      </div>

      {/* 🔹 MENU PAGE */}
      {page === "menu" && (
        <>
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          {menu.length === 0 ? (
            <p>No menu items found</p>
          ) : (
            <div className="menu-list">
              {menu.map((item) => (
                <div key={item._id} className="menu-card">
                  <h3>{item.name}</h3>
                  <p>₹ {item.price}</p>
                  <p
                    className={`status ${
                      item.isAvailable ? "available" : "unavailable"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </p>

                  <button
                    onClick={() => toggleAvailability(item._id)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: item.isAvailable
                        ? "#ff4d4d"
                        : "#4CAF50",
                      color: "white",
                    }}
                  >
                    {item.isAvailable
                      ? "Mark Unavailable"
                      : "Mark Available"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 🔹 ORDERS PAGE */}
      {page === "orders" && <Orders />}
    </div>
  );
}

const navBtn = (active) => ({
  padding: "8px 16px",
  marginLeft: "10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  backgroundColor: active ? "#333" : "#ddd",
  color: active ? "white" : "black",
});

export default App;
