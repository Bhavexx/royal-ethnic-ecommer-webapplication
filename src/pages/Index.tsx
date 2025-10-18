import { Button } from "@/components/ui/button";
import { heroImage, products } from "@/data/store";
import men from "@/assets/cat-men.jpg";
import women from "@/assets/cat-women.jpg";
import kids from "@/assets/cat-kids.jpg";
import shoes from "@/assets/cat-shoes.jpg";
import jewellery from "@/assets/cat-jewellery.jpg";
import ProductCard from "@/components/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  const kundan = products.filter((p) => p.category === "jewellery");
  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Royal Royal Ethnic — Royal Picks",
    itemListElement: products.slice(0, 6).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `/product/${p.slug}`,
      item: {
        "@type": "Product",
        name: p.title,
        image: p.images[0],
        sku: p.id,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: (p.price / 100).toFixed(0),
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }} />

      <section aria-label="Hero" className="relative min-h-[70vh] flex items-end">
        <img src={heroImage} alt="Royal editorial couple in ethnic wear" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
        <div className="container mx-auto relative z-10 py-16">
          <h1 className="font-playfair text-4xl md:text-6xl max-w-2xl">Royal Royal Ethnic — Where Tradition Meets Trend.</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Discover premium ethnic wear for every celebration. Curated collections crafted with elegance.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="hero">Shop Men</Button>
            <Button variant="premium">Shop Women</Button>
            <Button variant="outline">Shop Kids</Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12" aria-label="Categories">
        <h2 className="font-playfair text-2xl mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[{img:men,label:'Men',to:'/collections/men'},{img:women,label:'Women',to:'/collections/women'},{img:kids,label:'Kids',to:'/collections/kids'},{img:shoes,label:'Shoes',to:'/collections/shoes'},{img:jewellery,label:'Jewellery',to:'/collections/jewellery'}].map(c => (
            <a key={c.label} href={c.to} className="relative overflow-hidden rounded-lg group block"> 
              <img src={c.img} alt={`${c.label} category`} className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-black)/0.6)] to-transparent flex items-end p-3 text-card">
                <span className="font-medium">{c.label}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-10" aria-label="Royal Picks">
        <h2 className="font-playfair text-2xl mb-6">Royal Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 24).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-10" aria-label="Trending Kundan">
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-playfair text-2xl">Trending Kundan</h2>
        </div>
        <Carousel>
          <CarouselContent>
            {kundan.map((p) => (
              <CarouselItem key={p.id} className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard product={p} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="border-t">
        <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Trust">
          {["Free returns","Secure payments","Fast shipping"].map((t)=> (
            <div key={t} className="text-center p-4 rounded-md bg-card shadow-sm">{t}</div>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-10" aria-label="Newsletter">
        <div className="rounded-xl p-8 bg-card shadow" role="region">
          <h3 className="font-playfair text-2xl">Join the Royal Circle</h3>
          <p className="text-muted-foreground">Get 10% off your first order and early access to Royal Picks.</p>
          <div className="mt-4 flex gap-2 max-w-md">
            <input type="email" className="flex-1 border rounded-md px-3 py-2 bg-background" placeholder="Your email" aria-label="Email" />
            <Button variant="hero">Subscribe</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
