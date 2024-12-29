import MultiselectSearch from "./MultiselectSearch";

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

function App() {
  return (
    <section className="h-screen">
      <div className="relative w-[90%] h-full mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <h1 className="font-medium text-xl text-neutral-800 tracking-[-0.01em]">
            Multi-select with search
          </h1>
          <MultiselectSearch items={items} />
        </div>
        <div className="text-neutral-400 text-center absolute bottom-6">
          Built by {""}
          <a
            className="hover:text-neutral-900 transition-colors"
            href="https://x.com/1jayeshpoduval"
            target="_blank"
            rel="noreferrer"
          >
            @1jayeshpoduval
          </a>
        </div>
      </div>
    </section>
  );
}

export default App;
