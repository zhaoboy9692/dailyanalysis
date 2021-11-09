 
{ 
  onEnter(log, args, state) {
    log(`key=${Memory.readUtf8String(args[3], args[4].toInt32())}, IV=${Memory.readUtf8String(args[5], args[4].toInt32())}, data=${Memory.readUtf8String(args[6], args[7].toInt32())}`);

    this.operation   = args[0]
    this.CCAlgorithm = args[1]
    this.CCOptions   = args[2]
    this.keyBytes    = args[3]
    this.keyLength   = args[4]
    this.ivBuffer    = args[5]
    this.inBuffer    = args[6]
    this.inLength    = args[7]
    this.outBuffer   = args[8]
    this.outLength   = args[9]
    this.outCountPtr = args[10]
    console.log("[+] --------------------------------------------------------------");
    console.log('\tACCURATE Backtrace:\n\t' + Thread.backtrace(this.context,Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n\t'));

  
 },

  onLeave(log, retval, state) {
    function bin2string(array){
      var result = "";
      for(var i = 0; i < array.length; ++i){
        result+= (String.fromCharCode(array[i]));
      }
      return result;
    }
    
    
    function base64encode(str) {
      var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var out, i, len;
        var c1, c2, c3;
    
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }
    
    if (this.operation == 0) {

     if (this.CCAlgorithm == 0x0) {console.log("[+] CCAlgorithm: " + this.CCAlgorithm + " --> AES Encrypt");}
     if (this.CCAlgorithm == 0x1) {console.log("[+] CCAlgorithm: " + this.CCAlgorithm + " --> DES Encrypt");}
     if (this.CCAlgorithm == 0x2) {console.log("[+] CCAlgorithm: " + this.CCAlgorithm + " --> 3DES Encrypt");}

 
     if (this.CCOptions == 0x0 || this.CCOptions == 0x1) {console.log("[+] CCOptions: " + this.CCOptions + " --> mode CBC");}
     if (this.CCOptions == 0x2 || this.CCOptions == 0x3) {console.log("[+] CCOptions: " + this.CCOptions + " --> mode ECB");} // kCCOptionPKCS7Padding | kCCOptionECBMode == 0x03

     log(Memory.readByteArray(this.inBuffer, this.inLength.toInt32()));
     try {
         log("[+] Before Encrypt: " + Memory.readUtf8String(this.inBuffer, this.inLength.toInt32()), { c: Color.Gray }); 
     } catch(e) {
     }  
     
     console.log(Memory.readByteArray(this.keyBytes, this.keyLength.toInt32()));
     if (this.keyLength.toInt32() == 16) {console.log("[+] KEY Length --> 128");}
     if (this.keyLength.toInt32() == 24) {console.log("[+] KEY Length --> 192");}
     if (this.keyLength.toInt32() == 32) {console.log("[+] KEY Length --> 256");}
     try {
         log("[+] KEY: " + Memory.readUtf8String(this.keyBytes, this.keyLength.toInt32()) ); 
     } catch(e) {
         var ByteArray = Memory.readByteArray(this.keyBytes, this.keyLength.toInt32());
         var uint8Array = new Uint8Array(ByteArray);

         var str = "";
         for(var i = 0; i < uint8Array.length; i++) {
             var hextemp = (uint8Array[i].toString(16))
             if(hextemp.length == 1){
                 hextemp = "0" + hextemp
             }
                 str += hextemp + " ";
         }

         log("[+] KEY: " + str); 
     }     

     if (this.CCOptions == 0x0 || this.CCOptions == 0x1) {
        log(Memory.readByteArray(this.ivBuffer, 16));
         try {
             log("[+] IV: " + Memory.readUtf8String(this.ivBuffer, 16) ); 
         } catch(e) {
             var ByteArray = Memory.readByteArray(this.ivBuffer, 16);
             var uint8Array = new Uint8Array(ByteArray);

             var str = "";
             for(var i = 0; i < uint8Array.length; i++) {
                 var hextemp = (uint8Array[i].toString(16))
                 if(hextemp.length == 1){
                     hextemp = "0" + hextemp
                 }
                 str += hextemp + " ";
             }

             log("[+] IV: " + str); 
         }
     }
      
     var array = new Uint8Array(Memory.readByteArray(this.outBuffer, Memory.readUInt(this.outCountPtr)));
     log("[+] After Encrypt: "+base64encode(bin2string(array)) );

  }
  if (this.operation == 1) {
  
    if (this.CCAlgorithm == 0x0) {console.log("[+] CCAlgorithm: " + this.CCAlgorithm + " --> AES Decrypt");}
    if (this.CCAlgorithm == 0x1) {console.log("[+] CCAlgorithm: " + this.CCAlgorithm + " --> DES Decrypt");}
    if (this.CCAlgorithm == 0x2) {console.log("[+] CCAlgorithm: " + this.CCAlgorithm + " --> 3DES Decrypt");}

    if (this.CCOptions == 0x0 || this.CCOptions == 0x1) {console.log("[+] CCOptions: " + this.CCOptions + " --> mode CBC");}
    if (this.CCOptions == 0x2 || this.CCOptions == 0x3) {console.log("[+] CCOptions: " + this.CCOptions + " --> mode ECB");} // kCCOptionPKCS7Padding | kCCOptionECBMode == 0x03

    var array = new Uint8Array(Memory.readByteArray(this.inBuffer, this.inLength.toInt32()));
    log("[+] Before Decrypt: " + base64encode(bin2string(array)), { c: Color.Gray }); 
    
    console.log(Memory.readByteArray(this.keyBytes, this.keyLength.toInt32()));
    if (this.keyLength.toInt32() == 16) {console.log("[+] KEY Length --> 128");}
    if (this.keyLength.toInt32() == 24) {console.log("[+] KEY Length --> 192");}
    if (this.keyLength.toInt32() == 32) {console.log("[+] KEY Length --> 256");}
    try {
        log("[+] KEY: " + Memory.readUtf8String(this.keyBytes, this.keyLength.toInt32()), { c: Color.Gray }); 
    } catch(e) {
        var ByteArray = Memory.readByteArray(this.keyBytes, this.keyLength.toInt32());
        var uint8Array = new Uint8Array(ByteArray);
        var str = "";
        for(var i = 0; i < uint8Array.length; i++) {
            var hextemp = (uint8Array[i].toString(16))
            if(hextemp.length == 1){
                hextemp = "0" + hextemp
            }
            str += hextemp + " ";
        }

        log("[+] KEY: " + str); 
    }     

    if (this.CCOptions == 0x0 || this.CCOptions == 0x1) {
        console.log(Memory.readByteArray(this.ivBuffer, 16));
        try {
            // console.log("[+] IV: " + Memory.readUtf8String(this.ivBuffer, this.keyLength.toInt32()));
            log("[+] IV: " + Memory.readUtf8String(this.ivBuffer, 16)); 
        } catch(e) {
            var ByteArray = Memory.readByteArray(this.ivBuffer, 16);
            var uint8Array = new Uint8Array(ByteArray);

            var str = "";
            for(var i = 0; i < uint8Array.length; i++) {
                var hextemp = (uint8Array[i].toString(16))
                if(hextemp.length == 1){
                    hextemp = "0" + hextemp
                }
                str += hextemp + " ";
            }

            log("[+] IV: " + str); 
        }
    }

    log(Memory.readByteArray(this.outBuffer, Memory.readUInt(this.outCountPtr)));
    try {
       log("[+] After Decrypt: " + Memory.readUtf8String(this.outBuffer, Memory.readUInt(this.outCountPtr)));
    } catch(e) {
    }

    log("[-] --------------------------------------------------------------\n");
}
}
}
