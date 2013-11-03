/*!
 * jQuery Pointer Events v@VERSION
 * https://github.com/jquery/jquery-pointer-events
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */
(function( $ ) {

if ( !Object.keys ) {
	function PointerEvent( type, event ) {
		event.type = type;
		var nevent = $.Event( event );
		$.extend( nevent, event );
		return nevent;
	}
}

window.PointerEventsPolyfill = window.PointerEventsPolyfill || {};
window.PointerEventsPolyfill.external = {
	contains: $.contains,
	addEvent: function( target, eventName ) {
		$( target ).on( eventName, this.boundHandler );
	},
	removeEvent: function( target, eventName ) {
		$( target ).off( eventName, this.boundHandler );
	},
	dispatchEvent: function( event ) {
		var target = this.getTarget( event );
		$( target ).trigger( event );
	}
};

})( jQuery );
