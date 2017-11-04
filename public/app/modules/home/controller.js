angular.module('gelApp.home', []);

angular.module('gelApp.home').controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.originalLiquid = {
        amount:             100,
        desired_strength:   6,
        wvpga:              0,
        pg:                 30,
        vg:                 70,
        nicotine: {
            strength:   100,
            pg:         100,
            vg:         0
        },
        sleep_time:         7

    };

    // Ingredients to be calculated
    $scope.ingridients = {
        nicotine_juice: 0,
        pg_dilutant:    0,
        vg_dilutant:    0,
        wvpga:          0
    };

    //4. copy originalLiquid to liquid. liquid will be bind to a form
    $scope.liquid = angular.copy($scope.originalLiquid);

    //5. create submitStudentForm() function. This will be called when user submits the form
    $scope.submitLiquidForm = function () {

        var onSuccess = function (data, status, headers, config) {
            alert('Student saved successfully.');
        };

        var onError = function (data, status, headers, config) {
            alert('Error occured.');
        };

        $http.post('/liquid/submitData', { liquid:$scope.liquid })
            .success(onSuccess)
            .error(onError);

    };

    //6. create resetForm() function. This will be called on Reset button click.
    $scope.resetForm = function () {
        $scope.liquid = angular.copy($scope.originalLiquid);
    };

    /* Liquid calculator watcher */

    $scope.$watch('liquid.vg', function(newVal, oldVal){
        $scope.liquid.pg = 100 - $scope.liquid.vg;
    }, true);

    $scope.$watch('liquid.pg', function(newVal, oldVal){
        $scope.liquid.vg = 100 - $scope.liquid.pg;
    }, true);

    $scope.$watch('liquid.nicotine.vg', function(newVal, oldVal){
        $scope.liquid.nicotine.pg = 100 - $scope.liquid.nicotine.vg;
    }, true);

    $scope.$watch('liquid.nicotine.pg', function(newVal, oldVal){
        $scope.liquid.nicotine.vg = 100 - $scope.liquid.nicotine.pg;
    }, true);

    $scope.$watch('liquid', function(newVal, oldVal){
        $scope.calculateIngredients();
    }, true);

    $scope.calculateIngredients = function () {
        $scope.ingridients.vg_dilutant = ($scope.liquid.vg / 100) * $scope.liquid.amount;
        $scope.ingridients.pg_dilutant = ($scope.liquid.pg / 100) * $scope.liquid.amount;

        // Calculate nicotine juice.

        // If we have 100 mg of nicotine in 100 ml of nicotine juice
        // we need to add 10 ml of nicotine juice to have 10 mg strength.
        var totalNicJuicePercentage = $scope.liquid.desired_strength * ($scope.liquid.nicotine.strength / 100);
        $scope.ingridients.nicotine_juice = (totalNicJuicePercentage / 100) * $scope.liquid.amount;


        // Determent how much to remove from base
        var removeFromBase = {
            pg: ($scope.liquid.nicotine.pg / 100) * $scope.ingridients.nicotine_juice,
            vg: ($scope.liquid.nicotine.vg / 100) * $scope.ingridients.nicotine_juice
        };
        // Remove PG and VG from base ingredients.
        $scope.ingridients.vg_dilutant = $scope.ingridients.vg_dilutant - removeFromBase.vg;
        $scope.ingridients.pg_dilutant = $scope.ingridients.pg_dilutant - removeFromBase.pg;


        console.log($scope.liquid);
    }
}]);

/**
 * Stolen function that does all the math
 *
 * @param b
 */
function calcRec(b) {
    changes = !0;
    var a = 0 < $("#maxvg:checked").length;
    a ? ($("#pglab").hide(), $(".vglab").hide()) : ($("#pglab").show(), $(".vglab").show());
    neg = 0;
    tml = $("#res").val();
    tstr = $("#tstre").val();
    str = $("#nstr").val();
    str = 0 < str ? str : 1;
    $("#rnstr").html(str + " mg");
    wv = $("#wvpga").val();
    var d = 0;
    0 == wv ? $("#rwvpga").hide() : $("#rwvpga").show();
    "undefined" != typeof b && ("pgg" == b ? $("#vgg").val(100 - $("#pgg").val()) : "vgg" == b ? $("#pgg").val(100 - $("#vgg").val()) : "nivg" == b ? $("#nipg").val(100 - $("#nivg").val()) : "nipg" ==
        b && $("#nivg").val(100 - $("#nipg").val()));
    pg = $("#pgg").val();
    vg = $("#vgg").val();
    a && (pg = 100, vg = 0);
    npg = $("#nipg").val();
    nvg = $("#nivg").val();
    dpml = $("#xdpml").val();
    tg = tp = td = tm = resml = 0;
    nicml = Math.round(tstr / str * tml * 100) / 100;
    nicdrops = Math.ceil(nicml * dpml);
    nicgrams = Math.round(100 * (npg / 100 * nicml * 1.036 + nvg / 100 * nicml * 1.261)) / 100;
    nicper = Math.round(nicml / tml * 1E4) / 100;
    $("#rnicml").html(nicml.toFixed(2));
    $("#rnicdr").html(nicdrops);
    $("#rnicg").html(nicgrams.toFixed(2));
    $("#rnicper").html(nicper.toFixed(2));
    resml +=
        nicml;
    tm += nicml;
    td += nicdrops;
    tp += nicper;
    tg += nicgrams;
    d += pr.nic * nicml;
    wvml = Math.round(wv / 100 * tml * 100) / 100;
    wvdrops = Math.ceil(wvml * dpml);
    wvgrams = Math.round(93.8 * wvml) / 100;
    wvper = Math.round(wvml / tml * 1E4) / 100;
    $("#rwvpgaml").html(wvml);
    $("#rwvpgadr").html(wvdrops);
    $("#rwvpgag").html(wvgrams);
    $("#rwvpgaper").html(wvper);
    resml += wvml;
    tm += wvml;
    td += wvdrops;
    tp += wvper;
    tg += wvgrams;
    d += pr.wvpga * wvml;
    flgtot = fltot = foml = fvgml = fpgml = 0;
    b = !1;
    for (i = 1; i <= nflav; i++)
        if (fl = $("#f" + i).val(), !isNaN(fl)) {
            flml = Math.round(fl / 100 *
                tml * 1E3) / 1E3;
            fltot += flml;
            fldr = Math.ceil(flml * dpml);
            flper = Math.round(flml / tml * 1E4) / 100;
            resml += flml;
            $("#flu" + i).html(flml.toFixed(2));
            $("#fld" + i).html(fldr);
            $("#flp" + i).html(flper.toFixed(2));
            tm += flml;
            td += fldr;
            tp += flper;
            rbv = $("input[name='fpvo" + i + "']:checked").val();
            var c = $("#fw" + i).val();
            0 == rbv ? (fpgml += flml, fgadj = 0 != c ? c : 1) : 1 == rbv ? (fvgml += flml, fgadj = 0 != c ? c : 1.16) : (foml += flml, fgadj = 0 != c ? c : .98);
            flg = Math.round(flml * fgadj * 100) / 100;
            flgtot += flml * fgadj;
            tg += flg;
            $("#flg" + i).html(flg.toFixed(2));
            d += 0 < $("#fw" +
                i).data("prml") ? $("#fw" + i).data("prml") * flml : 0;
            if (!$("#fw" + i).data("prml") || 0 < $("#fw" + i).data("prml") && 0 == $("#fw" + i).data("prml") * flml) b = !0
        }
    restml = tml - resml;
    xpgml = Math.round(100 * (pg / 100 * (tml - wvml - foml) - npg / 100 * nicml - fpgml)) / 100;
    d += pr.pg * xpgml;
    xpgdrop = Math.ceil(xpgml * dpml);
    xpggrams = Math.ceil(1.036 * xpgml * 100) / 100;
    xpgper = Math.round(xpgml / tml * 1E4) / 100;
    0 > xpgml && (neg = 1);
    0 == xpgml ? (xpgper = xpgdrop = 0, $("#rpgd").hide()) : $("#rpgd").show();
    xvgml = Math.round(100 * (vg / 100 * (tml - wvml - foml) - nvg / 100 * nicml - fvgml)) / 100;
    d += pr.vg * xvgml;
    xvgdrop = Math.ceil(xvgml * dpml);
    xvggrams = Math.ceil(126.1 * xvgml) / 100;
    xvgper = Math.round(xvgml / tml * 1E4) / 100;
    a && (d -= pr.pg * xpgml, d += pr.vg * xpgml, xvgml = Math.round(100 * (xpgml + xvgml)) / 100, xvgdrop = Math.ceil(xvgml * dpml), xvggrams = Math.ceil(126.1 * xvgml) / 100, xvgper = Math.round(xvgml / tml * 1E3) / 10, xpgper = xpggrams = xpgdrop = xpgml = 0, $("#rpgd").hide());
    0 > xvgml && (neg = 1);
    0 == xvgml ? (xvgper = xpvdrop = 0, $("#rvgd").hide()) : $("#rvgd").show();
    tm += xpgml + xvgml;
    td += xpgdrop + xvgdrop;
    tp += xpgper + xvgper;
    tg += xpggrams + xvggrams;
    $("#rpgml").html(xpgml.toFixed(2));
    $("#rpgdr").html(xpgdrop);
    $("#rpgg").html(xpggrams.toFixed(2));
    $("#rpgper").html(xpgper.toFixed(2));
    $("#rvgml").html(xvgml.toFixed(2));
    $("#rvgg").html(xvggrams.toFixed(2));
    $("#rvgdr").html(xvgdrop);
    $("#rvgper").html(xvgper.toFixed(2));
    $("#rtu").html(Math.round(100 * tm) / 100);
    $("#rtg").html(Math.round(100 * tg) / 100);
    $("#rtd").html(td);
    $("#fstr").html(Math.round(nicml / tm * str * 10) / 10);
    tvg = nvg / 100 * nicml + fvgml + xvgml;
    tpg = npg / 100 * nicml + fpgml + xpgml;
    vgr = Math.round(100 * tvg / (tvg +
        tpg));
    pgr = Math.round(100 * tpg / (tvg + tpg));
    $("#pvr").html(pgr + "/" + vgr);
    $("#rtp").html(Math.round(tp));
    theprice = d.toFixed(2);
    $("#pri").html(theprice);
    b ? $(".warnpri").show() : $(".warnpri").hide();
    "0.00" == theprice && $("shpri").hide();
    var f = 1;
    $(".recline:visible").each(function() {
        f++;
        0 == f % 2 ? $(this).addClass("highlight") : $(this).removeClass("highlight")
    });
    1 == neg ? ($("#ermsg").html(neg_val_error).show("fast"), $("#savebtn").attr("disabled", "disabled")) : ($("#ermsg").hide("fast"), $("#savebtn").removeAttr("disabled"));
    100 == npg ? $("#nirat").html(npg + "% PG") : 100 == nvg ? $("#nirat").html(nvg + "% VG") : $("#nirat").html(npg + "/" + nvg + " PG/VG");
    flgtot = Math.round(100 * flgtot) / 100;
    $("#flml").html(Math.round(100 * fltot) / 100 + " ml / " + flgtot + "g");
    $("#flper").html(Math.round(1E4 * fltot / tml) / 100 + "%");
    $("#dpml").html(dpml);
    $("#bn").width(Math.round(nicper) + "%");
    $("#bp").width(Math.round(xpgper) + "%");
    $("#bv").width(Math.round(xvgper) + "%");
    $("#bf").width(100 - (Math.round(nicper) + Math.round(xpgper) + Math.round(xvgper)) + "%");
    a = parseFloat($("#rnicml").html());
    d = parseFloat($("#rnicdr").html());
    b = parseFloat($("#rnicg").html());
    c = parseFloat($("#rnicper").html());
    0 < $("#rpgml:visible").length && (a += parseFloat($("#rpgml").html()), d += parseFloat($("#rpgdr").html()), b += parseFloat($("#rpgg").html()), c += parseFloat($("#rpgper").html()));
    0 < $("#rvgml:visible").length && (a += parseFloat($("#rvgml").html()), d += parseFloat($("#rvgdr").html()), b += parseFloat($("#rvgg").html()), c += parseFloat($("#rvgper").html()));
    0 < $("#rvwpgaml:visible").length && (a += parseFloat($("#rvwpgaml").html()),
        d += parseFloat($("#rvwpgadr").html()), b += parseFloat($("#rvwpgag").html()), c += parseFloat($("#rvwpgaper").html()));
    $("#totbaseml").html(Math.round(100 * a) / 100);
    $("#totbasedr").html(Math.round(100 * d) / 100);
    $("#totbaseg").html(Math.round(100 * b) / 100);
    $("#totbaseper").html(Math.round(100 * c) / 100);
    "" == haschanged && (haschanged = $("#recform").serialize())
}
