import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import Lottie from "lottie-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import loaderAnimation from "./assets/LoaderAnim.json";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Command as CommandPrimitive } from "cmdk";
import useDebouncedSearchInput from "@/useDebouncedSearchInput";

const items = [
  {
    id: 1,
    aisle: 3,
    product: "Apples",
  },
  {
    id: 2,
    aisle: 5,
    product: "Chocolate",
  },
  {
    id: 3,
    aisle: 4,
    product: "Potato Chips",
  },
  {
    id: 4,
    aisle: 3,
    product: "Bananas",
  },
  {
    id: 5,
    aisle: 3,
    product: "Strawberries",
  },
];

const MultiSelectSearchBar = () => {
  const searchRef = useRef(null);
  const search = searchRef.current;

  const loaderAnimationRef = useRef(null);

  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebouncedSearchInput(searchInput, 700);

  const [isLoading, setIsLoading] = useState(false); // Loading Animation

  const shouldReduceMotion = useReducedMotion();
  const badgeAnimationVariants = {
    hidden: {
      scale: shouldReduceMotion ? 1 : 0.5,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  // Handle debounced filtering
  useEffect(() => {
    const filteredOptions = items.filter((item) =>
      item.product.toLowerCase().includes(debouncedSearchInput.toLowerCase())
    );
    setFilteredItems(filteredOptions);
    setIsLoading(false);
  }, [debouncedSearchInput]);

  const handleSearchFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleSearchBlur = () => {
    setIsDropdownOpen(false);
  };

  const handleSearchValueChange = (value) => {
    let loaderTimeout;

    if (loaderTimeout) {
      clearTimeout(loaderTimeout);
    }

    loaderTimeout = setTimeout(() => setIsLoading(true), 500);
    setSearchInput(value);
  };

  const handleItemSelect = (id) => {
    const selectedItem = filteredItems.find(
      (filteredItem) => filteredItem.id === id
    );
    // To avoid selecting the same ingredient twice
    if (selectedItems.includes(selectedItem)) {
      return setSelectedItems((prevSelectedItems) => [...prevSelectedItems]);
    } else {
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        selectedItem,
      ]);
      setSearchInput("");
    }
  };

  const handleRemoveSelectedItem = (id) => {
    return setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem.id !== id)
    );
  };

  const handleBackspace = (e) => {
    if (search) {
      if (e.key === "Backspace") {
        setSelectedItems((prevSelectedItems) => {
          if (search.value === "" && prevSelectedItems.length >= 1) {
            return prevSelectedItems.slice(0, -1);
          }
          return prevSelectedItems;
        });
      }
    }
  };

  return (
    <>
      <Command
        shouldFilter={false} // Disable default filtering
        className="relative max-w-[35rem] overflow-visible rounded-md border bg-transparent"
        onKeyDown={handleBackspace}
      >
        <motion.div className="relative flex flex-wrap items-center gap-2 rounded-md border border-transparent bg-white p-2 shadow-custom transition-shadow focus-within:shadow-none focus-within:ring-1 focus-within:ring-neutral-900 focus-within:ring-offset-2 focus-within:ring-offset-neutral-300">
          <AnimatePresence mode="popLayout">
            {selectedItems.map((selectedItem) => (
              <motion.div
                key={selectedItem.id}
                variants={badgeAnimationVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
              >
                <Badge
                  className="space-x-2 bg-neutral-900 px-2 py-1 transition-none hover:bg-neutral-900"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <span className="text-[1rem] font-normal">
                    {selectedItem.product}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveSelectedItem(selectedItem.id)}
                  >
                    <X size={16} />
                  </motion.button>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>

          {/*Custom styled input field*/}
          <CommandPrimitive.Input
            ref={searchRef}
            className="flex-grow bg-transparent outline-none"
            value={searchInput}
            onValueChange={handleSearchValueChange}
            placeholder="Search items..."
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          ></CommandPrimitive.Input>
          {isLoading && (
            <Lottie
              className="absolute -right-4 h-24 w-24"
              animationData={loaderAnimation}
              lottieRef={loaderAnimationRef}
              aria-label="Loader Animation"
            />
          )}
        </motion.div>

        {isDropdownOpen && (
          <CommandList className="absolute left-0 right-0 top-[100%] overflow-visible">
            <div className="mt-4 rounded-md bg-white shadow-custom">
              <CommandEmpty>
                <span className="text-[1rem]">No results found.</span>
              </CommandEmpty>
              <CommandGroup>
                {filteredItems.map((filteredItem) => (
                  <CommandItem
                    key={filteredItem.id}
                    className={` ${
                      selectedItems.includes(filteredItem)
                        ? "cursor-default"
                        : "cursor-pointer"
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      handleItemSelect(filteredItem.id);
                    }}
                  >
                    {selectedItems.includes(filteredItem) ? (
                      <>
                        <span className="text-[1rem] text-neutral-500">
                          {filteredItem.product}
                        </span>
                        <Check color="#737373" />
                      </>
                    ) : (
                      <span className="text-[1rem] text-neutral-900">
                        {filteredItem.product}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </CommandList>
        )}
      </Command>
    </>
  );
};

export default MultiSelectSearchBar;
