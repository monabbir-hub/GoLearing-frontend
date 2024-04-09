import { createContext, useContext, useState } from "react";

const ManageCourseContext = createContext();

export default function ManageCourseProvider({ children }) {
  const [clickedModule, setClickedModule] = useState(null);
  const [clickedChapter, setClickedChapter] = useState(null);
  const [clickedContent, setClickedContent] = useState(null);
  const [counter, setCounter] = useState(0);
  //   console.log(clickedModule);
  return (
    <ManageCourseContext.Provider
      value={{
        clickedModule,
        setClickedModule,
        clickedChapter,
        setClickedChapter,
        clickedContent,
        setClickedContent,
        counter,
        setCounter,
      }}
    >
      {children}
    </ManageCourseContext.Provider>
  );
}

export function useManageCourse() {
  const ctx = useContext(ManageCourseContext);
  if (!ctx) throw new Error();
  return ctx;
}
