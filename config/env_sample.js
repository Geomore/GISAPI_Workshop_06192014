/*
* update the connstrings in this file, and rename it to be env.js
*/

module.exports = function () {
	
	if(process.env.HOSTNAME === 'postgisfun.devworks.io'){
		this.port = 80;
		this.connstring = 'postgres://<your_username>:<your_password>@<your_db_hostname>:<your_port>/<your_db_name>';
	}
	else{
		this.port = 8080;
		this.connstring = 'postgres://<your_username>:<your_password>@<your_db_hostname>:<your_port>/<your_db_name>';
	}
}