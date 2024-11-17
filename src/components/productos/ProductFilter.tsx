"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function ProductFilter() {
    const [query, setQuery] = useState("");
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState("name");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (query.trim()) params.append("query", query);
        params.append("minPrice", "0");
        if (maxPrice !== null) params.append("maxPrice", maxPrice.toString());
        params.append("sortOrder", sortOrder);
        router.push(`/producto?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="space-y-6 font-mono mt-3">
            <div>
                <h2 className="text-xl font-semibold mb-2">Search</h2>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full rounded-md border-0 bg-white px-2 py-2 text-sm text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label>Precio máximo:</label>
                <Slider
                    defaultValue={[0]}
                    max={300000}
                    step={1000}
                    onValueChange={(value) => setMaxPrice(value[0])}
                    className="w-full"
                />
                <div className="text-sm">
                    <span>Hasta ${maxPrice !== null ? maxPrice : "No seleccionado"}</span>
                </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Ordenar por</h2>
              <Select onValueChange={(value) => setSortOrder(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-[#0E1D35] hover:bg-[#0E1D35]/90 text-white">
                Apply Filters
            </Button>
        </form>
    );
}