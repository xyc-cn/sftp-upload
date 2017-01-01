# sftp-upload
nodejs sftp upload module

``` javascript
var config = {
	connent:{
		host: '1010.10.10',
		port: '36000',
		username: 'root',
		password: 'root'
	},
	log:true,
	cwd:'./', //current work dir
	dir:'src',//upload dir
	remoteDir:'/data/home/easonxie/test/' //remote dir
};

var upload = require('sftp_client')

var instance = upload.getInstance(config);

instance.start();
``` 
