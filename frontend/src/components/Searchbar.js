import { useEffect, useState } from "react";

const getAutoComplete = (query) => {
  const names = [
    "CHAN TAI MAN",
    "CHAN TSZ MN",
    "LAM TI MAN",
    "LAM TAI MAN",
    "LAM TO MAN",
    "FAT TAN",
    "FAT YAN",
    "CHAN TAI MOON",
    "CHEN TSZ TSZ",
    "CHOW HIM YAU",
    "HELLO WORLD",
    "LOREM",
    "GOOD MORNING",
  ];

  return names.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );
};

const useDebounceValue = (value, time = 250) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debounceValue;
};



const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const debounceQuery = useDebounceValue(query);

  useEffect(() => {
    setSuggestion([])
    if(debounceQuery.length> 0){
        console.log(debounceQuery)
        const data = getAutoComplete(debounceQuery);
        console.log(data)
        setSuggestion(data);
 
    }
    //anytime query changes, useEffect will run
  }, [debounceQuery]);


  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
export default Searchbar;
