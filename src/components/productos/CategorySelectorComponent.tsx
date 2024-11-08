"use client";

import { useState } from "react";
import { Category } from "../../../sanity.types";
import { useRouter } from "next/navigation";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckmarkIcon, ChevronUpIcon } from "@sanity/icons";
import { PopoverContent } from "@radix-ui/react-popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface CategorySelectorProps {
    categories: Category[];
}

export function CategorySelectorComponent({ categories }: CategorySelectorProps) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>("");
    const router = useRouter();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full max-w-full relative  flex justify-center items-center space-x-2 rounded-md p-4"
                >
                    {value
                        ? categories.find((category) => category._id === value)?.title
                        : "Selecciona una categoria"}
                    <ChevronUpIcon className="ml-2 h-4 w-4 shrink-0" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0 z-50">
                <Command className="z-50">
                    <CommandInput
                        placeholder="Busca una categoria"
                        className="h-9"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const selectedCategory = categories.find((c) =>
                                    c.title
                                        ?.toLowerCase()
                                        .includes(e.currentTarget.value.toLowerCase())
                                );
                                if (selectedCategory?.slug?.current) {
                                    setValue(selectedCategory._id);
                                    router.push(`/categoria/${selectedCategory.slug.current}`);
                                    setOpen(false);
                                }
                            }
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>No se encontraron categorias</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={() => {
                                        setValue(value === category._id ? "" : category._id);
                                        router.push(`/categoria/${category.slug?.current}`);
                                        setOpen(false);
                                    }}
                                >
                                    {category.title}
                                    <CheckmarkIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === category._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}