import React from "react";
import { cn } from "@/lib/utils";
import {
  CommandItem,
  CommandEmpty,
  CommandList,
  CommandDialog,
  CommandInput,
  CommandGroup,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { type DialogProps } from "@radix-ui/react-dialog";

export function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-56 md:w-96  justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 ",
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Collectibles</CommandItem>
            <CommandItem>Clothing</CommandItem>
            <CommandItem>Jewelry</CommandItem>
            <CommandItem>Electronics</CommandItem>
            <CommandItem>Motors</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}