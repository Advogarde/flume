class LoopError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
  static maxLoopsExceeded = 1;
}

class RootEngine {
  constructor(config, resolveInputControls, fireNodeFunction) {
    this.config = config;
    this.fireNodeFunction = fireNodeFunction;
    this.resolveInputControls = resolveInputControls;
    this.loops = 0;
    this.maxLoops = 1000;
  }
  resetLoops = maxLoops => {
    this.maxLoops = maxLoops !== undefined ? maxLoops : 1000;
    this.loops = 0;
  };
  checkLoops = () => {
    if (this.maxLoops >= 0 && this.loops > this.maxLoops) {
      throw new LoopError(
        "Max loop count exceeded.",
        LoopError.maxLoopsExceeded
      );
    } else {
      this.loops++;
    }
  };
  getRootNode = nodes => {
    /**
     * Die Methode objects.values() gibt ein Array mit den Eigenschaftswerten eines gegebenen Objekts in der selben Reihenfolge wie eine for...in sie geben würde zurück.
     * Der Unterschied ist dabei, dass eine for-in Schleife zusätzlich die Eigenschaften der Prototype-Kette aufzählt.
     */
    const roots = Object.values(nodes).filter(n => n.root);
    if (roots.length > 1) {
      throw new Error(
        "The root engine must not be called with more than one root node."
      );
    }
    return roots[0];
  };
  reduceRootInputs = (inputs, callback) =>
    Object.entries(inputs).reduce((obj, [inputName, connection]) => {
      const input = callback(inputName, connection);
      obj[input.name] = input.value;
      return obj;
    }, {});
  resolveInputValues = (node, nodeType, nodes, context) => {
    let inputs = nodeType.inputs
    if (typeof inputs === 'function') {
      inputs = inputs(node.inputData, node.connections, context)
    }
    return inputs.reduce((obj, input) => {
      const inputConnections = node.connections.inputs[input.name] || [];
      if (inputConnections.length > 0) {
        obj[input.name] = this.getValueOfConnection(
          inputConnections[0],
          nodes,
          context
        );
      } else {
        obj[input.name] = this.resolveInputControls(
          input.type,
          node.inputData[input.name] || {},
          context
        );
      }
      return obj;
    }, {});
  };
  getValueOfConnection = (connection, nodes, context) => {
    this.checkLoops();
    const outputNode = nodes[connection.nodeId];
    const outputNodeType = this.config.nodeTypes[outputNode.type];
    const inputValues = this.resolveInputValues(
      outputNode,
      outputNodeType,
      nodes,
      context
    );
    const outputResult = this.fireNodeFunction(
      outputNode,
      inputValues,
      outputNodeType,
      context
    )[connection.portName];
    return outputResult;
  };
  resolveRootNode(nodes, options = {}) {
    
    console.log("resolveRootNode function:")
    console.log(nodes);
    
    const rootNode = options.rootNodeId
      ? nodes[options.rootNodeId]
      : this.getRootNode(nodes);
    if (rootNode) {
      let inputs = this.config.nodeTypes[rootNode.type].inputs;
      if (typeof inputs === 'function') {
        inputs = inputs(rootNode.inputData, rootNode.connections, options.context);
      }
      const controlValues = inputs.reduce(
        (obj, input) => {
          obj[input.name] = this.resolveInputControls(
            input.type,
            rootNode.inputData[input.name] || {},
            options.context
          );
          return obj;
        },
        {}
      );
      const inputValues = this.reduceRootInputs(
        rootNode.connections.inputs,
        (inputName, connection) => {
          this.resetLoops(options.maxLoops);
          let value;
          try {
            value = this.getValueOfConnection(
              connection[0],
              nodes,
              options.context
            );
          } catch (e) {
            if (e.code === LoopError.maxLoopsExceeded) {
              console.error(`${e.message} Circular nodes detected in ${inputName} port.`);
            } else {
              console.error(e)
            }
          } finally {
            return {
              name: inputName,
              value
            };
          }
        }
      );
      if (options.onlyResolveConnected) {
        console.log("input values");
        console.log(inputValues);
        return inputValues;
      } else {
        console.log("Input values 2")
        console.log({ ...controlValues, ...inputValues });
        return { ...controlValues, ...inputValues };
      }
    } else {
      console.error(
        "A root node was not found. The Root Engine requires that exactly one node be marked as the root node."
      );
      console.log("return empty object")
      return {};
    }
  }
}

export default RootEngine;
