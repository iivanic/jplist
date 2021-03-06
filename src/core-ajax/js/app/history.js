/**
 * history - used in controls like 'reset' and 'back button'
 */
;(function(){
    'use strict';

    /**
     * get last status from the history
     * @param {Object} context
     * @return {jQuery.fn.jplist.StatusDTO} status
     */
    var getLastStatus = function(context){

        var lastStatus = null;

        if(context.statusesQueue.length > 0){
            lastStatus = context.statusesQueue[context.statusesQueue.length - 1];
        }

        return lastStatus;
    };

    /**
     * get last list of statuses from the history
     * @param {Object} context
     * @return {Array.<jQuery.fn.jplist.StatusDTO>} list
     */
    var getLastList = function(context){

        var lastList = null;

        if(context.listStatusesQueue.length > 0){
            lastList = context.listStatusesQueue[context.listStatusesQueue.length - 1];
        }

        return lastList;
    };

    /**
     * add status to the history
     * @param {Object} context
     * @param {jQuery.fn.jplist.StatusDTO} status
     */
    var addStatus = function(context, status){

        //add status to the end
        context.statusesQueue.push(status);

        if(context.statusesQueue.length > context.options.historyLength){

            //remove a status from the beginning of the queue
            context.statusesQueue.shift();
        }
    };

    /**
     * add statuses to the history
     * @param {Object} context
     * @param {Array.<jQuery.fn.jplist.StatusDTO>} statuses
     */
    var addStatuses = function(context, statuses){

        for(var i=0; i<statuses.length; i++){
            addStatus(context, statuses[i]);
        }
    };

    /**
     * add list of statuses to the history
     * @param {Object} context
     * @param {Array.<jQuery.fn.jplist.StatusDTO>} list
     */
    var addList = function(context, list){

        //add list to the end
        context.listStatusesQueue.push(list);

        if(context.listStatusesQueue.length > context.options.historyLength){

            //remove a list from the beginning of the queue
            context.listStatusesQueue.shift();
        }
    };

    /**
     * remove the last list of statuses from the history and return it
     * @param {Object} context
     * @return {Array.<jQuery.fn.jplist.StatusDTO>} list
     */
    var popList = function(context){

        var list = null;

        if(context.listStatusesQueue.length > 0){

            //remove a list from the end of the queue and return it
            list = context.listStatusesQueue.pop();
        }

        return list;
    };

    /**
     * History
     * @param {jQueryObject} $root - jplist jquery element
     * @param {Object} options - jplist user options
     * @param {Object} observer
     * @return {Object}
     * @constructor
     */
    jQuery.fn.jplist.History = function($root, options, observer){

        this.options = options;
        this.observer = observer;
        this.$root = $root;
        this.statusesQueue = [];
        this.listStatusesQueue = [];
    };

    /**
     * add statuses to the history
     * @param {Array.<jQuery.fn.jplist.StatusDTO>} statuses
     */
    jQuery.fn.jplist.History.prototype.addStatuses = function(statuses){
        addStatuses(this, statuses);
    };

    /**
     * get last status from the history
     * @return {jQuery.fn.jplist.StatusDTO} status
     */
    jQuery.fn.jplist.History.prototype.getLastStatus = function(){
        return getLastStatus(this);
    };

    /**
     * get last list of statuses from the history
     * @return {Array.<jQuery.fn.jplist.StatusDTO>} list
     */
    jQuery.fn.jplist.History.prototype.getLastList = function(){
        return getLastList(this);
    };

    /**
     * add list of statuses to the history
     * @param {Array.<jQuery.fn.jplist.StatusDTO>} list
     */
    jQuery.fn.jplist.History.prototype.addList = function(list){
        addList(this, list);
    };

    /**
     * remove the last list of statuses from the history and return it
     * @return {Array.<jQuery.fn.jplist.StatusDTO>} list
     */
    jQuery.fn.jplist.History.prototype.popList = function(){
        return popList(this);
    };

})();