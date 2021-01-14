* Schlüsselkonzepte von React: Komponenten werden in React hierachisch aufgebaut und können in dessen Syntax als selbst definierte JSX-Tag repräsentiert werden. Das Modell von React entspricht durch die Konzepte des unidirektionalen Datenflusses und des Virtual DOM den einfachen, aber trotzdem performanten Aufbau auch komplexer Anwendungen. React bildet typischerweise die Basis für SPAs, kann jedoch auch mittels Node.js serverseitig (vor-)gerendert werden. Ein entscheidender Vorteil von React (dasselbe gilt auch für Frameworks wie Angular oder Vue) ist die deklarative Programmierung. Anstatt Schritt für Schritt (imperativ) vorzugeben, wie sich das DOM verändern soll, gibt man nur noch deklarativ den Zielzustand an und React nimmt die notwendigen Veränderungen am DOM vor. Während Angular oder Vue HTML um eine Mikrosyntax erweitern um Template-Logik wie Bedingungen oder Schleifen zu ermöglichen, setzt React auf eine Erweiterung von JavaScript um HTML-ähnliche Bestandteile: JSX. Technisch landet dank Babel trotzdem nur gewöhnliches JavaScript im Browser. Das zentrale Element in React sind Komponenten. Eine React-Anwendung besteht aus mindestens einer Komponente. Die Grundidee hinter einer React-Komponente kann man relativ mathematisch ausdrücken: f(p) = h. Oder einfacher formuliert: Eine Komponente f nimmt Props (p) entgegen und liefert ein Ergebnis h, das sich anfühlt wie HTML, auch wenn es technisch JavaScript ist. Im Falle des ReactDOM-Renderers werden basierend darauf dann die tatsächlichen DOM-Knoten erstellt. In React ist alles eine Komponente - Facebook hat ca. 90.000 Komponenten im Einsatz. JSX (JavaScript Extension) ist die Verschmelzung von HTML und JavaScript zu einer Datei.
* React Hooks: Das ist eine grundlegende Neuerung in der Entwicklung von React-Applikationen. In React können Komponenten auf zwei Arten geschrieben werden: Als Funktion und als Klasse. Lange Zeit galt die Devise, sobald komponenten-interner State oder Lifecycle-Methoden benötigt werden, muss die Komponente als Klasse geschrieben werden. Seit Version 16.8 gibt es mit den sogenannten Hooks eine wegweisende Neuerung in React, die es ermöglicht, dafür nun funktionsbasierte Komponenten zu verwenden. Der große Vortiel von Hooks ist es, Logik, die State verwendet, in wiederverwendbare Funktionen packen zu können.
* Mit Hooks ist es nun endlich möglich mit Seiteneffekten in Funktionskomponenten zu arbeiten. Diese erlauben es, State und Seiten-Effekte auch in funktionsbasierten Komponenten zu verwenden. Das ist aber mehr das Symptom als das Ziel von Hooks. Interessanter ist, dass wir dank Hooks wiederverwendbare Stateful-Logik ohne komplizierte Patterns erhalten. Und ohne mit den Nachteilen von Mixins wie impliziten Dependencies, Namens-Kollisionen etc. leben zu müssen. Man könnte auch sagen, Hooks erlauben es, das Rendern von UI-Komponenten von der Business-Logik zu trennen.
* Es gilt eine wichtige Regel für Hooks: Only call Hooks at the Top Level. Dont call Hooks inside loops, conditions, or nested functions.
* Weitere Hooks: useState(), useEffect(), useLayoutEffect(), useContext(): zur einfachen Verwendung der Context-API von React (mit dem Hook lässt sich der ContextConsumer eleganter implementieren), useReducer(): um mehre State-State-Änderungen zusammenzufassen analog zu Reducern, wie man sie vielleicht von Redux kennt, useCallback() und useMemo(): um memoizierte Variablen bzw. Funktionen zu erstellen. Das kann für die Performance-Optimierung interessant sein. Außerdem lassen sich so in bestimmten Fällen Endlosschleifen verhindern. useRef(): gibt Zugriff auf DOM-Elemente mittels der React Refs um z. B. den Fokus manuell zu setzen. Außerdem kann useRef() als Ersatz für Instanz-Variablen von Klassen-Komponenten dienen. useImperativeHandle(): Dürften die wenigsten im Alltag benutzen, da dieser Hook für imperative Code-Ausführung gedacht ist. Für Library-Autoren könnte dieser Hook aber interessant sein. useDebugValue(): Erlaubt die Ausgabe von Werten in den React DevTools.
* Derzeit gibt es zwei Lifecycle-Methoden, die man noch nicht durch Hooks (oder ein anderes Feature in React) ersetzen kann:getSnapshotBeforeUpdate() und componentDidCatch(). Im Falle von componentDidCatch() bietet sich der Einsatz einer Higher-Order-Component an, sodass man auch in diesem Fall auf Klassen-Komponenten für die eigentliche Anwendung verzichten kann.
* Hooks lösen alte Probleme, schaffen dafür aber auch neue Herausforderungen: Eine davon ist das Stale-Closures-Problem. Aufgrund der Art und Weise, wie Closures funktionieren, kann es sein, dass eien Variable unerwarteterweise nicht dem aktualisierten Wert entspricht.  Hilfreich ist dabei auf jeden Fall der Einsatz des oben erwähnten ESLint-Plugins, das viele PRobleme direkt beheben kann. Daneben gibt es die Möglichkeit, der Funktion zum Setzten des State auch eine Funktion mitzugeben.
*useContext Hook provides a way to share values between components without having to explicitly pass that property through every level of the tree. Context is primarly used when some data needs to be accessible by many components placed at different nesting levels. 
* Was ist State? - Veränderbare Zustand einer Applikation zum Zeitpunkt x
Zustand im Frontend === Darstellung und Inhalte der Applikation
Veränderung ausgelöst zum Beispiel durch User-Interaktion, API-Antworten,...
JSX-Variablen, Props sind Params zw. zwei Komponenten.
React ist datengetrieben und JS-first - der Zustand ist bestimmt über JS-Objekte. In klassischen Webanwendungen / html ist der Zustand über das bestimmt. was zum Zeitpunkt x im html steh. In React hingegen ist er darüber bestimmt, was in den JS-Objekten von React steht. React kümmert sich dann für uns darum diese JS-Objekte bzw. die Inhalte dieser JS-Objekte mit dem DOM über den Umweg Virtual-DOM zu synchronisieren.
JSX-Variablen und Props sind statisch, d.h. im lifecycle einer Komponente werden props und JSX-Variablen nur initial gesetzt und werden auch nur initial ausgelesen. - Dementsprechend sind props Read-only. In der React Dokumentation findet sich dazu: React is pretty flexible but it has one strict rule: all React components must act like pure functions with respect to their props. A pure function is a computational analogue of a mathematical function. So: If you change directly the value of the props, the component does not re-render, that is why we must use setState. The important concept of React component: a component should only manage its own state, but it should not manage its own props.
Eine direkte Veränderung der Props verändert das HTML nicht. Oder auch: Die render() Funktion wird bei Veränderung nicht automatisch erneut aufgerufen.
Die JS-Funktion setTimeout(func,delay_time) wird asynchron ausgeführt
React verwaltet ein Objekt state in der React.Component Basisklasse, das über setState() verändert wird / manipuliert werden kann.
* Commands zum Aufsetzen eines React Projektes: npm init, npm i react react-dom, npm install webpack webpack cli webpack-dev-server babel-loader html-webpack-plugin @babel/core @babel/preset-react --save-dev, npx create-react-app my_app, dann ein file .env erstellen mit dem Inhalt SKIP_PREFLIGHT_CHECK=true
* Möchte man in VS code ein html file erstellen, kann man dies mittels html:5 tun, man bekommt dan eine boilderplate eines funktionierenden html 5 Dokuments.
* State birgt gewisse Probleme.
* State-Uplifting um denselben State in mehreren Komponenten wiederzuverwenden. Weitere fortgeschrittenere Konzepte zu State: Immutability unf Pure-Components, Stolperfallen im State-Management
* Events verarbeiten: Userevents nutzen, um den State einer Komponente zu verändern. z.B. User klickt auf einen Button und eine Sidebar fährt aus oder es passiert irgendetwas.
* In React gibt es genau die gleichen Events wie in nativem HTML (onClick, onMouseOver, OnKeyDown, ...) Event-Hanlder werden als Funktionen im JSX-Template übergeben. Wir verheiraten eine Funktion z.B. onClick() { // do something} mit JSX über eine property z.b. <button onClick={ this.onClick }>Click me</button> Beim Klicken auf den Button führen wir die Funktion onClick aus. Dabei wird die Funktion this.onClick als Variable übergeben - anders als wenn man this.onClick() verwenden würde. Ausgeführt wird die Funktion von irgendeinem globalen JS, das den Event verarbeitet, falls der User auf den Button klickt. Würde man hier eine geschlossene Klammer verwenden, würde die Funktion sofort ausgeführt, wenn die Komponente gerendert wird.
* this kann zur Stolperfalle werden! In JS ist this nicht unbedingt/zwangsläufig die Instanz des Objekts, in dem die Funktion definiert wurde, sondern die des Aufrufers. Derjenige, der die Funktion auch wirklich aufruft, gibt den Inhalt von this vor. z.B. onClick() { this.setState({...}) // Uncaught TypeError: this is undefined} 
* Es gibt zwei Lösungen für dieses Problem: 1. Eine Arrow-Funktion als Event-Handler verwenden.<button onClick={ () => this.onClick() }>Click Me</button> Dabei wird die this-Referenz aufrecht erhalten. In Arrow-functions ist this immer das Objekt der Instanz, die die Funktion definiert und nicht die die Funktion aufruft. 2. Funktion mit .bind(this) im constructor fest an die Instanz knüpfen. class MyButton extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }
}
* Immutability: Mutability ist die Veränderung durch Manipulieren des selben Objektes
const fillcup = (cup) => {
    cup.fiiled = true;
    return cup;
}

const emptyCup = { filled:false };
const filledCup = fillCup(emptyCup);

console.log(emptyCup === filledCup); // => true

ABER: 

const fillcup = (cup) => {
    return {
        filled: true
    }
}

const emptyCup = { filled:false };
const filledCup = fillCup(emptyCup);

console.log(emptyCup === filledCup); // => false

Vorteile: Erkennung von Veränderung sehr leicht / Veränderung passiert nur an genau der Stelle, wo sie gewünscht ist

mutable - pass by reference
immutable - pass by value

* Pure Components sind Konponenten, die auf Immutability für state und props setzen. Re-Render nur, wenn sich Objektreferenzen ändern.
* Erleichtert React die Entscheidung zum Re-Render. Kann zu PErformance-Vorteilen führen
* PureComponents werden exakt wie Klassenkomponenten definiert (PureComponents haben exakt das gleiche Interface wie eine normale Komponente)

* State-Uplifting - Anforderung: Den selben State in mehreren Komponenten verwenden. Problem: State ist fest an eine einzige Komponente gebunden Lösung: Verwendung von State in der ersten gemeinsamen Eltern-Komponente. Weitergabe des geteilten States über Props. Wir machen eine Komponente also mehr oder weniger stateless und bekommen den state als prop von einer Elternkomponente. Props sind der Kanal, über den state zu den Komponenten fließen kann.

* State-Stolperfallen - Veränderbarer Zustand einer Applikation zum Zeitpunkt x. Zustand im Frontend === Darstellung und Unhalte der Applikation. Veränderung ausgelöst z.B. durch User-Interaktion, APIAntworten, usw.
State-Management ist nicht leicht. Veränderungen werden oft asynchron ausgelöst und verarbeitet. State wirkt sich oft auf mehrere Komponenten gleichzeitig aus. State leitet sich oft voneinander ab. State im Frontend ist selbst nur eine Replikation oder Synchronisation
* Vereinfachungen zum State-Management: Divide and Conquer: Deklarative, atomare Komponenten verwenden. State-Darstellung von Darstellung trennen (Container und Stateless-Components) Vorhersagbarkeit und Kontrolle erhöhen: Immutability und Pure-Components einsetzen. State kontrolliert (über Funktionen) verändern. Wenn nötig, zentralen State benutzen.
* Design for Failure: Fehler in Events und APIs erwarten und berücksichtigen. Testautomatisierung: Den PC die schwere Arbeit der Validierung erledigen lassen. Bewusster Umgang mit State: Das richtige Werkzeug an der richtigen Stelle einsetzen.
* Listen in React: Listen sind meistens mehrere, gleichartige HTML-Elemente bzw. React-Komponenten. Unterscheiden sich nur in den Inhalten(probs) JSX kann Arrays verarbeiten. Arrays werden als Geschwister-Elemente gerendert. Die key-PRoperty muss gesetzt sein.
* React Fragments: <></> oder <React.Fragment></React.Fragment>JSX-Element, das nicht gerendet wird. Im wesentlichen auch eine Wrapper Componen, die nichts anders tut als die children zu rendern. Zur Rückgabe von HTML-Geschwister-Elementen in einer Komponente. Verhindert unnötige <div> oder sonstige Platzalter-Elemente in HTML
* Object-Destructuring: Entnahme von Properties eines Objektes in gleichnahmige Variablen. Erspart uns Code-Duplikationen
const sourceObject = {
    name: 'Barry Allen',
    heroName: 'The Flash',
    superPower: 'Speed'
}
// Destructuring...
const { heroName, superPower } = sourceObject; 
// ... is equal to
const heroName = sourceObject.heroName;
const superPower = sourceObject.superPower;

Das klappt auch bei Arrays, basierend auf Index:
const sourceArray = ['a', 'b', 'c'];
const [a,b] = sourceArray;

// Identisch zu:
const a = sourceArray[0]
const b = sourceArray[1]

Mit Object-Destructuring entnehmen wir properties von einem Objekt in gleichnamige Variablen.

* Wrapper-Components: Komponente, die andere Komponenten entschließen. Die äußere Komponente (Wrapper) kennt den Inhalt der inneren (Child) nicht. Elemente auf gleicher Ebene bezeichnet man auch als Geschwister (sibblings). Wird oft für abstraktes Verhalten oder gemeinsames Styling verwendet (Sliders, Tabs, ...) Erlaubt sehr generische, wiederverwendbare Komponentenentwicklung. Zugriff auf innere Komponenten über probs.children. Zugriff auf props (und state) der Kindkomponenten möglich.
* Statische Typprüfung: Statische Typprüfer, wie Flow und TypeScript erkennen bestimmte Arten von Problemen, bevor der Code ausgeführt wird. Es wird empfohlen Flow oder TypeScript für größere Codebasen zu verwenden.
* syntaktischer Zucker (syntactic sugar): Syntax that is designed to make things easier to read, but doesn't introduce anything new)
* CRUD / RUDI / CDUR umfasst die vier grundlegenden Operationen persistenter Speicher: Create, Datensatz anlegen. Read oder Retrieve, Datensatz lesen, Update, Datensatz aktualisieren, Delete oder Destroy, Datensatz löschen.
* In ES6 gibt es keine offizielle Unterstützung für private Member einer JS Klasse.