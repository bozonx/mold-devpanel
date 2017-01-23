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
  containerRoot: {
    type: 'container',
    schema: {
      documentsCollection: {
        type: 'documentsCollection',
        item: {
          type: 'document',
          schema: {
            $id: {type: 'number'},
            name: {type: 'string'},
          },
        },
      }
    },
  },
};


const storage = {
  container: {
    stringParam: 'value',
    numberParam: 5,
    array: [1,2,3],
    unnown: 'value',
    nestedContainer: {
      nestedParam: 'value',
    },
  },
  document: {
    stringParam: 'value',
  },
  containerRoot: {
    documentsCollection: {
      action: {
        load: [
          [
            {
              $id: 0,
              name: 'item0',
            },
            {
              $id: 1,
              name: 'item1',
            },
          ],
        ]
      },
    }
  },
};

export default { schema, storage};
