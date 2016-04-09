<?php
		$server   = "localhost";
		$user     = "norcal";
		$password = "gknitz";
		$db       = "norcal";
	
		$conn = new mysqli($server, $user, $password, $db);
		if ($conn->connect_errno) {
		    printf("Connect failed: %s\n", $mysqli->connect_error);
		} else {
	        echo '[' . getData($request) . ']';					
		}
		$conn->close();

?>
