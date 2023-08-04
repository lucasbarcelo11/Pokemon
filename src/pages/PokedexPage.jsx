import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/pokedexPage/PokeCard";
import SelectType from "../components/pokedexPage/SelectType";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("allPokemons");
  console.log(selectValue);

  const trainer = useSelector((reducer) => reducer.trainer);

  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=600";
  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url);

  useEffect(() => {
    if (selectValue === "allPokemons") {
      getAllPokemons();
    } else {
      getPokemonsByType(selectValue);
    }
  }, [selectValue]);

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim().toLowerCase());
  };

  const cbFilter = (poke) => poke.name.includes(inputValue);

  return (
    <div>
      <p>
        <span>Welcome {trainer}</span>, here you can find your favorite pokemon
      </p>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputSearch}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
        <button>Search</button>
      </form>
      <SelectType setSelectValue={setSelectValue} />
      <div className="d-flex justify-content-center">
        <div className="grids">
          {pokemons?.results.filter(cbFilter).map((poke) => (
            <PokeCard key={poke.url} url={poke.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokedexPage;
