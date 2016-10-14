var zip = new $.util.Zip();  
zip["file1.txt"] = "This is the first file in ZIP, created by XSJS";  
zip["folder1/file2.txt"] = "This is another file created inside folder folder1";  
$.response.status = $.net.http.OK;  
$.response.contentType = "application/zip";  
$.response.headers.set('Content-Disposition', "attachment; filename = 'ZipExample.zip'");  
$.response.setBody(zip.asArrayBuffer()); 