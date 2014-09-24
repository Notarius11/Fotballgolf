<?php
$function = null;
// Get the function parameter
$parameters = null;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$json = file_get_contents('php://input'); 
	$parameters = json_decode($json, true);
	$function = $parameters["method"];
}
else {
	$function = $_GET["function"];
}


$con = null;

if ($function === null) {
	echo "<span id='error'>Error: Failed to specify function to run!</span>";
} else {
	EstablishConnection();
	if ($function === 'Fields') {
		GetFields();
	} elseif ($function === 'Events') {
		GetEvents();
	} elseif ($function === 'SaveReg') {
		SaveReg();
	} elseif ($function === 'SaveMember') {
		SaveMember();
	}
	mysqli_close($con);
}

function EstablishConnection() {
	// Establish Connection
	global $con;
	$con = mysqli_connect('localhost','stavaxye_Guest','guest123','stavaxye_Prod');
	if (!$con) {
	  die('Could not connect: ' . mysqli_error($con));
	}
	mysqli_select_db($con,"stavaxye_Prod");
}

function GetFields() {
	global $con;
	$sql="SELECT * FROM Fields";
	$result = mysqli_query($con,$sql);

	$response = array();

	$field = array();

	while($row = mysqli_fetch_array($result)) {
	  	$field['ID'] = $row['FieldID'];
	 	$field['Title'] = $row['Title'];
	  	$field['Description'] = utf8_encode($row['Description']) ;
	  	$field['NumHoles'] = $row['NumHoles'];
	  	$field['Par'] = $row['Par'];
	  	$field['Record'] = $row['Record'];
		$response[] = $field;

		
	}
	echo json_encode($response);
}

function GetEvents() {
	global $con;
	$sql="SELECT * FROM UpcomingEvents";
	$result = mysqli_query($con,$sql);

	$response = array();

	$event = array();

	while($row = mysqli_fetch_array($result)) {
		$event['ID'] = $row['EventID'];
	 	$event['Title'] = $row['EventTitle'];
	  	$event['Month'] = $row['Month'];
	  	$event['Day'] = $row['Day'];
	  	$event['Registered'] = $row['Registered'];
		$response[] = $event;
	}

	echo json_encode($response);
}
function SaveMember(){
	global $con;
 	global $parameters;

 	$firstName = mysqli_real_escape_string($con, $parameters['personFirstName']);
	$lastName = mysqli_real_escape_string($con, $parameters['personLastName']);
	$bDay = mysqli_real_escape_string($con, $parameters['personBirth']);
	$email = mysqli_real_escape_string($con, $parameters['personEmail']);
	$member = mysqli_real_escape_string($con, $parameters['personMember']);

	$response = array();
	$response['Error'] = "";

	$sql="INSERT INTO Persons (LastName, FirstName, BirthDay, Email, IsMember, Created, CreatedBy) VALUES ( '$lastName','$firstName','$bDay','$email', '$member', NOW(), CURRENT_USER())";
 	$result = mysqli_query($con,$sql);

 	if (!$result){
		$response['Error'] = "Error create person:" . mysqli_error($con);
 	}
 	echo json_encode($response);
}

function SaveReg() {
 	global $con;
 	global $parameters;

 	// escape variables for security
 	$eventID = mysqli_real_escape_string($con, $parameters['eventID']);
	$firstName = mysqli_real_escape_string($con, $parameters['personFirstName']);
	$lastName = mysqli_real_escape_string($con, $parameters['personLastName']);
	$bDay = mysqli_real_escape_string($con, $parameters['personBirth']);
	$email = mysqli_real_escape_string($con, $parameters['personEmail']);
	$member = mysqli_real_escape_string($con, $parameters['personMember']);

	$personID = null;
	$response = array();
	$response['Error'] = "";
	$response['personID'] = "";
	$response['NumRegistered'] = "";

 	$sql="INSERT INTO Persons (LastName, FirstName, BirthDay, Email, IsMember, Created, CreatedBy) VALUES ( '$lastName','$firstName','$bDay','$email', '$member', NOW(), CURRENT_USER())";
 	$result = mysqli_query($con,$sql);

 	if (!$result){
 		if (mysqli_errno($con) != 1062){
 			$response['Error'] = "Error create person:" . mysqli_error($con);
 			echo json_encode($response);
 			return;
 		} else {
 			// If person (email) already exists, get the ID of this person
 			$sql="SELECT PersonID FROM Persons WHERE Email = '$email'";
 			$result = mysqli_query($con, $sql);

 			//Fetch the number - Should only be one row
 			$row = mysqli_fetch_row($result);
 			$personID = $row[0];
 			$response['personID'] = $row[0];
 		}
 	} else {
 		$personID = mysqli_insert_id($con);
 		$response['personID'] = $row[0];
 	}

 	// Add person to event
 	$sql="INSERT INTO EventsPersons (EventID, PersonID) VALUES ( '$eventID','$personID')";
 	$result = mysqli_query($con,$sql);

 	if (!$result){
 		if (mysqli_errno($con) == 1062) {
 			$response['Error'] = "Error: You are already registered for this event";
 		} else {
 			$response['Error'] = "Error: " . mysqli_error($con);	
 		}
 		
 	} else {
 		$response['Error'] = "";

 		// Get the number of persons registered
 		
 		$sql="SELECT Registered FROM UpcomingEvents WHERE EventID = '$eventID'";
 		$result = mysqli_query($con,$sql);

 		if (!$result) {
 			$response['Error'] = "Error: " . mysqli_error($con);
		}
		else {
			$row = mysqli_fetch_row($result);
	 		$response['NumRegistered'] = $row[0];
		}	
 	}
	echo json_encode($response);
}

?>