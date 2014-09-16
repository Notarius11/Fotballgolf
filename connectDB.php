<?php

// Get the function parameter
$function = $_GET["function"];
$con = null;
if ($function === null) { 
	echo "<span id='error'>Error: Failed to specify function to run!</span>";
} else {
	EstablishConnection();
	if ($function === 'Fields') {
		GetFields();
	} elseif ($function === 'Events') {
		GetEvents();
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

	while($row = mysqli_fetch_array($result)) {
	 	echo "<div class='itemGroup'>";
	  	echo "<div class='itemHeader'>" . $row['Title'] . "</div>";
	  	echo "<div class='itemContent'>"  . $row['Description'] . "</div>";
	  	echo "<div class='itemFooter'><span>Hull: 25</span><span>Par: " . $row['Par'] . "</span><span>Bane rekord:  " . $row['Record'] . "</span></div>";
	  	echo "</div>";
	}
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
	  	$event['Description'] = $row['Description'];
	  	$event['Month'] = $row['Month'];
	  	$event['Day'] = $row['Day'];
	  	$event['Registered'] = $row['Registered'];
		$response[] = $event;
	}

	echo json_encode($response);
}

?>