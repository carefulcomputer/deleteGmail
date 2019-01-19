// Things you might like to change
var DELAY=3; // delete older than 10 day

// convert delay to millisecs
var delayInMilli = DELAY * 24 * 60 * 60 * 1000;

function autodelete() {
   var threads;
   var item, msg;
   var search = "older_than:" + DELAY +"d";
   
   var n=0;
   do {
// Gmail will only do some at a time so let's do only a few
// It is not clear how this works when you delete some of the first 500
      threads=GmailApp.search(search,n,500);
      n=n+500;
      for each (item in threads) {
        for each (msg in item.getMessages()) {
          console.log('processing ' + msg.getSubject() + ' ' + msg.getDate());
          if (msg.getDate().valueOf() < (new Date()).valueOf() - delayInMilli) {
            Gmail.Users.Messages.remove('me', msg.getId()); // make sure you have advance settings enabled in your project resources
            console.log('deleted');
          } else {
            console.log('not deleted');
          }
        }
      } // end for each
   } while (threads!=null && threads.length<0);
} // end function
