const dataTypes = {
  number: "Int",
  string: "String",
  boolean: "Boolean",
  object: "Object"
};

const convert = (data, key) => {
  const val = data[key];

  if (!val) {
    return `${key}: unknown`;
  }
  if (typeof val !== "object") {
    return `${key}: ${dataTypes[typeof val]}`;
  }
  if (Array.isArray(val)) {
    // todo split object inside array
    return `${key}: Array`;
  }
  const uniqueId = `Type_${key}`;
  const keys = Object.keys(val);
  let result = [],
    objs = [];
  for (let i = 0; i < keys.length; i++) {
    let res, newObj;
    const retVal = convert(val, keys[i]);

    if (typeof retVal === "object") {
      res = retVal[0];
      newObj = retVal[1];
    } else {
      res = retVal;
    }

    result.push(res);

    if (newObj) {
      objs.push(newObj);
    }
  }

  return [
    `${key}: ${uniqueId}`,
    `type ${uniqueId} {\n\t${result.join("\n\t")}\n}${
      objs.length ? "\n\n" + objs.join("\n\n") : ""
    }`
  ];
};

const schemaGenerator = obj => {
  const keys = Object.keys(obj);

  let result = [];
  let objs = [];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    let res, newObj;

    let retVal = convert(obj, key);

    if (typeof retVal === "object") {
      res = retVal[0];
      newObj = retVal[1];
    } else {
      res = retVal;
    }
    result.push(res);

    if (newObj) {
      objs.push(newObj);
    }
  }
  return `type MyData {\n\t${result.join("\n\t")}\n}\n${objs.join("\n\n")}`;
};

export default schemaGenerator;
