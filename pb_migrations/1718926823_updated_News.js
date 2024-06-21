/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pdx56t4u6eqn378")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uio055yq",
    "name": "desc",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pdx56t4u6eqn378")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uio055yq",
    "name": "desc",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})
