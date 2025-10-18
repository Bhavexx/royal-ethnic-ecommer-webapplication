import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Star, ShoppingCart, Zap } from "lucide-react";
import { Product } from "@/data/store";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];
const colors = ["Red", "Blue", "Green", "Black", "White", "Pink", "Yellow", "Purple", "Orange"];

export default function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const priceINR = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price / 100);

  const primary = product.images?.[0];

  const handleAddToCart = () => {
    addItem({ 
      id: product.id, 
      title: product.title, 
      price: product.price, 
      image: primary!, 
      qty: 1,
      size: selectedSize || "M",
      color: selectedColor || "Default"
    });
    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addItem({ 
      id: product.id, 
      title: product.title, 
      price: product.price, 
      image: primary!, 
      qty: 1,
      size: selectedSize || "M",
      color: selectedColor || "Default"
    });
    navigate("/checkout");
  };

  return (
    <Card className={cn("group overflow-hidden", className)}>
      <div className="relative aspect-[4/5] overflow-hidden">
        {product.badges?.length ? (
          <div className="absolute left-2 top-2 z-10 flex gap-1">
            {product.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className="px-2 py-0.5 rounded text-[11px] bg-primary text-primary-foreground"
                aria-label={`Badge ${b}`}
              >
                {b}
              </span>
            ))}
          </div>
        ) : null}
        <img
          src={primary}
          alt={`${product.title} primary image`}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <button
          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-2 top-2 z-10 rounded-full bg-background/80 p-2 shadow hover:bg-background"
          onClick={() => {
            if (isInWishlist(product.id)) {
              removeFromWishlist(product.id);
              toast({ title: "Removed from Wishlist", description: `${product.title} removed from wishlist.` });
            } else {
              addToWishlist({ id: product.id, title: product.title, price: product.price, image: primary! });
              toast({ title: "Added to Wishlist", description: `${product.title} added to wishlist.` });
            }
          }}
        >
          <Heart size={16} className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""} />
        </button>
      </div>
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="line-clamp-1 font-medium" title={product.title}>
              {product.title}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
              <Star size={14} className="text-yellow-500" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="font-semibold">{priceINR}</div>
        </div>
        
        {/* Size and Color Selection */}
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size} className="text-xs">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((color) => (
                  <SelectItem key={color} value={color} className="text-xs">
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-3 space-y-2">
          <Button
            variant="secondary"
            className="w-full h-8 text-xs"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={14} className="mr-1" />
            Add to Cart
          </Button>
          <Button
            variant="default"
            className="w-full h-8 text-xs"
            onClick={handleBuyNow}
          >
            <Zap size={14} className="mr-1" />
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}