import React from 'react'

/**
 * Context ermöglicht es, Daten durch den Komponentenbaum zu leiten, ohne die Props in jeder Schicht manuell zu übergeben.
 * Context wurde entwickelt, um Daten zu teilen, welche für einen Baum von React Komponenten als "global" bezeichnet werden können, z.B. der aktuell authetifizierte Nutzer, das Theme oder die bevorzugte Sprache.
 * const MyContext = React.createContext(defaultValue); erstellt ein Context-Objekt. Wenn React eine Komponente rendert, die dieses Context-Objekt abonniert hat, wird es den aktuellen Context-Wert des am meisten übereinstimmenden Providers, welcher im Baum oberhalb des Wertes ist, lesen.
 * Das defaultValue Argument wird nur dann benutzt, wenn eine Komponente keinen übereinstimmenden Provider im Baum oberhalb hat.
 * Jedes Context-Objekt kommt mit einer Provider React Komponente, welche konsumierenden Komponenten erlaubt, die Veränderungen von Context zu abonnieren.
 * <MyContext.PRovider value={}
 */
export const NodeTypesContext = React.createContext()
export const PortTypesContext = React.createContext()
export const NodeDispatchContext = React.createContext()
export const ConnectionRecalculateContext = React.createContext()
export const ContextContext = React.createContext()
export const StageContext = React.createContext()
export const CacheContext = React.createContext()
export const RecalculateStageRectContext = React.createContext()
export const EditorIdContext = React.createContext()
