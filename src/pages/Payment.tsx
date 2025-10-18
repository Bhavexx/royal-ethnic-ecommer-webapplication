import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { CreditCard, Smartphone, Truck, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type PaymentMethod = "card" | "online" | "cod";
type PaymentStep = "method" | "details" | "success";

export default function Payment() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [step, setStep] = useState<PaymentStep>("method");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return false;
    }

    if (paymentMethod === "card") {
      const { cardNumber, expiryDate, cvv } = formData;
      if (!cardNumber || !expiryDate || !cvv) {
        toast({ title: "Error", description: "Please fill all card details", variant: "destructive" });
        return false;
      }
    }

    if (paymentMethod === "online") {
      const { upiId } = formData;
      if (!upiId) {
        toast({ title: "Error", description: "Please enter UPI ID", variant: "destructive" });
        return false;
      }
    }

    return true;
  };

  const processPayment = () => {
    if (!validateForm()) return;

    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
      clear();
      toast({ 
        title: "Payment Successful!", 
        description: "Your order has been placed successfully.",
      });
    }, 2000);
  };

  if (items.length === 0 && step !== "success") {
    return (
      <main className="container mx-auto py-10">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">Add some items to proceed with payment</p>
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (step === "success") {
    return (
      <main className="container mx-auto py-10">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for your purchase. Your order will be delivered soon.
            </p>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/orders")}>
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-10">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="w-5 h-5" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="w-5 h-5" />
                    Online Payment (UPI/Scanner)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                    <Truck className="w-5 h-5" />
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your full address"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          {paymentMethod === "card" && (
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "online" && (
            <Card>
              <CardHeader>
                <CardTitle>Online Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="upiId">UPI ID *</Label>
                  <Input
                    id="upiId"
                    value={formData.upiId}
                    onChange={(e) => handleInputChange("upiId", e.target.value)}
                    placeholder="yourname@upi"
                  />
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <img 
                    src="/lovable-uploads/6a051552-4df1-47af-9ff7-dc5c456ac816.png" 
                    alt="QR Code for Payment" 
                    className="w-48 h-48 mx-auto mb-2"
                  />
                  <p className="text-sm text-muted-foreground">UPI ID: bhaviknaik05@ibl</p>
                  <p className="text-xs text-muted-foreground mt-1">Scan this QR code to pay</p>
                </div>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "cod" && (
            <Card>
              <CardHeader>
                <CardTitle>Cash on Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You will pay ₹{(subtotal / 100).toLocaleString()} in cash when your order arrives.
                  Please ensure you have the exact amount ready.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      Size: {item.size || "M"} | Color: {item.color || "Default"} | Qty: {item.qty}
                    </p>
                  </div>
                  <span className="font-medium">₹{(item.price * item.qty / 100).toLocaleString()}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>₹{(subtotal / 100).toLocaleString()}</span>
              </div>
              <Button className="w-full" onClick={processPayment}>
                {paymentMethod === "card" && "Pay Now"}
                {paymentMethod === "online" && "Confirm Payment"}
                {paymentMethod === "cod" && "Place Order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}