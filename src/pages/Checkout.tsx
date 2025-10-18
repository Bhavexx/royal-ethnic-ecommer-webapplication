import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Checkout() {
  const { items, subtotal, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, newQty: number) => {
    if (newQty < 1) {
      removeItem(id);
      toast({ title: "Item Removed", description: "Item removed from cart" });
    } else {
      updateQty(id, newQty);
    }
  };

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-playfair mb-6">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">Add some beautiful items to get started</p>
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size || "M"} | Color: {item.color || "Default"}
                      </p>
                      <p className="font-semibold mt-1">₹{(item.price / 100).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center">{item.qty}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                    <span>₹{(subtotal / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹{((subtotal * 0.18) / 100).toLocaleString()}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{((subtotal * 1.18) / 100).toLocaleString()}</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/payment")}
                  variant="default"
                >
                  Proceed to Payment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
