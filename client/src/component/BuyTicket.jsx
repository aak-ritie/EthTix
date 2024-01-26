import React, { useState } from "react";
import { ethers } from "ethers";
import { useAppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toastify for displaying notifications

const BuyTicket = ({ eventIndex, event, state }) => {
  const { ticketsContract, signer } = state;
  const [quantity, setQuantity] = useState(1);
  const { savetransactionHashToLocalStorage, isEventOrganizer } =
    useAppContext();
  const navigate = useNavigate();

  const handlequantityChange = (event) => {
    const inputValue = event.target.value;
    const parsedValue = parseInt(inputValue, 10);

    // Check if parsing is successful and the parsed value is within the specified range
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
      setQuantity(parsedValue);
    } else {
      // Handle the case where the input is not a valid number or outside the range
      // You might choose to set the quantity to a default value or show an error message
      setQuantity(1); // Setting a default value of 1
    }
  };

  const handleBuyTicket = async () => {
    try {
      if (isEventOrganizer) {
        toast.error("You are the event organizer. You cannot buy tickets.");
        return;
      }
      // Check the structure of the event being passed
      console.log("Event Structure:", event);

      if (
        !ticketsContract ||
        !signer ||
        !event ||
        !event.price ||
        quantity < 1 ||
        quantity > 10
      ) {
        console.error(
          "Invalid contract, signer, event, event price, or quantity"
        );
        return;
      }

      // Calculate total price
      const totalPrice = event.price.mul(quantity);

      // Call the buyTicket function from the smart contract
      const transaction = await ticketsContract.buyTicket(
        eventIndex + 1,
        quantity,
        {
          value: totalPrice,
        }
      );

      // Wait for the transaction to be mined
      await transaction.wait();
      const TransactionHash = await transaction.hash;
      savetransactionHashToLocalStorage(TransactionHash);
      // console.log("Transaction Hash:", TransactionHash);

      // Handle success or show a confirmation message
      console.log("Ticket purchase successful!");
      navigate("/mytickets");
    } catch (error) {
      console.error("Error buying ticket:", error.message);
      // Handle errors or display an error message
    }
  };

  return (
    <div className="container">
      <div className="row py-2">
        {/* Display Ticket Purchase Form */}
        <div className="col-lg-6">
          <h2>Buy Ticket</h2>
          {event ? (
            <>
              <p>
                Event: {event.eventName ? event.eventName.toString() : "N/A"}
              </p>
              <p>
                Price per Ticket:{" "}
                {event.price
                  ? ethers.utils.formatEther(event.price).toString()
                  : "N/A"}{" "}
                ETH
              </p>
            </>
          ) : (
            <p>Event information not available</p>
          )}
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="10"
            value={quantity}
            onChange={handlequantityChange}
          />
          <p>
            Total Price:
            {event && event.price
              ? ethers.utils.formatEther(event.price.mul(quantity)).toString()
              : "N/A"}{" "}
            ETH
          </p>
          <button className="main-button color-white" onClick={handleBuyTicket}>
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
