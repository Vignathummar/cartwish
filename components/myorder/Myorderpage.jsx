import React from "react";
import Table from "../common/Table";
import useData from "../../hooks/useData";

const Myorderpage = () => {
  const { data: orders, error } = useData("/order");
  const getProductString = (order) => {
    const productStringArr = order.products.map(
      (p) => `${p.product.title}(${p.quantity})`
    );
    return productStringArr.join(", ");
  };
  return (
    <section className="my-10">
      {error && <em className="text-red-700">{error}</em>}
      {orders && (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => (
              <tr className="text-center" key={order._id}>
                <td className="border border-slate-300 p-1">{index + 1}</td>
                <td className="border border-slate-300 p-1">
                  {getProductString(order)}
                </td>
                <td className="border border-slate-300 p-1">${order.total}</td>
                <td className="border border-slate-300 p-1">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
};

export default Myorderpage;
