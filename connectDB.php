<?php

$con = mysqli_connect('localhost','stavaxye_Guest','guest123','stavaxye_Prod');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"stavaxye_Prod");
$sql="SELECT * FROM Fields";
$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_array($result)) {
 	echo "<div class='itemGroup'>";
  	echo "<div class='itemHeader'>" . $row['Title'] . "</div>";
  	echo "<div class='itemContent'>"  . $row['Description'] . "</div>";
  	echo "<div class='itemFooter'><span>Hull: 25</span><span>Par: " . $row['Par'] . "</span><span>Bane rekord:  " . $row['Record'] . "</span></div>";
  	echo "</div>";
}

mysqli_close($con);
?>