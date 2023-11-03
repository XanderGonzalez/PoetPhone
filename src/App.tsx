import React, { useState } from "react";
import "./App.css";
import {
  GlobalState,
  baseGlobalState,
  SearchBar,
  DisplayText,
  ContentArray,
} from "./components/header";
import TextInputContainer from "./components/TextInputContainer";
import PhonemeDisplayContainer from "./components/PhonemeDisplayContainer";
import SearchBoxContainer from "./components/SearchBoxContainer";

export const GlobalContext = React.createContext<GlobalState>(baseGlobalState);

export default function App() {
  const [currentSearch, setCurrentSearch] = useState<SearchBar>(
    new SearchBar([])
  );
  const [displayText, setDisplayText] = useState<DisplayText>([]);
  const [userText, setUserText] = useState("");
  const [rightPos, setRightPos] = useState<number[]>([]);

  const globalState: GlobalState = {
    search: {
      get: currentSearch.getContent(),
      set: (e: ContentArray) => setCurrentSearch(new SearchBar(e)),
    },
    display: { get: displayText, set: (e: DisplayText) => setDisplayText(e) },
    user: { get: userText, set: (e: string) => setUserText(e) },
    rightPos: { get: rightPos, set: (e: number[]) => setRightPos(e) },
  };

  return (
    <GlobalContext.Provider value={globalState}>
      <div className="App-header">
        <TextInputContainer />
        <PhonemeDisplayContainer />
        <SearchBoxContainer />
      </div>
    </GlobalContext.Provider>
  );
}
