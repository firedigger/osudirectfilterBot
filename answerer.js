/**
 * Created by DELL on 1/2/2016.
 */
const message_handler = require('./message_handler');
var command = require('./command');
var fs = require('fs');

function answerer(irc_client)
{
    this.irc_client = irc_client;
}

answerer.prototype.send_message = function(to, message)
{
    console.log('ME => ' + to + ': ' + message);
    this.irc_client.say(to, message);
};


answerer.prototype.send_answer = function(to, message)
{
    if (!message)
        return;

    if (message.length === 0)
        return;

    //console.log(message);

    if (Array.isArray(message))
        for(var i = 0; i < message.length; ++i)
            this.send_answer(to,message[i]);
    else
        this.send_message(to,message);
};


answerer.prototype.process = function(from, message) {
    var self = this;

    message_handler.handle_message(new command(message.slice(1)), function(answer){
        self.send_answer(from,answer);
    });
};

module.exports = answerer;