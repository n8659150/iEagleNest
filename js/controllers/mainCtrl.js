myApp.controller('breadTopExpressController', ['$scope','$http','CRUD','$rootScope','$location',
	function($scope,$http,CRUD,$rootScope,$location) {
      // jack 12-16 testing firebase
      var ref = CRUD.invoicesInit();
			var ref2 = CRUD.usersInit();
			var ref3 = CRUD.invoice_historyInit();
      $scope.invoiceItems = CRUD.setToArray1(ref);
			$scope.userinfos = CRUD.setToArray2(ref2);
			$scope.invoice_history = CRUD.setToArray3(ref3);
			console.log($scope.invoice_history);
      $scope.currentInvoiceItem = {};
			$scope.currentInvoicePDF = {};
      $scope.newInvoice = {};
			$scope.newHistoryInvoice = {};
			$scope.billInfo = {};
			$scope.notificationinfo = {};
			$scope.newItems = [{name:'',qty:0,unitPrice:0.00}];
      $scope.breads = [
            { name: 'Burger Roll 35g', price: 0.60 },
            { name: 'Burger Roll 65g', price: 0.70 },
            { name: 'Burger Roll 75g', price: 0.80 },
            { name: 'Burger Roll 85g', price: 0.90 },
            { name: 'Burger Roll 105g', price: 1.00 }
        ];

				$scope.postedmsgs = [
				{type:'', msg:''}
		];

		$scope.alerts =
			 	{ type: 'warning', msg: 'iEagleExpress is now published!' };

				 $scope.copyrightAlert = {
					 type:'', msg: $scope.postedmsgs[0].msg
					 };

				 $scope.closeAlert = function(alertObject) {
					 alertObject.type = '';
					 alertObject.msg = '';

				 };

				 $scope.clearmsg = function(msg) {
				 	msg = '';
				 }

				 $scope.postmsg = function(msg) {
				 	console.log($scope.postedmsgs[0].msg);
				 	$scope.postedmsgs[0].msg = msg;
				 	$scope.copyrightAlert.type = 'warning';
				 	$scope.copyrightAlert.msg = $scope.postedmsgs[0].msg;
				 	console.log($scope.postedmsgs[0].msg);
				 	console.log($scope.copyrightAlert.msg);
				 }



				$scope.postData_createform = function() {

		            $http({
		                method  : 'POST',
		                url     : 'contact-form.php',
		                data    : $.param($scope.newInvoice),  //param method from jQuery
		                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
		            }).success(function(data){
		                console.log($scope.newInvoice.invoiceStatus);
		            });
		    }

				$scope.postData_editform = function() {


		            $http({
		                method  : 'POST',
		                url     : 'email_editform.php',
		                data    : $.param($scope.currentInvoiceItem),  //param method from jQuery
		                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
		            }).success(function(data){
		                // console.log($scope.currentInvoiceItem);
		            });
		    }

				$scope.postData_deleteform = function() {

		            $http({
		                method  : 'POST',
		                url     : 'email_deleteform.php',
		                data    : $.param($scope.currentInvoiceItem),  //param method from jQuery
		                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
		            }).success(function(data){
		                console.log($scope.currentInvoiceItem);
		            });
		    }

				$scope.postData_payBill = function() {

		            $http({
		                method  : 'POST',
		                url     : 'email_paybill.php',
		                data    : $.param($scope.billInfo),  //param method from jQuery
		                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
		            }).success(function(data){
		                console.log($scope.billInfo);
		            });
		    }

				$scope.postData_sendmsg = function() {

		            $http({
		                method  : 'POST',
		                url     : 'email_sendmsg.php',
		                data    : $.param($scope.notificationinfo),  //param method from jQuery
		                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
		            }).success(function(data){
		                console.log($scope.notificationinfo.msg);
		            });
		    }

				$scope.postData_invoicepdf = function() {

		            $http({
		                method  : 'POST',
		                url     : 'pdf_invoice.php',
		                data    : $.param($scope.currentInvoicePDF),  //param method from jQuery
										headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
		            }).success(function(data){
		                console.log($scope.currentInvoicePDF.invoiceNo);
		            });
		    }




				$scope.getInvoiceNumber = function(){
					var d = new Date();
					var y = d.getFullYear();
					var m = ('0'+(d.getMonth()+1)).slice(-2);
					var day = ("0" + d.getDate()).slice(-2);
					var h = ('0'+d.getHours()).slice(-2);
					var min = ('0'+(d.getMinutes()+1)).slice(-2);
					var sec = ('0'+(d.getSeconds()+1)).slice(-2);
					var currenttime = "" + y + m + day + h + min + sec;
					var invoicenumber = 99999999999999 - currenttime;
					$scope.newInvoice.invoiceNo = invoicenumber;
				}



				$scope.getInvoiceUsername = function(currentUser){
					if (currentUser) {
						var invoiceusername = currentUser.firstname + ' ' + currentUser.lastname;
						$scope.newInvoice.username = invoiceusername;
					}
				}

				$scope.getInvoiceCompanyName = function(currentUser){
					if (currentUser) {
						var invoicecompanyname = currentUser.companyname;
						$scope.newInvoice.companyname = invoicecompanyname;

					}
				}

				$scope.getInvoiceEmail = function(currentUser){
					if (currentUser) {
						var invoiceemail = currentUser.email;
						$scope.newInvoice.email = invoiceemail;

					}
				}

				$scope.getInvoiceDate = function(currentDate){
					$scope.newInvoice.invoiceDate = currentDate;
				}

				$scope.getItemList = function(newItems){
					var list = "";
					for (i=0;i< newItems.length; i++){
						list += "<br>Name: " + newItems[i].name + "   Qty: " + newItems[i].qty + "<br>";
					}
					$scope.newInvoice.itemlist = list;
				}

				$scope.getItemListInCheckOrderHistory = function(invoice){
					var list = "";
					for (i=0;i< invoice.items.length; i++){
						list += invoice.items[i].name + " x " + invoice.items[i].qty + "; ";
					}
					return list;
				}


				$scope.getEmailDeliverDate = function(newInvoice){

					var emaildeliverdate = "";

					if (newInvoice.deliveredDate) {
						var y = newInvoice.deliveredDate.getFullYear();
						var m = ('0'+(newInvoice.deliveredDate.getMonth()+1)).slice(-2);
						var day = ("0" + newInvoice.deliveredDate.getDate()).slice(-2);
						var deliveredDate_Num = "" + y + m + day;
						$scope.newInvoice.deliveredDate_Num = deliveredDate_Num;
						emaildeliverdate = newInvoice.deliveredDate.toString().slice(4,15);
						$scope.newInvoice.deliverdate = emaildeliverdate;

					}
				}

				$scope.getTotalPriceBeforeSubmit = function (newItems){
					var totalprice = 0;
			    for(var i = 0; i < newItems.length; i++){
			        var item = newItems[i];
			        totalprice += (item.unitPrice * item.qty);
			    }
						return totalprice.toFixed(2);
				}


				$scope.getTotalPrice = function (newItems){
					var totalprice = 0;
			    for(var i = 0; i < newItems.length; i++){
			        var item = newItems[i];
			        totalprice += (item.unitPrice * item.qty);
			    }
			    $scope.newInvoice.totalprice = totalprice;
					$scope.newInvoice.totalpriceinemail = totalprice.toFixed(2);
						// return newItems.length;
				}




				$scope.getInvoiceDefaultDeliveryStatus = function(){

					$scope.newInvoice.deliveryStatus = "Not Delivered";
				}



				$scope.getInvoiceDefaultStatus = function(currentUser,userinfos){
					var credit = 0;
					if (currentUser) {
						if (currentUser.usercredit) {
							if (currentUser.usercredit >= $scope.newInvoice.totalprice) {
									$scope.newInvoice.invoiceStatus = "PAID";
									credit = currentUser.usercredit - ($scope.newInvoice.totalprice);

									if (currentUser.companyname == "Stark"){

										for (var i = 0; i < userinfos.length; i++){

											if (userinfos[i].companyname == "Stark") {
												var userinfo = $scope.userinfos[i];
												CRUD.setCredit(userinfo, $scope.userinfos, credit);
											}



										}
									}
									else if (currentUser.companyname == "Lan") {
										for (var i = 0; i < userinfos.length; i++){

											if (userinfos[i].companyname == "Lan") {
												var userinfo = $scope.userinfos[i];
												CRUD.setCredit(userinfo, $scope.userinfos, credit);
											}



										}
									}


							}

							else if (currentUser.usercredit < $scope.newInvoice.totalprice) {

								$scope.newInvoice.invoiceStatus = "OWING";


							}


						}

						else {
							$scope.newInvoice.invoiceStatus = "OWING";
						}

					}
				}

				$scope.getCurrentInvoiceDate = function(currentDate){
					// var d = new Date();
					// console.log(d.toString());
					$scope.currentInvoiceItem.invoiceEditDate = currentDate;
				}


				$scope.getUnmodifiedInvoiceDate = function(){

					var d = new Date();
					var h = ('0'+d.getHours()).slice(-2);

					if (h < 13) {
						var newtime = "today 1:00 PM";
					}
					else {
						var newtime = "tomorrow 1:00 PM";
					}

					return newtime;
				}


				$scope.getOldTotalPrice = function (currentInvoiceItem){
					$scope.currentInvoiceItem.oldtotalprice = currentInvoiceItem.totalprice;
				}



				$scope.saveTotalPrice = function (currentInvoiceItem){
					var totalprice = 0;
					if (currentInvoiceItem.items) {
						for(var i = 0; i < currentInvoiceItem.items.length; i++){
								var item = currentInvoiceItem.items[i];
								totalprice += (item.unitPrice * item.qty);
						}
					$scope.currentInvoiceItem.totalprice = totalprice;
					$scope.currentInvoiceItem.totalpriceinemail = totalprice.toFixed(2);

					}
						// return newItems.length;
				}

				$scope.getSaveItemList = function(currentInvoiceItem){
					var list = "";
					for (i=0;i< currentInvoiceItem.items.length; i++){
						list += "<br>Name: " + currentInvoiceItem.items[i].name + "   Qty: " + currentInvoiceItem.items[i].qty + "<br>";
					}
					$scope.currentInvoiceItem.itemlist = list;
				}

				$scope.saveEmailDeliverDate = function(currentInvoiceItem){

					var emaildeliverdate = "";

					if (currentInvoiceItem.deliveredDate) {
						var date = new Date(currentInvoiceItem.deliveredDate);
						var y = date.getFullYear();
						var m = ('0'+(date.getMonth()+1)).slice(-2);
						var day = ("0" + date.getDate()).slice(-2);
						var deliveredDate_Num = "" + y + m + day;
						$scope.currentInvoiceItem.deliveredDate_Num = deliveredDate_Num;
						emaildeliverdate = currentInvoiceItem.deliveredDate.toString().slice(4,15);
						$scope.currentInvoiceItem.deliverdate = emaildeliverdate;

					}
				}

				$scope.getNotificationArea = function(){
					var message = document.getElementById("notificationarea").value;
					$scope.notificationinfo.msg = message;

				}

				$scope.editPaidInvoice = function(currentInvoiceItem, currentUser,userinfos ){
					var credit = 0;
					if (currentInvoiceItem.invoiceStatus == "PAID" && currentUser.userlevel != "admin") {

						credit = ($scope.currentInvoiceItem.oldtotalprice) - ($scope.currentInvoiceItem.totalprice) + (currentUser.usercredit);

						console.log(credit);

						if (currentUser.companyname == "Stark"){

							for (var i = 0; i < userinfos.length; i++){

								if (userinfos[i].companyname == "Stark") {
									var userinfo = $scope.userinfos[i];
									CRUD.setCredit(userinfo, $scope.userinfos, credit);
								}



							}
						}
						else if (currentUser.companyname == "Lan") {
							for (var i = 0; i < userinfos.length; i++){

								if (userinfos[i].companyname == "Lan") {
									var userinfo = $scope.userinfos[i];
									CRUD.setCredit(userinfo, $scope.userinfos, credit);
								}



							}
						}


					}

				}

				$scope.createOrderInvoicePDF = function(newInvoice, newItems){

					var invoiceNo = newInvoice.invoiceNo.toString();

					var deliverdate = newInvoice.deliveredDate_Num.toString();

					var invoiceDate = newInvoice.invoiceDate.toString().slice(4,24);

					var duedate = new Date(newInvoice.invoiceDate);

					duedate.setDate (duedate.getDate() + 7);

					var duedate = duedate.toString().slice(4,15);


					var customername = newInvoice.companyname.toString();

					var comment = newInvoice.Description.toString();

					var totalprice = "$ " + newInvoice.totalprice.toFixed(2).toString();
					console.log(totalprice);

					function getStringArray(newItems){

						var itemlist = [];

						for (var i = 0; i < newItems.length; i++){

							var list = {};
							list.DESCRIPTION = newItems[i].name;
							list.UNITPRICE = "$ " + newItems[i].unitPrice;
							list.QTY = newItems[i].qty;
							list.TAXED = "Free";
							list.AMOUNT = "$ " + (newItems[i].unitPrice * newItems[i].qty).toFixed(2);

							itemlist.push(list);
						}

						 var list2 = {};
						 list2.DESCRIPTION = "Delivery Fee";
						 list2.UNITPRICE = "$ -";
						 list2.QTY = "1";
						 list2.TAXED = "-";
						 list2.AMOUNT = "$ 0.00";

						 itemlist.push(list2);

						return itemlist;

					}

					var totallist = getStringArray(newItems);

					function buildTableBody(data, columns) {
							var body = [];

							body.push(columns);

							data.forEach(function(row) {
									var dataRow = [];

									columns.forEach(function(column) {
											dataRow.push(row[column].toString());
									})


									body.push(dataRow);
							});

							return body;
					}

					function table(data, columns) {
							return {
									table: {
											headerRows: 1,
											widths: [200, '*', '*', '*', '*'],
											body: buildTableBody(data, columns)

									},
									layout: 'lightHorizontalLines'

							};
					}

					//pdfmake dummy data test
					var docDefinition = {
	content: [
				{
					table: {//header
								widths: [200, '*', '*'],
								body: [
										[
										    { 
										      image: 'data:image/png;base64,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',
											  width: 150,
											},//logo top-left
										    { 
										      text: 'ST02/1 NORTH LAKES DRIVE \nNORTH LAKES\nPhone: 07 3204 6633\nFax: 07 3204 6633\nLeo 0432 598 406 \n leo.fang@ieaglenest.com',
										      style: 'LeoInfo'
									        },//address
										    { 
										       text: 'Order Confirmation', 
										       style: 'OrderInvoice' 
										   }
									 ],
								] //body
						}, // table 
					layout: 'noBorders'
				},
				{  //header bottom border
					text:'_______________________________________________________________________________________________',
					lineHeight: 0.2

				},
				{
					text:'_______________________________________________________________________________________________\n\n',

				},
				{
				    table: {
											// headerRows: 1,
								widths: [50, 180, 20, 100, '*'],
								body: [
													// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
										[
											{
												text:'Bill To\n\n\nPhone',
												bold: true
											},
											{
												text:"Betty's Burger & Concrete Co.\nShop 2, 50 Hastings Street\nNoosa Heads 4567\n0420521832",
												bold: false
											},
											{
												text:'',
											},
											{
												text:'Invoice No.\nOrder Date\nExpected Delivery Date\nOrder Comment',
												bold: true
												// lineHeight: 1.5
											},
											{
												text:'',
												//text: '# ' + invoiceNo + '\n' + invoiceDate + '\n' + deliverdate + '\n\n' + comment,
												bold: false
												// lineHeight: 1.5
											},
										],
									  ]
						},
						layout: 'noBorders'
				},
				{
					text:'\n\n\n',

				},
				{
					table: {
							headerRows: 1,
							widths: [200, '*', '*', '*', '*'],
							body: [
									// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
									[
										{
											text:'DESCRIPTION',
											bold: true,
										},
										{
											text:"UNITPRICE",
											bold: true,
										},
										{
											text: 'QTY',
											bold: true,
										},
										{
											text:'TAXED',
											bold: true,
										},
										{
											text:'AMOUNT',
											bold: true,
										},
								 ],

							]
					},
					margin: [ 0, 0, 0, -18 ],
					layout: 'lightHorizontalLines'
				},
				//table(totallist, ['DESCRIPTION', 'UNITPRICE', 'QTY', 'TAXED', 'AMOUNT']),
			    {
					text:'\n\n\n',

				},
				{   text:'\n\nPlease pay the order by 2016-09-22. Thank you for your cooperation!\n\n\n\n',
					//text:'\n\nPlease pay the order by ' + duedate +'. Thank you for your cooperation!\n\n\n\n',
					style: 'sign'
				},
				{
				    table: {
					        widths: [100, 70],
							body: [
									[{text:'Item Subtotal:', bold: true,}, '$100'],
									//[{text:'Item Subtotal:', bold: true,}, totalprice],
									[{text:'Tax Rate:', bold: true,}, '10%'],
									[{text:'Total', bold: true,}, '$100'],
									//[{text:'Total', bold: true,}, totalprice]
							      ]
							},
							margin: [ 330, 0, 0, 0 ],
							layout: 'lightHorizontalLines'
				},
				{
					text:'\n\n',

				},
				{
					table: {
							widths: ['*'],
							headerRows: 1,
							body: [
									[{text:'OTHER COMMENTS', bold: true,}],
									[{text:'1. Total payment due in 7 days', style: 'comment',}],
									[{text:'2. Please include the invoice number on your check', style: 'comment',}],
									[{text:'3. Banking Details:   \nAccount Name: FANG SHI PTY LTD     \nBSB: 014 240     \nAccount: 477 310 022\nRef: #000', style: 'comment',}],
									//[{text:'3. Banking Details:   \nAccount Name: FANG SHI PTY LTD     \nBSB: 014 240     \nAccount: 477 310 022\nRef: #' + invoiceNo, style: 'comment',}],
									[{text:'If you have any questions about this invoice, please contact\nLeo on 0432 598 406 Or  leo.fang@ieaglenest.com\nThank You For Your Business!', style: 'comment',}],
							]
					},
					    layout: 'lightHorizontalLines'
			    }
							
	],
	styles: {
				LeoInfo: {
					bold: false,
					color: '#000',
					fontSize: 8,
				},
				OrderInvoice: {
					bold: true,
					color: '#000',
					fontSize: 18,
					alignment: 'right',
				},
				sign: {
					bold: true,
					color: '#000',
					fontSize: 11,
					italics: true
				},
				comment: {
					color: '#666',
					fontSize: 10
				}
			}
};
					//END pdfmake dummy data test
					pdfMake.createPdf(docDefinition).getDataUrl(function(dataURL) {
							// data = dataURL;
							// console.log(data);
							// $scope.currentInvoiceItem.pdfurl = data.toString();
							$scope.newInvoice.pdfurl = dataURL.toString();
							console.log($scope.newInvoice.pdfurl)
							//$scope.postData_createform();
					});

				}

				$scope.openSelectedInvoicePDF = function(invoiceStatus,invoiceId){

					var invoiceRecord = invoiceStatus.$getRecord(invoiceId);
					console.log(invoiceRecord);

					var invoiceNo = invoiceRecord.invoiceNo.toString();

					var deliverdate = invoiceRecord.deliveredDate_Num.toString();

					var invoiceDate = invoiceRecord.invoiceDate.toString().slice(4,24);

					var duedate = new Date(invoiceRecord.invoiceDate);

					duedate.setDate (duedate.getDate() + 7);

					var duedate = duedate.toString().slice(4,15);


					var customername = invoiceRecord.companyname.toString();

					var totalprice = "$ " + invoiceRecord.totalprice.toFixed(2).toString();

					function getStringArray(invoiceRecord){

						var itemlist = [];

						for (var i = 0; i < invoiceRecord.items.length; i++){

							var list = {};
							list.DESCRIPTION = invoiceRecord.items[i].name;
							list.UNITPRICE = "$ " + invoiceRecord.items[i].unitPrice;
							list.QTY = invoiceRecord.items[i].qty;
							list.TAXED = "Free";
							list.AMOUNT = "$ " + (invoiceRecord.items[i].unitPrice * invoiceRecord.items[i].qty).toFixed(2);

							itemlist.push(list);
						}

						 var list2 = {};
						 list2.DESCRIPTION = "Delivery Fee";
						 list2.UNITPRICE = "$ -";
						 list2.QTY = "1";
						 list2.TAXED = "-";
						 list2.AMOUNT = "$ 0.00";

						 itemlist.push(list2);


						return itemlist;

					}

					var totallist = getStringArray(invoiceRecord);

					function buildTableBody(data, columns) {
					    var body = [];

					    body.push(columns);

					    data.forEach(function(row) {
					        var dataRow = [];

					        columns.forEach(function(column) {
					            dataRow.push(row[column].toString());
					        })


					        body.push(dataRow);
					    });

					    return body;
					}

					function table(data, columns) {
					    return {
					        table: {
					            headerRows: 1,
											widths: [200, '*', '*', '*', '*'],
					            body: buildTableBody(data, columns)

					        },
									layout: 'lightHorizontalLines'

					    };
					}










					var docDefinition = {
						content: [
							// { text: 'noBorders:', fontSize: 14, bold: true, margin: [0, 0, 0, 8] },
								{
										table: {
												// headerRows: 1,
												widths: [200, '*', '*'],
												body: [
														// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
														[
															{
																	image: 'data:image/png;base64,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',
																	width: 150,
															},
														 { text: 'ST02/1 NORTH LAKES DRIVE \nNORTH LAKES\nPhone: 07 3204 6633\nFax: 07 3204 6633\nLeo 0432 598 406 \n leo.fang@ieaglenest.com',
														 style: 'LeoInfo'
													 },
														 { text: 'Order Invoice', style: 'OrderInvoice' }
													 ],
												]
										},
										layout: 'noBorders'
								},
								{
									text:'_______________________________________________________________________________________________',
									lineHeight: 0.2

								},
								{
									text:'_______________________________________________________________________________________________\n\n',

								},
								{
										table: {
												// headerRows: 1,
												widths: [50, 180, 50, 80, '*'],
												body: [
														// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
														[
															{
																text:'Bill To\n\n\nPhone',
																bold: true,
															},
															{
																text:"Betty's Burger & Concrete Co.\nShop 2, 50 Hastings Street\nNoosa Heads 4567\n0420521832",
																bold: false,
															},
															{
																text:'',
															},
															{
																text:'Invoice No.\nOrder Date\nDue Date',
																bold: true,
																// lineHeight: 1.5
															},
															{
																text: '# ' + invoiceNo + '\n' + invoiceDate + '\n' + duedate,
																bold: false,
																// lineHeight: 1.5
															},
													 ],
												]
										},
										layout: 'noBorders'
								},
								{
									text:'\n\n\n',

								},
								{
										table: {
												headerRows: 1,
												widths: [200, '*', '*', '*', '*'],
												body: [
														// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
														[
															{
																text:'DESCRIPTION',
																bold: true,
															},
															{
																text:"UNITPRICE",
																bold: true,
															},
															{
																text: 'QTY',
																bold: true,
															},
															{
																text:'TAXED',
																bold: true,
															},
															{
																text:'AMOUNT',
																bold: true,
															},
													 ],

												]
										},
										margin: [ 0, 0, 0, -18 ],
										layout: 'lightHorizontalLines'
								},
								table(totallist, ['DESCRIPTION', 'UNITPRICE', 'QTY', 'TAXED', 'AMOUNT']),
								{
									text:'\n\n\n',

								},
								{
										table: {
												widths: [100, 70],
												body: [
														[{text:'Item Subtotal:', bold: true,}, totalprice],
														[{text:'Tax Rate:', bold: true,}, '10%'],
														[{text:'Total', bold: true,}, totalprice],
												]
										},
										margin: [ 330, 0, 0, 0 ],
										layout: 'lightHorizontalLines'
								},
								{
									text:'\n\n',

								},
								{
									text:'\n\nReceived and Checked by ____________________________________________________________________________\n\n\n\n',
									style: 'sign'

								},
								{
										table: {
												widths: ['*'],
												headerRows: 1,
												body: [
														[{text:'OTHER COMMENTS', bold: true,}],
														[{text:'1. Total payment due in 7 days', style: 'comment',}],
														[{text:'2. Please include the invoice number on your check', style: 'comment',}],
														[{text:'3. Banking Details:   \nAccount Name: FANG SHI PTY LTD     \nBSB: 014 240     \nAccount: 477 310 022\nRef: #' + invoiceNo, style: 'comment',}],
														[{text:'If you have any questions about this invoice, please contact\nLeo on 0432 598 406 Or  leo.fang@ieaglenest.com\nThank You For Your Business!', style: 'comment',}],
												]
										},

										layout: 'lightHorizontalLines'
								},




							// {
							// 		style: 'tableExample',
							// 		table: {
							// 				headerRows: 1,
							// 				// keepWithHeaderRows: 1,
							// 				// dontBreakRows: true,
							// 				body: [
							// 						[{ text: 'Delivery Info', style: 'tableHeader' }, { text: 'Invoice To', style: 'tableHeader' }],
							// 						[
							// 								'Delivry Date:        ' + deliverdate + '        \n' + 'Delivery Time:        10.00 am' + '        \n' + 'Last modified:        ' + invoiceDate + '        \n\n\n',
							// 								'Bill Address: ' + 'dadadad',
							// 						]
							// 				]
							// 		}
							// },
						],
						styles: {
							LeoInfo: {
								bold: false,
								color: '#000',
								fontSize: 8,
							},
							OrderInvoice: {
								bold: true,
								color: '#000',
								fontSize: 18,
								alignment: 'right',
							},
							sign: {
								bold: true,
								color: '#000',
								fontSize: 11,
								italics: true
							},
							comment: {
								color: '#666',
								fontSize: 10
							}
						}
					};
					pdfMake.createPdf(docDefinition).open();



				}




				$scope.saveSelectedInvoicePDF = function(currentInvoiceItem, currentDate){

					// var currentdate = currentDate.slice(4,24).toString();

					// console.log(currentdate);

					var invoiceNo = currentInvoiceItem.invoiceNo.toString();

					var deliverdate = currentInvoiceItem.deliveredDate_Num.toString();

					var invoiceDate = currentInvoiceItem.invoiceDate.toString().slice(4,24);

					var duedate = new Date(currentInvoiceItem.invoiceDate);

					duedate.setDate (duedate.getDate() + 7);

					var duedate = duedate.toString().slice(4,15);


					var customername = currentInvoiceItem.companyname.toString();

					var comment = currentInvoiceItem.Description.toString();

					var totalprice = "$ " + currentInvoiceItem.totalprice.toFixed(2).toString();

					var current_date = currentDate.slice(4,24);

					function getStringArray(currentInvoiceItem){

						var itemlist = [];

						for (var i = 0; i < currentInvoiceItem.items.length; i++){

							var list = {};
							list.DESCRIPTION = currentInvoiceItem.items[i].name;
							list.UNITPRICE = "$ " + currentInvoiceItem.items[i].unitPrice;
							list.QTY = currentInvoiceItem.items[i].qty;
							list.TAXED = "Free";
							list.AMOUNT = "$ " + (currentInvoiceItem.items[i].unitPrice * currentInvoiceItem.items[i].qty).toFixed(2);

							itemlist.push(list);
						}

						 var list2 = {};
						 list2.DESCRIPTION = "Delivery Fee";
						 list2.UNITPRICE = "$ -";
						 list2.QTY = "1";
						 list2.TAXED = "-";
						 list2.AMOUNT = "$ 0.00";

						 itemlist.push(list2);

						return itemlist;

					}

					var totallist = getStringArray(currentInvoiceItem);

					function buildTableBody(data, columns) {
							var body = [];

							body.push(columns);

							data.forEach(function(row) {
									var dataRow = [];

									columns.forEach(function(column) {
											dataRow.push(row[column].toString());
									})


									body.push(dataRow);
							});

							return body;
					}

					function table(data, columns) {
							return {
									table: {
											headerRows: 1,
											widths: [200, '*', '*', '*', '*'],
											body: buildTableBody(data, columns)

									},
									layout: 'lightHorizontalLines'

							};
					}





					var docDefinition = {
						content: [
							{
									table: {
											// headerRows: 1,
											widths: [200, '*', '*'],
											body: [
													// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
													[
														{
																image: 'data:image/png;base64,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',
																width: 150,
														},
													 { text: 'ST02/1 NORTH LAKES DRIVE \nNORTH LAKES\nPhone: 07 3204 6633\nFax: 07 3204 6633\nLeo 0432 598 406 \n leo.fang@ieaglenest.com',
													 style: 'LeoInfo'
												 },
													 { text: 'Order(Modified) Confirmation', style: 'OrderInvoice' }
												 ],
											]
									},
									layout: 'noBorders'
							},
							{
								text:'_______________________________________________________________________________________________',
								lineHeight: 0.2

							},
							{
								text:'_______________________________________________________________________________________________\n\n',

							},
							{
									table: {
											// headerRows: 1,
											widths: [50, 180, 20, 100, '*'],
											body: [
													// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
													[
														{
															text:'Bill To\n\n\nPhone',
															bold: true,
														},
														{
															text:"Betty's Burger & Concrete Co.\nShop 2, 50 Hastings Street\nNoosa Heads 4567\n0420521832",
															bold: false,
														},
														{
															text:'',
														},
														{
															text:'Invoice No.\nOrder Date\nExpected Delivery Date\nOrder Comment\nLast Modified:',
															bold: true,
															// lineHeight: 1.5
														},
														{
															text: '# ' + invoiceNo + '\n' + invoiceDate + '\n' + deliverdate + '\n\n' + comment + '\n' + current_date,
															bold: false,
															// lineHeight: 1.5
														},
												 ],
											]
									},
									layout: 'noBorders'
							},
							{
								text:'\n\n\n',

							},
							{
									table: {
											headerRows: 1,
											widths: [200, '*', '*', '*', '*'],
											body: [
													// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
													[
														{
															text:'DESCRIPTION',
															bold: true,
														},
														{
															text:"UNITPRICE",
															bold: true,
														},
														{
															text: 'QTY',
															bold: true,
														},
														{
															text:'TAXED',
															bold: true,
														},
														{
															text:'AMOUNT',
															bold: true,
														},
												 ],

											]
									},
									margin: [ 0, 0, 0, -18 ],
									layout: 'lightHorizontalLines'
							},

							table(totallist, ['DESCRIPTION', 'UNITPRICE', 'QTY', 'TAXED', 'AMOUNT']),

							{
								text:'\n\n\n',

							},
							{
								text:'\n\nPlease pay the order by '+ duedate + '. Thank you for your cooperation!\n\n\n\n',
								style: 'sign'

							},
							{
									table: {
											widths: [100, 70],
											body: [
													[{text:'Item Subtotal:', bold: true,}, totalprice],
													[{text:'Tax Rate:', bold: true,}, '10%'],
													[{text:'Total', bold: true,}, totalprice],
											]
									},
									margin: [ 330, 0, 0, 0 ],
									layout: 'lightHorizontalLines'
							},
							{
								text:'\n\n',

							},

							{
									table: {
											widths: ['*'],
											headerRows: 1,
											body: [
													[{text:'OTHER COMMENTS', bold: true,}],
													[{text:'1. Total payment due in 7 days', style: 'comment',}],
													[{text:'2. Please include the invoice number on your check', style: 'comment',}],
													[{text:'3. Banking Details:   \nAccount Name: FANG SHI PTY LTD     \nBSB: 014 240     \nAccount: 477 310 022\nRef: #' + invoiceNo, style: 'comment',}],
													[{text:'If you have any questions about this invoice, please contact\nLeo on 0432 598 406 Or  leo.fang@ieaglenest.com\nThank You For Your Business!', style: 'comment',}],
											]
									},

									layout: 'lightHorizontalLines'
							},




						],
						styles: {
							LeoInfo: {
								bold: false,
								color: '#000',
								fontSize: 8,
							},
							OrderInvoice: {
								bold: true,
								color: '#000',
								fontSize: 18,
								alignment: 'right',
							},
							sign: {
								bold: true,
								color: '#000',
								fontSize: 11,
								italics: true
							},
							comment: {
								color: '#666',
								fontSize: 10
							}
						}
					};
						// pdfMake.createPdf(docDefinition).open();
						pdfMake.createPdf(docDefinition).getDataUrl(function(dataURL) {
								// data = dataURL;
								// console.log(data);
								// $scope.currentInvoiceItem.pdfurl = data.toString();

								$scope.currentInvoiceItem.pdfurl = dataURL.toString();

								$scope.postData_editform();

						});


				}


				$scope.getStatementPDF = function(invoiceItems, currentDate){

					var username = document.getElementById("statementUsername").value;
					var statement_date = currentDate.slice(4,15);


					if (username != "All") {

						var currentAmount_pdf = 0;
						var overdueAmount_pdf = 0;
						var balanceDue_pdf = 0;

						for (var i = 0; i < invoiceItems.length; i++){

							if ((invoiceItems[i].companyname == username && invoiceItems[i].invoiceStatus != "PAID")
							|| (invoiceItems[i].companyname == username && invoiceItems[i].invoiceStatus == "PAID")){

								if (invoiceItems[i].invoiceStatus == "OWING") {

									currentAmount_pdf += invoiceItems[i].totalprice;


								}
								else if (invoiceItems[i].invoiceStatus == "OVERDUE") {

									overdueAmount_pdf += invoiceItems[i].totalprice;

								}

							}
					}
				}


						function getStringArray(){

						if (username != "All") {

							InvoiceList = [];
							var currentAmount_pdf = 0;
							var overdueAmount_pdf = 0;
							var balanceDue_pdf = 0;

							for (var i = 0; i < invoiceItems.length; i++){

								if ((invoiceItems[i].companyname == username && invoiceItems[i].invoiceStatus != "PAID")
								|| (invoiceItems[i].companyname == username && invoiceItems[i].invoiceStatus == "PAID")){

										var eachInvoice = {};
										eachInvoice.DATE = invoiceItems[i].invoiceDate.slice(4,15);
										eachInvoice.REFERENCE = "#" + invoiceItems[i].invoiceNo;
										eachInvoice.Original_Amount = "$ " + invoiceItems[i].totalprice.toFixed(2).toString();

									if (invoiceItems[i].invoiceStatus == "OWING") {

										eachInvoice.Balance_Amount = eachInvoice.Original_Amount;
										currentAmount_pdf += invoiceItems[i].totalprice;


									}
									else if (invoiceItems[i].invoiceStatus == "OVERDUE") {

										eachInvoice.Balance_Amount = eachInvoice.Original_Amount;
										overdueAmount_pdf += invoiceItems[i].totalprice;

									}
									else if (invoiceItems[i].invoiceStatus == "PAID") {

										eachInvoice.Balance_Amount = "$ 0.00";

									}

										InvoiceList.push(eachInvoice);



								}
						}

						return InvoiceList;
					}



					}


					var totallist = getStringArray();


					balanceDue_pdf = "$ " + ((currentAmount_pdf + overdueAmount_pdf).toFixed(2).toString());
					currentAmount_pdf = "$ " + currentAmount_pdf.toFixed(2).toString();
					overdueAmount_pdf = "$ " + overdueAmount_pdf.toFixed(2).toString();


					function buildTableBody(data, columns) {
							var body = [];

							body.push(columns);

							data.forEach(function(row) {
									var dataRow = [];

									columns.forEach(function(column) {
											dataRow.push(row[column].toString());
									})


									body.push(dataRow);
							});

							return body;
					}

					function table(data, columns) {
							return {
									table: {
											headerRows: 1,
											widths: ['*', '*', '*', '*'],
											body: buildTableBody(data, columns)

									},
									layout: 'lightHorizontalLines'

							};
					}


					var docDefinition = {
						content: [

							{
									table: {
											// headerRows: 1,
											widths: [200, '*', '*'],
											body: [
													// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
													[
														{
																image: 'data:image/png;base64,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',
																width: 150,
														},
													 { text: 'ST02/1 NORTH LAKES DRIVE \nNORTH LAKES\nPhone: 07 3204 6633\nFax: 07 3204 6633\nLeo 0432 598 406 \n leo.fang@ieaglenest.com',
													 style: 'LeoInfo'
												 },
													 { text: 'Invoice Statement', style: 'OrderInvoice' }
												 ],
											]
									},
									layout: 'noBorders'
							},
							{
								text:'_______________________________________________________________________________________________',
								lineHeight: 0.2

							},
							{
								text:'_______________________________________________________________________________________________\n\n',

							},

							{
									table: {
											headerRows: 1,
											widths: ['*', '*', '*'],
											body: [
													// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
													[
														{
															text:'Date',
															bold: true,
														},
														{
															text:"Customer Name",
															bold: true,
														},
														{
															text: 'Terms',
															bold: true,
														},
												 ],
												 [
													 {
														 text:statement_date,
													 },
													 {
														 text:"Betty's Burger & Concrete Co.",
													 },
													 {
														 text: '7 DAYS',
													 },
												],


											]
									},
									layout: 'noBorders',
									fillColor: '#bdbdbd',
							},
							{
								text:'\n',

							},


							{
									table: {
											headerRows: 1,
											widths: ['*', '*', '*', '*'],
											body: [
													// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
													[
														{
															text:'DATE',
															bold: true,
														},
														{
															text:"REFERENCE",
															bold: true,
														},
														{
															text: 'Original_Amount',
															bold: true,
														},
														{
															text:'Balance_Amount',
															bold: true,
														},
												 ],

											]
									},
									margin: [ 0, 0, 0, -18 ],
									layout: 'lightHorizontalLines'
							},


							table(totallist, ['DATE', 'REFERENCE', 'Original_Amount', 'Balance_Amount']),
							{
								text:'\n\n\n\n\n\n',

							},


							{
									table: {
											headerRows: 1,
											widths: ['*', '*', '*'],
											body: [
													// [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
													[
														{
															text:'Overdue',
															bold: true,
														},
														{
															text:"Current",
															bold: true,
														},
														{
															text: 'Balance Due',
															bold: true,
														},
												 ],
												 [
													 {
														 table:{
															 widths: [120],
															 body: [
																 [{text: overdueAmount_pdf, fillColor: '#fff',alignment: 'right',}]
															 ]

														 },
													 },
													 {
														 table:{
															 widths: [120],
															 body: [
																 [{text: currentAmount_pdf,fillColor: '#fff',alignment: 'right',}]
															 ]

														 },
													 },
													 {
														 table:{
															 widths: [120],
															 body: [
																 [{text: balanceDue_pdf,bold:true,fillColor: '#fff',alignment: 'right',}]
															 ]

														 },


													 },
												],


											]
									},
									layout: 'noBorders',
									fillColor: '#bdbdbd',
							},
							{
								text:'\n',

							},
							{
									table: {
											widths: ['*'],
											headerRows: 1,
											body: [
													[{text:'OTHER COMMENTS', bold: true,}],
													[{text:'1. Total payment due in 7 days', style: 'comment',}],
													[{text:'2. Please include the invoice number on your check', style: 'comment',}],
													[{text:'3. Banking Details:   \nAccount Name: FANG SHI PTY LTD     \nBSB: 014 240     \nAccount: 477 310 022\nRef: #invoiceNo', style: 'comment',}],
													[{text:'If you have any questions about this invoice, please contact\nLeo on 0432 598 406 Or  leo.fang@ieaglenest.com\nThank You For Your Business!', style: 'comment',}],
											]
									},

									layout: 'lightHorizontalLines'
							},




						],

						styles: {
							LeoInfo: {
								bold: false,
								color: '#000',
								fontSize: 8,
							},
							OrderInvoice: {
								bold: true,
								color: '#000',
								fontSize: 18,
								alignment: 'right',
							},
							sign: {
								bold: true,
								color: '#000',
								fontSize: 11,
								italics: true
							},
							comment: {
								color: '#666',
								fontSize: 10
							}
						}

					};

					pdfMake.createPdf(docDefinition).open();



				}






				$scope.removePaidInvoice = function(currentInvoiceItem, currentUser,userinfos ){
					var credit = 0;
					if (currentInvoiceItem.invoiceStatus == "PAID" && currentUser.userlevel != "admin") {

						credit = ($scope.currentInvoiceItem.totalprice) + (currentUser.usercredit);

						console.log(credit);

						if (currentUser.companyname == "Stark"){

							for (var i = 0; i < userinfos.length; i++){

								if (userinfos[i].companyname == "Stark") {
									var userinfo = $scope.userinfos[i];
									CRUD.setCredit(userinfo, $scope.userinfos, credit);
								}



							}
						}
						else if (currentUser.companyname == "Lan") {
							for (var i = 0; i < userinfos.length; i++){

								if (userinfos[i].companyname == "Lan") {
									var userinfo = $scope.userinfos[i];
									CRUD.setCredit(userinfo, $scope.userinfos, credit);
								}



							}
						}


					}

				}






        $scope.getPrice = function (item) {
        	for (i=0;i< $scope.breads.length; i++){
        		if (item.name == $scope.breads[i].name) {
        			item.unitPrice = $scope.breads[i].price;
        		}
        	}
        }


				$scope.editDisable = function (invoice, currentDate){

					var invoicedate = new Date(invoice.invoiceDate);
					var currentdate = new Date(currentDate);
					currentdate.setDate (currentdate.getDate() - 1);
					var year_invoice = invoicedate.getFullYear();
					var month_invoice = invoicedate.getMonth();
					var date_invoice = invoicedate.getDate();
					var year_current = currentdate.getFullYear();
					var month_current = currentdate.getMonth();
					var date_current = currentdate.getDate();

					if (invoice.invoiceDate.slice(8,10) == currentDate.slice(8,10)
					&& invoice.invoiceDate.slice(16,18) < 13
					&& currentDate.slice(16,18) < 13) {

						return 1;

					}

					else if (invoice.invoiceDate.slice(8,10) == currentDate.slice(8,10)
					&& invoice.invoiceDate.slice(16,18) >= 13
				  && currentDate.slice(16,18) >= 13) {

						return 1;

					}

					else if (currentDate.slice(8,10) - invoice.invoiceDate.slice(8,10) == 1
				  && invoice.invoiceDate.slice(16,18) >= 13
				  && currentDate.slice(16,18) < 13) {

						return 1;

					}

					else if (month_invoice == month_current && date_invoice == date_current && year_invoice == year_current
					&& invoice.invoiceDate.slice(16,18) >= 13
				  && currentDate.slice(16,18) < 13) {

						return 1;

					}

					else {
						return 0;
					}
				}



				$scope.renewDeliveryStatus = function(currentDate, invoiceItems){

					var currentdate = new Date(currentDate);
					currentdate.setDate (currentdate.getDate() - 1);
					var date_current = currentdate.getDate();

					for (var i = 0; i < invoiceItems.length; i++){

						var deliverdate = new Date(invoiceItems[i].deliveredDate);
						var date_invoice = deliverdate.getDate();

						if (
							(invoiceItems[i].deliveryStatus == "Not Delivered") &&
							(date_invoice == date_current)
					) {

							var invoiceRecord = $scope.invoiceItems[i];
							CRUD.changeDliveryStatus(invoiceRecord,invoiceItems[i],$scope.invoiceItems);



						}
				}


				}



				$scope.becomeOverdue = function (currentDate, invoiceItems){

					var currentdate = new Date(currentDate);
					currentdate.setDate (currentdate.getDate() - 7);
					// var year_current = currentdate.getFullYear();
					// var month_current = currentdate.getMonth();
					var date_current = currentdate.getDate();

					for (var i = 0; i < invoiceItems.length; i++){

						var invoicedate = new Date(invoiceItems[i].invoiceDate);
						// var year_invoice = invoicedate.getFullYear();
						// var month_invoice = invoicedate.getMonth();
						var date_invoice = invoicedate.getDate();

						if (
							(invoiceItems[i].invoiceStatus == "OWING") &&
							(date_invoice >= date_current)
					) {

							var invoiceRecord = $scope.invoiceItems[i];
							CRUD.saveStatusToOverdue(invoiceRecord,invoiceItems[i],$scope.invoiceItems);



						}
				}
			}

				$scope.getTotalOpenInvoice = function (currentUser, invoiceItems, currentDate){
					var totalOpen = 0;
					var totalOpen_Stark = 0;
					var totalOpen_Lan = 0;
					var defaultvalue_Stark = document.getElementById("openinvoiceamount_Stark");
					var defaultvalue_Lan = document.getElementById("openinvoiceamount_Lan");
					if (currentUser) {
						if (currentUser.userlevel == "admin"){
							for (var i = 0; i < invoiceItems.length; i++){
								if (invoiceItems[i].companyname == "Stark" && invoiceItems[i].invoiceStatus == "OWING"){
									totalOpen_Stark += (invoiceItems[i].totalprice);
								}
								else if (invoiceItems[i].companyname == "Lan" && invoiceItems[i].invoiceStatus == "OWING"){
									 totalOpen_Lan += (invoiceItems[i].totalprice);
								}
							}

							defaultvalue_Stark.innerHTML = "$" + totalOpen_Stark.toFixed(2);
							defaultvalue_Lan.innerHTML = "$" + totalOpen_Lan.toFixed(2);
						}
						else {
							for (var i = 0; i < invoiceItems.length; i++){
								if (invoiceItems[i].companyname == currentUser.companyname && invoiceItems[i].invoiceStatus == "OWING"){
									totalOpen += (invoiceItems[i].totalprice);
								}
							}
							return totalOpen.toFixed(2);

						}


					}
				}

				$scope.getTotalOverdue = function (currentUser, invoiceItems, currentDate){
					var totalOverdue = 0;
					var totalOverdue_Stark = 0;
					var totalOverdue_Lan = 0;
					var defaultvalue_Stark = document.getElementById("overdueinvoiceamount_Stark");
					var defaultvalue_Lan = document.getElementById("overdueinvoiceamount_Lan");
					if (currentUser) {
						if (currentUser.userlevel == "admin"){
							for (var i = 0; i < invoiceItems.length; i++){
								if (invoiceItems[i].companyname == "Stark" && invoiceItems[i].invoiceStatus == "OVERDUE"){
									totalOverdue_Stark += (invoiceItems[i].totalprice);
								}
								else if (invoiceItems[i].companyname == "Lan" && invoiceItems[i].invoiceStatus == "OVERDUE"){
									 totalOverdue_Lan += (invoiceItems[i].totalprice);
								}
							}

							defaultvalue_Stark.innerHTML = "$" + totalOverdue_Stark.toFixed(2);
							defaultvalue_Lan.innerHTML = "$" + totalOverdue_Lan.toFixed(2);
						}
						else {
							for (var i = 0; i < invoiceItems.length; i++){
								if (invoiceItems[i].companyname == currentUser.companyname && invoiceItems[i].invoiceStatus == "OVERDUE"){
									totalOverdue += (invoiceItems[i].totalprice);
								}
							}
							return totalOverdue.toFixed(2);

						}


					}
				}


				$scope.getPaymentDate = function(currentDate){
					$scope.billInfo.paymentTime = currentDate;
				}

				$scope.payBill = function (invoiceItems, userinfos){
					var billOwner = document.getElementById("billUsername").value;
					var amount = document.getElementById("billAmount").value;
					$scope.billInfo.username = billOwner;
					$scope.billInfo.paymentamount = amount;
					if (billOwner == "Stark") {
						$scope.billInfo.email = userinfos[0].email;
						$scope.billInfo.accountcredit_before = userinfos[0].usercredit;
						amount = parseInt(amount) + userinfos[0].usercredit;
					}
					else if (billOwner == "Lan") {
						$scope.billInfo.email = userinfos[1].email;
						$scope.billInfo.accountcredit_before = userinfos[1].usercredit;
						amount = parseInt(amount) + userinfos[1].usercredit;
					}
					$scope.billInfo.totalpaymentamount = amount;
					var credit = 0;
					// var defaultvalue_Stark = document.getElementById("credit_Stark");
					// var defaultvalue_Lan = document.getElementById("credit_Lan");


					var totalOwing = 0;
					var owingInvoice = "";

					for (var i = 0; i < invoiceItems.length; i++){
						if (invoiceItems[i].companyname == billOwner && invoiceItems[i].invoiceStatus != "PAID"){
							totalOwing += (invoiceItems[i].totalprice);
							owingInvoice += ("#" +invoiceItems[i].invoiceNo + "; ");
						}
					}
					$scope.billInfo.owingInvoice = owingInvoice;
					$scope.billInfo.totalOwing_beforepayment = totalOwing;

					var totalOwingLeft = 0;
					var paidInvoice = "";
					var owingInvoiceLeft = "";

					if (amount < totalOwing){
						for (var i = 0; i < invoiceItems.length; i++){
							if (invoiceItems[i].companyname == billOwner && invoiceItems[i].invoiceStatus != "PAID"){

								var bill = invoiceItems[i].totalprice;
								if (bill <= amount) {
									// invoiceItems[i].invoiceStatus = "PAID";
									paidInvoice += ("#" + invoiceItems[i].invoiceNo + "; ");
									var invoiceRecord = $scope.invoiceItems[i];
									CRUD.saveStatusToPaid(invoiceRecord,invoiceItems[i],$scope.invoiceItems);
									amount = amount - bill;
								}
								else {
									break;
								}
							}
						}

						for (var i = 0; i < invoiceItems.length; i++){
							if (invoiceItems[i].companyname == billOwner && invoiceItems[i].invoiceStatus != "PAID"){
								totalOwingLeft += (invoiceItems[i].totalprice);
								owingInvoiceLeft += ("#" +invoiceItems[i].invoiceNo + "; ");
							}
						}


						$scope.billInfo.totalOwing_afterpayment = totalOwingLeft;
						$scope.billInfo.paidInvoice = paidInvoice;
						$scope.billInfo.owingInvoiceLeft = owingInvoiceLeft;
						credit = amount;
						$scope.billInfo.accountcredit_after = credit;


					}
					else if (amount >= totalOwing) {
						for (var i = 0; i < invoiceItems.length; i++){
							if (invoiceItems[i].companyname == billOwner && invoiceItems[i].invoiceStatus != "PAID"){
								// invoiceItems[i].invoiceStatus = "PAID";
								var invoiceRecord = $scope.invoiceItems[i];
								CRUD.saveStatusToPaid(invoiceRecord,invoiceItems[i],$scope.invoiceItems);

							}
						}
						credit = amount - totalOwing;

						$scope.billInfo.totalOwing_afterpayment = 0;
						$scope.billInfo.paidInvoice = owingInvoice;
						$scope.billInfo.owingInvoiceLeft = " ";
						$scope.billInfo.accountcredit_after = credit;


					}
					if (billOwner == "Stark"){

						for (var i = 0; i < userinfos.length; i++){

							if (userinfos[i].companyname == "Stark") {
								var userinfo = $scope.userinfos[i];
								CRUD.setCredit(userinfo, $scope.userinfos, credit);
							}



						}
					}
					else if (billOwner == "Lan") {
						for (var i = 0; i < userinfos.length; i++){

							if (userinfos[i].companyname == "Lan") {
								var userinfo = $scope.userinfos[i];
								CRUD.setCredit(userinfo, $scope.userinfos, credit);
							}



						}
					}

				}


			$scope.setUserCredit = function(userinfos) {

				for (var i = 0; i < userinfos.length; i++){

					if (userinfos[i].companyname == "Stark") {


				var userinfo = $scope.userinfos[i];
				CRUD.setUserCredit(userinfo, $scope.userinfos);
			}
			}
		}


			$scope.clearMsgForm = function(){
				document.getElementById("notificationarea").value = "";
			}

			$scope.clearPaymentForm = function(){
				document.getElementById("billUsername").value = "";
				document.getElementById("billAmount").value = "";
			}

      $scope.addItem = function(){
     	CRUD.addOneItemSet($scope.newItems);
     	console.log($scope.newInvoice);
     }
      $scope.addInvoice = function() {
      	CRUD.addInvoice($scope.invoiceItems,$scope.newInvoice,$scope.newItems);
				$scope.alerts.type = 'success'
			$scope.alerts.msg = 'Order  ' + $scope.newInvoice.invoiceNo +'  has been created successfully!'

      };


			$scope.addSelectedDeliveredInvoiceToHistory = function(invoiceId) {

				var invoiceRecord = $scope.invoiceItems.$getRecord(invoiceId);

				$scope.newHistoryInvoice = invoiceRecord;

				var currentInvoiceRecord = invoiceRecord;

				CRUD.addDeliveredInvoiceToHistory($scope.invoice_history,$scope.newHistoryInvoice);

				$scope.invoiceItems.$remove(currentInvoiceRecord);

			}




			$scope.addDeliveredInvoiceToHistory = function(invoiceItems) {

				if (invoiceItems) {

					for (var i = 0; i < invoiceItems.length; i++) {

						if (invoiceItems[i].invoiceStatus == "PAID" && invoiceItems[i].deliveryStatus == "Delivered") {

							$scope.newHistoryInvoice = invoiceItems[i];

							var currentInvoiceRecord = invoiceItems[i];


							CRUD.addDeliveredInvoiceToHistory($scope.invoice_history,$scope.newHistoryInvoice);

							$scope.invoiceItems.$remove(currentInvoiceRecord);




						}

					}


				}



			};


      $scope.clearForm = function() {
      	CRUD.clearForm($scope);


      };

      $scope.setSelectedInvoiceItem = function(invoiceId) {
		var invoiceRecord = $scope.invoiceItems.$getRecord(invoiceId);
		console.log(invoiceRecord);
		CRUD.setSelectedInvoiceItem(invoiceRecord,$scope.currentInvoiceItem);
      };

			$scope.removeInvoiceItem = function(invoice) {
		var currentInvoiceRecord = $scope.invoiceItems.$getRecord(invoice.id);
				console.log(currentInvoiceRecord);
		$scope.invoiceItems.$remove(currentInvoiceRecord);
		$scope.alerts.type = 'danger'
	    $scope.alerts.msg = 'Order has been removed successfully!'

      };





      $scope.saveItem = function(currentInvoiceItem) {
		var invoiceRecord = $scope.invoiceItems.$getRecord(currentInvoiceItem.id);
		console.log(invoiceRecord);
      	CRUD.saveItem(invoiceRecord,currentInvoiceItem,$scope.invoiceItems);
				$scope.alerts.type = 'success'
	    $scope.alerts.msg = 'Changes have been saved successfully!'
      };

      // datePicker(calender)
        $scope.today = function() {
	    $scope.todayDate = new Date().toString();
	    return $scope.todayDate

	  	};
	  	$rootScope.currentDate = $scope.today();
	  	$scope.dateRefresh = function(){
	  		$rootScope.currentDate = $scope.today();

	  	}
	   // for Invoice (creation) Date



	  $scope.clear = function () {
	    $scope.deliveredDate = null;
	  };

	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = ( $scope.minDate ) ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.isOpen ={
	  	deliveredDate:false,
	  	invoiceDate:false,
			startDate:false,
			// endDate:false
	  	//to trigger which calendar to open
	  };

	  $scope.open = function($event,opened) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.isOpen[opened] = true; //click to set isOpen property of specific calendar to true, thus only this specific calendar will be opened.
	  };

	  $scope.dateOptions = {
	    'year-format': "'yy'",
	    'starting-day': 1,
	    initDate: new Date()
	  };

	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate', 'MMM dd yyyy'];
	  $scope.format = $scope.formats[0];
		$scope.format2 = $scope.formats[3];


  }]);
