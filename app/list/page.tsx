import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavShell } from "@/components/nav-shell";
import { Search } from "lucide-react";

const items = [
  { id: "1", name: "Item one", category: "Category", price: "$1,000" },
  { id: "2", name: "Item two", category: "Category", price: "$5,000" },
  { id: "3", name: "Item three", category: "Category", price: "$5" },
];

export default function ListPage() {
  return (
    <NavShell title="Store">
      <div className="space-y-4 p-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Store</h1>
          <p className="mt-1 text-sm text-muted">Placeholder copy — replace with real content.</p>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <Input placeholder="Search services" className="pl-11" />
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted">{item.category}</p>
                  <p className="mt-2 text-base font-semibold text-brand">{item.price}</p>
                </div>
                <Button variant="brand" size="sm">
                  Add
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </NavShell>
  );
}
