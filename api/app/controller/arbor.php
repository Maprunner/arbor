<?php

class Arbor {

public static function getEvents($f3) {
  $db = $f3->get("db.instance");
  $raceTable = new DB\SQL\Mapper($db,'race');
  $events = $raceTable->find(array(), array('order'=>'Event ASC, Year DESC'));
  foreach ($events as &$record) {
    $record = $record->cast();
  }
  $championTable = new DB\SQL\Mapper($db,'champion');
  $champions = $championTable->find(array(), array('order'=>'Year DESC, Event ASC'));
  foreach ($champions as &$record) {
    $record = $record->cast();
  }
  $data = [];
  $data["events"] = $events;
  $data["champions"] = $champions;
  echo json_encode($data);
}
  
public function getEvent($f3) {
  $db = $f3->get("db.instance");
  $resultTable = new DB\SQL\Mapper($db,'result');
  $id = $f3->get('PARAMS.id');
  if (is_numeric($id)) {
    // want to sort by position here as well but they are stored as strings...
    $data = $resultTable->select('Name, Club, Class, Time, Position, Status', array('RaceID='.$id), array('order'=>'ClassID ASC'));
    foreach ($data as &$record) {
      $record = $record->cast();
      // remove null fields which we seem to get for all fields we specifically excluded
      $record = array_filter($record, function($var){return !is_null($var);} );
    }    
  } else {
    $data = [];
  }

  echo json_encode($data);
}

public function getName($f3) {
  $db = $f3->get("db.instance");
  $name = $f3->get('PARAMS.name');
  $sql = "SELECT r.RaceID, r.Year, r.Event, Area, Name, t.Club, Class, Time, Position, Status FROM ";
  $sql .= "race r JOIN result t WHERE r.RaceID=t.RaceID AND t.Name = ? ORDER BY r.Year DESC";
  $data = $db->exec($sql, $name);
  echo json_encode($data);
}
  
public function nameSearch($f3) {
  // name search for autocomplete: gets in fragment of name 
  $db = $f3->get("db.instance");
  $name = $f3->get('PARAMS.name');
  $sql = "SELECT DISTINCT Name FROM result WHERE Name LIKE ? ORDER BY Name ASC LIMIT 20";
  $data = $db->exec($sql, '%'.$name.'%');
  echo json_encode($data);
}
  
public function getFight($f3) {
  // name search for autocomplete: gets in fragment of name 
  $db = $f3->get("db.instance");
  $name1 = $f3->get('PARAMS.name1');
  $name2 = $f3->get('PARAMS.name2');
  $sql = "SELECT a.Area as Area, a.RaceID as RaceID, a.Name as Name1, b.Name as Name2, a.Class as Class, a.Club as Club1, b.Club as Club2, a.Time as Time1, b.Time as Time2, a.Position as Position1, b.Position as Position2, a.Status as Status1, b.Status as Status2, a.Event as Event, a.Year as Year FROM (SELECT * FROM result, race WHERE result.Name=:n1 AND result.RaceID=race.RaceID) AS a JOIN (SELECT * FROM result WHERE Name=:n2) AS b WHERE a.ClassID=b.ClassID ORDER BY a.Year DESC, a.Event ASC";
  //$sql = "SELECT * FROM result WHERE Name=:n1";
  $data = $db->exec($sql, array(':n1'=>$name1, ':n2'=>$name2));
  
  echo json_encode($data);
}
  
}