<?php

// 1. Manually edit arbor.db to add event record and allocate ID
// 2. Create xml or csv file in data file
// 3. Check code to see it does what is needed for your file format, especially for CSV.
// 4. start XAMPP server
// 5. localhost/arbor/api/import/xxx/file_prefix

class Import
{

  private $db;
  private $id;
  private $bofids;

  public function importEvents($f3)
  {
    echo "Importing results<br>";
    $this->db = $f3->get("db.instance");

    // do this as a single transaction: much faster and avoids the script timing out
    $this->db->begin();
    $this->id = $f3->get('PARAMS.raceid');
    echo "Event ID = " . $this->id . "<br>";
    $dir = "C:/tmp/";
    $file = $dir.$f3->get('PARAMS.file');
    echo "File = " . $file . "<br>";

    if (file_exists($file . '.xml')) {
      $this->importXML($file . '.xml');
    } else {
      if (file_exists($file . '.csv')) {
        $this->importCSV($file . '.csv');
      } else {
        echo "File not found.<br>";
      }
    }

    $this->db->commit();
  }

  public function tidy($f3)
  {
    echo "Tidying results.<br>";

    $s = $f3->get('SERVER');
    if (strpos($s['SERVER_NAME'], 'localhost') === FALSE) {
      echo "Only valid on localhost.<br>";
      return;
    }

    $this->db = $f3->get("db.instance");

    // select unique BOFID name club combinations
    $this->bofids = $this->db->exec("SELECT DISTINCT BOFID, lower(Name) as Name, lower(Club) as Club FROM result WHERE BOFID > 0 ORDER BY BOFID ASC");

    // do this as a single transaction: much faster and avoids the script timing out
    $this->db->begin();
    $this->tidyBOFID();
    $this->db->commit();
  }

  private function tidyBOFID()
  {
    // try to match missing BOFIDs
    $result = new DB\SQL\Mapper($this->db, 'result');

    $result->load(array('BOFID = 0'));
    while (!$result->dry()) {
      $newid = $this->findBOFID(strtolower($result->Name), strtolower($result->Club));

      if ($newid != 0) {
        $result->BOFID = $newid;
        $result->save();
      }
      $result->next();
    }
  }

  private function findBOFID($name, $club)
  {
    // match on name and club: as good as anything for now
    foreach ($this->bofids as $id) {
      if ($id["Club"] == $club) {
        if ($id["Name"] == $name) {
          echo "found BOFID " . $id["BOFID"] . " for " . $id["Name"] . "<br>";
          return $id["BOFID"];
        }
      }
    }
    return 0;
  }

  private function importCSV($file)
  {
    // extracts info from CSV file: define your own format!
    if (file_exists($file)) {
      // generate the necessary php array from the txt file
      $lines = file($file);
    } else {
      echo "Invalid CSV file<br>";
      return;
    }
    $result = new DB\SQL\Mapper($this->db, 'result');
    $classTable = new DB\SQL\Mapper($this->db, 'class');
    $race = new DB\SQL\Mapper($this->db, 'race');
    $race->load(array('RaceID = :id', ':id' => $this->id));
    $classes = 0;

    $oldClass = '';
    $runners = 0;
    $classRunners = 0;
    $classID = 0;

    define('FIELD_COUNT', 5);
    define('POS_IDX', 0);
    define('FIRST_NAME_IDX', 1);
    //define('LAST_NAME_IDX', 1);
    define('CLUB_IDX', 2);
    define('CLASS_IDX', 3);
    define('TIME_IDX', 4);
    //define('STATUS_IDX', 5);
    //define('LENGTH_IDX', 0);

    foreach ($lines as $line) {
      $r = explode(",", trim($line));
      if (count($r) != FIELD_COUNT) {
        // ignore invalid record
        echo "Invalid record<br>";
        print_r($r);
        continue;
      }
      // assumes that input is sorted by class
      if ($oldClass != $r[CLASS_IDX]) {
        // update the existing class record if we have one
        if ($oldClass !== '') {
          $classTable->Runners = $classRunners;
          $classTable->save();
          echo $classRunners . "  " . $oldClass . " at " . date('H:i:s') . "<br>";
          $classes++;
          $runners = $runners + $classRunners;
        }
        // create new class record
        $classTable->reset();
        $classTable->RaceID = $this->id;
        $classTable->Class = $r[CLASS_IDX];
        //$classTable->Length = str_replace('km', '', $r[LENGTH_IDX]);
        $classTable->Length = 0;
        $classTable->Runners = 0;
        $classTable->save();
        echo "Save " . $r[CLASS_IDX] . "<br>";
        $classRunners = 0;
        $oldClass = $r[CLASS_IDX];
      }
      $result->reset();
      // ResultID is set automatically when result is saved
      $result->RaceID = $race->RaceID;
      $result->BOFID = 0;
      $result->Year = $race->Year;
      $result->Event = $this->getEventAbbr($race->Event);
      //$result->Name = $r[FIRST_NAME_IDX] . ' ' . $r[LAST_NAME_IDX];
      $result->Name = $r[FIRST_NAME_IDX];
      $result->Club = $r[CLUB_IDX];
      $result->Card = 0;
      $result->Class = $r[CLASS_IDX];
      $result->ClassID = $classTable->ClassID;
      $result->Time = $r[TIME_IDX];
      $result->Position = $r[POS_IDX];
      if ($result->Position == 999) {
        $result->Status = 'dnf';
      } else {
        $result->Status = 'OK';
      }
      //$result->Status = $r[STATUS_IDX];
      $result->save();
      //echo 'Save '.$result->Name.'<br>';
      $classRunners++;
    }
    // write final class update
    $classTable->Runners = $classRunners;
    $classTable->save();
    echo $classRunners . "  " . $oldClass . " at " . date('H:i:s') . "<br>";
    // update race info
    $runners = $runners + $classRunners;
    $race->Classes = $classes;
    $race->Runners = $runners;
    $race->save();
  }

  private function importXML($file)
  {
    // extracts info from v2.0.3 XML file exported from Winsplits
    $xml = simplexml_load_file($file);
    if ($xml === false) {
      echo "Invalid XML file<br>";
      return;
    }
    // <IOFVersion> only present for V2 XML files
    ($xml->IOFVersion) ?
      $this->importXMLV2($xml) :
      $this->importXMLV3($xml);
  }

  private function importXMLV2($xml)
  {
    $result = new DB\SQL\Mapper($this->db, 'result');
    $classTable = new DB\SQL\Mapper($this->db, 'class');
    $race = new DB\SQL\Mapper($this->db, 'race');
    $race->load(array('RaceID = :id', ':id' => $this->id));
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
        echo "Save " . $class->ClassShortName . ": " . $race->RaceID . ": ".$classTable->ClassID."<br>";
        $classTable->save();
        // TODO: shouldn't need to do this but save is not returning a hydrated object
        // only started happening for BNC 2025 update
        $classTable->load(array('RaceID=? AND Class=?', $race->RaceID, $classTable->Class = $class->ClassShortName));
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
        $runner = $name->Given . " " . $name->Family;
        // removes commas to avoid problems with CSV import in Excel: not a problem any longer but anyway...
        $result->Name = str_replace(',', ' ', $runner);
        // horrid mess to sort out character mangling through various text files
        // make sure XML file declares UTF-8: save via Notepad if necessary
        if (!$this->isUTF8($result->Name)) {
          $result->Name = iconv("ISO-8859-1", "UTF-8//TRANSLIT", $result->Name);
        }
        $club = $personresult->Club->Name;
        if ($club === null) {
          $club = "";
        }
        $result->Club = str_replace(',', ' ', $club);
        if (!$this->isUTF8($result->Club)) {
          $result->Club = iconv("ISO-8859-1", "UTF-8//TRANSLIT", $result->Club);
        }
        $result->Card = $personresult->Result->CCardId;
        $result->Class = $class->ClassShortName;
        $result->ClassID = $classTable->ClassID;
        $result->Time = $personresult->Result->Time->Clock;
        $result->Position = $personresult->Result->ResultPosition;
        $result->Status = $this->getV2Status($personresult->Result->CompetitorStatus->attributes());
        if ($result->Status != 'OK') $result->Position = 999;
        echo 'Save ' . $result->Name . '<br>';
        $result->save();
        $classRunners++;
      }
      // update class details
      $classTable->Length = $personresult->Result->CourseLength;
      $classTable->Runners = $classRunners;
      $classTable->save();
      echo $classRunners . "  " . $class->ClassShortName . " at " . date('H:i:s') . "<br>";
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

  private function importXMLV3($xml)
  {
    $result = new DB\SQL\Mapper($this->db, 'result');
    $classTable = new DB\SQL\Mapper($this->db, 'class');
    $race = new DB\SQL\Mapper($this->db, 'race');
    $race->load(array('RaceID = :id', ':id' => $this->id));
    $classes = 0;

    $newClass = true;
    $runners = 0;
    foreach ($xml->ClassResult as $class) {
      if ($newClass) {
        $classTable->reset();
        $classTable->RaceID = $race->RaceID;
        $classTable->Class = $class->Class->Name;
        $classTable->Length = 0;
        $classTable->Runners = 0;
        $classTable->save();
        // echo "Save ".$class->Class->Name."<br>";
        $newClass = false;
        $classRunners = 0;
      }
      foreach ($class->PersonResult as $personresult) {
        $result->reset();
        // ResultID is set automatically when result is saved
        $result->RaceID = $race->RaceID;
        $result->BOFID = $personresult->Person->Id;
        $result->Year = $race->Year;
        $result->Event = $this->getEventAbbr($race->Event);
        $fullname = $personresult->Person->Name;
        $runner = trim($fullname->Given) . " " . trim($fullname->Family);
        // removes commas to avoid problems with CSV import in Excel: not a problem any longer but anyway...
        $result->Name = str_replace(',', ' ', $runner);
        // horrid mess to sort out character mangling through various text files
        // make sure XML file decalres UTF-8: save via Notepad if necessary
        if (!$this->isUTF8($result->Name)) {
          $result->Name = iconv("ISO-8859-1", "UTF-8//TRANSLIT", $result->Name);
        }
        $club = $personresult->Organisation->Name;
        $result->Club = str_replace(',', ' ', $club);
        if (!$this->isUTF8($result->Club)) {
          $result->Club = iconv("ISO-8859-1", "UTF-8//TRANSLIT", $result->Club);
        }
        $result->Card = 0;
        $result->Class = $class->Class->Name;
        $result->ClassID = $classTable->ClassID;
        $secs = $personresult->Result->Time;
        $result->Time = $this->getTimeFromSeconds($secs);
        $result->Position = $personresult->Result->Position;
        $result->Status = $this->getV3Status($personresult->Result->Status);
        // don't save Did Not Start records
        if ($result->Status == 'DNS') {
          continue;
        }
        if ($result->Status != 'OK') $result->Position = 999;
        $result->save();
        // echo 'Save '.$result->Name.'<br>';
        $classRunners++;
      }
      // update class details
      $classTable->Length = $personresult->Result->Length;
      $classTable->Runners = $classRunners;
      $classTable->save();
      echo $classRunners . "  " . $class->Class->Name . " at " . date('H:i:s') . "<br>";
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

  private function isUTF8($string)
  {
    return mb_check_encoding($string, "UTF-8");
  }

  private function getTimeFromSeconds($secs)
  {
    return sprintf("%02.2d:%02.2d", floor($secs / 60), $secs % 60);;
  }

  private function getV2Status($attrs)
  {
    $status = (string) $attrs["value"];
    if ($status == 'MisPunch') $status = 'mp';
    if ($status == 'DidNotStart') $status = 'dns';
    if ($status == 'NotCompeting') $status = 'n/c';
    if ($status == 'DidNotFinish') $status = 'dnf';
    return $status;
  }

  private function getV3Status($status)
  {
    switch ($status) {
      case 'Disqualified':
        return 'DSQ';
      case 'MisPunch':
        return 'DSQ';
      case 'OverTime':
        return 'OT';
      case 'DidNotFinish':
        return 'DNF';
      case 'DidNotStart':
        return 'DNS';
      default:
        return $status;
    }
  }

  private function getEventAbbr($event)
  {
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
