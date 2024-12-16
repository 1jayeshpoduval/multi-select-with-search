import { useState } from "react";
import MultiSelectSearch from "./MultiSelectSearch";

function App() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-[90%] mx-auto flex flex-col gap-4 items-center justify-center">
        <MultiSelectSearch />
      </div>
    </section>
  );
}

export default App;
