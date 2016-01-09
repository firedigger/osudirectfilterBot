/**
 * Created by DELL on 1/2/2016.
 */

var osu_api_processor = require('./osu_api_processor');
var osu_filter = require('./osu_filter');
var moment = require('moment');

var commands = {};

function gen_date(n)
{
    var format = 'YYYY-MM-DD';

    var day = 24 * 3600 * 1000;
    if (n==='week')
        return moment(new Date(new Date() - 7 * day)).format(format);
    if (n==='day')
        return moment(new Date(new Date() - day)).format(format);
}

commands['find'] = function(args, callback)
{
    var date = gen_date(args[0]);

    var filters = args.splice(1);

    var filter_obj = new osu_filter(filters);

    console.log(date);
    console.log(filter_obj);

    osu_api_processor.get_maps(date, filter_obj, callback);

};
commands['help'] = function(processor, args, callback)
{
    callback(['help']);
};

function parse_message(command, callback)
{
    if (commands[command.command])
    {
        commands[command.command].call(this, command.args, callback);
    }
}

module.exports.handle_message = parse_message;