const schema = {
  container: {
    type: 'container',
    schema: {
      stringParam: {type: 'string'},
      numberParam: {type: 'number'},
      nestedContainer: {
        type: 'container',
        schema: {
          param: {type: 'string'},
        }
      },
    },
  },
  document: {
    type: 'document',
    schema: {
      stringParam: {type: 'string'},
    },
  },
  documentsCollection: {
    type: 'documentsCollection',
    item: {
      type: 'document',
      schema: {
        id: {type: 'number'},
        name: {type: 'string'},
      },
    },
  }
};


const storage = {
  container: {
    stringParam: 'value',
    numberParam: 5,
    unnown: 'value',
    nestedContainer: {
      param: 'value',
    },
  },
  document: {
    stringParam: 'value',
  },
  documentsCollection: {
    action: {
      load: [
        [
          {
            id: 0,
            name: 'item1',
          }
        ]
      ]
    }
  }
};

export default { schema, storage};
