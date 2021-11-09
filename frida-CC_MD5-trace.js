
{
  onEnter(log, args, state) {
    log('CC_MD5()--arg[0]='+args[0].readUtf8String());
  },
  onLeave(log, retval, state) {
    log('CC_MD5()--return--=');
    var md5_digest = hexdump(retval,{length:16});
    var hexified = " ";
    var raw_array = md5_digest.split("\n");
    for (var a=0; a<raw_array.length; a++)
    {
      var line_array = raw_array[a].split(" ");
      for (var b=1; b<line_array.length-1; b++) 
      {
        if (line_array[b].length === 2)
        {
          hexified += line_array[b];
          hexified = hexified.trim();
        }
      }
    }

    log(hexified+"\n");

  }
}
