'use client';

import { useReducer } from 'react';

// 1. Estado inicial

const initialState = {
    water: 0, // 3-5 liters persona/día
    oxygen: 0, // %  0,84kg/dia persona segun NASA // 1.84 % persona/día
    energy: 0, // %
    proteinServings: 0, // int -> each serving is 20g of protein. for an adult (4 servings is ok).
    reciclyingSystem: false, // true / false -> air and water reciclying system like ISS (International Space System)
    navigationModule: false, // true / false -> navigation module ( maps, sun compass, relative positioning )
    inMission: false, // misión empezada?
    crewCount: 1, // tripulantes
    astronautsNames: ['Unknown Astronaut'], // máximo 4 tripulantes
    missionDay: 0, // el dia en la missión
    totalMissionDays: 1 // default // max 7 dias de mission
};

// 2. Reducer para manejar acciones

function resourcesReducer(state, action) {
    switch (action.type) {
        case 'START_MISSION':
            return {
                ...state,
                astronautsNames:
                    action.payload?.astronautsNames.length || ['Unknown Astronaut'],
                crewCount: action.payload?.crewCount ?? 1,
                missionDay: action.payload?.missionDays ?? 1,
                inMission: true,
                reciclyingSystem: true,
                navigationModule: true,
                energy: 100,
                oxygen: 100,
                // ⚡agrupar ❓❓ en paréntesis ()
                water: (4 * (action.payload?.crewCount ?? 1)) * (action.payload?.totalMissionDays ?? 1), // 3L persona/dia
                proteinServings: (4 * (action.payload?.crewCount ?? 1)) * (action.payload?.totalMissionDays ?? 1) + 4, // 4 servings persona/dia + EXTRA 4 (minimo que no puede bajar)
            };
        case 'SET_ASTRONAUTS':
            const updatedNames = action.payload;
            return {
                ...state,
                astronautsNames: updatedNames,
                crewCount: updatedNames.length,
            };
        case 'ADD_ASTRONAUT':
            // 🆕 Creamos un nuevo array con los astronautas actuales + el nuevo que viene en el payload
            const newAstronauts = [...state.astronautsNames, action.payload];// ➕ Añadir nombre
            
            // 🧮 Calculamos el nuevo número de tripulantes en base a la nueva lista
            const astronautsCount = newAstronauts.length; // 🧮 Calcular nuevo crew
            
            // 🔁 Retornamos el nuevo estado con los valores actualizados
            return {
                ...state, // 🧠 Mantener el resto del estado igual
                astronautsNames: newAstronauts, // ✍️ Guardar nuevos nombres
                crewCount: astronautsCount, // 🔄 Actualizar el contador
            };
        case 'REMOVE_ASTRONAUT':
            const updatedAstronauts = state.astronautsNames.filter(name => name !== action.payload);
            return {
                ...state,
                astronautsNames: updatedAstronauts,
                crewCount: updatedAstronauts.length,
            }
        case 'INCREASE_OXIGEN':
            return {
                ...state,
                oxygen: Math.min(state.oxygen + (action.payload ?? 0), 100),
            };
        case 'DECREASE_OXYGEN':
            return {
                ...state,
                oxygen: Math.max(state.oxygen - (action.payload || 10), 0),
            };
        case 'INCREASE_ENERGY':
            return {
                ...state,
                energy: Math.min(state.energy + (action.payload ?? 0), 100),
            };
        case 'DECREASE_ENERGY':
            return {
                ...state,
                energy: Math.max(state.energy - (action.payload ? action.payload : 10), 0),
            };
        case 'DRINK_WATER':
            return {
                ...state,
                water: Math.max(state.water - (action.payload || 0.25), 0)
            };
        case 'INCREASE_WATER':
            return {
                ...state,
                water: Math.min(state.water + (action.payload ?? 2), 100)
            };
        case 'EAT_PROTEIN':
            return {
                ...state,
                proteinServings: Math.max(state.proteinServings - (action.payload || 1), 4)
            };
        case 'INCREASE_PROTEIN':
            const maxProteinPerCrews = 4 * state.crewCount * ((state.totalMissionDays - state.missionDay) + 1);
            return {
                ...state,
                proteinServings: Math.min(state.proteinServings + (action.payload || 1), maxProteinPerCrews)
            };
        case 'INCREASE_PROTEIN_PERSON_DAY':
            const maxProteinPerCrew = 4 * state.crewCount * ((state.totalMissionDays - state.missionDay) + 1);
            return {
                ...state,
                proteinServings: Math.min(state.proteinServings + 4, maxProteinPerCrew),
            };
        case 'EAT_PROTEIN_PERSON_DAY': // tomamos en cuenta que por dia y persona se toman 4 servings
            return {
                ...state,
                proteinServings: Math.max(state.proteinServings - 4, 4), // no baja de 4 (cantidad mínima diaria para 1a persona)
            }
        
        case 'ADVANCE_ONE_DAY': // AVANZAS 1 DÍA EN LA MISIÓN (CONSUMES RECURSOS)
            if (state.missionDay >= state.totalMissionDays) {
                return initialState
            }
            const dailyWaterPerCrew = 4 * state.crewCount;
            const dailyOxygenPerCrew = 1.84 * state.crewCount;
            const dailyProteinPerCrew = 4 * state.crewCount;
            const dailyEnergyPerCrew = 4 * state.crewCount;

            const newWater = state.water - dailyWaterPerCrew;
            const newOxygen = state.oxygen - dailyOxygenPerCrew;
            const newProtein = state.proteinServings - dailyProteinPerCrew;
            const newEnergy = state.energy - dailyEnergyPerCrew;
            const newMissionDay = state.missionDay + 1 ; // ❌ state.missionDay++; Muta estado original 

            return {
                ...state,
                water: newWater,
                oxygen: newOxygen,
                proteinServings: newProtein,
                energy:newEnergy,
                missionDay: newMissionDay,
            };
        case 'END_MISSION' :
            return initialState;
        default:
            return state;
        
    }
}

export  { initialState, resourcesReducer } ;


// 🧾 REDUCER PATTERN – Cómo acceder correctamente al estado actual

/*
🔒 Regla de oro:
Siempre inmutabilidad: No modifiques el estado original directamente.
React necesita un nuevo objeto para saber que debe actualizar el componente.

📃RESUMEN ➡️ PORQUE NO MODIFICAR EL ESTADO ORIGINAL?

React necesita comparar el estado anterior con el nuevo, 
y eso lo hace a través de referencias de objetos. Si no hay un nuevo objeto (una copia), React no ve el cambio.

🌟 REGLA DE ORO:
  Siempre accedé al estado actual a través de 'state.propiedad'

🚫 MAL:
  astronautsNames         ❌  // No está definida como variable
  crewCount                 ❌  // Tampoco está en el scope

⛔ PROHIBIDO
  const newNames = state.astronautsNames.splice(index,1);  ❌  // Modifica el array original
  En React (especialmente con useReducer), nunca deberías mutar directamente el estado. 
  Hay que crear una copia nueva con los cambios.

✅ BIEN:
  state.astronautsNames   ✔️  // Accedés directamente al valor actual
  state.crewCount         ✔️

❓❓ vs 🪜🪜 cuando usamos valores por defecto
 
/*
🔹 action.payload ?? 0
   ➤ Usa el valor de payload si NO es null ni undefined.
   ✅ Ideal cuando 0, '', false o NaN son valores válidos que querés mantener.

🔹 action.payload || 10
   ➤ Usa el valor de payload si es "truthy".
   ❌ Reemplaza también 0, '', false, NaN — lo cual puede ser un problema si esos valores son intencionales.
   ⚠️ Ojo: `0 || 10` → devuelve 10, lo que puede causar errores en casos como decrementos o ajustes pequeños.

🎯 Recomendación:
👉 Usá `??` si querés evitar que 0 (u otros falsy válidos) sean descartados por error.

⚡Ejemplos

const value1 = 0 ?? 10;  // ✅ devuelve 0
const value2 = 0 || 10;  // ❌ devuelve 10 (porque 0 es falsy)

❓❓ 🧪 “Fusión nula” = fusionar un valor "nulo" (null/undefined) con una alternativa segura

*/

