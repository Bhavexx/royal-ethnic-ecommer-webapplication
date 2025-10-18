import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Gem } from "lucide-react";
import logo from "@/assets/logo-royal.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <img src={logo} alt="Royal Royal Ethnic logo" className="h-10 w-auto" />
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">Royal Royal Ethnic — Where Tradition Meets Trend. Crafted with care, delivered with pride.</p>
          <div className="mt-4 flex gap-3">
            <a aria-label="Instagram" href="#" className="story-link"><Instagram /></a>
            <a aria-label="Facebook" href="#" className="story-link"><Facebook /></a>
            <a aria-label="YouTube" href="#" className="story-link"><Youtube /></a>
            <a aria-label="Pinterest" href="#" className="story-link"><Gem /></a>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Our Craft</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Press</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Customer Care</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="#">Contact</Link></li>
            <li><Link to="#">FAQs</Link></li>
            <li><Link to="#">Shipping</Link></li>
            <li><Link to="#">Returns</Link></li>
            <li><Link to="#">Track Order</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Shop</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="#">Men</Link></li>
            <li><Link to="#">Women</Link></li>
            <li><Link to="#">Kids</Link></li>
            <li><Link to="#">Shoes</Link></li>
            <li><Link to="#">Jewellery</Link></li>
            <li><Link to="#">Sale</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto py-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <form className="flex w-full md:w-auto max-w-md gap-2">
            <Input type="email" placeholder="Your email for 10% off" aria-label="Newsletter" />
            <Button variant="hero">Subscribe</Button>
          </form>
          <p className="text-xs text-muted-foreground">© Royal Royal Ethnic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
