	<?php
		// Should validate data for security
		$request = $_REQUEST['type'];
		
		require_once ( "connect.php" );
				
		function getData ($type) {
	    	global $conn;
			$data = null;

			$sql     = "SELECT * FROM `$type`";
			$results = $conn->query($sql);
			if ($results->num_rows > 0) {
			    $data = null;
			    while ($info = mysqli_fetch_assoc($results)) {
				    if ($data != null) { $data .= " , "; }
					$data .= json_encode($info);
				}				
				$results->free();
			} else {
				$data = '{ "id":"0" }';
			}
			return $data;		
	    }
    ?>
