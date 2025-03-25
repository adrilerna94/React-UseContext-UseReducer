'use client';

import { createContext } from "react";
import { initialState, resourcesReducer } from "./resourceReducer";

// 1. Crear el contexto
export const ResourcesContext = createContext();

// 2. Definir el Mission Provider
export const ResourcesProvider = ({ children }) => {
    // usamos el reducer creado
    const [state, dispatch] = useReducer(initialState, resourcesReducer);

    // funciones para interactuar con el estado
    const startMission = ({
        astronautsNames,
        crewCount,
        missionDay,
        inMission,
        reciclyingSystem,
        navigationModule,
        energy,
        oxygen,
        water,
        proteinServings,
    }) => {
        dispatch({
            type: 'START_MISSION',
            payload: {
                astronautsNames,
                crewCount,
                missionDay,
                inMission,
                reciclyingSystem,
                navigationModule,
                energy,
                oxygen,
                water,
                proteinServings,
            }
        });
    };
    
    // 👩‍🚀👩‍🚀 ASTRONAUTNS
    const setAstronauts = (astronautsNames) => {
        dispatch({type: 'SET_ASTRONAUTS', payload: astronautsNames});
    } 
    function addAstronaut (astronautName) {
        dispatch({
            type: 'ADD_ASTRONAUT',
            payload: astronautName,
        });
    }
    function removeAstronaut (astronautName) {
        dispatch({type: 'REMOVE_ASTRONAUT', payload: astronautName});
    }
    // 🅾️ OXYGEN
    const increaseOxygen = (increment)  => {
        dispatch({ type: 'INCREASE_OXYGEN', payload: increment });
    }
    const decreaseOxygen = (decrement)  => {
        dispatch({ type: 'DECREASE_OXYGEN', payload: decrement });
    }
    // 🪫 ENERGY
    const increaseEnergy = (increment)  => {
        dispatch({ type: 'INCREASE_ENERGY', payload: increment });
    }
    const decreaseEnergy = (decrement)  => {
        dispatch({ type: 'DECREASE_ENERGY', payload: decrement });
    }

    // 💧 WATER
    const increaseWater = (increment)  => {
        dispatch({ type: 'INCREASE_WATER', payload: increment });
    }
    const drinkWater = (decrement)  => {
        dispatch({ type: 'DRINK_WATER', payload: decrement });
    }

    // 🥩 PROTEIN
    function eatProtein (servings) {
        dispatch( { type: 'EAT_PROTEIN', payload: servings});
    }
    function increaseProtein (servings) {
        dispatch( { type: 'INCREASE_PROTEIN', payload: servings});
    }
    const eatProteinPersonDay = () => dispatch({ type: 'EAT_PROTEIN_PERSON_DAY'});
    const increseProteinPersonDay = () => dispatch({ type: 'INCREASE_PROTEIN_PERSON_DAY'});

    // ⌛ MOVE FORWARD ONE DAY
    const advanceDay = () => dispatch({ type: 'ADVANCE_ONE_DAY'});

    // 🔚 END MISSION
    const endMission = () => dispatch({ type: 'END_MISSION'});

    // Exponemos el estado y las funciones en el contexto
    return (
        <ResourcesContext.Provider
            value= {{
                ...state,
                startMission,
                setAstronauts,
                addAstronaut,
                removeAstronaut,
                increaseOxygen,
                decreaseOxygen,
                increaseEnergy,
                decreaseEnergy,
                increaseWater,
                drinkWater,
                eatProtein,
                increaseProtein,
                eatProteinPersonDay,
                increseProteinPersonDay,
                advanceDay,
                endMission
            }}
        >
            {children}
        </ResourcesContext.Provider>
    )

}