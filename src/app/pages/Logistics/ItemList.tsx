import React from "react";
import { Button } from "react-bootstrap";

interface Item {
  driverName: string;
  customerName: string;
  number: number;
  color: string;
}

interface ItemListProps {
  paginatedItems: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ paginatedItems }) => {
  return (
    <div>
      {paginatedItems.map((item, index) => (
        <div
          key={index}
          className="mt-5 px-5 d-flex align-items-center justify-content-between border-custom custom-height"
        >
          <div className="">
            <h4 className="box-large-text">{item.driverName} </h4>
            <div className="">{item.customerName}</div>
          
          </div>
          <div className="item-container ">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <div className="number-box" style={{ backgroundColor: item.color }}>
              <h3 className="rounded p-2"> {item.number}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

{
  /* <div className="">
            <h4 className=" box-large-text">{item.driverName}</h4>
            <div className="mt-3">{item.customerName}</div>
            <div className="mb-3">Customer Name / Email</div>
          </div>
          <div className="item-container">
            <label className="switch mb-2 mb-md-0 me-md-3">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <div className="number-box" style={{ backgroundColor: item.color }}>
              <h3 className="p-2">{item.number}</h3>
            </div>
          </div> */
}
