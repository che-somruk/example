"use client";

import { useState } from "react";

export default function PokemonSearchPage() {
    interface Pokemon {
        name: string;
        sprite: string;
        weight: number;
        height: number;
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        setIsLoading(true);
        setPokemon(null);

        try {
        const res = await fetch(`/api/pokemon/${searchTerm.toLowerCase()}`);
        const data = await res.json();
        if (data.error) {
            setIsNotFound(true);
            setPokemon(null);
        } else {
            setIsNotFound(false);
            setPokemon(data);
        }
        } catch (error) {
        console.error("Error fetching Pokémon:", error);
        } finally {
        setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
        handleSearch();
        }
    };

    const toggleFavorite = () => {
        if (!pokemon) return; 
        const name = pokemon.name;
        if (favorites.includes(name)) {
        setFavorites(favorites.filter((fav) => fav !== name));
        } else {
        setFavorites([...favorites, name]); 
        }
    };

    const removeFromFavorites = (name: string) => {
        setFavorites(favorites.filter((fav) => fav !== name));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0E749D] to-[#30A7D7]">
            <div className="flex flex-col items-center flex-grow px-4 sm:px-8">
                <div className="flex justify-center items-center py-8 sm:py-12">
                <img src="/pokemon-logo.png" alt="Pokemon Logo" className="w-40 sm:w-40" />
                </div>

                <div className="relative p-0.5 bg-[#FFD700] rounded-xl w-full sm:max-w-[90%] md:max-w-[70%] lg:max-w-[800px] mx-auto">
                    <div className="p-0.5 bg-[#005B94] rounded-xl">
                        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full min-h-[430px]">
                            <div className="flex items-center bg-gray-100 p-3 rounded-md">
                                <span className="text-gray-500 text-lg pr-2"><img src="/search.png" alt="Filled Star" className="w-4 h-4" /></span>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-transparent outline-none text-gray-700"
                                    maxLength={50}
                                />
                                <span className="text-gray-400">{searchTerm.length}/50</span>
                            </div>

                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-[350px]">
                                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"/>
                                    <p className="text-lg font-semibold text-gray-700 mt-4">Sending Request</p>
                                    <p className="text-gray-500 text-sm">Please wait...</p>
                                </div>
                            ) : pokemon ? (
                                <div className="relative bg-white p-4 sm:p-6 rounded-xl mt-6 w-full">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                                        <div className="flex justify-center w-full">
                                            <img
                                                src={pokemon.sprite}
                                                alt={pokemon.name}
                                                className="w-40 sm:w-40 md:w-80 lg:w-96 rounded-lg bg-gray-100 p-4 transition-all duration-300"
                                            />
                                        </div>

                                        <div className="col-span-2 text-start sm:text-left">
                                            <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
                                                <h2 className="text-2xl font-bold text-black capitalize">{pokemon.name}</h2>
                                                <div className="text-end">
                                                    <button onClick={toggleFavorite} >
                                                        {favorites.includes(pokemon.name) ? (
                                                            <img src="/star-filled.png" alt="Filled Star" className="w-6 h-6" />
                                                        ) : (
                                                            <img src="/star-empty.png" alt="Empty Star" className="w-6 h-6" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
                                                <div>
                                                    <p className="text-sm">Weight</p>
                                                    <p className="text-lg font-semibold">{pokemon.weight / 10} kg</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm">Height</p>
                                                    <p className="text-lg font-semibold">{pokemon.height * 10} cm</p>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-gray-500 text-sm">Versions</p>
                                                <div className="flex flex-wrap gap-2 mt-2 justify-start text-black">
                                                    <span className="bg-blue-200 px-3 py-1 rounded-full text-sm font-medium">Red</span>
                                                    <span className="bg-blue-200 px-3 py-1 rounded-full text-sm font-medium">Green</span>
                                                    <span className="bg-blue-200 px-3 py-1 rounded-full text-sm font-medium">Blue</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : isNotFound ?  (
                                <div className="flex items-center justify-center h-[350px]">
                                    <p className="text-gray-500">Not Found</p>
                                </div>
                            ):(
                                <div className="flex items-center justify-center h-[350px]">
                                    <p className="text-gray-500">Try search for Pokémon by their name</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto w-full bg-white p-6 shadow-lg px-8">
                <div className="max-w-[800px] mx-auto">
                    <h2 className="text-xl font-bold text-black text-left mb-2">Favorite</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {favorites.map((name) => (
                        <div key={name} className="flex items-center bg-blue-100 px-4 py-2 rounded-md w-full sm:w-[400px] justify-between">
                            <span className="text-gray-700 capitalize">{name}</span>
                            <button onClick={() => removeFromFavorites(name)} className="text-black">
                            X
                            </button>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
