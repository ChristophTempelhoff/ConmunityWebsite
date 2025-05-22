<?php
class Documents{
    public $documentID;
    public $name;
    public $fileType;
    public $url;
    public $created;
    public $updated;

    public function __construct($documentID, $name, $fileType, $url, $created, $updated){
        $this->documentID = $documentID;
        $this->name = $name;
        $this->fileType = $fileType;
        $this->url = $url;

        $this->created = $created;
        $this->updated = $updated;
    }
}
?>