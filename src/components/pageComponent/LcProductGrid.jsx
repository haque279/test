import React from "react";
import { Table, Button } from "reactstrap";
import { X } from "react-feather";

const LcProductGrid = ({ productList, delteRow }) => {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>SL</th>
            <th>SkU</th>
            <th>Product</th>
            <th>Manufacture</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Qunatity</th>
            <th>Unit</th>
            <th>Unit Price</th>
            <th>Total</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((item, index) => (
            <tr key={index}>
              <th scope="row">1</th>
              <td>{item.lcProduct.sKU_Code}</td>
              <td>{item.lcProduct.gEN_Nm}</td>
              <td>{item.lcProduct.vE_Nm}</td>
              <td>{item.lcProduct.bR_Nm}</td>
              <td>{item.lcProduct.cT_Nm}</td>
              <td>{item.quantity}</td>
              <td>{item.unitId.label}</td>
              <td>{item.unitPrice}</td>
              <td>{item.myTotal}</td>
              <td>
                <Button
                  color="danger"
                  className="btn-icon rounded-circle"
                  onClick={(e) => delteRow(item.lcProduct.skuId)}
                >
                  <X size={15} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LcProductGrid;
