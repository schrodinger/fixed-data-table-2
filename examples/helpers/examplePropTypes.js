/**
 * Data type validator for the paging data store
 *
 * Instead of having PropTypes.instanceOf(PagedData) the custom PropTypes
 * allows any data structure as long as it provides the required function.
 *
 * @param {object} props         The list of the props
 * @param {string} propName      The prop that is to be validated
 * @param {string} componentName The name of the component that the prop belongs to
 */
function CtxtDataListStore(props, propName, componentName) {
  const dataObj = props[propName];
  if (dataObj.setCallback === undefined) {
    return new Error(
      `${componentName} requires that ${propName} has a setCallback() function`
    );
  }

  if (dataObj.getObjectAt === undefined) {
    return new Error(
      `${componentName} requires that ${propName} has a getObjectAt() function that retrieves a row`
    );
  }

  if (dataObj.getSize === undefined) {
    return new Error(
      `${componentName} requires that ${propName} has a getSize() function that returns the number of rows`
    );
  }
}

/**
 * Data type validator for the filter data
 *
 * @param {object} props         The list of the props
 * @param {string} propName      The prop that is to be validated
 * @param {string} componentName The name of the component that the prop belongs to
 */
function FilterObject(props, propName, componentName) {
  const dataObj = props[propName];

  if (typeof dataObj !== 'object') {
    return new Error(
      `${componentName} requires that ${propName} is an object that can be used for filtering. You have provided a: ${typeof dataObj}`
    );
  }

  if (Object.keys(dataObj).length === 0) {
    return new Error(`${componentName} requires that ${propName} isn't empty`);
  }
}

export default {
  CtxtDataListStore,
  FilterObject,
};
