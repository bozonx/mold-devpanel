const schema = {
  container: {
    type: 'container',
    schema: {
      stringParam: {type: 'string'},
      numberParam: {type: 'number'},
      booleanParam: {type: 'boolean'},
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
            $id: {type: 'number', saveable: false, primary: true},
            name: {type: 'string', saveable: true},
            ro: {type: 'string', readOnly: true},
          },
        },
      },
      pagedCollection: {
        type: 'pagedCollection',
        item: {
          type: 'container',
          schema: {
            $id: {type: 'number', primary: true},
            name: {type: 'string'},
          },
        },
      },
      collection: {
        type: 'collection',
        item: {
          type: 'container',
          schema: {
            $id: {type: 'number', primary: true},
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
    booleanParam: true,
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
              ro: 'read only',
            },
            {
              $id: 1,
              name: 'item1',
              ro: 'read only',
            },
          ],
        ]
      },
    },
    pagedCollection: [
      [
        {
          $id: 0,
          name: 'item0',
        },
        {
          $id: 0,
          name: 'item0',
        },
      ]
    ],
    collection: [
      {
        $id: 0,
        name: 'item0',
      },
      {
        $id: 0,
        name: 'item0',
      },
    ],
  },
};

export default { schema, storage};
