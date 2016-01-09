/**
 * Created by DELL on 1/3/2016.
 */

var osu_api = require('./osu_api');
var fs = require('fs');
var osu = new osu_api.Api('0f5737accd3afa91a03e620495d1e448ef02e4b5');

function handle_error(error, args)
{
    if (error)
    {
        console.log('error: '+ error + '\nAdditional info: ' + args.toString());
        return false;
    }
    return true;
}

function print(obj)
{
    obj.forEach(function(el){console.log(el.beatmapset_id);});
}

function gen_map_link(map)
{
    return 'http://osu.ppy.sh/b/'+map.beatmap_id;
}

function round(float,digit)
{
    var ten = Math.pow(10,digit);
    return (Math.trunc(float * ten) / ten).toFixed(digit);
}

function print_map(map){
    return '[' + gen_map_link(map) + ' ' + map.artist + ' ' + map.title + ' [' + map.version + ']' + ']' + ' ' + round(map.difficultyrating,2) + ' stars';
}

module.exports.get_maps = function(since,filter_obj, callback) {

   osu.getBeatmapsRaw({since: since, m: 0}, function (err, output) {
        callback(output.filter(function(el){return el.difficultyrating <= filter_obj.max_stars && el.difficultyrating >= filter_obj.min_stars;}).map(print_map));
    });
};

