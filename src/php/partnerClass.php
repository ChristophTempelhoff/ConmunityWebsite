<?php
class Partner{
    public $partnerID;
    public $name;
    public $description;
    public $img;
    public $url;
    public $created;

    public function __construct($partnerID, $name, $description, $img, $url, $created)
    {
        $this->partnerID = $partnerID;
        $this->name = $name;
        $this->description = $description;
        $this->img = $img;
        $this->url = $url;
        $this->created = $created;
    }
}
?>