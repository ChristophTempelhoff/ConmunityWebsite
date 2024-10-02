import { RecordModel } from "pocketbase";

export interface NewInterface{
    id: String;
    title: String;
    desc: String;
    date: Date;
    url: String;
}

export interface News{
    model: RecordModel;
    url: String;
  }