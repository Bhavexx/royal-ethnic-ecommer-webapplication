import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

// Mock order data
const mockOrders = [
  {
    id: "ORD001",
    date: "2024-01-15",
    status: "delivered",
    total: 15000,
    items: 3,
    estimatedDelivery: "Delivered on Jan 18, 2024"
  },
  {
    id: "ORD002", 
    date: "2024-01-20",
    status: "shipped",
    total: 8500,
    items: 2,
    estimatedDelivery: "Expected by Jan 25, 2024"
  },
  {
    id: "ORD003",
    date: "2024-01-22",
    status: "processing",
    total: 12000,
    items: 1,
    estimatedDelivery: "Expected by Jan 28, 2024"
  }
];

const statusConfig = {
  processing: { label: "Processing", icon: Clock, color: "bg-yellow-500" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-blue-500" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-green-500" }
};

export default function Orders() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-playfair">My Orders</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </div>

      {mockOrders.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
            <Button onClick={() => navigate("/")}>Start Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => {
            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={`${statusConfig[order.status as keyof typeof statusConfig].color} text-white`}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Date</p>
                      <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-medium">₹{(order.total / 100).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Items</p>
                      <p className="font-medium">{order.items} item{order.items > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Delivery Status</p>
                    <p className="font-medium">{order.estimatedDelivery}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">Reorder</Button>
                    )}
                    {order.status === "shipped" && (
                      <Button variant="outline" size="sm">Track Package</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}