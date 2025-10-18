import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo-royal.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/context/CartContext";

const categories = [
  { name: "Men", items: ["Kurtas", "Sherwanis", "Jackets", "Footwear"] },
  { name: "Women", items: ["Sarees", "Lehengas", "Suits", "Jewellery"] },
  { name: "Kids", items: ["Ethnic Sets", "Footwear"] },
  { name: "Shoes", items: ["Juttis", "Mojaris", "Sandals"] },
  { name: "Jewellery", items: ["Kundan", "Polki", "Bangles", "Earrings"] },
  { name: "Accessories", items: ["Bags", "Stoles", "Belts"] },
  { name: "New Arrivals", items: ["This Week", "Festive '24"] },
  { name: "Sale", items: ["Men", "Women", "Kids"] },
];

export function Navbar() {
  const isMobile = useIsMobile();
  const { items } = useCart();
  const [elevated, setElevated] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = items.reduce((a, i) => a + i.qty, 0);

  const SearchBar = (
    <div className="flex-1 max-w-xl mx-6 hidden md:flex">
      <div className="relative w-full">
        <Input
          placeholder="Search ‘Kundan’, ‘Sherwani’, ‘Lehenga’…"
          className="pl-10"
          onFocus={() => setSearchOpen(true)}
          aria-label="Search products"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70" size={18} />
      </div>
    </div>
  );

  return (
    <header className={`sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 ${elevated ? "shadow" : ""}`}> 
      <nav className="container mx-auto h-16 flex items-center">
        {/* Left */}
        <div className="flex items-center gap-2">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" aria-label="Open menu"><Menu /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="mt-6 grid gap-4">
                  {categories.map((cat) => (
                    <div key={cat.name}>
                      <div className="font-semibold">{cat.name}</div>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                        {cat.items.map((i) => (
                          <NavLink key={i} to={`/collections/${cat.name.toLowerCase()}`} className="hover:text-foreground">{i}</NavLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}

          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Royal Royal Ethnic logo" className="h-8 w-auto" />
            <span className="font-semibold text-lg hidden sm:block">Royal Royal Ethnic</span>
          </Link>
          
          {!isMobile && (
            <Button variant="ghost" asChild className="ml-4">
              <Link to="/">Home</Link>
            </Button>
          )}
        </div>

        {/* Center */}
        {!isMobile && SearchBar}

        {/* Right */}
        <div className="ml-auto flex items-center gap-2">
          {!isMobile && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="premium" className="group">
                  All Categories <ChevronDown className="ml-1 transition-transform group-data-[state=open]:rotate-180" size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[800px] p-6 bg-background shadow-xl border">
                <div className="grid grid-cols-4 gap-6">
                  {categories.map((cat) => (
                    <div key={cat.name}>
                      <div className="font-semibold mb-2">{cat.name}</div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {cat.items.map((i) => (
                          <li key={i}><NavLink to={`/collections/${cat.name.toLowerCase()}`} className={({isActive}) => isActive ? "text-primary" : "hover:text-foreground"}>{i}</NavLink></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
          <ThemeToggle />
          <Button variant="ghost" aria-label="Wishlist"><Heart /></Button>
          <Button variant="ghost" aria-label="Search" className="md:hidden" onClick={() => setSearchOpen(true)}><Search /></Button>
          <Button variant="ghost" aria-label="Cart" onClick={() => navigate("/checkout")}
            className="relative">
            <ShoppingBag />
            {cartCount > 0 && (
              <span aria-label="cart items" className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div role="dialog" aria-modal className="fixed inset-0 z-50 bg-[hsl(var(--brand-black)/0.5)] flex items-start justify-center pt-24 animate-fade-in">
          <div className="bg-background w-full max-w-2xl rounded-lg shadow-xl mx-4 p-4">
            <div className="relative">
              <Input autoFocus placeholder="Search Royal Royal Ethnic" className="pl-10" onKeyDown={(e)=>{ if(e.key==='Enter'){ setSearchOpen(false); }}} />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70" size={18} />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">Try: Kundan • Sherwani • Saree</div>
            <div className="mt-2 text-right">
              <Button variant="ghost" onClick={()=>setSearchOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
