/* eslint-disable no-unused-expressions,no-plusplus,no-mixed-operators */
import test from '../testJson.json';

function PathFinder() {

  function determineReducer({ steps, Qey, type }) {
    const customType = type === 'Object' ||
                       type === 'Array' ?
      'object' : 'primitive';

    const types = {
      object(steps, type, Qey) {
        switch (type) {
          case 'Object':
            return `${Qey}.`;
          case 'Array':
            return `${Qey}[${steps}].`;
          default:
            return 'Path wasn\'t found';
        }
      },
      primitive(Qey, type) {
        if (!['Object', 'Array'].includes(type)) {
          return `${Qey}`;
        }
        return 'not found';
      }
    };
    return types[customType](steps, type, Qey);
  }

  function findRootId(nodes) {
    return nodes.find(node => node.meta.isRoot).meta.id;
  }

  function findChildOfId(nodes, id) {
    return nodes.find(node => node.meta.id === id).meta.isChildof;
  }

  function finder(nodes, id) {
    const step = [];
    let tracker = 0;
    let targetChildOfId = findChildOfId(nodes, id);
    const parentNodeId = nodes[0].meta.id;

    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      const nextNode = nodes[((i - 1) + 1)];
      const ParentId = nextNode.meta.id;

      if (targetChildOfId === ParentId) {
        step.push({
          steps: tracker,
          Qey: node.Qey,
          type: node.meta.type,
          id: node.meta.id
        });
        targetChildOfId = nodes[i].meta.isChildof;
        tracker = 0;
      } else {
        const isDirectNode = (node.meta.isChildof === parentNodeId);
        if (isDirectNode) {
          tracker++;
        }
      }
    }
    return step.reverse();
  }

  function toClosestParent(id, includedNodes) {
    const rootId = findRootId(includedNodes);
    const targetChildOf = findChildOfId(includedNodes, id);
    const targetParent = includedNodes.findIndex((node) => {
      return node.meta.id === targetChildOf &&
             node.meta.isChildof === rootId;
    });
    return includedNodes.slice(targetParent);
  }

  function trunc(id, json) {
    const nodeIndex = json.findIndex(each => each.meta.id === id);
    return json.slice(0, nodeIndex + 1);
  }


  function trace(id, json) {
    const nodesIncluded = trunc(id, json);
    const workableNodes = toClosestParent(id, nodesIncluded);
    const path = finder(workableNodes, id);
    console.log(path);
  }

  return {
    trace
  };
}

PathFinder().trace('S17a_2NEs-', test);

export default PathFinder;
