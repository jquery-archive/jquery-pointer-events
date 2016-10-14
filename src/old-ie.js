if (!Array.prototype.filter) {
	Array.prototype.filter = function filter(callback, scope) {
        for (var array = this, arrayB = [], index = 0, length = array.length, element; index < length; ++index) {
            element = array[index];

            if (callback.call(scope || window, element, index, array)) {
                arrayB.push(element);
            }
        }

        return arrayB;
	};
}

if (!Array.prototype.forEach) {
	Array.prototype.forEach = function forEach(callback, scope) {
	    for (var array = this, index = 0, length = array.length; index < length; ++index) {
	        callback.call(scope || window, array[index], index, array);
	    }
	};
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function indexOf(searchElement) {
	    for (var array = this, index = 0, length = array.length; index < length; ++index) {
	        if (array[index] === searchElement) {
	            return index;
	        }
	    }

	    return -1;
	};
}

if (!Array.prototype.map) {
	Array.prototype.map = function map(callback, scope) {
	    for (var array = this, arrayB = [], index = 0, length = array.length, element; index < length; ++index) {
	        element = array[index];

	        arrayB.push(callback.call(scope || window, array[index], index, array));
	    }

	    return arrayB;
	};
}

if (!Function.prototype.bind) {
	Function.prototype.bind = function bind(scope) {
	    var callback = this, prepend = Array.prototype.slice.call(arguments, 1), Constructor = function () {}, bound = function () {
	        return callback.apply(this instanceof Constructor && scope ? this : scope, Array.prototype.concat.apply(prepend, arguments));
	    };

	    Constructor.prototype = bound.prototype = callback.prototype;

	    return bound;
	};
}

if (!Object.keys) {
	Object.keys = function keys(object) {
	    var buffer = [], key;

	    for (key in object) {
	        if (Object.prototype.hasOwnProperty.call(object, key)) {
	            buffer.push(key);
	        }
	    }

	    return buffer;
	};
}

if (!Object.defineProperty) {
	Object.defineProperty = function (object, property, descriptor) {
        var propertyValue = object[property];

        function onPropertyChange(event) {
            if (event.propertyName === property) {
                // temporarily remove the event so it doesn't fire again and create a loop
                object.detachEvent("onpropertychange", onPropertyChange);

                // set the value using the setter
                if (descriptor.set) {
                    propertyValue = descriptor.set.call(object, object[property]);
                }

                // restore the getter
                object[property] = String(propertyValue);

                object[property].toString = function () {
                    return descriptor.get.call(object);
                };

                // restore the event
                object.attachEvent("onpropertychange", onPropertyChange);
            }
        }

        // assign the getter
        object[property] = String(propertyValue);

        object[property].toString = function () {
            return descriptor.get.call(object);
        };

        // assign the event
        object.attachEvent("onpropertychange", onPropertyChange);

        // return the object
        return object;
	};
}

if (!Object.defineProperties) {
	Object.defineProperties = function defineProperties(object, descriptors) {
        for (var property in descriptors) {
            Object.defineProperty(object, property, descriptors[property]);
        }

        return object;
	};
}

if (!Date.now) {
	Date.now = function() {
		return new Date().getTime();
	};
}

if ( !document.head ) {
	document.head = document.getElementsByTagName("head")[0];
}
