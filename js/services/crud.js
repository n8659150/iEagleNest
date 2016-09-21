myApp.factory('CRUD',
  ['$firebaseArray','FIREBASE_URL',
  function($firebaseArray, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + "invoices");
  var ref2 = new Firebase(FIREBASE_URL + "users");
  var ref3 = new Firebase(FIREBASE_URL + "history_invoice");
  return {

    invoicesInit: function() {
      return ref;
    }, //init project db
    usersInit: function() {
      return ref2;
    }, //init project db

    invoice_historyInit: function() {
      return ref3;
    }, //init project db

    setToArray1: function(ref) {
      var invoiceItems = $firebaseArray(ref);
      return invoiceItems;
    },

    setToArray2: function(ref2) {
      var userinfos = $firebaseArray(ref2);
      return userinfos;
    },

    setToArray3: function(ref3) {
      var invoice_history = $firebaseArray(ref3);
      return invoice_history;
    },


    setCredit: function(serverItem, userArray, credit){
      serverItem.usercredit = credit;
      userArray.$save(serverItem).then(function(){

      });
    },

    setUserCredit: function(serverItem, userArray){
      serverItem.usercredit = 0;
      userArray.$save(serverItem).then(function(){

      });
    },

    addDeliveredInvoiceToHistory: function(invoiceArray,newHistoryInvoice){
    	invoiceArray.$add({
      		items: newHistoryInvoice.items,
      		deliveredDate: newHistoryInvoice.deliveredDate.toString(),
      		invoiceDate: newHistoryInvoice.invoiceDate,
          deliveredDate_Num: newHistoryInvoice.deliveredDate_Num,
          Description: newHistoryInvoice.Description,
          username: newHistoryInvoice.username,
          companyname: newHistoryInvoice.companyname,
          email: newHistoryInvoice.email,
          totalprice: newHistoryInvoice.totalprice,
          invoiceStatus: newHistoryInvoice.invoiceStatus,
          deliveryStatus: newHistoryInvoice.deliveryStatus,
          invoiceNo: newHistoryInvoice.invoiceNo
      	}).then(function(ref){
        	 var id = ref.key();
    			 console.log("added invoice_history record with id " + id);
      	});
    },

    addInvoice: function(invoiceArray,newInvoice,itemArray){
    	invoiceArray.$add({
      		items: itemArray,
      		deliveredDate: newInvoice.deliveredDate.toString(),
      		invoiceDate: newInvoice.invoiceDate,
          deliveredDate_Num: newInvoice.deliveredDate_Num,
          Description: newInvoice.Description,
          username: newInvoice.username,
          companyname: newInvoice.companyname,
          email: newInvoice.email,
          totalprice: newInvoice.totalprice,
          invoiceStatus: newInvoice.invoiceStatus,
          deliveryStatus: newInvoice.deliveryStatus,
          invoiceNo: newInvoice.invoiceNo
      	}).then(function(ref){
        	 var id = ref.key();
    			 console.log("added invoice record with id " + id);
      	});
    },

    addOneItemSet: function(newItems) {
	 	   newItems.push({name:'',qty:''});
    },

    saveStatusToOverdue: function(serverItem, localItem, invoiceArray){
      serverItem.invoiceStatus = "OVERDUE";
      invoiceArray.$save(serverItem).then(function(){
      });

    },



    changeDliveryStatus: function(serverItem, localItem, invoiceArray){
      serverItem.deliveryStatus = "Delivered";
      invoiceArray.$save(serverItem).then(function(){
      });

    },

    saveStatusToPaid: function(serverItem, localItem, invoiceArray){
      serverItem.invoiceStatus = "PAID";
      invoiceArray.$save(serverItem).then(function(){
      });

    },

    // updateCredit: function(serverItem, localItem, userArray, credit){
    //   serverItem.usercredit = credit;
    //   console.log(serverItem.usercredit);
    //   userArray.$save(serverItem).then(function()){
    //
    //   });
    //     },




    setSelectedInvoiceItem: function(serverItem,localItem) {
    	localItem.id = serverItem.$id;
		  localItem.items = serverItem.items;
		  localItem.deliveredDate = serverItem.deliveredDate;
		  localItem.invoiceDate = serverItem.invoiceDate;
      localItem.deliveredDate_Num = serverItem.deliveredDate_Num;
      localItem.Description = serverItem.Description;
      localItem.username = serverItem.username;
      localItem.companyname = serverItem.companyname;
      localItem.email = serverItem.email;
      localItem.totalprice = serverItem.totalprice;
      localItem.invoiceStatus = serverItem.invoiceStatus;
      localItem.deliveryStatus = serverItem.deliveryStatus;
      localItem.invoiceNo = serverItem.invoiceNo;

    },

    saveItem: function(serverItem,localItem,invoiceArray) {
  		serverItem.items = localItem.items;
  		serverItem.deliveredDate = localItem.deliveredDate.toString();
  		serverItem.invoiceDate = localItem.invoiceDate.toString();
      serverItem.deliveredDate_Num = localItem.deliveredDate_Num;
      serverItem.Description = localItem.Description.toString();
      serverItem.username = localItem.username;
      serverItem.companyname = localItem.companyname;
      serverItem.email = localItem.email;
      serverItem.totalprice = localItem.totalprice;
      serverItem.invoiceNo = localItem.invoiceNo;

  		invoiceArray.$save(serverItem).then(function(){
  		console.log(serverItem);
		  });
    },
    clearForm: function(scope){
    	scope.newInvoice = {};
      scope.newItems = [{name:'',qty:''}];
    }

    // updateCredit: function(serverItem,invoiceArray) {
  	// 	serverItem.usercredit = 666;
  	// 	invoiceArray.$save(serverItem).then(function(){
		//   });
    // },

  };

}]); //factory
