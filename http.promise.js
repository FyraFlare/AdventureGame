/* global Promise */
var $http = (function (){
    'use strict';

    function ajax(method, uri, args){
        var promise = new Promise(function(resolve, reject){
            var req = new XMLHttpRequest();
            var url =  uri;
            var parameters = '';
            req.open(method, url);

            if(args && (method === 'POST' || method === 'PUT')){
                req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                if(args && typeof args === 'object'){
                    for(var k in args){
                        parameters+= k + '=' + args[k] + '&';
                    }
                }
            }
            req.send(parameters);
            req.onload = function (){
                if(req.status >= 200 && req.status < 300){
                    resolve(req.response);
                }
                else{
                    reject(req.statusText);
                }
            };
            req.onerror = function(){
                reject(req.statusText);
            };
        });
        return promise;
    }

    return {
        get : function(uri, args, callback){
            if (args && typeof args === 'function'){
                callback = args;
            }
            if(callback && typeof callback === 'function'){
                return ajax('GET', uri, args).then(callback)
            }
            return ajax('GET', uri, args);
        },
        post : function(uri, args, callback){
            if (args && typeof args === 'function'){
                callback = args;
            }
            if(callback && typeof callback === 'function'){
                return ajax('POST', uri, args).then(callback)
            }
            return ajax('POST', uri, args);
        },
    };
}());