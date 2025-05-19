import { Component, OnInit } from '@angular/core';
import { DownloadsService } from "../services/downloads/downloads.service";
import { Document } from '../ClassesAndInterfaces/Document';


@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  documents: Document[] = [];
  search = '';
  fileType: string = ''; 
  fileTypes: string[] = [];

  constructor(private downloadService: DownloadsService) {}

  ngOnInit(): void {
    this.fetchDocuments();
  this.fetchFileTypes(); // 👈 load types from DB
  }

  fetchDocuments(): void {
   this.downloadService.getDocuments(this.search, this.fileType).subscribe((data: Document[]) => {
  this.documents = data;
});
  }
  fetchFileTypes(): void {
 this.downloadService.getFileTypes().subscribe((data: string[]) => {
  this.fileTypes = data;
});
}
}