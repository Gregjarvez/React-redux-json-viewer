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

  function pruneExpandedChildren(includeNodes) {
    const isChildOf = includeNodes[includeNodes.length - 1].meta.isChildof;
    const isExpanded = includeNodes.filter((each) => {
      return ['Object', 'Array'].includes(each.meta.type);
    })
      .map((each) => {
        return each.meta.id;
      });
    return includeNodes
      .filter(each => (!isExpanded.includes(each.meta.isChildof) && each.meta.id === isChildOf));
  }


  function finder(nodes, id) {
    const step = [];
    let tracker = 0;
    let targetChildOfId = nodes.find(
      node => node.meta.id === id).meta.isChildof;

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
        tracker++;
      }
    }
    return step.reverse();
  }

  function trunc(id, json) {
    const nodeIndex = json.findIndex(each => each.meta.id === id);
    return json.slice(0, nodeIndex + 1);
  }

  function trace(id, json) {
    const nodesIncluded = trunc(id, json);
    const pruned = pruneExpandedChildren(nodesIncluded);
    const path = finder(nodesIncluded, id).map((each) => {
      console.log(pruned);
      return determineReducer(each);
    });
    console.log(path.join(''));
  }

  return {
    trace
  };
}

PathFinder().trace('SkXeVuf47o-', test);

export default PathFinder;
