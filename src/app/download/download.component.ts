import { Component } from '@angular/core';
import { DownloadsService } from '../services/downloads/downloads.service';
import { Document } from '../ClassesAndInterfaces/Document';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {
  Docs: Document[] = [];
  constructor(){
    this.initializeDocs();
  }
  async initializeDocs() {
    var ds: DownloadsService = new DownloadsService();
    this.Docs = await ds.GetDocsFromDB();
  }
}
