'use strict';

angular.module( 'ngFlash', [] )
.factory( 'Flash', [ '$timeout', function( $timeout ) {
    return {
        
        /* 
         * Properties
         */
        msgs: new Array( ),
        
        timeout: 6000,
        
        classes: {
            success: 'alert alert-success',
            info:    'alert alert-info',
            warning: 'alert alert-warning',
            danger:  'alert alert-danger'
        },



        /*
         * Methods
         */
        config: function( alertName, classes ) {
            if( typeof alertName !== 'string' || typeof classes !== 'string' )
                throw 'IllegalArgumentException:  Both parameters to Flash.config( ) must be strings.';
            this.classes[alertName] = classes;
            if( typeof this[alertName] !== 'function' ) {
                var me = this;
                this[alertName] = function( text ) {
                    me.msg( text, alertName );
                };
            }
        },
        
        setTimeout: function( seconds ) {
            this.timeout = seconds * 1000;
        },
        
        msg: function( text, type ) {
            text = typeof text === undefined ? 'Success!' : text;
            type = typeof type === undefined ? 'success' : type;
            
            if( typeof this.classes[type] !== 'undefined' ) {
                var me = this;
                this.msgs.push( { class: this.classes[type], text: text } );
                $timeout( function( ) { me.msgs.shift( ); }, this.timeout );
            }
        },
        
        
        
        /*
         * Default Flash Message Methods
         */
        success: function( text ) {
            this.msg( text, 'success' );
        },
        
        info: function( text ) {
            this.msg( text, 'info' );
        },
        
        warning: function( text ) {
            this.msg( text, 'warning' );
        },
        
        danger: function( text ) {
            this.msg( text, 'danger' );
        }
    };
}])
.controller('FlashCtrl', [ '$scope', 'Flash', function($scope, Flash) {

    $scope.msgs = Flash.msgs;
    
}])
.directive( 'ngFlashMessages', function( ) {
    return {
        restrict: 'E',
        controller: 'FlashCtrl',
        template:
                '<div class="ngflashmessage"\
                     ng-repeat="msg in msgs"\
                     ng-class="msg.class">\
                     {{msg.text}}\
                 </div>'
    };
});
