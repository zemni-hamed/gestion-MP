$('exampleModal').modal()
$('logoutModal').modal()


// $('.datepicker').datepicker();

function tritab() {
    var tab = [10,3,11,2,1,15,7,110,3,2,4,19,1,20,13,56,19,10,4,25];
    var tab1 = tab.sort(
        (a, b)=>{return a-b;}
    );
alert(tab1);
}