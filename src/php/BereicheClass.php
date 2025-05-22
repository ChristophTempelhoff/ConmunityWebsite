<?php
final class Bereiche
{
    private bool $pmk;
    private bool $wst;
    private bool $sus;
    private bool $tud;
    private bool $mb;

    public function __construct($bereiche)
    {
        $this->pmk = $bereiche['pmk'] ? 1 : 0; // TRUE/FALSE in 1/0 umwandeln
        $this->wst = $bereiche['wst'] ? 1 : 0;
        $this->sus = $bereiche['sus'] ? 1 : 0;
        $this->tud = $bereiche['tud'] ? 1 : 0;
        $this->mb = $bereiche['mb'] ? 1 : 0;
    }

    public function getPMK() : bool {
        return $this->pmk;
    }

    public function getWST(): bool {
        return $this->wst;
    }

    public function getSUS(): bool {
        return $this->sus;
    }
    
    public function getTUD(): bool {
        return $this->tud;
    }

    public function getMB(): bool {
        return $this->mb;
    }
}
?>