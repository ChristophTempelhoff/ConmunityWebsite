<?php
class News{
    public $newsID;
    public $title;
    public $introduction;
    public $description;
    public $created;
    public $img;

    public function __construct($newsID, $title, $introduction, $description, $created, $img)
    {
        $this->newsID = $newsID;
        $this->title = $title;
        $this->introduction = $introduction;
        $this->description = $description;
        $this->created = $created;
        $this->img = $img;
    }
}
?>