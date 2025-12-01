// src\pages\OrderDetailsPage.jsx
import { useParams, Link } from "react-router-dom";
import { useOrdersStore } from "../hooks/useOrdersStore";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const orders = useOrdersStore((s) => s.orders);
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Order Not Found</h1>
        <Link to="/dashboard/orders">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const statusColor = (status) => {
    if (status === "Paid") return "green";
    if (status === "Pending") return "yellow";
    if (status === "Cancelled") return "red";
    return "gray";
  };

  const totalItems = order.items.reduce((sum, item) => sum + item.qty, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">Order {order.id}</h1>
          <p className="text-sm text-slate-500">
            Detailed information about this order.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            Print
          </Button>
          <Link to="/dashboard/orders">
            <Button variant="outline">Back to Orders</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Order Items" />
          <CardBody>
            <div className="space-y-3 text-sm">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      Qty: {item.qty} × ${item.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${item.qty * item.price}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-sm font-medium">
                  Total ({totalItems} items)
                </span>
                <span className="text-lg font-semibold">${order.amount}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Customer Info" />
            <CardBody className="text-sm space-y-1">
              <p>
                <span className="font-medium">Name: </span> {order.customer}
              </p>
              <p>
                <span className="font-medium">Payment: </span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Status: </span>{" "}
                <Badge color={statusColor(order.status)}>
                  {order.status}
                </Badge>
              </p>
              <p>
                <span className="font-medium">Date: </span> {order.date}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Timeline" />
            <CardBody className="text-sm space-y-2">
              {order.timeline.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">{t.label}</p>
                    <p className="text-xs text-slate-500">{t.date}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
