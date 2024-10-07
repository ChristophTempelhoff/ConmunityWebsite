import { Document } from 'src/app/ClassesAndInterfaces/Document';
import { Injectable } from '@angular/core';
import PocketBase, {RecordModel} from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class DownloadsService {

  constructor() { }

  async GetDocsFromDB(): Promise<Document[]>{
    const pb = new PocketBase('https://backend.conmunity.at');

    var docs: Document[] = [];

    const records = await pb.collection('documents').getFullList({
      sort: '-updated',
    });
    for (let i = 0; i < records.length; i++) {
      var singleDoc: Document = {id: records[i]['id'], document_name: records[i]['document_name'], document: pb.files.getUrl(records[i], records[i]['document']), created: records[i]['created'], updated: records[i]['updated']};
      docs.push(singleDoc);
    }
    return docs;
  }
}
