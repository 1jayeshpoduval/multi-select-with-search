import { useState } from "react";
import MultiSelectSearch from "./MultiSelectSearch";

function App() {
  return (
    <section className="h-screen">
      <div className="relative w-[90%] h-full mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <h1 className="font-medium text-xl text-neutral-800 tracking-tight">
            Multi-select with search
          </h1>
          <MultiSelectSearch />
        </div>
        <div className="text-neutral-400 text-center absolute bottom-6">
          Built by{" "}
          <a
            className="hover:text-neutral-900 transition-colors underline"
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
