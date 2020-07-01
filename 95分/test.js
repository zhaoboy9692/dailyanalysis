Java.perform(function () {
    // var comma = Java.use('com.ninetyfive.commonnf.c.b.a');
    // comma.a.overload('java.lang.String').implementation = function (a1) {
    //     var res = this.a(a1);
    //     console.log(a1)
    //     console.log(res)
    //     return res;
    // }

    var str = Java.use('java.lang.String');
    var MessageDigest = Java.use('java.security.MessageDigest');
    MessageDigest.digest.overload(('[B')).implementation = function (a1) {
        var res = this.digest(a1);
        console.log(str.$new(a1))
        return res;
    }

})
//1593611840606xgcpyh666
//1593611868915xgcpyh666
//120195fen_android_home_personalHomeRecommendListnew1593611869091xgcpyh666
//120195fen_android_home_personalHomeRecommendListnew1593611840872xgcpyh666
//120195fen_android_home_personalHomeRecommendListnew1593612962422xgcpyh666
//page+page_size+scene_type+sn+sort+timestamp+xgcpyh666