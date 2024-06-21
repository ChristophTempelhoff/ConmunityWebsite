/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pdx56t4u6eqn378");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "pdx56t4u6eqn378",
    "created": "2024-06-19 12:28:53.456Z",
    "updated": "2024-06-20 23:40:23.635Z",
    "name": "News",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vise4nk9",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "awr9y735",
        "name": "img",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
