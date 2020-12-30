![](https://raw.githubusercontent.com/chrisjpatty/flume/master/logo.png?token=ADRZXI4TFKM3FXBEBQHQURK6QIJ6Q)

[![NPM](https://img.shields.io/npm/v/flume.svg)](https://www.npmjs.com/package/flume) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Minzip Size](https://badgen.net/bundlephobia/minzip/flume)](https://bundlephobia.com/result?p=flume)

# Flume

## Guides & Examples

[flume.dev](https://flume.dev)

## Install

```bash
npm install --save flume
```

## Structure
irrelevant folders
- .github
  - workflows: just needed to publish flume-package
- cypress: n-to-n testing
- dist: compiled project
- docs: any documents
- example: example project to test changes in flume without using repository in other project

relevant folders and files
-src
  - hooks: react hooks: https://reactjs.org/docs/hooks-intro.html
  - img: includes image for flume (not very relevant)
  - components: components for every flume feature e.g.
      - Node
      - Connection
      - ContextMenu: menu that appears when clicking right side
      - IOPort
        - uses Connection to draw line

    ```comment
    each component can use other existing components
    ```
  - index
      - React always starts with the index-file
      - uses Stage-component
      - React fragment includes 3 buttons "Log Nodes, Export Nodes, Log Comments"
  - RootEngine.js
      - serves as Interpreter
      - receives config file
      - special feature: uses class
  - context.js: https://reactjs.org/docs/context.html
  - connectionCalculator.js: calculates connection between two Nodes
  - NodesReducer.js:
    - consists of a switch-case request
  - stageReducer.js
    - consists of a switch-case request
  - toastsReducer.js
    - consists of a switch-case request
  - typeBuilder.js:
    - is just used by index.js



## Documentation
For Documentation, use JSDoc: https://jsdoc.app/about-getting-started.html

## Important Questions
- Wie schafft es OpenDecision, eine JSON zu interpretieren (vermutlich mit file RootEngine), wenn RootEngine kein zusätzliches File entgegennimmt?
- Wofür wird Toaster verwendet?

## Usage

### Defining your nodes

Import `FlumeConfig` and use it to define the nodes and ports that will make up your node editor.

```jsx
import { FlumeConfig, Controls, Colors } from "flume";

const flumeConfig = new FlumeConfig()

flumeConfig
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.red,
    controls: [
      Controls.number({
        name: "num",
        label: "Number"
      })
    ]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    initialWidth: 150,
    inputs: ports => [
      ports.number()
    ],
    outputs: ports => [
      ports.number()
    ]
  })
  .addNodeType({
    type: "addNumbers",
    label: "Add Numbers",
    initialWidth: 150,
    inputs: ports => [
      ports.number({name: "num1"}),
      ports.number({name: "num2"})
    ],
    outputs: ports => [
      ports.number({name: "result"})
    ]
  })
```

### Rendering the node editor

To render the node editor, import `NodeEditor` and pass it your nodeTypes and portTypes from the configuration you created.

```jsx
import React from 'react'
import { NodeEditor } from 'flume'
import config from './config'

const App = () => {

  return (
    <div style={{width: 600, height: 800}}> // Give the wrapper a width & height
      <NodeEditor
        nodeTypes={config.nodeTypes}
        portTypes={config.portTypes}
      />
    </div>
  )
}
```

For more complete documentation visit: [flume.dev](https://flume.dev)

## License

MIT © [chrisjpatty](https://github.com/chrisjpatty)
