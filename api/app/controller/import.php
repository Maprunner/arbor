<?php

class Import {

  private $db;
  private $id;
  
public static function importEvents($f3) {
  echo "Importing results<br>";
  $this->db = $f3->get("db.instance");
  
  // do this as a single transaction: much faster and avoids the script timing out
  $this->db->begin();
  $this->id = $f3->get('PARAMS.raceid');
  echo "Event ID = ".$this->id."<br>";

  $file = $f3->get('PARAMS.file');
  echo "File = ".$file."<br>";
  
  if (file_exists('data/'.$file.'.xml')) {
    $this->importXML('data/'.$file.'.xml');
  } else {
    $this->importCSV('data/'.$file.'.csv');
  }
  
  $this->db->commit();
}

private function importCSV($file) {
  // extracts info from CSV file: define your own format!
  if (file_exists($file)) {
    // generate the necessary php array from the txt file
    $lines = file($file);
  } else {
    echo "Invalid CSV file<br>";
    return;
  }
  $result = new DB\SQL\Mapper($this->db,'result');
  $classTable = new DB\SQL\Mapper($this->db,'class');
  $race = new DB\SQL\Mapper($this->db,'race');
  $race->load(array('RaceID = :id',':id'=>$this->id));
  $classes = 0;
  
  $oldClass = '';
  $runners = 0;
  
  define('FIELD_COUNT', 11);
  define('POS_IDX', 1);
  define('FIRST_NAME_IDX', 2);
  define('LAST_NAME_IDX', 3);
  define('CLUB_IDX', 4);
  define('CLASS_IDX', 6);
  define('TIME_IDX', 7);
  define('LENGTH_IDX', 9);

  foreach ($lines as $line) {
    $r = explode(",", trim($line));
    if (count($r) != FIELD_COUNT) {
      // ignore invalid record
      echo "Invalid record<br>";
      print_r($r);
      continue;
    }
    if ($oldClass != $r[CLASS_IDX]) {
      // update an existing class record if we have one
      if ($oldClass !== '') {
        $classTable->Runners = $classRunners;
        $classTable->save();
        echo $classRunners."  ".$oldClass." at ".date('H:i:s')."<br>";
        $classes++;
        $runners = $runners + $classRunners;
      }
      // create new class record
      $classTable->reset();
      $classTable->RaceID = $race->RaceID;
      $classTable->Class = $r[CLASS_IDX];
      $classTable->Length = str_replace('km', '', $r[LENGTH_IDX]);
      $classTable->Runners = 0;
      $classTable->save();
      //echo "Save ".$r[CLASS_IDX]."<br>";
   	  $classRunners = 0;
      $oldClass = $r[CLASS_IDX];
    }
    $result->reset();
    // ResultID is set automatically when result is saved
    $result->RaceID = $race->RaceID;
  	$result->BOFID = 0;
    $result->Year = $race->Year;
    $result->Event = $this->getEventAbbr($race->Event);
    $result->Name = $r[FIRST_NAME_IDX].' '.$r[LAST_NAME_IDX];
  	$result->Club = $r[CLUB_IDX];
    $result->Card = 0;
    $result->Class = $r[CLASS_IDX];
    $result->ClassID = $classTable->ClassID;
  	$result->Time = $r[TIME_IDX];
  	$result->Position = $r[POS_IDX];
  	if ($result->Position == 999){
      $result->Status = 'dnf';
    } else {
      $result->Status = 'OK';
    }
    $result->save();
    //echo 'Save '.$result->Name.'<br>';
		$classRunners++;
  }
  // write final class update
  $classTable->Runners = $classRunners;
  $classTable->save();
  echo $classRunners."  ".$oldClass." at ".date('H:i:s')."<br>";
  // update race info
  $race->Classes = $classes;
  $race->Runners = $runners;
  $race->save();
}

private function importXML($file) {
  // extracts info from XML file exported from Winsplits
  $xml = simplexml_load_file($file);
  if ($xml === false) {
    echo "Invalid XML file<br>";
    return;
  }
  $result = new DB\SQL\Mapper($this->db,'result');
  $classTable = new DB\SQL\Mapper($this->db,'class');
  $race = new DB\SQL\Mapper($this->db,'race');
  $race->load(array('RaceID = :id',':id'=>$this->id));
  $classes = 0;
  
  $newClass = true;
  $runners = 0;
  foreach ($xml->ClassResult as $class) {
    if ($newClass) {
      $classTable->reset();
      $classTable->RaceID = $race->RaceID;
      $classTable->Class = $class->ClassShortName;
      $classTable->Length = 0;
      $classTable->Runners = 0;
      $classTable->save();
      //echo "Save ".$class->ClassShortName."<br>";
      $newClass = false;
   	  $classRunners = 0;
    }
  	foreach ($class->PersonResult as $personresult) {
      $result->reset();
      // ResultID is set automatically when result is saved
      $result->RaceID = $race->RaceID;
  		$result->BOFID = $personresult->Person->PersonId;
      $result->Year = $race->Year;
      $result->Event = $this->getEventAbbr($race->Event);
      $name = $personresult->Person->PersonName;
  		$runner = $name->Given." ".$name->Family;
      // removes commas to avoid problems with CSV import in Excel: not a problem any longer but anyway...
      $result->Name = str_replace(',', ' ', $runner);
      // horrid mess to sort out character mangling through various text files
      // make sure XML file decalres UTF-8: save via Notepad if necessary
      if (!$this->isUTF8($result->Name)) { 
        $result->Name = iconv("ISO-8859-1", "UTF-8//TRANSLIT", $result->Name);
      }
  		$club = $personresult->Club->Name;
      $result->Club = str_replace(',', ' ', $club);
      if (!$this->isUTF8($result->Club)) { 
        $result->Club = iconv("ISO-8859-1", "UTF-8//TRANSLIT", $result->Club);
      }
      $result->Card = $personresult->Result->CCardId;
      $result->Class = $class->ClassShortName;
      $result->ClassID = $classTable->ClassID;
  		$result->Time = $personresult->Result->Time->Clock;
  		$result->Position = $personresult->Result->ResultPosition;
  		$result->Status = $this->getStatus($personresult->Result->CompetitorStatus->attributes());
  		if ($result->Status != 'OK') $result->Position = 999;
      $result->save();
      //echo 'Save '.$result->Name.'<br>';
			$classRunners++;
    }
    // update class details
    $classTable->Length = $personresult->Result->CourseLength;
    $classTable->Runners = $classRunners;
    $classTable->save();
    //echo 'Update '.$class->ClassShortName.'<br>';
    echo $classRunners."  ".$class->ClassShortName." at ".date('H:i:s')."<br>";
    $newClass = true;
    $classes++;
    $runners = $runners + $classRunners;
    $classRunners = 0;

  }
  
  // update race info
  $race->Classes = $classes;
  $race->Runners = $runners;
  $race->save();
}
  
private function isUTF8($string) {
    return (utf8_encode(utf8_decode($string)) == $string);
}

private function getStatus($attrs) {
  $status = (string) $attrs["value"];
	if ($status == 'MisPunch') $status = 'mp';
	if ($status == 'DidNotStart') $status = 'dns';
  if ($status == 'NotCompeting') $status = 'n/c';
  if ($status == 'DidNotFinish') $status = 'dnf';
  return $status;
}
  
private function getEventAbbr($event) {
  switch ($event) {
    case "British Long":
        return 'BOC';
    case "British Night":
        return 'BNC';
    case "British Sprint":
        return 'BSC';
    case "British Middle":
        return 'BMC';
    case "JK Day 1":
        return 'JKD1';
    case "JK Day 2":
        return 'JKD2';
    case "JK Sprint":
        return 'JKS';
    default:
      return 'Unknown';
  }

}
  
}