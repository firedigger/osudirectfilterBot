/**
 * Created by DELL on 1/9/2016.
 */


function osu_filter(strs)
{
    var self = this;
    strs.forEach(function(el){self.add_filter(el)});
}
function round(float,digit)
{
    var ten = Math.pow(10,digit);
    return (Math.trunc(float * ten) / ten).toFixed(digit);
}
osu_filter.prototype.add_filter = function(str)
{
    var float = /\d+(\.\d+)?/;

    var parser = /stars(>(\d+(\.\d+)?)+)?(<(\d+(\.\d+)?)+)?/;
    var o = parser.exec(str);
    if (o != null)
    {
        console.log(o);
        //console.log(o[1]);
        //console.log(o[4]);
        if (o[1])
            this.min_stars = +(o[1].slice(1));
        if (o[4])
            this.max_stars = +(o[4].slice(1));
    }
};

module.exports = osu_filter;