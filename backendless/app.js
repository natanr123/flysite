
var APP_ID = '2948140C-5FC9-6443-FF50-C1AAF82FBC00';
var API_KEY = 'C302E927-4459-8A08-FF05-C70296CF7C00';

Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);







function User(email,fullName,country,date){
    this.email = email;
    this.fullName = fullName;
    this.country = country;
    this.tripDate = date;
	this.passowrd = "fakepasswordforbackendless";
}

window.onload = function(){



    document.querySelector("#submitButton").addEventListener('click', formSubmit);

    /*
    let q = Backendless.DataQueryBuilder.create().setWhereClause("price > 150")
    Backendless.Data.of('books').find(q).then(function(data){

        console.log(data)
    }).catch(apiError)
*/
};



function isEmailValid(email) {
    let atpos = email.indexOf('@');
    let dotpos = email.lastIndexOf('.');
    if(atpos<1 || dotpos<1||atpos>dotpos){
		return true;
    }
    return false;
}

function formSubmit(e){

    e.preventDefault();
    console.log('submit button clicked');
    let email = document.querySelector('#email').value;
    let country = document.querySelector('#country').value;
    let fullName = document.querySelector('#fullName').value;
    let date = document.querySelector('#calender').value;

    if(email === "" || country === "" || fullName === "" || date === ""){
        alertMsg('Please fill out all fields',"alert alert-danger")
    } else {
    	if(isEmailValid(email)){
            alertMsg("Please use valid email","alert alert-danger")
        }else {
    		send(email, country, fullName, date);
        }
    }

}
function alertMsg(msg1,styleCastom){
    let message = document.querySelector('#message');
    message.className = styleCastom;
    message.innerHTML = msg1;
}

function send(email, country, fullName, date) {
	let user = new User(email,country,fullName,date);
    let bkUser = new Backendless.User();
    bkUser.email = user.email;
    bkUser.password = user.passowrd;
    bkUser.country = user.country;
    bkUser.tripDate = user.tripDate;
    bkUser.fullName = user.fullName;
    Backendless.UserService.register(bkUser).then(registerOk).catch(apiError)
}

function registerOk(){
    alertMsg("register ok","alert alert-success")
}

function apiError(error){

    console.log(error.message)
    console.log(error.statusCode)
    alertMsg(error.message,"alert alert-danger")
}