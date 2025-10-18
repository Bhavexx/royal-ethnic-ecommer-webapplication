import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Products" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
  { id: "shoes", label: "Shoes" },
  { id: "jewellery", label: "Jewellery" },
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export function CategoryFilter({ activeCategory, onCategoryChange, className }: CategoryFilterProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-2", className)}>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="whitespace-nowrap"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}