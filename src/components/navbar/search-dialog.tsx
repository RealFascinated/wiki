"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

/**
 * The dialog for quickly searching the docs.
 *
 * @return the content jsx
 */
const QuickSearchDialog = ({
  pages,
  bindKeybind = false,
}: {
  pages: DocsContentMetadata[];
  bindKeybind?: boolean;
}): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const router: AppRouterInstance = useRouter();

  // Listen for CTRL + K keybinds to open this dialog
  useEffect(() => {
    if (!bindKeybind) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent): void => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setOpen((open: boolean) => !open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [bindKeybind]);

  // Render the contents
  return (
    <>
      {/* Button to open */}
      <div
        className="cursor-pointer hover:opacity-85 transition-all transform-gpu select-none"
        onClick={() => setOpen(true)}
      >
        <div className="absolute top-[0.55rem] left-3 z-10">
          <Search className="w-[1.15rem] h-[1.15rem]" />
        </div>

        <Input
          className="pl-10 rounded-lg cursor-pointer"
          type="search"
          name="search"
          placeholder="Search the docs..."
          readOnly
        />

        <div className="absolute top-[0.25rem] right-3">
          <kbd className="h-5 px-1.5 inline-flex gap-1 items-center bg-muted font-medium text-muted-foreground rounded select-none pointer-events-none">
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* Input */}
        <CommandInput
          className="select-none"
          placeholder="Start typing to get started..."
        />

        {/* Results */}
        <CommandList className="select-none">
          <CommandEmpty className="text-center text-red-500">
            No results were found.
          </CommandEmpty>

          <CommandGroup heading="Results">
            {pages?.map(
              (result: DocsContentMetadata, index: number): ReactElement => (
                <CommandItem
                  key={index}
                  className="flex flex-col gap-1 items-start cursor-pointer"
                  onSelect={() => {
                    setOpen(false);
                    router.push(`/${result.slug}`);
                  }}
                >
                  <h1 className="text-primary font-bold">{result.title}</h1>
                  <p className="opacity-60">{result.summary}</p>
                </CommandItem>
              )
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
export default QuickSearchDialog;
