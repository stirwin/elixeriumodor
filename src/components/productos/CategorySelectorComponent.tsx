"use client";

import { useState } from "react";
import { Category } from "../../../sanity.types";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckmarkIcon, ChevronUpIcon } from "@sanity/icons";
import { PopoverContent } from "@radix-ui/react-popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CategorySelectorProps {
    categories: Category[];
    value?: string;
    onChange?: (value: string) => void;
    isLandingPage?: boolean;
}

export function CategorySelectorComponent({ 
    categories = [], 
    value: externalValue = "", 
    onChange,
    isLandingPage = false
}: CategorySelectorProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(externalValue);

    const handleSelect = (categoryId: string) => {
        const newValue = selectedValue === categoryId ? "" : categoryId;
        setSelectedValue(newValue);
        
        if (isLandingPage && categoryId) {
            // Redirigir a la página de productos con el filtro de categoría
            router.push(`/producto?category=${categoryId}`);
        } else if (onChange) {
            // Si no estamos en la landing page, usamos el onChange normal
            onChange(newValue);
        }
        
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
           
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full max-w-full relative flex justify-between items-center space-x-2 rounded-md p-4 "
                >
                    <span className="flex-1 text-left">
                        {selectedValue && categories?.length
                            ? categories.find((category) => category?.slug?.current === selectedValue)?.title
                            : "Selecciona una categoría"}
                    </span>
                    <ChevronUpIcon className="h-4 w-4 shrink-0" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandInput placeholder="Buscar categoría..." />
                    <CommandList>
                        <CommandEmpty>No se encontraron categorías</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={() => handleSelect(category?.slug?.current || "")}
                                >
                                    {category.title}
                                    <CheckmarkIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedValue === category?.slug?.current ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}