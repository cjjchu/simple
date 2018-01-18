
function GetFTPDirList(path_remote)
{//得到一级FTP文件子项列表
  var cmd="curl " +  path_remote + " -s"+" --list-only";
  var files = [];
  var result = shell.exec(cmd);
  if (result.code!=0)
  {
    var strError = result.stdout;
    var nPos = result.stdout.indexOf(result.code);
    if (nPos>=0)
      strError = strError.substr(nPos);

    last_error = strError;
    throw new Error(strError);
  }

  var strLineEndFlag = carriage;

  var index=0;
  var string=result.stdout;
  while(true)
  {
    index=string.indexOf(strLineEndFlag);
    if (index!=-1)
    {
      files.push(string.substr(0,index));
      string=string.substr(index+strLineEndFlag.length);
    }
    else
    {
      break;
    }
  }
  return files;
}
