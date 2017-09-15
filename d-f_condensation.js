/**
 * Created by pratham on 02/08/17.
 */



var diameter_outer = 0.019, diameter_inner = 0.016, length = .175;
// thermal conductivity at 40 and 100 degC
var flow_rate, vol_condensed_steam, time, Ta, Tb, Tc, Td, Te, latent_heat_steam, sh_water;
var density_steam, density_water, steam_mass_rate, water_mass_rate, heat_loss_steam, heat_transferred_to_cold, avg_heat_transfer;
var inside_heat_transfer_coeff_plain, outside_heat_transfer_coeff_plain,inside_heat_transfer_coeff_plated, outside_heat_transfer_coeff_plated, log_mean_temp_diff_plated, log_mean_temp_diff_plain;
var exp_overall_heat_transfer_coeff_plain,exp_overall_heat_transfer_coeff_plated, theo_overall_heat_transfer_coeff;
var T2, T1_plated, T1_plain;






var inside_heat_transfer_area = (Math.PI*diameter_inner*length) ;
var outside_heat_transfer_area = (Math.PI*diameter_outer*length) ;



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
    vol_condensed_steam     =   document.getElementById("vol_condensed_steam").value ;

    flow_rate               =   document.getElementById("flow_rate").value ;
    vol_condensed_steam     =   document.getElementById("vol_condensed_steam").value ;
    time                    =   document.getElementById("time").value ;
    Ta     =   document.getElementById("Ta").value ;
    Tb     =   document.getElementById("Tb").value ;
    Tc     =   document.getElementById("Tc").value ;
    Td     =   document.getElementById("Td").value ;
    Te     =   document.getElementById("Te").value ;



    steam_mass_rate             = vol_condensed_steam/time ;
    water_mass_rate             = flow_rate*density_water;
    heat_loss_steam             = steam_mass_rate*latent_heat_steam;
    heat_transferred_to_cold    = water_mass_rate*sh_water*(Td-Te);
    avg_heat_transfer           = (parseFloat(heat_transferred_to_cold)+parseFloat(heat_loss_steam))/2;

    T1_plain    =   parseFloat(Tc) - parseFloat(Tb);
    T1_plated   =   parseFloat(Tc) - parseFloat(Ta);
    T2 = parseFloat(Td) - parseFloat(Te);

    log_mean_temp_diff_plain          = (T2 - T1_plain)/Math.log((T2/T1_plain));
    log_mean_temp_diff_plated          = (T2 - T1_plated)/Math.log((T2/T1_plated));
    inside_heat_transfer_coeff_plain  = avg_heat_transfer/(inside_heat_transfer_area*log_mean_temp_diff_plain);
    inside_heat_transfer_coeff_plated  = avg_heat_transfer/(inside_heat_transfer_area*log_mean_temp_diff_plated);
    outside_heat_transfer_coeff_plain  = avg_heat_transfer/(outside_heat_transfer_area*log_mean_temp_diff_plain);
    outside_heat_transfer_coeff_plated  = avg_heat_transfer/(outside_heat_transfer_area*log_mean_temp_diff_plated);
    exp_overall_heat_transfer_coeff_plain = Math.pow(parseFloat(Math.pow(inside_heat_transfer_coeff_plain,-1)) + parseFloat((diameter_inner*Math.pow((diameter_inner*outside_heat_transfer_coeff_plain),-1))),-1);
    exp_overall_heat_transfer_coeff_plated = Math.pow(parseFloat(Math.pow(inside_heat_transfer_coeff_plated,-1)) + parseFloat((diameter_inner*Math.pow((diameter_inner*outside_heat_transfer_coeff_plated),-1))),-1);


    // theo_overall_heat_transfer_coeff =


    document.getElementById("steam_mass_rate").value          = steam_mass_rate;
    document.getElementById("water_mass_rate").value          = water_mass_rate;
    document.getElementById("mass_rate_hot").value          = mass_rate_hot;
    document.getElementById("heat_loss_steam").value = heat_loss_steam;
    document.getElementById("heat_transferred_to_cold").value  = heat_transferred_to_cold;
    document.getElementById("avg_heat_transfer").value  = avg_heat_transfer;
    document.getElementById("log_mean_temp_diff_plain").value          = log_mean_temp_diff_plain;
    document.getElementById("log_mean_temp_diff_plated").value          = log_mean_temp_diff_plated;
    document.getElementById("overall_heat_transfer_coeff_c").value     = overall_heat_transfer_coeff_c;
    document.getElementById("overall_heat_transfer_coeff_p").value     = overall_heat_transfer_coeff_p;
    document.getElementById("inside_heat_transfer_coeff_plain").value     = inside_heat_transfer_coeff_plain;
    document.getElementById("inside_heat_transfer_coeff_plated").value     = inside_heat_transfer_coeff_plated;
    document.getElementById("side_heat_transfer_coeff_plain").value     = outside_heat_transfer_coeff_plain;
    document.getElementById("outside_heat_transfer_coeff_plated").value     = outside_heat_transfer_coeff_plated;
    document.getElementById("outside_film_heat_coeff").value     = outside_film_heat_coeff;// this is inner overall
    document.getElementById("theo_overall_heat_transfer_coeff").value     = theo_overall_heat_transfer_coeff;// this is inner overall



    /*dynamic_viscosity       = document.getElementById('dynamic_viscosity').value;
    thermal_conductivity    = document.getElementById('thermal_conductivity').value;*/



}

































