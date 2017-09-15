/**
 * Created by pratham on 06/08/17.
 */


var density_product, RI_product, Ta, Tb, Tc, Td, Te, Tf, steam_condensate_volume, time_s, volume_product_collected, time_p, volume_condensate_collected, time_v;
var flow_rate_feed, flow_rate_cold;

var weight_product, capacity, steam_consumptions, economy;





var radius = .145,area, solution_temp, entering_steam_temp, condensate_collected, time, solution_level;
var volume_initial, volume_final, water_evaporated, density_water, solute_fraction_initial, solute_fraction_final;
var total_heat_transfer, latent_heat_steam, heat_transfer_coeff, heat_transfer_rate, capacity, economy;






function roundoff4(rnum1){
    var rnum = rnum1;
    rnum = (Math.round(rnum*Math.pow(10,4)))/Math.pow(10,4);
    return rnum;
}

function calculations(){


    sh_water     =   document.getElementById("sh_water").value ;
    latent_heat_steam     =   document.getElementById("latent_heat_steam").value ;
    density_steam     =   document.getElementById("density_steam").value ;
    density_water     =   document.getElementById("density_water").value ;

    solute_fraction_initial     =   document.getElementById("solute_fraction_initial").value ;
    time     =   document.getElementById("time").value ;
    solution_level     =   document.getElementById("solution_level").value ;

    heat_transfer_rate     =   document.getElementById("heat_transfer_rate").value ;



    volume_initial      =   (2*Math.PI*Math.pow(radius,3));
    volume_final        =   Math.PI*Math.pow(solution_level,2)*(radius-(solution_level/3));
    area                =   2*Math.PI*radius*solution_level;
    water_evaporated    =   (volume_initial- volume_final)*density_water;
    solute_fraction_final=  (solute_fraction_initial*volume_initial)/volume_final;
    total_heat_transfer =   water_evaporated*latent_heat_steam;




    heat_transfer_coeff =   (heat_transfer_rate)/(area*(entering_steam_temp-solution_temp));
    economy             =   water_evaporated/water_evaporated;


    document.getElementById("volume_initial").value          = parseFloat(volume_initial) ;
    document.getElementById("volume_final").value          = volume_final;
    document.getElementById("water_evaporated").value          = water_evaporated;
    document.getElementById("solute_fraction_final").value          = solute_fraction_final;
    document.getElementById("area").value          = area;
    document.getElementById("heat_transfer_coeff").value          = heat_transfer_coeff;
    document.getElementById("economy").value          = economy;




}