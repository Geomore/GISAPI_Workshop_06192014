module.exports = function () {
	
	if(process.env.HOSTNAME === 'postgisfun.devworks.io'){
		this.port = 80;
		this.connstring = 'postgres://postgres:password1@127.0.0.1:5432/postgisfun';
	}
	else{
		this.port = 8080;
		this.connstring = 'postgres://postgres:password1@postgisfun.devworks.io:5432/postgisfun'
	}
}