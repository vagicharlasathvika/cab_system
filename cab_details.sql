CREATE TABLE cab_details (
    cab_number INT PRIMARY KEY,
    cab_price_per_minute DECIMAL(10, 2) NOT NULL
);
-- Inserting data for 5 different cabs
INSERT INTO cab_details (cab_number, cab_price_per_minute) VALUES
(1, 5.00),
(2, 6.00),
(3, 4.00),
(4, 7.00),
(5, 5.00);
