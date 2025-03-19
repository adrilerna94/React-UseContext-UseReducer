# Ejercicio 1: Contexto para la Configuración de la Misión

## Objetivo  
Gestionar configuraciones globales que afecten la apariencia y funcionalidad de la interfaz, como el tema visual (por ejemplo, oscuro o claro) y otras preferencias (por ejemplo, tamaño de fuente, diseño de paneles).

## Instrucciones  
1. **Crear un contexto `ConfigContext`** que contenga valores como `theme`, `fontSize` y `layout`.
2. **Proveer funciones** para cambiar estos valores (por ejemplo, `updateTheme()`, `updateFontSize()`, `updateLayout()`).
3. **Consumir el contexto** en diferentes componentes para ajustar su apariencia o comportamiento de acuerdo con la configuración establecida.
4. **Usar `useState`** para la gestión de estados.

---

# Ejercicio 2: Gestión Global de Recursos de la Base

## Objetivo  
Compartir y manejar de forma centralizada el estado de recursos (**agua, oxígeno, energía**) entre múltiples componentes utilizando `useReducer`.

## Instrucciones  

### 1. Configurar el Reducer  
- Crear un **`resourceReducer`** que reciba el estado actual (con propiedades `water`, `oxygen`, `energy`, etc.) y una acción.  
- Definir varios **tipos de acciones** (por ejemplo, `CONSUME_WATER`, `GEN_O_CONSUME_BOTH`, etc.) que permitan modificar múltiples recursos a la vez según la situación.

### 2. Incorporar el Contexto  
- Crear un **contexto `ResourceContext`** que contenga el estado global de recursos y el método `dispatch` para actualizarlo.  
- Envolver los componentes con un **`ResourceProvider`** que inicialice el estado usando `useReducer`.

### 3. Definir Acciones Compuestas  
- Incluir acciones que afecten más de un recurso al mismo tiempo (por ejemplo, **consumir agua y oxígeno juntos**, o **generar oxígeno pero consumir energía**).  
- En el `reducer`, manejar estas acciones para devolver un nuevo estado que refleje dichos cambios compuestos.

### 4. Consumir el Contexto  
- En los componentes que necesiten leer o actualizar los recursos, usar `ResourceContext` para acceder al estado y a `dispatch`.  
- Mostrar los **niveles actuales de recursos** en un componente de estado global.  
- Permitir la **ejecución de acciones** que modifiquen múltiples recursos a la vez.
