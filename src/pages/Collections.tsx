import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { products } from "@/data/store";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";

export default function Collections() {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState(category || "all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter(product => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-playfair text-3xl mb-2">
          {activeCategory === "all" ? "All Collections" : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Collection`}
        </h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <CategoryFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          className="flex-1"
        />
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewMode === "grid" 
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
          : "grid-cols-1 md:grid-cols-2"
      }`}>
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            className={viewMode === "list" ? "md:flex-row md:max-w-none" : ""}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found in this category.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setActiveCategory("all")}
          >
            View All Products
          </Button>
        </div>
      )}
    </main>
  );
}