import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

const PokeIdPage = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const [pokemon, getSinglePokemon] = useFetch(url);

  useEffect(() => {
    getSinglePokemon();
  }, [id]);
  console.log(pokemon);

  return (
    <div>
      <img src="/pdx.png" alt="" width={300} className=" mx-auto mt-2" />

      <article className="d-flex mt-3 justify-content-around border border-2 mx-5 p-5">
        <img
          src={pokemon?.sprites?.other["official-artwork"]?.front_default}
          className="col-4 col-2"
          alt="..."
        />
        <div className="col-4 flex-column d-flex justify-content-between">
          <h2 className="text-uppercase">{pokemon?.name}</h2>
          <div>
            <p className="card-text display-6 mb-5">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <ul>
              <li>Type: {pokemon?.types[0]?.type?.name}</li>
              <li>Type: {pokemon?.types[1]?.type?.name}</li>
              <li>Base Experience: {pokemon?.base_experience}</li>
            </ul>
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
          <div></div>
        </div>
      </article>
    </div>
  );
};

export default PokeIdPage;
