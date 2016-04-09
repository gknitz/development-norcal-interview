// Does the table already exist
var polTable = null;	
var transTable = null;	
	
	
// Define table data structures
var holders = [{
        field: 'id', 
        title: 'Policy Holder'
    }, {
        field: 'status',
        title: 'Status'
    }, {
        field: 'street_address',
        title: 'Street Address'
    }, {
        field: 'street_address_2',
        title: 'Street Address 2'
    }, {
        field: 'city',
        title: 'City'
    }, {
        field: 'state',
        title: 'State'
    }, {
        field: 'postal_code',
        title: 'Postal Code'
    }];
	
	
var policies = [{
        field: 'id', 
        title: 'Policies'
    }, {
        field: 'policy_holder_id',
        title: 'Policy Holder ID'
    }, {
        field: 'policyNumber',
        title: 'policy Number'
    }, {
        field: 'effectiveDate',
        title: 'Effective Date'
    }, {
        field: 'expirationDate',
        title: 'Expiration Date'
    }, {
        field: 'premium',
        title: 'Premium'
    }, {
        field: 'state',
        title: 'State'
    }, {
        field: 'createdDate',
        title: 'Created Date'
    }, {
        field: 'createdTime',
        title: 'Created Time'
    }, {
        field: 'cancellationDate',
        title: 'Cancellation Date'
    }, {
        field: 'policyStatus',
        title: 'Policy Status'
   
    }];
	
	
var transactions = [{
        field: 'id', 
        title: 'Transactions'
    }, {
        field: 'transactionDate',
        title: 'Transaction Date'
    }, {
        field: 'transactionTime',
        title: 'Transaction Time'
    }, {
        field: 'description',
        title: 'Description'
    }, {
        field: 'amount',
        title: 'Amount'
    }, {
        field: 'authorName',
        title: 'Author Name'
		
    }, {
        field: 'policyID',
        title: 'Policy ID'
    }, {
        field: 'allocated',
        title: 'Allocated'
    }, {
        field: 'premiumType',
        title: 'Premium Type'
    }];		



// Build the Tables as needed
$(document).ready(function() {

	$('#holders').on('click-row.bs.table', function (e, row, $element) {
         //console.log(row);
         $('.success').removeClass('success');
         $($element).addClass('success');
	     getPolicies(row.id);			 
    });
	
	$('#policies').on('click-row.bs.table', function (e, row, $element) {
         //console.log(row);
         $('.success').removeClass('success');
         $($element).addClass('success');
		 getTransactions(row.policy_holder_id);			 
    });
	
	$('#transactions').on('click-row.bs.table', function (e, row, $element) {
         //console.log(row);
         $('.success').removeClass('success');
         $($element).addClass('success');	 
    });	


	function getTables(from, to, cols) {
		$.ajax({
			type: "post",
			url:  "/get_tables.php",
			dataType: 'json',
			data: "type=" + from,
			success: function(data){	
				if (data[0].id == 0) { data = ""; }

				$('#'+to).bootstrapTable ({
	                striped: true,
	                pagination: true,
	                pageSize: 5,
	                pageList: [5, 10, 15, 20, 25],
	                showColumns: true,
					showToggle:  true,
					search:      true,
					striped:     true,
					minimumCountColumns: 2,
					columns: cols,
    				data: data
				});
			}
		});
	}
	
		
	function getPolicies(holder) {				
		$.ajax({
			type: "post",
			url:  "/get_policies.php",
			dataType: 'json',
			data: "holder=" + holder,
			
			success: function(data){
				if (data[0].id == 0) { data = ""; }
				
                   if (polTable == null) {								
					polTable = $('#policies').bootstrapTable ({
		                striped: true,
		                pagination: true,
		                pageSize: 5,
		                pageList: [5, 10, 15, 20, 25],
		                showColumns: true,
						showToggle:  true,
						search:      true,
						striped:     true,
						minimumCountColumns: 2,
						columns: policies,
	    				data: data
					});
				} else {
					$('#policies').bootstrapTable ('load', data);
				}					
									
				$('.policies').show();
				$('.transactions').hide();
			}
		});
	}
	

	
	function getTransactions(policies) {
		$.ajax({
			type: "post",
			url:  "/get_transactions.php",
			dataType: 'json',
			data: "policies=" + policies,
			success: function(data){
				if (data[0].id == 0) { data = ""; }		
							
                   if (transTable == null) {															
					transTable = $('#transactions').bootstrapTable ({
		                striped: true,
		                pagination: true,
		                pageSize: 5,
		                pageList: [5, 10, 15, 20, 25],
		                showColumns: true,
						showToggle:  true,
						search:      true,
						striped:     true,
						minimumCountColumns: 2,
						columns: transactions,
	    				data: data
					});
				} else {
					$('#transactions').bootstrapTable ('load', data);
				}	
								
				$('.transactions').show();				}
		});
	}
	
	
	$('.holders').show();
	getTables('policy_holders', 'holders', holders);
	//getTables('policies', 'policies', policies);
    //getTables('transactions', 'transactions', transactions);						
}); 	
