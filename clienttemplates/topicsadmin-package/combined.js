/*
 * jQuery UI Draggable 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget("ui.draggable", $.ui.mouse, {
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false
	},
	_create: function() {

		if (this.options.helper == 'original' && !(/^(?:r|a|f)/).test(this.element.css("position")))
			this.element[0].style.position = 'relative';

		(this.options.addClasses && this.element.addClass("ui-draggable"));
		(this.options.disabled && this.element.addClass("ui-draggable-disabled"));

		this._mouseInit();

	},

	destroy: function() {
		if(!this.element.data('draggable')) return;
		this.element
			.removeData("draggable")
			.unbind(".draggable")
			.removeClass("ui-draggable"
				+ " ui-draggable-dragging"
				+ " ui-draggable-disabled");
		this._mouseDestroy();

		return this;
	},

	_mouseCapture: function(event) {

		var o = this.options;

		// among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).is('.ui-resizable-handle'))
			return false;

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle)
			return false;
		
		if ( o.iframeFix ) {
			$(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
				$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
				.css({
					width: this.offsetWidth+"px", height: this.offsetHeight+"px",
					position: "absolute", opacity: "0.001", zIndex: 1000
				})
				.css($(this).offset())
				.appendTo("body");
			});
		}

		return true;

	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css("position");
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.positionAbs = this.element.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if 'cursorAt' is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Set a containment if given in the options
		if(o.containment)
			this._setContainment();

		//Trigger event + callbacks
		if(this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);

		this.helper.addClass("ui-draggable-dragging");
		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		
		//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
		if ( $.ui.ddmanager ) $.ui.ddmanager.dragStart(this, event);
		
		return true;
	},

	_mouseDrag: function(event, noPropagation) {

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			if(this._trigger('drag', event, ui) === false) {
				this._mouseUp({});
				return false;
			}
			this.position = ui.position;
		}

		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			dropped = $.ui.ddmanager.drop(this, event);

		//if a drop comes from outside (a sortable)
		if(this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}
		
		//if the original element is removed, don't bother to continue if helper is set to "original"
		if((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original")
			return false;

		if((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			var self = this;
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				if(self._trigger("stop", event) !== false) {
					self._clear();
				}
			});
		} else {
			if(this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},
	
	_mouseUp: function(event) {
		if (this.options.iframeFix === true) {
			$("div.ui-draggable-iframeFix").each(function() { 
				this.parentNode.removeChild(this); 
			}); //Remove frame helpers
		}
		
		//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
		if( $.ui.ddmanager ) $.ui.ddmanager.dragStop(this, event);
		
		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},
	
	cancel: function() {
		
		if(this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp({});
		} else {
			this._clear();
		}
		
		return this;
		
	},

	_getHandle: function(event) {

		var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
		$(this.options.handle, this.element)
			.find("*")
			.andSelf()
			.each(function() {
				if(this == event.target) handle = true;
			});

		return handle;

	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper == 'clone' ? this.element.clone().removeAttr('id') : this.element);

		if(!helper.parents('body').length)
			helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));

		if(helper[0] != this.element[0] && !(/(fixed|absolute)/).test(helper.css("position")))
			helper.css("position", "absolute");

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj == 'string') {
			obj = obj.split(' ');
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ('left' in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ('right' in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ('top' in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ('bottom' in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.element.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"),10) || 0),
			top: (parseInt(this.element.css("marginTop"),10) || 0),
			right: (parseInt(this.element.css("marginRight"),10) || 0),
			bottom: (parseInt(this.element.css("marginBottom"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			o.containment == 'document' ? 0 : $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
			o.containment == 'document' ? 0 : $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
			(o.containment == 'document' ? 0 : $(window).scrollLeft()) + $(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			(o.containment == 'document' ? 0 : $(window).scrollTop()) + ($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
		        var c = $(o.containment);
			var ce = c[0]; if(!ce) return;
			var co = c.offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				(parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0),
				(parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0),
				(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right,
				(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top  - this.margins.bottom
			];
			this.relative_container = c;

		} else if(o.containment.constructor == Array) {
			this.containment = o.containment;
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options
		         var containment;
		         if(this.containment) {
				 if (this.relative_container){
				     var co = this.relative_container.offset();
				     containment = [ this.containment[0] + co.left,
						     this.containment[1] + co.top,
						     this.containment[2] + co.left,
						     this.containment[3] + co.top ];
				 }
				 else {
				     containment = this.containment;
				 }

				if(event.pageX - this.offset.click.left < containment[0]) pageX = containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < containment[1]) pageY = containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > containment[2]) pageX = containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > containment[3]) pageY = containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
				var top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? (!(top - this.offset.click.top < containment[1] || top - this.offset.click.top > containment[3]) ? top : (!(top - this.offset.click.top < containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? (!(left - this.offset.click.left < containment[0] || left - this.offset.click.left > containment[2]) ? left : (!(left - this.offset.click.left < containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if(this.helper[0] != this.element[0] && !this.cancelHelperRemoval) this.helper.remove();
		//if($.ui.ddmanager) $.ui.ddmanager.current = null;
		this.helper = null;
		this.cancelHelperRemoval = false;
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function(type, event, ui) {
		ui = ui || this._uiHash();
		$.ui.plugin.call(this, type, [event, ui]);
		if(type == "drag") this.positionAbs = this._convertPositionTo("absolute"); //The absolute position has to be recalculated after plugins
		return $.Widget.prototype._trigger.call(this, type, event, ui);
	},

	plugins: {},

	_uiHash: function(event) {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

$.extend($.ui.draggable, {
	version: "1.8.17"
});

$.ui.plugin.add("draggable", "connectToSortable", {
	start: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options,
			uiSortable = $.extend({}, ui, { item: inst.element });
		inst.sortables = [];
		$(o.connectToSortable).each(function() {
			var sortable = $.data(this, 'sortable');
			if (sortable && !sortable.options.disabled) {
				inst.sortables.push({
					instance: sortable,
					shouldRevert: sortable.options.revert
				});
				sortable.refreshPositions();	// Call the sortable's refreshPositions at drag start to refresh the containerCache since the sortable container cache is used in drag and needs to be up to date (this will ensure it's initialised as well as being kept in step with any changes that might have happened on the page).
				sortable._trigger("activate", event, uiSortable);
			}
		});

	},
	stop: function(event, ui) {

		//If we are still over the sortable, we fake the stop event of the sortable, but also remove helper
		var inst = $(this).data("draggable"),
			uiSortable = $.extend({}, ui, { item: inst.element });

		$.each(inst.sortables, function() {
			if(this.instance.isOver) {

				this.instance.isOver = 0;

				inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
				this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)

				//The sortable revert is supported, and we have to set a temporary dropped variable on the draggable to support revert: 'valid/invalid'
				if(this.shouldRevert) this.instance.options.revert = true;

				//Trigger the stop of the sortable
				this.instance._mouseStop(event);

				this.instance.options.helper = this.instance.options._helper;

				//If the helper has been the original item, restore properties in the sortable
				if(inst.options.helper == 'original')
					this.instance.currentItem.css({ top: 'auto', left: 'auto' });

			} else {
				this.instance.cancelHelperRemoval = false; //Remove the helper in the sortable instance
				this.instance._trigger("deactivate", event, uiSortable);
			}

		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), self = this;

		var checkPos = function(o) {
			var dyClick = this.offset.click.top, dxClick = this.offset.click.left;
			var helperTop = this.positionAbs.top, helperLeft = this.positionAbs.left;
			var itemHeight = o.height, itemWidth = o.width;
			var itemTop = o.top, itemLeft = o.left;

			return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick, itemTop, itemLeft, itemHeight, itemWidth);
		};

		$.each(inst.sortables, function(i) {
			
			//Copy over some variables to allow calling the sortable's native _intersectsWith
			this.instance.positionAbs = inst.positionAbs;
			this.instance.helperProportions = inst.helperProportions;
			this.instance.offset.click = inst.offset.click;
			
			if(this.instance._intersectsWith(this.instance.containerCache)) {

				//If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only once
				if(!this.instance.isOver) {

					this.instance.isOver = 1;
					//Now we fake the start of dragging for the sortable instance,
					//by cloning the list group item, appending it to the sortable and using it as inst.currentItem
					//We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)
					this.instance.currentItem = $(self).clone().removeAttr('id').appendTo(this.instance.element).data("sortable-item", true);
					this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore it
					this.instance.options.helper = function() { return ui.helper[0]; };

					event.target = this.instance.currentItem[0];
					this.instance._mouseCapture(event, true);
					this.instance._mouseStart(event, true, true);

					//Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changes
					this.instance.offset.click.top = inst.offset.click.top;
					this.instance.offset.click.left = inst.offset.click.left;
					this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
					this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;

					inst._trigger("toSortable", event);
					inst.dropped = this.instance.element; //draggable revert needs that
					//hack so receive/update callbacks work (mostly)
					inst.currentItem = inst.element;
					this.instance.fromOutside = inst;

				}

				//Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortable
				if(this.instance.currentItem) this.instance._mouseDrag(event);

			} else {

				//If it doesn't intersect with the sortable, and it intersected before,
				//we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemoval
				if(this.instance.isOver) {

					this.instance.isOver = 0;
					this.instance.cancelHelperRemoval = true;
					
					//Prevent reverting on this forced stop
					this.instance.options.revert = false;
					
					// The out event needs to be triggered independently
					this.instance._trigger('out', event, this.instance._uiHash(this.instance));
					
					this.instance._mouseStop(event, true);
					this.instance.options.helper = this.instance.options._helper;

					//Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original size
					this.instance.currentItem.remove();
					if(this.instance.placeholder) this.instance.placeholder.remove();

					inst._trigger("fromSortable", event);
					inst.dropped = false; //draggable revert needs that
				}

			};

		});

	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function(event, ui) {
		var t = $('body'), o = $(this).data('draggable').options;
		if (t.css("cursor")) o._cursor = t.css("cursor");
		t.css("cursor", o.cursor);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if (o._cursor) $('body').css("cursor", o._cursor);
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data('draggable').options;
		if(t.css("opacity")) o._opacity = t.css("opacity");
		t.css('opacity', o.opacity);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if(o._opacity) $(ui.helper).css('opacity', o._opacity);
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function(event, ui) {
		var i = $(this).data("draggable");
		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') i.overflowOffset = i.scrollParent.offset();
	},
	drag: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options, scrolled = false;

		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') {

			if(!o.axis || o.axis != 'x') {
				if((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
			}

			if(!o.axis || o.axis != 'y') {
				if((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
			}

		} else {

			if(!o.axis || o.axis != 'x') {
				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
			}

			if(!o.axis || o.axis != 'y') {
				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
			}

		}

		if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(i, event);

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options;
		i.snapElements = [];

		$(o.snap.constructor != String ? ( o.snap.items || ':data(draggable)' ) : o.snap).each(function() {
			var $t = $(this); var $o = $t.offset();
			if(this != i.element[0]) i.snapElements.push({
				item: this,
				width: $t.outerWidth(), height: $t.outerHeight(),
				top: $o.top, left: $o.left
			});
		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options;
		var d = o.snapTolerance;

		var x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (var i = inst.snapElements.length - 1; i >= 0; i--){

			var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width,
				t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;

			//Yes, I know, this is insane ;)
			if(!((l-d < x1 && x1 < r+d && t-d < y1 && y1 < b+d) || (l-d < x1 && x1 < r+d && t-d < y2 && y2 < b+d) || (l-d < x2 && x2 < r+d && t-d < y1 && y1 < b+d) || (l-d < x2 && x2 < r+d && t-d < y2 && y2 < b+d))) {
				if(inst.snapElements[i].snapping) (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				inst.snapElements[i].snapping = false;
				continue;
			}

			if(o.snapMode != 'inner') {
				var ts = Math.abs(t - y2) <= d;
				var bs = Math.abs(b - y1) <= d;
				var ls = Math.abs(l - x2) <= d;
				var rs = Math.abs(r - x1) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;
			}

			var first = (ts || bs || ls || rs);

			if(o.snapMode != 'outer') {
				var ts = Math.abs(t - y1) <= d;
				var bs = Math.abs(b - y2) <= d;
				var ls = Math.abs(l - x1) <= d;
				var rs = Math.abs(r - x2) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;
			}

			if(!inst.snapElements[i].snapping && (ts || bs || ls || rs || first))
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		};

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function(event, ui) {

		var o = $(this).data("draggable").options;

		var group = $.makeArray($(o.stack)).sort(function(a,b) {
			return (parseInt($(a).css("zIndex"),10) || 0) - (parseInt($(b).css("zIndex"),10) || 0);
		});
		if (!group.length) { return; }
		
		var min = parseInt(group[0].style.zIndex) || 0;
		$(group).each(function(i) {
			this.style.zIndex = min + i;
		});

		this[0].style.zIndex = min + group.length;

	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data("draggable").options;
		if(t.css("zIndex")) o._zIndex = t.css("zIndex");
		t.css('zIndex', o.zIndex);
	},
	stop: function(event, ui) {
		var o = $(this).data("draggable").options;
		if(o._zIndex) $(ui.helper).css('zIndex', o._zIndex);
	}
});

})(jQuery);
;
/*
 * jQuery UI Droppable @VERSION
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
(function( $, undefined ) {

$.widget("ui.droppable", {
	widgetEventPrefix: "drop",
	options: {
		accept: '*',
		activeClass: false,
		addClasses: true,
		greedy: false,
		hoverClass: false,
		scope: 'default',
		tolerance: 'intersect'
	},
	_create: function() {

		var o = this.options, accept = o.accept;
		this.isover = 0; this.isout = 1;

		this.accept = $.isFunction(accept) ? accept : function(d) {
			return d.is(accept);
		};

		//Store the droppable's proportions
		this.proportions = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight };

		// Add the reference and positions to the manager
		$.ui.ddmanager.droppables[o.scope] = $.ui.ddmanager.droppables[o.scope] || [];
		$.ui.ddmanager.droppables[o.scope].push(this);

		(o.addClasses && this.element.addClass("ui-droppable"));

	},

	destroy: function() {
		var drop = $.ui.ddmanager.droppables[this.options.scope];
		for ( var i = 0; i < drop.length; i++ )
			if ( drop[i] == this )
				drop.splice(i, 1);

		this.element
			.removeClass("ui-droppable ui-droppable-disabled")
			.removeData("droppable")
			.unbind(".droppable");

		return this;
	},

	_setOption: function(key, value) {

		if(key == 'accept') {
			this.accept = $.isFunction(value) ? value : function(d) {
				return d.is(value);
			};
		}
		$.Widget.prototype._setOption.apply(this, arguments);
	},

	_activate: function(event) {
		var draggable = $.ui.ddmanager.current;
		if(this.options.activeClass) this.element.addClass(this.options.activeClass);
		(draggable && this._trigger('activate', event, this.ui(draggable)));
	},

	_deactivate: function(event) {
		var draggable = $.ui.ddmanager.current;
		if(this.options.activeClass) this.element.removeClass(this.options.activeClass);
		(draggable && this._trigger('deactivate', event, this.ui(draggable)));
	},

	_over: function(event) {

		var draggable = $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element

		if (this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
			if(this.options.hoverClass) this.element.addClass(this.options.hoverClass);
			this._trigger('over', event, this.ui(draggable));
		}

	},

	_out: function(event) {

		var draggable = $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element

		if (this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
			if(this.options.hoverClass) this.element.removeClass(this.options.hoverClass);
			this._trigger('out', event, this.ui(draggable));
		}

	},

	_drop: function(event,custom) {

		var draggable = custom || $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return false; // Bail if draggable and droppable are same element

		var childrenIntersection = false;
		this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
			var inst = $.data(this, 'droppable');
			if(
				inst.options.greedy
				&& !inst.options.disabled
				&& inst.options.scope == draggable.options.scope
				&& inst.accept.call(inst.element[0], (draggable.currentItem || draggable.element))
				&& $.ui.intersect(draggable, $.extend(inst, { offset: inst.element.offset() }), inst.options.tolerance)
			) { childrenIntersection = true; return false; }
		});
		if(childrenIntersection) return false;

		if(this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
			if(this.options.activeClass) this.element.removeClass(this.options.activeClass);
			if(this.options.hoverClass) this.element.removeClass(this.options.hoverClass);
			this._trigger('drop', event, this.ui(draggable));
			return this.element;
		}

		return false;

	},

	ui: function(c) {
		return {
			draggable: (c.currentItem || c.element),
			helper: c.helper,
			position: c.position,
			offset: c.positionAbs
		};
	}

});

$.extend($.ui.droppable, {
	version: "@VERSION"
});

$.ui.intersect = function(draggable, droppable, toleranceMode) {

	if (!droppable.offset) return false;

	var x1 = (draggable.positionAbs || draggable.position.absolute).left, x2 = x1 + draggable.helperProportions.width,
		y1 = (draggable.positionAbs || draggable.position.absolute).top, y2 = y1 + draggable.helperProportions.height;
	var l = droppable.offset.left, r = l + droppable.proportions.width,
		t = droppable.offset.top, b = t + droppable.proportions.height;

	switch (toleranceMode) {
		case 'fit':
			return (l <= x1 && x2 <= r
				&& t <= y1 && y2 <= b);
			break;
		case 'intersect':
			return (l < x1 + (draggable.helperProportions.width / 2) // Right Half
				&& x2 - (draggable.helperProportions.width / 2) < r // Left Half
				&& t < y1 + (draggable.helperProportions.height / 2) // Bottom Half
				&& y2 - (draggable.helperProportions.height / 2) < b ); // Top Half
			break;
		case 'pointer':
			var draggableLeft = ((draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left),
				draggableTop = ((draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top),
				isOver = $.ui.isOver(draggableTop, draggableLeft, t, l, droppable.proportions.height, droppable.proportions.width);
			return isOver;
			break;
		case 'touch':
			return (
					(y1 >= t && y1 <= b) ||	// Top edge touching
					(y2 >= t && y2 <= b) ||	// Bottom edge touching
					(y1 < t && y2 > b)		// Surrounded vertically
				) && (
					(x1 >= l && x1 <= r) ||	// Left edge touching
					(x2 >= l && x2 <= r) ||	// Right edge touching
					(x1 < l && x2 > r)		// Surrounded horizontally
				);
			break;
		default:
			return false;
			break;
		}

};

/*
	This manager tracks offsets of draggables and droppables
*/
$.ui.ddmanager = {
	current: null,
	droppables: { 'default': [] },
	prepareOffsets: function(t, event) {

		var m = $.ui.ddmanager.droppables[t.options.scope] || [];
		var type = event ? event.type : null; // workaround for #2317
		var list = (t.currentItem || t.element).find(":data(droppable)").andSelf();

		droppablesLoop: for (var i = 0; i < m.length; i++) {

			if(m[i].options.disabled || (t && !m[i].accept.call(m[i].element[0],(t.currentItem || t.element)))) continue;	//No disabled and non-accepted
			for (var j=0; j < list.length; j++) { if(list[j] == m[i].element[0]) { m[i].proportions.height = 0; continue droppablesLoop; } }; //Filter out elements in the current dragged item
			m[i].visible = m[i].element.css("display") != "none"; if(!m[i].visible) continue; 									//If the element is not visible, continue

			if(type == "mousedown") m[i]._activate.call(m[i], event); //Activate the droppable if used directly from draggables

			m[i].offset = m[i].element.offset();
			m[i].proportions = { width: m[i].element[0].offsetWidth, height: m[i].element[0].offsetHeight };

		}

	},
	drop: function(draggable, event) {

		var dropped = false;
		$.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {

			if(!this.options) return;
			if (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance))
				dropped = dropped || this._drop.call(this, event);

			if (!this.options.disabled && this.visible && this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
				this.isout = 1; this.isover = 0;
				this._deactivate.call(this, event);
			}

		});
		return dropped;

	},
	dragStart: function( draggable, event ) {
		//Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)
		draggable.element.parents( ":not(body,html)" ).bind( "scroll.droppable", function() {
			if( !draggable.options.refreshPositions ) $.ui.ddmanager.prepareOffsets( draggable, event );
		});
	},
	drag: function(draggable, event) {

		//If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
		if(draggable.options.refreshPositions) $.ui.ddmanager.prepareOffsets(draggable, event);

		//Run through all droppables and check their positions based on specific tolerance options
		$.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {

			if(this.options.disabled || this.greedyChild || !this.visible) return;
			var intersects = $.ui.intersect(draggable, this, this.options.tolerance);

			var c = !intersects && this.isover == 1 ? 'isout' : (intersects && this.isover == 0 ? 'isover' : null);
			if(!c) return;

			var parentInstance;
			if (this.options.greedy) {
				var parent = this.element.parents(':data(droppable):eq(0)');
				if (parent.length) {
					parentInstance = $.data(parent[0], 'droppable');
					parentInstance.greedyChild = (c == 'isover' ? 1 : 0);
				}
			}

			// we just moved into a greedy child
			if (parentInstance && c == 'isover') {
				parentInstance['isover'] = 0;
				parentInstance['isout'] = 1;
				parentInstance._out.call(parentInstance, event);
			}

			this[c] = 1; this[c == 'isout' ? 'isover' : 'isout'] = 0;
			this[c == "isover" ? "_over" : "_out"].call(this, event);

			// we just moved out of a greedy child
			if (parentInstance && c == 'isout') {
				parentInstance['isout'] = 0;
				parentInstance['isover'] = 1;
				parentInstance._over.call(parentInstance, event);
			}
		});

	},
	dragStop: function( draggable, event ) {
		draggable.element.parents( ":not(body,html)" ).unbind( "scroll.droppable" );
		//Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)
		if( !draggable.options.refreshPositions ) $.ui.ddmanager.prepareOffsets( draggable, event );
	}
};

})(jQuery);
;
/*!
 * jQuery UI Sortable 1.8.19
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget("ui.sortable", $.ui.mouse, {
	widgetEventPrefix: "sort",
	ready: false,
	options: {
		appendTo: "parent",
		axis: false,
		connectWith: false,
		containment: false,
		cursor: 'auto',
		cursorAt: false,
		dropOnEmpty: true,
		forcePlaceholderSize: false,
		forceHelperSize: false,
		grid: false,
		handle: false,
		helper: "original",
		items: '> *',
		opacity: false,
		placeholder: false,
		revert: false,
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		scope: "default",
		tolerance: "intersect",
		zIndex: 1000
	},
	_create: function() {

		var o = this.options;
		this.containerCache = {};
		this.element.addClass("ui-sortable");

		//Get the items
		this.refresh();

		//Let's determine if the items are being displayed horizontally
		this.floating = this.items.length ? o.axis === 'x' || (/left|right/).test(this.items[0].item.css('float')) || (/inline|table-cell/).test(this.items[0].item.css('display')) : false;

		//Let's determine the parent's offset
		this.offset = this.element.offset();

		//Initialize mouse events for interaction
		this._mouseInit();
		
		//We're ready to go
		this.ready = true

	},

	destroy: function() {
		$.Widget.prototype.destroy.call( this );
		this.element
			.removeClass("ui-sortable ui-sortable-disabled");
		this._mouseDestroy();

		for ( var i = this.items.length - 1; i >= 0; i-- )
			this.items[i].item.removeData(this.widgetName + "-item");

		return this;
	},

	_setOption: function(key, value){
		if ( key === "disabled" ) {
			this.options[ key ] = value;
	
			this.widget()
				[ value ? "addClass" : "removeClass"]( "ui-sortable-disabled" );
		} else {
			// Don't call widget base _setOption for disable as it adds ui-state-disabled class
			$.Widget.prototype._setOption.apply(this, arguments);
		}
	},

	_mouseCapture: function(event, overrideHandle) {
		var that = this;

		if (this.reverting) {
			return false;
		}

		if(this.options.disabled || this.options.type == 'static') return false;

		//We have to refresh the items data once first
		this._refreshItems(event);

		//Find out if the clicked node (or one of its parents) is a actual item in this.items
		var currentItem = null, self = this, nodes = $(event.target).parents().each(function() {
			if($.data(this, that.widgetName + '-item') == self) {
				currentItem = $(this);
				return false;
			}
		});
		if($.data(event.target, that.widgetName + '-item') == self) currentItem = $(event.target);

		if(!currentItem) return false;
		if(this.options.handle && !overrideHandle) {
			var validHandle = false;

			$(this.options.handle, currentItem).find("*").andSelf().each(function() { if(this == event.target) validHandle = true; });
			if(!validHandle) return false;
		}

		this.currentItem = currentItem;
		this._removeCurrentsFromItems();
		return true;

	},

	_mouseStart: function(event, overrideHandle, noActivation) {

		var o = this.options, self = this;
		this.currentContainer = this;

		//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
		this.refreshPositions();

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Get the next scrolling parent
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.currentItem.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		// Only after we got the offset, we can change the helper's position to absolute
		// TODO: Still need to figure out a way to make relative sorting possible
		this.helper.css("position", "absolute");
		this.cssPosition = this.helper.css("position");

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if 'cursorAt' is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Cache the former DOM position
		this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };

		//If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
		if(this.helper[0] != this.currentItem[0]) {
			this.currentItem.hide();
		}

		//Create the placeholder
		this._createPlaceholder();

		//Set a containment if given in the options
		if(o.containment)
			this._setContainment();

		if(o.cursor) { // cursor option
			if ($('body').css("cursor")) this._storedCursor = $('body').css("cursor");
			$('body').css("cursor", o.cursor);
		}

		if(o.opacity) { // opacity option
			if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
			this.helper.css("opacity", o.opacity);
		}

		if(o.zIndex) { // zIndex option
			if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
			this.helper.css("zIndex", o.zIndex);
		}

		//Prepare scrolling
		if(this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML')
			this.overflowOffset = this.scrollParent.offset();

		//Call callbacks
		this._trigger("start", event, this._uiHash());

		//Recache the helper size
		if(!this._preserveHelperProportions)
			this._cacheHelperProportions();


		//Post 'activate' events to possible containers
		if(!noActivation) {
			 for (var i = this.containers.length - 1; i >= 0; i--) { this.containers[i]._trigger("activate", event, self._uiHash(this)); }
		}

		//Prepare possible droppables
		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);

		this.dragging = true;

		this.helper.addClass("ui-sortable-helper");
		this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;

	},

	_mouseDrag: function(event) {

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!this.lastPositionAbs) {
			this.lastPositionAbs = this.positionAbs;
		}

		//Do scrolling
		if(this.options.scroll) {
			var o = this.options, scrolled = false;
			if(this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML') {

				if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity)
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;

				if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity)
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;

			} else {

				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);

				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);

			}

			if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
				$.ui.ddmanager.prepareOffsets(this, event);
		}

		//Regenerate the absolute position used for position checks
		this.positionAbs = this._convertPositionTo("absolute");

		//Set the helper position
		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';

		//Rearrange
		for (var i = this.items.length - 1; i >= 0; i--) {

			//Cache variables and intersection, continue if no intersection
			var item = this.items[i], itemElement = item.item[0], intersection = this._intersectsWithPointer(item);
			if (!intersection) continue;

			if(itemElement != this.currentItem[0] //cannot intersect with itself
				&&	this.placeholder[intersection == 1 ? "next" : "prev"]()[0] != itemElement //no useless actions that have been done before
				&&	!$.ui.contains(this.placeholder[0], itemElement) //no action if the item moved is the parent of the item checked
				&& (this.options.type == 'semi-dynamic' ? !$.ui.contains(this.element[0], itemElement) : true)
				//&& itemElement.parentNode == this.placeholder[0].parentNode // only rearrange items within the same container
			) {

				this.direction = intersection == 1 ? "down" : "up";

				if (this.options.tolerance == "pointer" || this._intersectsWithSides(item)) {
					this._rearrange(event, item);
				} else {
					break;
				}

				this._trigger("change", event, this._uiHash());
				break;
			}
		}

		//Post events to containers
		this._contactContainers(event);

		//Interconnect with droppables
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		//Call callbacks
		this._trigger('sort', event, this._uiHash());

		this.lastPositionAbs = this.positionAbs;
		return false;

	},

	_mouseStop: function(event, noPropagation) {

		if(!event) return;

		//If we are using droppables, inform the manager about the drop
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			$.ui.ddmanager.drop(this, event);

		if(this.options.revert) {
			var self = this;
			var cur = self.placeholder.offset();

			self.reverting = true;

			$(this.helper).animate({
				left: cur.left - this.offset.parent.left - self.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
				top: cur.top - this.offset.parent.top - self.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
			}, parseInt(this.options.revert, 10) || 500, function() {
				self._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;

	},

	cancel: function() {

		var self = this;

		if(this.dragging) {

			this._mouseUp({ target: null });

			if(this.options.helper == "original")
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			else
				this.currentItem.show();

			//Post deactivating events to containers
			for (var i = this.containers.length - 1; i >= 0; i--){
				this.containers[i]._trigger("deactivate", null, self._uiHash(this));
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", null, self._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		if (this.placeholder) {
			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
			if(this.placeholder[0].parentNode) this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			if(this.options.helper != "original" && this.helper && this.helper[0].parentNode) this.helper.remove();

			$.extend(this, {
				helper: null,
				dragging: false,
				reverting: false,
				_noFinalSort: null
			});

			if(this.domPosition.prev) {
				$(this.domPosition.prev).after(this.currentItem);
			} else {
				$(this.domPosition.parent).prepend(this.currentItem);
			}
		}

		return this;

	},

	serialize: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected);
		var str = []; o = o || {};

		$(items).each(function() {
			var res = ($(o.item || this).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
			if(res) str.push((o.key || res[1]+'[]')+'='+(o.key && o.expression ? res[1] : res[2]));
		});

		if(!str.length && o.key) {
			str.push(o.key + '=');
		}

		return str.join('&');

	},

	toArray: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected);
		var ret = []; o = o || {};

		items.each(function() { ret.push($(o.item || this).attr(o.attribute || 'id') || ''); });
		return ret;

	},

	/* Be careful with the following core functions */
	_intersectsWith: function(item) {

		var x1 = this.positionAbs.left,
			x2 = x1 + this.helperProportions.width,
			y1 = this.positionAbs.top,
			y2 = y1 + this.helperProportions.height;

		var l = item.left,
			r = l + item.width,
			t = item.top,
			b = t + item.height;

		var dyClick = this.offset.click.top,
			dxClick = this.offset.click.left;

		var isOverElement = (y1 + dyClick) > t && (y1 + dyClick) < b && (x1 + dxClick) > l && (x1 + dxClick) < r;

		if(	   this.options.tolerance == "pointer"
			|| this.options.forcePointerForContainers
			|| (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? 'width' : 'height'] > item[this.floating ? 'width' : 'height'])
		) {
			return isOverElement;
		} else {

			return (l < x1 + (this.helperProportions.width / 2) // Right Half
				&& x2 - (this.helperProportions.width / 2) < r // Left Half
				&& t < y1 + (this.helperProportions.height / 2) // Bottom Half
				&& y2 - (this.helperProportions.height / 2) < b ); // Top Half

		}
	},

	_intersectsWithPointer: function(item) {

		var isOverElementHeight = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
			isOverElementWidth = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
			isOverElement = isOverElementHeight && isOverElementWidth,
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (!isOverElement)
			return false;

		return this.floating ?
			( ((horizontalDirection && horizontalDirection == "right") || verticalDirection == "down") ? 2 : 1 )
			: ( verticalDirection && (verticalDirection == "down" ? 2 : 1) );

	},

	_intersectsWithSides: function(item) {

		var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),
			isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return ((horizontalDirection == "right" && isOverRightHalf) || (horizontalDirection == "left" && !isOverRightHalf));
		} else {
			return verticalDirection && ((verticalDirection == "down" && isOverBottomHalf) || (verticalDirection == "up" && !isOverBottomHalf));
		}

	},

	_getDragVerticalDirection: function() {
		var delta = this.positionAbs.top - this.lastPositionAbs.top;
		return delta != 0 && (delta > 0 ? "down" : "up");
	},

	_getDragHorizontalDirection: function() {
		var delta = this.positionAbs.left - this.lastPositionAbs.left;
		return delta != 0 && (delta > 0 ? "right" : "left");
	},

	refresh: function(event) {
		this._refreshItems(event);
		this.refreshPositions();
		return this;
	},

	_connectWith: function() {
		var options = this.options;
		return options.connectWith.constructor == String
			? [options.connectWith]
			: options.connectWith;
	},
	
	_getItemsAsjQuery: function(connected) {

		var self = this;
		var items = [];
		var queries = [];
		var connectWith = this._connectWith();

		if(connectWith && connected) {
			for (var i = connectWith.length - 1; i >= 0; i--){
				var cur = $(connectWith[i]);
				for (var j = cur.length - 1; j >= 0; j--){
					var inst = $.data(cur[j], this.widgetName);
					if(inst && inst != this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not('.ui-sortable-placeholder'), inst]);
					}
				};
			};
		}

		queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not('.ui-sortable-placeholder'), this]);

		for (var i = queries.length - 1; i >= 0; i--){
			queries[i][0].each(function() {
				items.push(this);
			});
		};

		return $(items);

	},

	_removeCurrentsFromItems: function() {

		var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

		for (var i=0; i < this.items.length; i++) {

			for (var j=0; j < list.length; j++) {
				if(list[j] == this.items[i].item[0])
					this.items.splice(i,1);
			};

		};

	},

	_refreshItems: function(event) {

		this.items = [];
		this.containers = [this];
		var items = this.items;
		var self = this;
		var queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]];
		var connectWith = this._connectWith();

		if(connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-down
			for (var i = connectWith.length - 1; i >= 0; i--){
				var cur = $(connectWith[i]);
				for (var j = cur.length - 1; j >= 0; j--){
					var inst = $.data(cur[j], this.widgetName);
					if(inst && inst != this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
						this.containers.push(inst);
					}
				};
			};
		}

		for (var i = queries.length - 1; i >= 0; i--) {
			var targetData = queries[i][1];
			var _queries = queries[i][0];

			for (var j=0, queriesLength = _queries.length; j < queriesLength; j++) {
				var item = $(_queries[j]);

				item.data(this.widgetName + '-item', targetData); // Data for target checking (mouse manager)

				items.push({
					item: item,
					instance: targetData,
					width: 0, height: 0,
					left: 0, top: 0
				});
			};
		};

	},

	refreshPositions: function(fast) {

		//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
		if(this.offsetParent && this.helper) {
			this.offset.parent = this._getParentOffset();
		}

		for (var i = this.items.length - 1; i >= 0; i--){
			var item = this.items[i];

			//We ignore calculating positions of all connected containers when we're not over them
			if(item.instance != this.currentContainer && this.currentContainer && item.item[0] != this.currentItem[0])
				continue;

			var t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

			if (!fast) {
				item.width = t.outerWidth();
				item.height = t.outerHeight();
			}

			var p = t.offset();
			item.left = p.left;
			item.top = p.top;
		};

		if(this.options.custom && this.options.custom.refreshContainers) {
			this.options.custom.refreshContainers.call(this);
		} else {
			for (var i = this.containers.length - 1; i >= 0; i--){
				var p = this.containers[i].element.offset();
				this.containers[i].containerCache.left = p.left;
				this.containers[i].containerCache.top = p.top;
				this.containers[i].containerCache.width	= this.containers[i].element.outerWidth();
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			};
		}

		return this;
	},

	_createPlaceholder: function(that) {

		var self = that || this, o = self.options;

		if(!o.placeholder || o.placeholder.constructor == String) {
			var className = o.placeholder;
			o.placeholder = {
				element: function() {

					var el = $(document.createElement(self.currentItem[0].nodeName))
						.addClass(className || self.currentItem[0].className+" ui-sortable-placeholder")
						.removeClass("ui-sortable-helper").html("&nbsp;")[0];

					if(!className)
						el.style.visibility = "hidden";

					return el;
				},
				update: function(container, p) {

					// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
					if(className && !o.forcePlaceholderSize) return;

					//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
					if(!p.height()) { p.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css('paddingTop')||0, 10) - parseInt(self.currentItem.css('paddingBottom')||0, 10)); };
					if(!p.width()) { p.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css('paddingLeft')||0, 10) - parseInt(self.currentItem.css('paddingRight')||0, 10)); };
				}
			};
		}

		//Create the placeholder
		self.placeholder = $(o.placeholder.element.call(self.element, self.currentItem));

		//Append it after the actual current item
		self.currentItem.after(self.placeholder);

		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
		o.placeholder.update(self, self.placeholder);

	},

	_contactContainers: function(event) {
		
		// get innermost container that intersects with item 
		var innermostContainer = null, innermostIndex = null;		
		
		
		for (var i = this.containers.length - 1; i >= 0; i--){

			// never consider a container that's located within the item itself 
			if($.ui.contains(this.currentItem[0], this.containers[i].element[0]))
				continue;

			if(this._intersectsWith(this.containers[i].containerCache)) {

				// if we've already found a container and it's more "inner" than this, then continue 
				if(innermostContainer && $.ui.contains(this.containers[i].element[0], innermostContainer.element[0]))
					continue;

				innermostContainer = this.containers[i]; 
				innermostIndex = i;
					
			} else {
				// container doesn't intersect. trigger "out" event if necessary 
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", event, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}
		
		// if no intersecting containers found, return 
		if(!innermostContainer) return; 

		// move the item into the container if it's not there already
		if(this.containers.length === 1) {
			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		} else if(this.currentContainer != this.containers[innermostIndex]) { 

			//When entering a new container, we will find the item with the least distance and append our item near it 
			var dist = 10000; var itemWithLeastDistance = null; var base = this.positionAbs[this.containers[innermostIndex].floating ? 'left' : 'top']; 
			for (var j = this.items.length - 1; j >= 0; j--) { 
				if(!$.ui.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) continue; 
				var cur = this.items[j][this.containers[innermostIndex].floating ? 'left' : 'top']; 
				if(Math.abs(cur - base) < dist) { 
					dist = Math.abs(cur - base); itemWithLeastDistance = this.items[j]; 
				} 
			} 

			if(!itemWithLeastDistance && !this.options.dropOnEmpty) //Check if dropOnEmpty is enabled 
				return; 

			this.currentContainer = this.containers[innermostIndex]; 
			itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true); 
			this._trigger("change", event, this._uiHash()); 
			this.containers[innermostIndex]._trigger("change", event, this._uiHash(this)); 

			//Update the placeholder 
			this.options.placeholder.update(this.currentContainer, this.placeholder); 
		
			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)); 
			this.containers[innermostIndex].containerCache.over = 1;
		} 
	
		
	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper == 'clone' ? this.currentItem.clone() : this.currentItem);

		if(!helper.parents('body').length) //Add the helper to the DOM if that didn't happen already
			$(o.appendTo != 'parent' ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);

		if(helper[0] == this.currentItem[0])
			this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };

		if(helper[0].style.width == '' || o.forceHelperSize) helper.width(this.currentItem.width());
		if(helper[0].style.height == '' || o.forceHelperSize) helper.height(this.currentItem.height());

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj == 'string') {
			obj = obj.split(' ');
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ('left' in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ('right' in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ('top' in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ('bottom' in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {


		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.currentItem.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
			top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			0 - this.offset.relative.left - this.offset.parent.left,
			0 - this.offset.relative.top - this.offset.parent.top,
			$(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment)) {
			var ce = $(o.containment)[0];
			var co = $(o.containment).offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if(this.cssPosition == 'relative' && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) pageX = this.containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < this.containment[1]) pageY = this.containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > this.containment[2]) pageX = this.containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > this.containment[3]) pageY = this.containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_rearrange: function(event, i, a, hardRefresh) {

		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == 'down' ? i.item[0] : i.item[0].nextSibling));

		//Various things done here to improve the performance:
		// 1. we create a setTimeout, that calls refreshPositions
		// 2. on the instance, we have a counter variable, that get's higher after every append
		// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
		// 4. this lets only the last addition to the timeout stack through
		this.counter = this.counter ? ++this.counter : 1;
		var self = this, counter = this.counter;

		window.setTimeout(function() {
			if(counter == self.counter) self.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
		},0);

	},

	_clear: function(event, noPropagation) {

		this.reverting = false;
		// We delay all events that have to be triggered to after the point where the placeholder has been removed and
		// everything else normalized again
		var delayedTriggers = [], self = this;

		// We first have to update the dom position of the actual currentItem
		// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
		if(!this._noFinalSort && this.currentItem.parent().length) this.placeholder.before(this.currentItem);
		this._noFinalSort = null;

		if(this.helper[0] == this.currentItem[0]) {
			for(var i in this._storedCSS) {
				if(this._storedCSS[i] == 'auto' || this._storedCSS[i] == 'static') this._storedCSS[i] = '';
			}
			this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
		} else {
			this.currentItem.show();
		}

		if(this.fromOutside && !noPropagation) delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
		if((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !noPropagation) delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed
		if(!$.ui.contains(this.element[0], this.currentItem[0])) { //Node was moved out of the current element
			if(!noPropagation) delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
			for (var i = this.containers.length - 1; i >= 0; i--){
				if($.ui.contains(this.containers[i].element[0], this.currentItem[0]) && !noPropagation) {
					delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
					delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.containers[i]));
				}
			};
		};

		//Post events to containers
		for (var i = this.containers.length - 1; i >= 0; i--){
			if(!noPropagation) delayedTriggers.push((function(c) { return function(event) { c._trigger("deactivate", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
			if(this.containers[i].containerCache.over) {
				delayedTriggers.push((function(c) { return function(event) { c._trigger("out", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
				this.containers[i].containerCache.over = 0;
			}
		}

		//Do what was originally in plugins
		if(this._storedCursor) $('body').css("cursor", this._storedCursor); //Reset cursor
		if(this._storedOpacity) this.helper.css("opacity", this._storedOpacity); //Reset opacity
		if(this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == 'auto' ? '' : this._storedZIndex); //Reset z-index

		this.dragging = false;
		if(this.cancelHelperRemoval) {
			if(!noPropagation) {
				this._trigger("beforeStop", event, this._uiHash());
				for (var i=0; i < delayedTriggers.length; i++) { delayedTriggers[i].call(this, event); }; //Trigger all delayed events
				this._trigger("stop", event, this._uiHash());
			}
			return false;
		}

		if(!noPropagation) this._trigger("beforeStop", event, this._uiHash());

		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

		if(this.helper[0] != this.currentItem[0]) this.helper.remove(); this.helper = null;

		if(!noPropagation) {
			for (var i=0; i < delayedTriggers.length; i++) { delayedTriggers[i].call(this, event); }; //Trigger all delayed events
			this._trigger("stop", event, this._uiHash());
		}

		this.fromOutside = false;
		return true;

	},

	_trigger: function() {
		if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
			this.cancel();
		}
	},

	_uiHash: function(inst) {
		var self = inst || this;
		return {
			helper: self.helper,
			placeholder: self.placeholder || $([]),
			position: self.position,
			originalPosition: self.originalPosition,
			offset: self.positionAbs,
			item: self.currentItem,
			sender: inst ? inst.element : null
		};
	}

});

$.extend($.ui.sortable, {
	version: "@VERSION"
});

})(jQuery);
;
/*************************************************************************
	jquery.dynatree.js
	Dynamic tree view control, with support for lazy loading of branches.

	Copyright (c) 2008-2011, Martin Wendt (http://wwWendt.de)
	Dual licensed under the MIT or GPL Version 2 licenses.
	http://code.google.com/p/dynatree/wiki/LicenseInfo

	A current version and some documentation is available at
		http://dynatree.googlecode.com/

	$Version: 1.2.0$
	$Revision: 528, 2011-09-17 18:58:59$

	@depends: jquery.js
	@depends: jquery.ui.core.js
	@depends: jquery.cookie.js
*************************************************************************/

// Note: We currently allow eval() to parse the 'data' attribtes, when initializing from HTML.
/*jslint laxbreak: true, browser: true, evil: true, indent: 0, white: false, onevar: false */

/*************************************************************************
 *	Debug functions
 */

var _canLog = true;

function _log(mode, msg) {
	/**
	 * Usage: logMsg("%o was toggled", this);
	 */
	if( !_canLog ){
		return;
	}
	// Remove first argument
	var args = Array.prototype.slice.apply(arguments, [1]);
	// Prepend timestamp
	var dt = new Date();
	var tag = dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()+"."+dt.getMilliseconds();
	args[0] = tag + " - " + args[0];

	try {
		switch( mode ) {
		case "info":
			window.console.info.apply(window.console, args);
			break;
		case "warn":
			window.console.warn.apply(window.console, args);
			break;
		default:
			window.console.log.apply(window.console, args);
			break;
		}
	} catch(e) {
		if( !window.console ){
			_canLog = false; // Permanently disable, when logging is not supported by the browser
		}
	}
}

function logMsg(msg) {
	Array.prototype.unshift.apply(arguments, ["debug"]);
	_log.apply(this, arguments);
}


// Forward declaration
var getDynaTreePersistData = null;



/*************************************************************************
 *	Constants
 */
var DTNodeStatus_Error   = -1;
var DTNodeStatus_Loading = 1;
var DTNodeStatus_Ok      = 0;


// Start of local namespace
(function($) {

/*************************************************************************
 *	Common tool functions.
 */

var Class = {
	create: function() {
		return function() {
			this.initialize.apply(this, arguments);
		};
	}
};

// Tool function to get dtnode from the event target:
function getDtNodeFromElement(el) {
	var iMax = 5;
	while( el && iMax-- ) {
		if(el.dtnode) { return el.dtnode; }
		el = el.parentNode;
	}
	return null;
}

function noop() {
}

/*************************************************************************
 *	Class DynaTreeNode
 */
var DynaTreeNode = Class.create();

DynaTreeNode.prototype = {
	initialize: function(parent, tree, data) {
		/**
		 * @constructor
		 */
		this.parent = parent;
		this.tree = tree;
		if ( typeof data === "string" ){
			data = { title: data };
		}
		if( data.key === undefined ){
			data.key = "_" + tree._nodeCount++;
		}
		this.data = $.extend({}, $.ui.dynatree.nodedatadefaults, data);
		this.li = null; // not yet created
		this.span = null; // not yet created
		this.ul = null; // not yet created
		this.childList = null; // no subnodes yet
		this.isLoading = false; // Lazy content is being loaded
		this.hasSubSel = false;
		this.bExpanded = false;
		this.bSelected = false;

	},

	toString: function() {
		return "DynaTreeNode<" + this.data.key + ">: '" + this.data.title + "'";
	},

	toDict: function(recursive, callback) {
		var dict = $.extend({}, this.data);
		dict.activate = ( this.tree.activeNode === this );
		dict.focus = ( this.tree.focusNode === this );
		dict.expand = this.bExpanded;
		dict.select = this.bSelected;
		if( callback ){
			callback(dict);
		}
		if( recursive && this.childList ) {
			dict.children = [];
			for(var i=0, l=this.childList.length; i<l; i++ ){
				dict.children.push(this.childList[i].toDict(true, callback));
			}
		} else {
			delete dict.children;
		}
		return dict;
	},

	fromDict: function(dict) {
		/**
		 * Update node data. If dict contains 'children', then also replace
		 * the hole sub tree.
		 */
		var children = dict.children;
		if(children === undefined){
			this.data = $.extend(this.data, dict);
			this.render();
			return;
		}
		dict = $.extend({}, dict);
		dict.children = undefined;
		this.data = $.extend(this.data, dict);
		this.removeChildren();
		this.addChild(children);
	},

	_getInnerHtml: function() {
		var tree = this.tree,
			opts = tree.options,
			cache = tree.cache,
			level = this.getLevel(),
			data = this.data,
			res = "";
		// connector (expanded, expandable or simple)
		if( level < opts.minExpandLevel ) {
			if(level > 1){
				res += cache.tagConnector;
			}
			// .. else (i.e. for root level) skip expander/connector altogether
		} else if( this.hasChildren() !== false ) {
			res += cache.tagExpander;
		} else {
			res += cache.tagConnector;
		}
		// Checkbox mode
		if( opts.checkbox && data.hideCheckbox !== true && !data.isStatusNode ) {
			res += cache.tagCheckbox;
		}
		// folder or doctype icon
		if ( data.icon ) {
			res += "<img src='" + opts.imagePath + data.icon + "' alt='' />";
		} else if ( data.icon === false ) {
			// icon == false means 'no icon'
			noop(); // keep JSLint happy
		} else {
			// icon == null means 'default icon'
			res += cache.tagNodeIcon;
		}
		// node title
		var nodeTitle = "";
		if ( opts.onCustomRender ){
			nodeTitle = opts.onCustomRender.call(tree, this) || "";
		}
		if(!nodeTitle){
			var tooltip = data.tooltip ? " title='" + data.tooltip + "'" : "";
			if( opts.noLink || data.noLink ) {
				nodeTitle = "<span style='display: inline-block;' class='" + opts.classNames.title + "'" + tooltip + ">" + data.title + "</span>";
//				this.tree.logDebug("nodeTitle: " + nodeTitle);
			}else{
				nodeTitle = "<a href='#' class='" + opts.classNames.title + "'" + tooltip + ">" + data.title + "</a>";
			}
		}
		res += nodeTitle;
		return res;
	},


	_fixOrder: function() {
		/**
		 * Make sure, that <li> order matches childList order.
		 */
		var cl = this.childList;
		if( !cl || !this.ul ){
			return;
		}
		var childLI = this.ul.firstChild;
		for(var i=0, l=cl.length-1; i<l; i++) {
			var childNode1 = cl[i];
			var childNode2 = childLI.dtnode;
			if( childNode1 !== childNode2 ) {
				this.tree.logDebug("_fixOrder: mismatch at index " + i + ": " + childNode1 + " != " + childNode2);
				this.ul.insertBefore(childNode1.li, childNode2.li);
			} else {
				childLI = childLI.nextSibling;
			}
		}
	},


	render: function(useEffects, includeInvisible) {
		/**
		 * Create <li><span>..</span> .. </li> tags for this node.
		 *
		 * <li id='KEY' dtnode=NODE> // This div contains the node's span and list of child div's.
		 *   <span class='title'>S S S A</span> // Span contains graphic spans and title <a> tag
		 *   <ul> // only present, when node has children
		 *       <li id='KEY' dtnode=NODE>child1</li>
		 *       <li id='KEY' dtnode=NODE>child2</li>
		 *   </ul>
		 * </li>
		 */
//		this.tree.logDebug("%s.render(%s)", this, useEffects);
		// ---
		var tree = this.tree,
			parent = this.parent,
			data = this.data,
			opts = tree.options,
			cn = opts.classNames,
			isLastSib = this.isLastSibling(),
			firstTime = false;

		if( !parent && !this.ul ) {
			// Root node has only a <ul>
			this.li = this.span = null;
			this.ul = document.createElement("ul");
			if( opts.minExpandLevel > 1 ){
				this.ul.className = cn.container + " " + cn.noConnector;
			}else{
				this.ul.className = cn.container;
			}
		} else if( parent ) {
			// Create <li><span /> </li>
			if( ! this.li ) {
				firstTime = true;
				this.li = document.createElement("li");
				this.li.dtnode = this;
				if( data.key && opts.generateIds ){
					this.li.id = opts.idPrefix + data.key;
				}
				this.span = document.createElement("span");
				this.span.className = cn.title;
				this.li.appendChild(this.span);

				if( !parent.ul ) {
					// This is the parent's first child: create UL tag
					// (Hidden, because it will be
					parent.ul = document.createElement("ul");
					parent.ul.style.display = "none";
					parent.li.appendChild(parent.ul);
//					if( opts.minExpandLevel > this.getLevel() ){
//						parent.ul.className = cn.noConnector;
//					}
				}
				// set node connector images, links and text
//				this.span.innerHTML = this._getInnerHtml();

				parent.ul.appendChild(this.li);
			}
			// set node connector images, links and text
			this.span.innerHTML = this._getInnerHtml();
			// Set classes for current status
			var cnList = [];
			cnList.push(cn.node);
			if( data.isFolder ){
				cnList.push(cn.folder);
			}
			if( this.bExpanded ){
				cnList.push(cn.expanded);
			}
			if( this.hasChildren() !== false ){
				cnList.push(cn.hasChildren);
			}
			if( data.isLazy && this.childList === null ){
				cnList.push(cn.lazy);
			}
			if( isLastSib ){
				cnList.push(cn.lastsib);
			}
			if( this.bSelected ){
				cnList.push(cn.selected);
			}
			if( this.hasSubSel ){
				cnList.push(cn.partsel);
			}
			if( tree.activeNode === this ){
				cnList.push(cn.active);
			}
			if( data.addClass ){
				cnList.push(data.addClass);
			}
			// IE6 doesn't correctly evaluate multiple class names,
			// so we create combined class names that can be used in the CSS
			cnList.push(cn.combinedExpanderPrefix
					+ (this.bExpanded ? "e" : "c")
					+ (data.isLazy && this.childList === null ? "d" : "")
					+ (isLastSib ? "l" : "")
					);
			cnList.push(cn.combinedIconPrefix
					+ (this.bExpanded ? "e" : "c")
					+ (data.isFolder ? "f" : "")
					);
			this.span.className = cnList.join(" ");

			// TODO: we should not set this in the <span> tag also, if we set it here:
			this.li.className = isLastSib ? cn.lastsib : "";

			// Allow tweaking, binding, after node was created for the first time
			if(firstTime && opts.onCreate){
				opts.onCreate.call(tree, this, this.span);
			}
			// Hide children, if node is collapsed
//			this.ul.style.display = ( this.bExpanded || !parent ) ? "" : "none";
			// Allow tweaking after node state was rendered
			if(opts.onRender){
				opts.onRender.call(tree, this, this.span);
			}
		}
		// Visit child nodes
		if( (this.bExpanded || includeInvisible === true) && this.childList ) {
			for(var i=0, l=this.childList.length; i<l; i++) {
				this.childList[i].render(false, includeInvisible);
			}
			// Make sure the tag order matches the child array
			this._fixOrder();
		}
		// Hide children, if node is collapsed
		if( this.ul ) {
			var isHidden = (this.ul.style.display === "none");
			var isExpanded = !!this.bExpanded;
//			logMsg("isHidden:%s", isHidden);
			if( useEffects && opts.fx && (isHidden === isExpanded) ) {
				var duration = opts.fx.duration || 200;
				$(this.ul).animate(opts.fx, duration);
			} else {
				this.ul.style.display = ( this.bExpanded || !parent ) ? "" : "none";
			}
		}
	},
	/** Return '/id1/id2/id3'. */
	getKeyPath: function(excludeSelf) {
		var path = [];
		this.visitParents(function(node){
			if(node.parent){
				path.unshift(node.data.key);
			}
		}, !excludeSelf);
		return "/" + path.join(this.tree.options.keyPathSeparator);
	},

	getParent: function() {
		return this.parent;
	},

	getChildren: function() {
		if(this.hasChildren() === undefined){
			return undefined; // Lazy node: unloaded, currently loading, or load error
		}
		return this.childList;
	},

	/** Check if node has children (returns undefined, if not sure). */
	hasChildren: function() {
		if(this.data.isLazy){
			if(this.childList === null || this.childList === undefined){
				// Not yet loaded
				return undefined;
			}else if(this.childList.length === 0){
				// Loaded, but response was empty
				return false;
			}else if(this.childList.length === 1 && this.childList[0].isStatusNode()){
				// Currently loading or load error
				return undefined;
			}
			return true;
		}
		return !!this.childList;
	},

	isFirstSibling: function() {
		var p = this.parent;
		return !p || p.childList[0] === this;
	},

	isLastSibling: function() {
		var p = this.parent;
		return !p || p.childList[p.childList.length-1] === this;
	},

	getPrevSibling: function() {
		if( !this.parent ){
			return null;
		}
		var ac = this.parent.childList;
		for(var i=1, l=ac.length; i<l; i++){ // start with 1, so prev(first) = null
			if( ac[i] === this ){
				return ac[i-1];
			}
		}
		return null;
	},

	getNextSibling: function() {
		if( !this.parent ){
			return null;
		}
		var ac = this.parent.childList;
		for(var i=0, l=ac.length-1; i<l; i++){ // up to length-2, so next(last) = null
			if( ac[i] === this ){
				return ac[i+1];
			}
		}
		return null;
	},

	isStatusNode: function() {
		return (this.data.isStatusNode === true);
	},

	isChildOf: function(otherNode) {
		return (this.parent && this.parent === otherNode);
	},

	isDescendantOf: function(otherNode) {
		if(!otherNode){
			return false;
		}
		var p = this.parent;
		while( p ) {
			if( p === otherNode ){
				return true;
			}
			p = p.parent;
		}
		return false;
	},

	countChildren: function() {
		var cl = this.childList;
		if( !cl ){
			return 0;
		}
		var n = cl.length;
		for(var i=0, l=n; i<l; i++){
			var child = cl[i];
			n += child.countChildren();
		}
		return n;
	},

	/**Sort child list by title.
	 * cmd: optional compare function.
	 * deep: optional: pass true to sort all descendant nodes.
	 */
	sortChildren: function(cmp, deep) {
		var cl = this.childList;
		if( !cl ){
			return;
		}
		cmp = cmp || function(a, b) {
//			return a.data.title === b.data.title ? 0 : a.data.title > b.data.title ? 1 : -1;
			var x = a.data.title.toLowerCase(),
				y = b.data.title.toLowerCase();
			return x === y ? 0 : x > y ? 1 : -1;
			};
		cl.sort(cmp);
		if( deep ){
			for(var i=0, l=cl.length; i<l; i++){
				if( cl[i].childList ){
					cl[i].sortChildren(cmp, "$norender$");
				}
			}
		}
		if( deep !== "$norender$" ){
			this.render();
		}
	},

	_setStatusNode: function(data) {
		// Create, modify or remove the status child node (pass 'null', to remove it).
		var firstChild = ( this.childList ? this.childList[0] : null );
		if( !data ) {
			if ( firstChild && firstChild.isStatusNode()) {
				try{
					// I've seen exceptions here with loadKeyPath...
					if(this.ul){
						this.ul.removeChild(firstChild.li);
						firstChild.li = null; // avoid leaks (issue 215)
					}
				}catch(e){}
				if( this.childList.length === 1 ){
					this.childList = [];
				}else{
					this.childList.shift();
				}
			}
		} else if ( firstChild ) {
			data.isStatusNode = true;
			data.key = "_statusNode";
			firstChild.data = data;
			firstChild.render();
		} else {
			data.isStatusNode = true;
			data.key = "_statusNode";
			firstChild = this.addChild(data);
		}
	},

	setLazyNodeStatus: function(lts, opts) {
		var tooltip = (opts && opts.tooltip) ? opts.tooltip : null;
		var info = (opts && opts.info) ? " (" + opts.info + ")" : "";
		switch( lts ) {
			case DTNodeStatus_Ok:
				this._setStatusNode(null);
				$(this.span).removeClass(this.tree.options.classNames.nodeLoading);
				this.isLoading = false;
//				this.render();
				if( this.tree.options.autoFocus ) {
					if( this === this.tree.tnRoot && this.childList && this.childList.length > 0) {
						// special case: using ajaxInit
						this.childList[0].focus();
					} else {
						this.focus();
					}
				}
				break;
			case DTNodeStatus_Loading:
				this.isLoading = true;
				$(this.span).addClass(this.tree.options.classNames.nodeLoading);
				// The root is hidden, so we set a temporary status child
				if(!this.parent){
					this._setStatusNode({
						title: this.tree.options.strings.loading + info,
						tooltip: tooltip,
						addClass: this.tree.options.classNames.nodeWait
					});
				}
				break;
			case DTNodeStatus_Error:
				this.isLoading = false;
//				$(this.span).addClass(this.tree.options.classNames.nodeError);
				this._setStatusNode({
					title: this.tree.options.strings.loadError + info,
					tooltip: tooltip,
					addClass: this.tree.options.classNames.nodeError
				});
				break;
			default:
				throw "Bad LazyNodeStatus: '" + lts + "'.";
		}
	},

	_parentList: function(includeRoot, includeSelf) {
		var l = [];
		var dtn = includeSelf ? this : this.parent;
		while( dtn ) {
			if( includeRoot || dtn.parent ){
				l.unshift(dtn);
			}
			dtn = dtn.parent;
		}
		return l;
	},
	getLevel: function() {
		/**
		 * Return node depth. 0: System root node, 1: visible top-level node.
		 */
		var level = 0;
		var dtn = this.parent;
		while( dtn ) {
			level++;
			dtn = dtn.parent;
		}
		return level;
	},

	_getTypeForOuterNodeEvent: function(event) {
		/** Return the inner node span (title, checkbox or expander) if
		 *  event.target points to the outer span.
		 *  This function should fix issue #93:
		 *  FF2 ignores empty spans, when generating events (returning the parent instead).
		 */
		var cns = this.tree.options.classNames;
		var target = event.target;
		// Only process clicks on an outer node span (probably due to a FF2 event handling bug)
		if( target.className.indexOf(cns.node) < 0 ) {
			return null;
		}
		// Event coordinates, relative to outer node span:
		var eventX = event.pageX - target.offsetLeft;
		var eventY = event.pageY - target.offsetTop;

		for(var i=0, l=target.childNodes.length; i<l; i++) {
			var cn = target.childNodes[i];
			var x = cn.offsetLeft - target.offsetLeft;
			var y = cn.offsetTop - target.offsetTop;
			var nx = cn.clientWidth, ny = cn.clientHeight;
//	        alert (cn.className + ": " + x + ", " + y + ", s:" + nx + ", " + ny);
			if( eventX >= x && eventX <= (x+nx) && eventY >= y && eventY <= (y+ny) ) {
//	            alert("HIT "+ cn.className);
				if( cn.className==cns.title ){
					return "title";
				}else if( cn.className==cns.expander ){
					return "expander";
				}else if( cn.className==cns.checkbox ){
					return "checkbox";
				}else if( cn.className==cns.nodeIcon ){
					return "icon";
				}
			}
		}
		return "prefix";
	},

	getEventTargetType: function(event) {
		// Return the part of a node, that a click event occured on.
		// Note: there is no check, if the event was fired on TIHS node.
		var tcn = event && event.target ? event.target.className : "";
		var cns = this.tree.options.classNames;

		if( tcn === cns.title ){
			return "title";
		}else if( tcn === cns.expander ){
			return "expander";
		}else if( tcn === cns.checkbox ){
			return "checkbox";
		}else if( tcn === cns.nodeIcon ){
			return "icon";
		}else if( tcn === cns.empty || tcn === cns.vline || tcn === cns.connector ){
			return "prefix";
		}else if( tcn.indexOf(cns.node) >= 0 ){
			// FIX issue #93
			return this._getTypeForOuterNodeEvent(event);
		}
		return null;
	},

	isVisible: function() {
		// Return true, if all parents are expanded.
		var parents = this._parentList(true, false);
		for(var i=0, l=parents.length; i<l; i++){
			if( ! parents[i].bExpanded ){ return false; }
		}
		return true;
	},

	makeVisible: function() {
		// Make sure, all parents are expanded
		var parents = this._parentList(true, false);
		for(var i=0, l=parents.length; i<l; i++){
			parents[i]._expand(true);
		}
	},

	focus: function() {
		// TODO: check, if we already have focus
//		this.tree.logDebug("dtnode.focus(): %o", this);
		this.makeVisible();
		try {
			$(this.span).find(">a").focus();
		} catch(e) { }
	},

	isFocused: function() {
		return (this.tree.tnFocused === this);
	},

	_activate: function(flag, fireEvents) {
		// (De)Activate - but not focus - this node.
		this.tree.logDebug("dtnode._activate(%o, fireEvents=%o) - %o", flag, fireEvents, this);
		var opts = this.tree.options;
		if( this.data.isStatusNode ){
			return;
		}
		if ( fireEvents && opts.onQueryActivate && opts.onQueryActivate.call(this.tree, flag, this) === false ){
			return; // Callback returned false
		}
		if( flag ) {
			// Activate
			if( this.tree.activeNode ) {
				if( this.tree.activeNode === this ){
					return;
				}
				this.tree.activeNode.deactivate();
			}
			if( opts.activeVisible ){
				this.makeVisible();
			}
			this.tree.activeNode = this;
			if( opts.persist ){
				$.cookie(opts.cookieId+"-active", this.data.key, opts.cookie);
			}
			this.tree.persistence.activeKey = this.data.key;
			$(this.span).addClass(opts.classNames.active);
			if ( fireEvents && opts.onActivate ){
				opts.onActivate.call(this.tree, this);
			}
		} else {
			// Deactivate
			if( this.tree.activeNode === this ) {
				if ( opts.onQueryActivate && opts.onQueryActivate.call(this.tree, false, this) === false ){
					return; // Callback returned false
				}
				$(this.span).removeClass(opts.classNames.active);
				if( opts.persist ) {
					// Note: we don't pass null, but ''. So the cookie is not deleted.
					// If we pass null, we also have to pass a COPY of opts, because $cookie will override opts.expires (issue 84)
					$.cookie(opts.cookieId+"-active", "", opts.cookie);
				}
				this.tree.persistence.activeKey = null;
				this.tree.activeNode = null;
				if ( fireEvents && opts.onDeactivate ){
					opts.onDeactivate.call(this.tree, this);
				}
			}
		}
	},

	activate: function() {
		// Select - but not focus - this node.
//		this.tree.logDebug("dtnode.activate(): %o", this);
		this._activate(true, true);
	},

	activateSilently: function() {
		this._activate(true, false);
	},

	deactivate: function() {
//		this.tree.logDebug("dtnode.deactivate(): %o", this);
		this._activate(false, true);
	},

	isActive: function() {
		return (this.tree.activeNode === this);
	},

	_userActivate: function() {
		// Handle user click / [space] / [enter], according to clickFolderMode.
		var activate = true;
		var expand = false;
		if ( this.data.isFolder ) {
			switch( this.tree.options.clickFolderMode ) {
			case 2:
				activate = false;
				expand = true;
				break;
			case 3:
				activate = expand = true;
				break;
			}
		}
		if( this.parent === null ) {
			expand = false;
		}
		if( expand ) {
			this.toggleExpand();
			this.focus();
		}
		if( activate ) {
			this.activate();
		}
	},

	_setSubSel: function(hasSubSel) {
		if( hasSubSel ) {
			this.hasSubSel = true;
			$(this.span).addClass(this.tree.options.classNames.partsel);
		} else {
			this.hasSubSel = false;
			$(this.span).removeClass(this.tree.options.classNames.partsel);
		}
	},
	/**
	 * Fix selection and partsel status, of parent nodes, according to current status of
	 * end nodes.
	 */
	_updatePartSelectionState: function() {
//		alert("_updatePartSelectionState " + this);
//		this.tree.logDebug("_updatePartSelectionState() - %o", this);
		var sel;
		// Return `true` or `false` for end nodes and remove part-sel flag
		if( ! this.hasChildren() ){
			sel = (this.bSelected && !this.data.unselectable && !this.data.isStatusNode);
			this._setSubSel(false);
			return sel;
		}
		// Return `true`, `false`, or `undefined` for parent nodes
		var i, l,
			cl = this.childList,
			allSelected = true,
			allDeselected = true;
		for(i=0, l=cl.length; i<l;  i++) {
			var n = cl[i],
				s = n._updatePartSelectionState();
			if( s !== false){
				allDeselected = false;
			}
			if( s !== true){
				allSelected = false;
			}
		}
		if( allSelected ){
			sel = true;
		} else if ( allDeselected ){
			sel = false;
		} else {
			sel = undefined;
		}
		this._setSubSel(sel === undefined);
		this.bSelected = (sel === true);
		return sel;
	},

	/**
	 * Fix selection status, after this node was (de)selected in multi-hier mode.
	 * This includes (de)selecting all children.
	 */
	_fixSelectionState: function() {
//		alert("_fixSelectionState " + this);
//		this.tree.logDebug("_fixSelectionState(%s) - %o", this.bSelected, this);
		var p, i, l;
		if( this.bSelected ) {
			// Select all children
			this.visit(function(node){
				node.parent._setSubSel(true);
				if(!node.data.unselectable){
					node._select(true, false, false);
				}
			});
			// Select parents, if all children are selected
			p = this.parent;
			while( p ) {
				p._setSubSel(true);
				var allChildsSelected = true;
				for(i=0, l=p.childList.length; i<l;  i++) {
					var n = p.childList[i];
					if( !n.bSelected && !n.data.isStatusNode && !n.data.unselectable) {
						allChildsSelected = false;
						break;
					}
				}
				if( allChildsSelected ){
					p._select(true, false, false);
				}
				p = p.parent;
			}
		} else {
			// Deselect all children
			this._setSubSel(false);
			this.visit(function(node){
				node._setSubSel(false);
				node._select(false, false, false);
			});
			// Deselect parents, and recalc hasSubSel
			p = this.parent;
			while( p ) {
				p._select(false, false, false);
				var isPartSel = false;
				for(i=0, l=p.childList.length; i<l;  i++) {
					if( p.childList[i].bSelected || p.childList[i].hasSubSel ) {
						isPartSel = true;
						break;
					}
				}
				p._setSubSel(isPartSel);
				p = p.parent;
			}
		}
	},

	_select: function(sel, fireEvents, deep) {
		// Select - but not focus - this node.
//		this.tree.logDebug("dtnode._select(%o) - %o", sel, this);
		var opts = this.tree.options;
		if( this.data.isStatusNode ){
			return;
		}
		//
		if( this.bSelected === sel ) {
//			this.tree.logDebug("dtnode._select(%o) IGNORED - %o", sel, this);
			return;
		}
		// Allow event listener to abort selection
		if ( fireEvents && opts.onQuerySelect && opts.onQuerySelect.call(this.tree, sel, this) === false ){
			return; // Callback returned false
		}
		// Force single-selection
		if( opts.selectMode==1 && sel ) {
			this.tree.visit(function(node){
				if( node.bSelected ) {
					// Deselect; assuming that in selectMode:1 there's max. one other selected node
					node._select(false, false, false);
					return false;
				}
			});
		}

		this.bSelected = sel;
//        this.tree._changeNodeList("select", this, sel);

		if( sel ) {
			if( opts.persist ){
				this.tree.persistence.addSelect(this.data.key);
			}
			$(this.span).addClass(opts.classNames.selected);

			if( deep && opts.selectMode === 3 ){
				this._fixSelectionState();
			}
			if ( fireEvents && opts.onSelect ){
				opts.onSelect.call(this.tree, true, this);
			}
		} else {
			if( opts.persist ){
				this.tree.persistence.clearSelect(this.data.key);
			}
			$(this.span).removeClass(opts.classNames.selected);

			if( deep && opts.selectMode === 3 ){
				this._fixSelectionState();
			}
			if ( fireEvents && opts.onSelect ){
				opts.onSelect.call(this.tree, false, this);
			}
		}
	},

	select: function(sel) {
		// Select - but not focus - this node.
//		this.tree.logDebug("dtnode.select(%o) - %o", sel, this);
		if( this.data.unselectable ){
			return this.bSelected;
		}
		return this._select(sel!==false, true, true);
	},

	toggleSelect: function() {
//		this.tree.logDebug("dtnode.toggleSelect() - %o", this);
		return this.select(!this.bSelected);
	},

	isSelected: function() {
		return this.bSelected;
	},

	isLazy: function() {
		return !!this.data.isLazy;
	},

	_loadContent: function() {
		try {
			var opts = this.tree.options;
			this.tree.logDebug("_loadContent: start - %o", this);
			this.setLazyNodeStatus(DTNodeStatus_Loading);
			if( true === opts.onLazyRead.call(this.tree, this) ) {
				// If function returns 'true', we assume that the loading is done:
				this.setLazyNodeStatus(DTNodeStatus_Ok);
				// Otherwise (i.e. if the loading was started as an asynchronous process)
				// the onLazyRead(dtnode) handler is expected to call dtnode.setLazyNodeStatus(DTNodeStatus_Ok/_Error) when done.
				this.tree.logDebug("_loadContent: succeeded - %o", this);
			}
		} catch(e) {
			this.tree.logWarning("_loadContent: failed - %o", e);
			this.setLazyNodeStatus(DTNodeStatus_Error, {tooltip: ""+e});
		}
	},

	_expand: function(bExpand, forceSync) {
		if( this.bExpanded === bExpand ) {
			this.tree.logDebug("dtnode._expand(%o) IGNORED - %o", bExpand, this);
			return;
		}
		this.tree.logDebug("dtnode._expand(%o) - %o", bExpand, this);
		var opts = this.tree.options;
		if( !bExpand && this.getLevel() < opts.minExpandLevel ) {
			this.tree.logDebug("dtnode._expand(%o) prevented collapse - %o", bExpand, this);
			return;
		}
		if ( opts.onQueryExpand && opts.onQueryExpand.call(this.tree, bExpand, this) === false ){
			return; // Callback returned false
		}
		this.bExpanded = bExpand;

		// Persist expand state
		if( opts.persist ) {
			if( bExpand ){
				this.tree.persistence.addExpand(this.data.key);
			}else{
				this.tree.persistence.clearExpand(this.data.key);
			}
		}
		// Do not apply animations in init phase, or before lazy-loading
		var allowEffects = !(this.data.isLazy && this.childList === null)
			&& !this.isLoading
			&& !forceSync;
		this.render(allowEffects);

		// Auto-collapse mode: collapse all siblings
		if( this.bExpanded && this.parent && opts.autoCollapse ) {
			var parents = this._parentList(false, true);
			for(var i=0, l=parents.length; i<l; i++){
				parents[i].collapseSiblings();
			}
		}
		// If the currently active node is now hidden, deactivate it
		if( opts.activeVisible && this.tree.activeNode && ! this.tree.activeNode.isVisible() ) {
			this.tree.activeNode.deactivate();
		}
		// Expanding a lazy node: set 'loading...' and call callback
		if( bExpand && this.data.isLazy && this.childList === null && !this.isLoading ) {
			this._loadContent();
			return;
		}
		if ( opts.onExpand ){
			opts.onExpand.call(this.tree, bExpand, this);
		}
	},

	isExpanded: function() {
		return this.bExpanded;
	},

	expand: function(flag) {
		flag = (flag !== false);
		if( !this.childList && !this.data.isLazy && flag ){
			return; // Prevent expanding empty nodes
		} else if( this.parent === null && !flag ){
			return; // Prevent collapsing the root
		}
		this._expand(flag);
	},

	scheduleAction: function(mode, ms) {
		/** Schedule activity for delayed execution (cancel any pending request).
		 *  scheduleAction('cancel') will cancel the request.
		 */
		if( this.tree.timer ) {
			clearTimeout(this.tree.timer);
			this.tree.logDebug("clearTimeout(%o)", this.tree.timer);
		}
		var self = this; // required for closures
		switch (mode) {
		case "cancel":
			// Simply made sure that timer was cleared
			break;
		case "expand":
			this.tree.timer = setTimeout(function(){
				self.tree.logDebug("setTimeout: trigger expand");
				self.expand(true);
			}, ms);
			break;
		case "activate":
			this.tree.timer = setTimeout(function(){
				self.tree.logDebug("setTimeout: trigger activate");
				self.activate();
			}, ms);
			break;
		default:
			throw "Invalid mode " + mode;
		}
		this.tree.logDebug("setTimeout(%s, %s): %s", mode, ms, this.tree.timer);
	},

	toggleExpand: function() {
		this.expand(!this.bExpanded);
	},

	collapseSiblings: function() {
		if( this.parent === null ){
			return;
		}
		var ac = this.parent.childList;
		for (var i=0, l=ac.length; i<l; i++) {
			if ( ac[i] !== this && ac[i].bExpanded ){
				ac[i]._expand(false);
			}
		}
	},

	_onClick: function(event) {
//		this.tree.logDebug("dtnode.onClick(" + event.type + "): dtnode:" + this + ", button:" + event.button + ", which: " + event.which);
		var targetType = this.getEventTargetType(event);
		if( targetType === "expander" ) {
			// Clicking the expander icon always expands/collapses
			this.toggleExpand();
			this.focus(); // issue 95
		} else if( targetType === "checkbox" ) {
			// Clicking the checkbox always (de)selects
			this.toggleSelect();
			this.focus(); // issue 95
		} else {
			this._userActivate();
			var aTag = this.span.getElementsByTagName("a");
			if(aTag[0]){
				// issue 154
				// TODO: check if still required on IE 9:
				// Chrome and Safari don't focus the a-tag on click,
				// but calling focus() seem to have problems on IE:
				// http://code.google.com/p/dynatree/issues/detail?id=154
				if(!$.browser.msie){
					aTag[0].focus();
				}
			}else{
				// 'noLink' option was set
				return true;
			}
		}
		// Make sure that clicks stop, otherwise <a href='#'> jumps to the top
		event.preventDefault();
	},

	_onDblClick: function(event) {
//		this.tree.logDebug("dtnode.onDblClick(" + event.type + "): dtnode:" + this + ", button:" + event.button + ", which: " + event.which);
	},

	_onKeydown: function(event) {
//		this.tree.logDebug("dtnode.onKeydown(" + event.type + "): dtnode:" + this + ", charCode:" + event.charCode + ", keyCode: " + event.keyCode + ", which: " + event.which);
		var handled = true,
			sib;
//		alert("keyDown" + event.which);

		switch( event.which ) {
			// charCodes:
//			case 43: // '+'
			case 107: // '+'
			case 187: // '+' @ Chrome, Safari
				if( !this.bExpanded ){ this.toggleExpand(); }
				break;
//			case 45: // '-'
			case 109: // '-'
			case 189: // '+' @ Chrome, Safari
				if( this.bExpanded ){ this.toggleExpand(); }
				break;
			//~ case 42: // '*'
				//~ break;
			//~ case 47: // '/'
				//~ break;
			// case 13: // <enter>
				// <enter> on a focused <a> tag seems to generate a click-event.
				// this._userActivate();
				// break;
			case 32: // <space>
				this._userActivate();
				break;
			case 8: // <backspace>
				if( this.parent ){
					this.parent.focus();
				}
				break;
			case 37: // <left>
				if( this.bExpanded ) {
					this.toggleExpand();
					this.focus();
//				} else if( this.parent && (this.tree.options.rootVisible || this.parent.parent) ) {
				} else if( this.parent && this.parent.parent ) {
					this.parent.focus();
				}
				break;
			case 39: // <right>
				if( !this.bExpanded && (this.childList || this.data.isLazy) ) {
					this.toggleExpand();
					this.focus();
				} else if( this.childList ) {
					this.childList[0].focus();
				}
				break;
			case 38: // <up>
				sib = this.getPrevSibling();
				while( sib && sib.bExpanded && sib.childList ){
					sib = sib.childList[sib.childList.length-1];
				}
//				if( !sib && this.parent && (this.tree.options.rootVisible || this.parent.parent) )
				if( !sib && this.parent && this.parent.parent ){
					sib = this.parent;
				}
				if( sib ){
					sib.focus();
				}
				break;
			case 40: // <down>
				if( this.bExpanded && this.childList ) {
					sib = this.childList[0];
				} else {
					var parents = this._parentList(false, true);
					for(var i=parents.length-1; i>=0; i--) {
						sib = parents[i].getNextSibling();
						if( sib ){ break; }
					}
				}
				if( sib ){
					sib.focus();
				}
				break;
			default:
				handled = false;
		}
		// Return false, if handled, to prevent default processing
//		return !handled;
		if(handled){
			event.preventDefault();
		}
	},

	_onKeypress: function(event) {
		// onKeypress is only hooked to allow user callbacks.
		// We don't process it, because IE and Safari don't fire keypress for cursor keys.
//		this.tree.logDebug("dtnode.onKeypress(" + event.type + "): dtnode:" + this + ", charCode:" + event.charCode + ", keyCode: " + event.keyCode + ", which: " + event.which);
	},

	_onFocus: function(event) {
		// Handles blur and focus events.
//		this.tree.logDebug("dtnode.onFocus(%o): %o", event, this);
		var opts = this.tree.options;
		if ( event.type == "blur" || event.type == "focusout" ) {
			if ( opts.onBlur ){
				opts.onBlur.call(this.tree, this);
			}
			if( this.tree.tnFocused ){
				$(this.tree.tnFocused.span).removeClass(opts.classNames.focused);
			}
			this.tree.tnFocused = null;
			if( opts.persist ){
				$.cookie(opts.cookieId+"-focus", "", opts.cookie);
			}
		} else if ( event.type=="focus" || event.type=="focusin") {
			// Fix: sometimes the blur event is not generated
			if( this.tree.tnFocused && this.tree.tnFocused !== this ) {
				this.tree.logDebug("dtnode.onFocus: out of sync: curFocus: %o", this.tree.tnFocused);
				$(this.tree.tnFocused.span).removeClass(opts.classNames.focused);
			}
			this.tree.tnFocused = this;
			if ( opts.onFocus ){
				opts.onFocus.call(this.tree, this);
			}
			$(this.tree.tnFocused.span).addClass(opts.classNames.focused);
			if( opts.persist ){
				$.cookie(opts.cookieId+"-focus", this.data.key, opts.cookie);
			}
		}
		// TODO: return anything?
//		return false;
	},

	visit: function(fn, includeSelf) {
		// Call fn(node) for all child nodes. Stop iteration, if fn() returns false.
		var res = true;
		if( includeSelf === true ) {
			res = fn(this);
			if( res === false || res == "skip" ){
				return res;
			}
		}
		if(this.childList){
			for(var i=0, l=this.childList.length; i<l; i++){
				res = this.childList[i].visit(fn, true);
				if( res === false ){
					break;
				}
			}
		}
		return res;
	},

	visitParents: function(fn, includeSelf) {
		// Visit parent nodes (bottom up)
		if(includeSelf && fn(this) === false){
			return false;
		}
		var p = this.parent;
		while( p ) {
			if(fn(p) === false){
				return false;
			}
			p = p.parent;
		}
		return true;
	},

	remove: function() {
		// Remove this node
//		this.tree.logDebug ("%s.remove()", this);
		if ( this === this.tree.root ){
			throw "Cannot remove system root";
		}
		return this.parent.removeChild(this);
	},

	removeChild: function(tn) {
		// Remove tn from list of direct children.
		var ac = this.childList;
		if( ac.length == 1 ) {
			if( tn !== ac[0] ){
				throw "removeChild: invalid child";
			}
			return this.removeChildren();
		}
		if( tn === this.tree.activeNode ){
			tn.deactivate();
		}
		if( this.tree.options.persist ) {
			if( tn.bSelected ){
				this.tree.persistence.clearSelect(tn.data.key);
			}
			if ( tn.bExpanded ){
				this.tree.persistence.clearExpand(tn.data.key);
			}
		}
		tn.removeChildren(true);
//		this.div.removeChild(tn.div);
		this.ul.removeChild(tn.li);
		for(var i=0, l=ac.length; i<l; i++) {
			if( ac[i] === tn ) {
				this.childList.splice(i, 1);
//				delete tn;  // JSLint complained
				break;
			}
		}
	},

	removeChildren: function(isRecursiveCall, retainPersistence) {
		// Remove all child nodes (more efficiently than recursive remove())
		this.tree.logDebug("%s.removeChildren(%o)", this, isRecursiveCall);
		var tree = this.tree;
		var ac = this.childList;
		if( ac ) {
			for(var i=0, l=ac.length; i<l; i++) {
				var tn = ac[i];
				if ( tn === tree.activeNode && !retainPersistence ){
					tn.deactivate();
				}
				if( this.tree.options.persist && !retainPersistence ) {
					if( tn.bSelected ){
						this.tree.persistence.clearSelect(tn.data.key);
					}
					if ( tn.bExpanded ){
						this.tree.persistence.clearExpand(tn.data.key);
					}
				}
				tn.removeChildren(true, retainPersistence);
				if(this.ul){
					this.ul.removeChild(tn.li);
				}
/*
				try{
					this.ul.removeChild(tn.li);
				}catch(e){
					this.tree.logDebug("%s.removeChildren: couldnt remove LI", this, e);
				}
*/
//				delete tn;  JSLint complained
			}
			// Set to 'null' which is interpreted as 'not yet loaded' for lazy
			// nodes
			this.childList = null;
		}
		if( ! isRecursiveCall ) {
//			this._expand(false);
//			this.isRead = false;
			this.isLoading = false;
			this.render();
		}
	},

	setTitle: function(title) {
		this.fromDict({title: title});
	},

	reload: function(force) {
		throw "Use reloadChildren() instead";
	},

	reloadChildren: function(callback) {
		// Reload lazy content (expansion state is maintained).
		if( this.parent === null ){
			throw "Use tree.reload() instead";
		}else if( ! this.data.isLazy ){
			throw "node.reloadChildren() requires lazy nodes.";
		}
		// appendAjax triggers 'nodeLoaded' event.
		// We listen to this, if a callback was passed to reloadChildren
		if(callback){
			var self = this;
			var eventType = "nodeLoaded.dynatree." + this.tree.$tree.attr("id")
				+ "." + this.data.key;
			this.tree.$tree.bind(eventType, function(e, node, isOk){
				self.tree.$tree.unbind(eventType);
				self.tree.logDebug("loaded %o, %o, %o", e, node, isOk);
				if(node !== self){
					throw "got invalid load event";
				}
				callback.call(self.tree, node, isOk);
			});
		}
		// The expansion state is maintained
		this.removeChildren();
		this._loadContent();
//		if( this.bExpanded ) {
//			// Remove children first, to prevent effects being applied
//			this.removeChildren();
//			// then force re-expand to trigger lazy loading
////			this.expand(false);
////			this.expand(true);
//			this._loadContent();
//		} else {
//			this.removeChildren();
//			this._loadContent();
//		}
	},

	/**
	 * Make sure the node with a given key path is available in the tree.
	 */
	_loadKeyPath: function(keyPath, callback) {
		var tree = this.tree;
		tree.logDebug("%s._loadKeyPath(%s)", this, keyPath);
		if(keyPath === ""){
			throw "Key path must not be empty";
		}
		var segList = keyPath.split(tree.options.keyPathSeparator);
		if(segList[0] === ""){
			throw "Key path must be relative (don't start with '/')";
		}
		var seg = segList.shift();

		for(var i=0, l=this.childList.length; i < l; i++){
			var child = this.childList[i];
			if( child.data.key === seg ){
				if(segList.length === 0) {
					// Found the end node
					callback.call(tree, child, "ok");

				}else if(child.data.isLazy && (child.childList === null || child.childList === undefined)){
					tree.logDebug("%s._loadKeyPath(%s) -> reloading %s...", this, keyPath, child);
					var self = this;
					child.reloadChildren(function(node, isOk){
						// After loading, look for direct child with that key
						if(isOk){
							tree.logDebug("%s._loadKeyPath(%s) -> reloaded %s.", node, keyPath, node);
							callback.call(tree, child, "loaded");
							node._loadKeyPath(segList.join(tree.options.keyPathSeparator), callback);
						}else{
							tree.logWarning("%s._loadKeyPath(%s) -> reloadChildren() failed.", self, keyPath);
							callback.call(tree, child, "error");
						}
					}); // Note: this line gives a JSLint warning (Don't make functions within a loop)
					// we can ignore it, since it will only be exectuted once, the the loop is ended
					// See also http://stackoverflow.com/questions/3037598/how-to-get-around-the-jslint-error-dont-make-functions-within-a-loop
				} else {
					callback.call(tree, child, "loaded");
					// Look for direct child with that key
					child._loadKeyPath(segList.join(tree.options.keyPathSeparator), callback);
				}
				return;
			}
		}
		// Could not find key
		tree.logWarning("Node not found: " + seg);
		return;
	},

	resetLazy: function() {
		// Discard lazy content.
		if( this.parent === null ){
			throw "Use tree.reload() instead";
		}else if( ! this.data.isLazy ){
			throw "node.resetLazy() requires lazy nodes.";
		}
		this.expand(false);
		this.removeChildren();
	},

	_addChildNode: function(dtnode, beforeNode) {
		/**
		 * Internal function to add one single DynatreeNode as a child.
		 *
		 */
		var tree = this.tree,
			opts = tree.options,
			pers = tree.persistence;

//		tree.logDebug("%s._addChildNode(%o)", this, dtnode);

		// --- Update and fix dtnode attributes if necessary
		dtnode.parent = this;
//		if( beforeNode && (beforeNode.parent !== this || beforeNode === dtnode ) )
//			throw "<beforeNode> must be another child of <this>";

		// --- Add dtnode as a child
		if ( this.childList === null ) {
			this.childList = [];
		} else if( ! beforeNode ) {
			// Fix 'lastsib'
			if(this.childList.length > 0) {
				$(this.childList[this.childList.length-1].span).removeClass(opts.classNames.lastsib);
			}
		}
		if( beforeNode ) {
			var iBefore = $.inArray(beforeNode, this.childList);
			if( iBefore < 0 ){
				throw "<beforeNode> must be a child of <this>";
			}
			this.childList.splice(iBefore, 0, dtnode);
		} else {
			// Append node
			this.childList.push(dtnode);
		}

		// --- Handle persistence
		// Initial status is read from cookies, if persistence is active and
		// cookies are already present.
		// Otherwise the status is read from the data attributes and then persisted.
		var isInitializing = tree.isInitializing();
		if( opts.persist && pers.cookiesFound && isInitializing ) {
			// Init status from cookies
//			tree.logDebug("init from cookie, pa=%o, dk=%o", pers.activeKey, dtnode.data.key);
			if( pers.activeKey === dtnode.data.key ){
				tree.activeNode = dtnode;
			}
			if( pers.focusedKey === dtnode.data.key ){
				tree.focusNode = dtnode;
			}
			dtnode.bExpanded = ($.inArray(dtnode.data.key, pers.expandedKeyList) >= 0);
			dtnode.bSelected = ($.inArray(dtnode.data.key, pers.selectedKeyList) >= 0);
//			tree.logDebug("    key=%o, bSelected=%o", dtnode.data.key, dtnode.bSelected);
		} else {
			// Init status from data (Note: we write the cookies after the init phase)
//			tree.logDebug("init from data");
			if( dtnode.data.activate ) {
				tree.activeNode = dtnode;
				if( opts.persist ){
					pers.activeKey = dtnode.data.key;
				}
			}
			if( dtnode.data.focus ) {
				tree.focusNode = dtnode;
				if( opts.persist ){
					pers.focusedKey = dtnode.data.key;
				}
			}
			dtnode.bExpanded = ( dtnode.data.expand === true ); // Collapsed by default
			if( dtnode.bExpanded && opts.persist ){
				pers.addExpand(dtnode.data.key);
			}
			dtnode.bSelected = ( dtnode.data.select === true ); // Deselected by default
/*
			Doesn't work, cause pers.selectedKeyList may be null
			if( dtnode.bSelected && opts.selectMode==1
				&& pers.selectedKeyList && pers.selectedKeyList.length>0 ) {
				tree.logWarning("Ignored multi-selection in single-mode for %o", dtnode);
				dtnode.bSelected = false; // Fixing bad input data (multi selection for mode:1)
			}
*/
			if( dtnode.bSelected && opts.persist ){
				pers.addSelect(dtnode.data.key);
			}
		}

		// Always expand, if it's below minExpandLevel
//		tree.logDebug ("%s._addChildNode(%o), l=%o", this, dtnode, dtnode.getLevel());
		if ( opts.minExpandLevel >= dtnode.getLevel() ) {
//			tree.logDebug ("Force expand for %o", dtnode);
			this.bExpanded = true;
		}

		// In multi-hier mode, update the parents selection state
		// issue #82: only if not initializing, because the children may not exist yet
//		if( !dtnode.data.isStatusNode && opts.selectMode==3 && !isInitializing )
//			dtnode._fixSelectionState();

		// In multi-hier mode, update the parents selection state
		if( dtnode.bSelected && opts.selectMode==3 ) {
			var p = this;
			while( p ) {
				if( !p.hasSubSel ){
					p._setSubSel(true);
				}
				p = p.parent;
			}
		}
		// render this node and the new child
		if ( tree.bEnableUpdate ){
			this.render();
		}
		return dtnode;
	},

	addChild: function(obj, beforeNode) {
		/**
		 * Add a node object as child.
		 *
		 * This should be the only place, where a DynaTreeNode is constructed!
		 * (Except for the root node creation in the tree constructor)
		 *
		 * @param obj A JS object (may be recursive) or an array of those.
		 * @param {DynaTreeNode} beforeNode (optional) sibling node.
		 *
		 * Data format: array of node objects, with optional 'children' attributes.
		 * [
		 *	{ title: "t1", isFolder: true, ... }
		 *	{ title: "t2", isFolder: true, ...,
		 *		children: [
		 *			{title: "t2.1", ..},
		 *			{..}
		 *			]
		 *	}
		 * ]
		 * A simple object is also accepted instead of an array.
		 *
		 */
//		this.tree.logDebug("%s.addChild(%o, %o)", this, obj, beforeNode);
		if(typeof(obj) == "string"){
			throw "Invalid data type for " + obj;
		}else if( !obj || obj.length === 0 ){ // Passed null or undefined or empty array
			return;
		}else if( obj instanceof DynaTreeNode ){
			return this._addChildNode(obj, beforeNode);
		}

		if( !obj.length ){ // Passed a single data object
			obj = [ obj ];
		}
		var prevFlag = this.tree.enableUpdate(false);

		var tnFirst = null;
		for (var i=0, l=obj.length; i<l; i++) {
			var data = obj[i];
			var dtnode = this._addChildNode(new DynaTreeNode(this, this.tree, data), beforeNode);
			if( !tnFirst ){
				tnFirst = dtnode;
			}
			// Add child nodes recursively
			if( data.children ){
				dtnode.addChild(data.children, null);
			}
		}
		this.tree.enableUpdate(prevFlag);
		return tnFirst;
	},

	append: function(obj) {
		this.tree.logWarning("node.append() is deprecated (use node.addChild() instead).");
		return this.addChild(obj, null);
	},

	appendAjax: function(ajaxOptions) {
		var self = this;
		this.removeChildren(false, true);
		this.setLazyNodeStatus(DTNodeStatus_Loading);
		// Debug feature: force a delay, to simulate slow loading...
		if(ajaxOptions.debugLazyDelay){
			var ms = ajaxOptions.debugLazyDelay;
			ajaxOptions.debugLazyDelay = 0;
			this.tree.logInfo("appendAjax: waiting for debugLazyDelay " + ms);
			setTimeout(function(){self.appendAjax(ajaxOptions);}, ms);
			return;
		}
		// Ajax option inheritance: $.ajaxSetup < $.ui.dynatree.prototype.options.ajaxDefaults < tree.options.ajaxDefaults < ajaxOptions
		var orgSuccess = ajaxOptions.success;
		var orgError = ajaxOptions.error;
		var eventType = "nodeLoaded.dynatree." + this.tree.$tree.attr("id")
			+ "." + this.data.key;
		var options = $.extend({}, this.tree.options.ajaxDefaults, ajaxOptions, {
			success: function(data, textStatus){
				// <this> is the request options
//				self.tree.logDebug("appendAjax().success");
				var prevPhase = self.tree.phase;
				self.tree.phase = "init";
				// postProcess is similar to the standard dataFilter hook,
				// but it is also called for JSONP
				if( options.postProcess ){
					data = options.postProcess.call(this, data, this.dataType);
				}
				// Process ASPX WebMethod JSON object inside "d" property
				// http://code.google.com/p/dynatree/issues/detail?id=202
				else if (data && data.hasOwnProperty("d")) {
					data = data.d;
				}
				if(!$.isArray(data) || data.length !== 0){
					self.addChild(data, null);
				}
				self.tree.phase = "postInit";
				if( orgSuccess ){
					orgSuccess.call(options, self, data, textStatus);
				}
				self.tree.logDebug("trigger " + eventType);
				self.tree.$tree.trigger(eventType, [self, true]);
				self.tree.phase = prevPhase;
				// This should be the last command, so node.isLoading is true
				// while the callbacks run
				self.setLazyNodeStatus(DTNodeStatus_Ok);
				if($.isArray(data) && data.length === 0){
					// Set to [] which is interpreted as 'no children' for lazy
					// nodes
					self.childList = [];
					self.render();
				}
				},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				// <this> is the request options
				self.tree.logWarning("appendAjax failed:", textStatus, ":\n", XMLHttpRequest, "\n", errorThrown);
				if( orgError ){
					orgError.call(options, self, XMLHttpRequest, textStatus, errorThrown);
				}
				self.tree.$tree.trigger(eventType, [self, false]);
				self.setLazyNodeStatus(DTNodeStatus_Error, {info: textStatus, tooltip: ""+errorThrown});
				}
		});
		$.ajax(options);
	},

	move: function(targetNode, mode) {
		/**Move this node to targetNode.
		 *  mode 'child': append this node as last child of targetNode.
		 *                This is the default. To be compatble with the D'n'd
		 *                hitMode, we also accept 'over'.
		 *  mode 'before': add this node as sibling before targetNode.
		 *  mode 'after': add this node as sibling after targetNode.
		 */
		var pos;
		if(this === targetNode){
			return;
		}
		if( !this.parent  ){
			throw "Cannot move system root";
		}
		if(mode === undefined || mode == "over"){
			mode = "child";
		}
		var prevParent = this.parent;
		var targetParent = (mode === "child") ? targetNode : targetNode.parent;
		if( targetParent.isDescendantOf(this) ){
			throw "Cannot move a node to it's own descendant";
		}
		// Unlink this node from current parent
		if( this.parent.childList.length == 1 ) {
			this.parent.childList = null;
			this.parent.bExpanded = false;
		} else {
			pos = $.inArray(this, this.parent.childList);
			if( pos < 0 ){
				throw "Internal error";
			}
			this.parent.childList.splice(pos, 1);
		}
		// Remove from source DOM parent
		this.parent.ul.removeChild(this.li);

		// Insert this node to target parent's child list
		this.parent = targetParent;
		if( targetParent.hasChildren() ) {
			switch(mode) {
			case "child":
				// Append to existing target children
				targetParent.childList.push(this);
				break;
			case "before":
				// Insert this node before target node
				pos = $.inArray(targetNode, targetParent.childList);
				if( pos < 0 ){
					throw "Internal error";
				}
				targetParent.childList.splice(pos, 0, this);
				break;
			case "after":
				// Insert this node after target node
				pos = $.inArray(targetNode, targetParent.childList);
				if( pos < 0 ){
					throw "Internal error";
				}
				targetParent.childList.splice(pos+1, 0, this);
				break;
			default:
				throw "Invalid mode " + mode;
			}
		} else {
			targetParent.childList = [ this ];
		}
		// Parent has no <ul> tag yet:
		if( !targetParent.ul ) {
			// This is the parent's first child: create UL tag
			// (Hidden, because it will be
			targetParent.ul = document.createElement("ul");
			targetParent.ul.style.display = "none";
			targetParent.li.appendChild(targetParent.ul);
		}
		// Add to target DOM parent
		targetParent.ul.appendChild(this.li);

		if( this.tree !== targetNode.tree ) {
			// Fix node.tree for all source nodes
			this.visit(function(node){
				node.tree = targetNode.tree;
			}, null, true);
			throw "Not yet implemented.";
		}
		// TODO: fix selection state
		// TODO: fix active state
		if( !prevParent.isDescendantOf(targetParent)) {
			prevParent.render();
		}
		if( !targetParent.isDescendantOf(prevParent) ) {
			targetParent.render();
		}
//		this.tree.redraw();
/*
		var tree = this.tree;
		var opts = tree.options;
		var pers = tree.persistence;


		// Always expand, if it's below minExpandLevel
//		tree.logDebug ("%s._addChildNode(%o), l=%o", this, dtnode, dtnode.getLevel());
		if ( opts.minExpandLevel >= dtnode.getLevel() ) {
//			tree.logDebug ("Force expand for %o", dtnode);
			this.bExpanded = true;
		}

		// In multi-hier mode, update the parents selection state
		// issue #82: only if not initializing, because the children may not exist yet
//		if( !dtnode.data.isStatusNode && opts.selectMode==3 && !isInitializing )
//			dtnode._fixSelectionState();

		// In multi-hier mode, update the parents selection state
		if( dtnode.bSelected && opts.selectMode==3 ) {
			var p = this;
			while( p ) {
				if( !p.hasSubSel )
					p._setSubSel(true);
				p = p.parent;
			}
		}
		// render this node and the new child
		if ( tree.bEnableUpdate )
			this.render();

		return dtnode;

*/
	},

	// --- end of class
	lastentry: undefined
};

/*************************************************************************
 * class DynaTreeStatus
 */

var DynaTreeStatus = Class.create();


DynaTreeStatus._getTreePersistData = function(cookieId, cookieOpts) {
	// Static member: Return persistence information from cookies
	var ts = new DynaTreeStatus(cookieId, cookieOpts);
	ts.read();
	return ts.toDict();
};
// Make available in global scope
getDynaTreePersistData = DynaTreeStatus._getTreePersistData; // TODO: deprecated


DynaTreeStatus.prototype = {
	// Constructor
	initialize: function(cookieId, cookieOpts) {
//		this._log("DynaTreeStatus: initialize");
		if( cookieId === undefined ){
			cookieId = $.ui.dynatree.prototype.options.cookieId;
		}
		cookieOpts = $.extend({}, $.ui.dynatree.prototype.options.cookie, cookieOpts);

		this.cookieId = cookieId;
		this.cookieOpts = cookieOpts;
		this.cookiesFound = undefined;
		this.activeKey = null;
		this.focusedKey = null;
		this.expandedKeyList = null;
		this.selectedKeyList = null;
	},
	// member functions
	_log: function(msg) {
		//	this.logDebug("_changeNodeList(%o): nodeList:%o, idx:%o", mode, nodeList, idx);
		Array.prototype.unshift.apply(arguments, ["debug"]);
		_log.apply(this, arguments);
	},
	read: function() {
//		this._log("DynaTreeStatus: read");
		// Read or init cookies.
		this.cookiesFound = false;

		var cookie = $.cookie(this.cookieId + "-active");
		this.activeKey = ( cookie === null ) ? "" : cookie;
		if( cookie !== null ){
			this.cookiesFound = true;
		}
		cookie = $.cookie(this.cookieId + "-focus");
		this.focusedKey = ( cookie === null ) ? "" : cookie;
		if( cookie !== null ){
			this.cookiesFound = true;
		}
		cookie = $.cookie(this.cookieId + "-expand");
		this.expandedKeyList = ( cookie === null ) ? [] : cookie.split(",");
		if( cookie !== null ){
			this.cookiesFound = true;
		}
		cookie = $.cookie(this.cookieId + "-select");
		this.selectedKeyList = ( cookie === null ) ? [] : cookie.split(",");
		if( cookie !== null ){
			this.cookiesFound = true;
		}
	},
	write: function() {
//		this._log("DynaTreeStatus: write");
		$.cookie(this.cookieId + "-active", ( this.activeKey === null ) ? "" : this.activeKey, this.cookieOpts);
		$.cookie(this.cookieId + "-focus", ( this.focusedKey === null ) ? "" : this.focusedKey, this.cookieOpts);
		$.cookie(this.cookieId + "-expand", ( this.expandedKeyList === null ) ? "" : this.expandedKeyList.join(","), this.cookieOpts);
		$.cookie(this.cookieId + "-select", ( this.selectedKeyList === null ) ? "" : this.selectedKeyList.join(","), this.cookieOpts);
	},
	addExpand: function(key) {
//		this._log("addExpand(%o)", key);
		if( $.inArray(key, this.expandedKeyList) < 0 ) {
			this.expandedKeyList.push(key);
			$.cookie(this.cookieId + "-expand", this.expandedKeyList.join(","), this.cookieOpts);
		}
	},
	clearExpand: function(key) {
//		this._log("clearExpand(%o)", key);
		var idx = $.inArray(key, this.expandedKeyList);
		if( idx >= 0 ) {
			this.expandedKeyList.splice(idx, 1);
			$.cookie(this.cookieId + "-expand", this.expandedKeyList.join(","), this.cookieOpts);
		}
	},
	addSelect: function(key) {
//		this._log("addSelect(%o)", key);
		if( $.inArray(key, this.selectedKeyList) < 0 ) {
			this.selectedKeyList.push(key);
			$.cookie(this.cookieId + "-select", this.selectedKeyList.join(","), this.cookieOpts);
		}
	},
	clearSelect: function(key) {
//		this._log("clearSelect(%o)", key);
		var idx = $.inArray(key, this.selectedKeyList);
		if( idx >= 0 ) {
			this.selectedKeyList.splice(idx, 1);
			$.cookie(this.cookieId + "-select", this.selectedKeyList.join(","), this.cookieOpts);
		}
	},
	isReloading: function() {
		return this.cookiesFound === true;
	},
	toDict: function() {
		return {
			cookiesFound: this.cookiesFound,
			activeKey: this.activeKey,
			focusedKey: this.activeKey,
			expandedKeyList: this.expandedKeyList,
			selectedKeyList: this.selectedKeyList
		};
	},
	// --- end of class
	lastentry: undefined
};


/*************************************************************************
 * class DynaTree
 */

var DynaTree = Class.create();

// --- Static members ----------------------------------------------------------

DynaTree.version = "$Version: 1.2.0$";

/*
DynaTree._initTree = function() {
};

DynaTree._bind = function() {
};
*/
//--- Class members ------------------------------------------------------------

DynaTree.prototype = {
	// Constructor
//	initialize: function(divContainer, options) {
	initialize: function($widget) {
		// instance members
		this.phase = "init";
		this.$widget = $widget;
		this.options = $widget.options;
		this.$tree = $widget.element;
		this.timer = null;
		// find container element
		this.divTree = this.$tree.get(0);

//		var parentPos = $(this.divTree).parent().offset();
//		this.parentTop = parentPos.top;
//		this.parentLeft = parentPos.left;

		_initDragAndDrop(this);
	},

	// member functions

	_load: function(callback) {
		var $widget = this.$widget;
		var opts = this.options,
			self = this;
		this.bEnableUpdate = true;
		this._nodeCount = 1;
		this.activeNode = null;
		this.focusNode = null;

		// Some deprecation warnings to help with migration
		if( opts.rootVisible !== undefined ){
			this.logWarning("Option 'rootVisible' is no longer supported.");
		}
		if( opts.minExpandLevel < 1 ) {
			this.logWarning("Option 'minExpandLevel' must be >= 1.");
			opts.minExpandLevel = 1;
		}
//		_log("warn", "jQuery.support.boxModel " + jQuery.support.boxModel);

		// If a 'options.classNames' dictionary was passed, still use defaults
		// for undefined classes:
		if( opts.classNames !== $.ui.dynatree.prototype.options.classNames ) {
			opts.classNames = $.extend({}, $.ui.dynatree.prototype.options.classNames, opts.classNames);
		}
		if( opts.ajaxDefaults !== $.ui.dynatree.prototype.options.ajaxDefaults ) {
			opts.ajaxDefaults = $.extend({}, $.ui.dynatree.prototype.options.ajaxDefaults, opts.ajaxDefaults);
		}
		if( opts.dnd !== $.ui.dynatree.prototype.options.dnd ) {
			opts.dnd = $.extend({}, $.ui.dynatree.prototype.options.dnd, opts.dnd);
		}
		// Guess skin path, if not specified
		if(!opts.imagePath) {
			$("script").each( function () {
				var _rexDtLibName = /.*dynatree[^\/]*\.js$/i;
				if( this.src.search(_rexDtLibName) >= 0 ) {
					if( this.src.indexOf("/")>=0 ){ // issue #47
						opts.imagePath = this.src.slice(0, this.src.lastIndexOf("/")) + "/skin/";
					}else{
						opts.imagePath = "skin/";
					}
					self.logDebug("Guessing imagePath from '%s': '%s'", this.src, opts.imagePath);
					return false; // first match
				}
			});
		}

		this.persistence = new DynaTreeStatus(opts.cookieId, opts.cookie);
		if( opts.persist ) {
			if( !$.cookie ){
				_log("warn", "Please include jquery.cookie.js to use persistence.");
			}
			this.persistence.read();
		}
		this.logDebug("DynaTree.persistence: %o", this.persistence.toDict());

		// Cached tag strings
		this.cache = {
			tagEmpty: "<span class='" + opts.classNames.empty + "'></span>",
			tagVline: "<span class='" + opts.classNames.vline + "'></span>",
			tagExpander: "<span class='" + opts.classNames.expander + "'></span>",
			tagConnector: "<span class='" + opts.classNames.connector + "'></span>",
			tagNodeIcon: "<span class='" + opts.classNames.nodeIcon + "'></span>",
			tagCheckbox: "<span class='" + opts.classNames.checkbox + "'></span>",
			lastentry: undefined
		};

		// Clear container, in case it contained some 'waiting' or 'error' text
		// for clients that don't support JS.
		// We don't do this however, if we try to load from an embedded UL element.
		if( opts.children || (opts.initAjax && opts.initAjax.url) || opts.initId ){
			$(this.divTree).empty();
		}
		var $ulInitialize = this.$tree.find(">ul:first").hide();

		// Create the root element
		this.tnRoot = new DynaTreeNode(null, this, {});
		this.tnRoot.bExpanded = true;
		this.tnRoot.render();
		this.divTree.appendChild(this.tnRoot.ul);

		var root = this.tnRoot;
		var isReloading = ( opts.persist && this.persistence.isReloading() );
		var isLazy = false;
		var prevFlag = this.enableUpdate(false);

		this.logDebug("Dynatree._load(): read tree structure...");

		// Init tree structure
		if( opts.children ) {
			// Read structure from node array
			root.addChild(opts.children);

		} else if( opts.initAjax && opts.initAjax.url ) {
			// Init tree from AJAX request
			isLazy = true;
			root.data.isLazy = true;
			this._reloadAjax(callback);

		} else if( opts.initId ) {
			// Init tree from another UL element
			this._createFromTag(root, $("#"+opts.initId));

		} else {
			// Init tree from the first UL element inside the container <div>
//			var $ul = this.$tree.find(">ul:first").hide();
			this._createFromTag(root, $ulInitialize);
			$ulInitialize.remove();
		}

		this._checkConsistency();
		// Fix part-sel flags
		if(!isLazy && opts.selectMode == 3){
			root._updatePartSelectionState();
		}
		// Render html markup
		this.logDebug("Dynatree._load(): render nodes...");
		this.enableUpdate(prevFlag);

		// bind event handlers
		this.logDebug("Dynatree._load(): bind events...");
		this.$widget.bind();

		// --- Post-load processing
		this.logDebug("Dynatree._load(): postInit...");
		this.phase = "postInit";

		// In persist mode, make sure that cookies are written, even if they are empty
		if( opts.persist ) {
			this.persistence.write();
		}
		// Set focus, if possible (this will also fire an event and write a cookie)
		if( this.focusNode && this.focusNode.isVisible() ) {
			this.logDebug("Focus on init: %o", this.focusNode);
			this.focusNode.focus();
		}
		if( !isLazy ) {
			if( opts.onPostInit ) {
				opts.onPostInit.call(this, isReloading, false);
			}
			if( callback ){
				callback.call(this, "ok");
			}
		}
		this.phase = "idle";
	},

	_reloadAjax: function(callback) {
		// Reload
		var opts = this.options;
		if( ! opts.initAjax || ! opts.initAjax.url ){
			throw "tree.reload() requires 'initAjax' mode.";
		}
		var pers = this.persistence;
		var ajaxOpts = $.extend({}, opts.initAjax);
		// Append cookie info to the request
//		this.logDebug("reloadAjax: key=%o, an.key:%o", pers.activeKey, this.activeNode?this.activeNode.data.key:"?");
		if( ajaxOpts.addActiveKey ){
			ajaxOpts.data.activeKey = pers.activeKey;
		}
		if( ajaxOpts.addFocusedKey ){
			ajaxOpts.data.focusedKey = pers.focusedKey;
		}
		if( ajaxOpts.addExpandedKeyList ){
			ajaxOpts.data.expandedKeyList = pers.expandedKeyList.join(",");
		}
		if( ajaxOpts.addSelectedKeyList ){
			ajaxOpts.data.selectedKeyList = pers.selectedKeyList.join(",");
		}
		// Set up onPostInit callback to be called when Ajax returns
		if( ajaxOpts.success ){
			this.logWarning("initAjax: success callback is ignored; use onPostInit instead.");
		}
		if( ajaxOpts.error ){
			this.logWarning("initAjax: error callback is ignored; use onPostInit instead.");
		}
		var isReloading = pers.isReloading();
		ajaxOpts.success = function(dtnode, data, textStatus) {
			if(opts.selectMode == 3){
				dtnode.tree.tnRoot._updatePartSelectionState();
			}
			if(opts.onPostInit){
				opts.onPostInit.call(dtnode.tree, isReloading, false);
			}
			if(callback){
				callback.call(dtnode.tree, "ok");
			}
		};
		ajaxOpts.error = function(dtnode, XMLHttpRequest, textStatus, errorThrown) {
			if(opts.onPostInit){
				opts.onPostInit.call(dtnode.tree, isReloading, true, XMLHttpRequest, textStatus, errorThrown);
			}
			if(callback){
				callback.call(dtnode.tree, "error", XMLHttpRequest, textStatus, errorThrown);
			}
		};
//		}
		this.logDebug("Dynatree._init(): send Ajax request...");
		this.tnRoot.appendAjax(ajaxOpts);
	},

	toString: function() {
//		return "DynaTree '" + this.options.title + "'";
		return "Dynatree '" + this.$tree.attr("id") + "'";
	},

	toDict: function() {
		return this.tnRoot.toDict(true);
	},

	serializeArray: function(stopOnParents) {
		// Return a JavaScript array of objects, ready to be encoded as a JSON
		// string for selected nodes
		var nodeList = this.getSelectedNodes(stopOnParents),
			name = this.$tree.attr("name") || this.$tree.attr("id"),
			arr = [];
		for(var i=0, l=nodeList.length; i<l; i++){
			arr.push({name: name, value: nodeList[i].data.key});
		}
		return arr;
	},

	getPersistData: function() {
		return this.persistence.toDict();
	},

	logDebug: function(msg) {
		if( this.options.debugLevel >= 2 ) {
			Array.prototype.unshift.apply(arguments, ["debug"]);
			_log.apply(this, arguments);
		}
	},

	logInfo: function(msg) {
		if( this.options.debugLevel >= 1 ) {
			Array.prototype.unshift.apply(arguments, ["info"]);
			_log.apply(this, arguments);
		}
	},

	logWarning: function(msg) {
		Array.prototype.unshift.apply(arguments, ["warn"]);
		_log.apply(this, arguments);
	},

	isInitializing: function() {
		return ( this.phase=="init" || this.phase=="postInit" );
	},
	isReloading: function() {
		return ( this.phase=="init" || this.phase=="postInit" ) && this.options.persist && this.persistence.cookiesFound;
	},
	isUserEvent: function() {
		return ( this.phase=="userEvent" );
	},

	redraw: function() {
//		this.logDebug("dynatree.redraw()...");
		this.tnRoot.render(false, false);
//		this.logDebug("dynatree.redraw() done.");
	},
	renderInvisibleNodes: function() {
		this.tnRoot.render(false, true);
	},
	reload: function(callback) {
		this._load(callback);
	},

	getRoot: function() {
		return this.tnRoot;
	},

	enable: function() {
		this.$widget.enable();
	},

	disable: function() {
		this.$widget.disable();
	},

	getNodeByKey: function(key) {
		// Search the DOM by element ID (assuming this is faster than traversing all nodes).
		// $("#...") has problems, if the key contains '.', so we use getElementById()
		var el = document.getElementById(this.options.idPrefix + key);
		if( el ){
			return el.dtnode ? el.dtnode : null;
		}
		// Not found in the DOM, but still may be in an unrendered part of tree
		var match = null;
		this.visit(function(node){
//			window.console.log("%s", node);
			if(node.data.key == key) {
				match = node;
				return false;
			}
		}, true);
		return match;
	},

	getActiveNode: function() {
		return this.activeNode;
	},

	reactivate: function(setFocus) {
		// Re-fire onQueryActivate and onActivate events.
		var node = this.activeNode;
//		this.logDebug("reactivate %o", node);
		if( node ) {
			this.activeNode = null; // Force re-activating
			node.activate();
			if( setFocus ){
				node.focus();
			}
		}
	},

	getSelectedNodes: function(stopOnParents) {
		var nodeList = [];
		this.tnRoot.visit(function(node){
			if( node.bSelected ) {
				nodeList.push(node);
				if( stopOnParents === true ){
					return "skip"; // stop processing this branch
				}
			}
		});
		return nodeList;
	},

	activateKey: function(key) {
		var dtnode = (key === null) ? null : this.getNodeByKey(key);
		if( !dtnode ) {
			if( this.activeNode ){
				this.activeNode.deactivate();
			}
			this.activeNode = null;
			return null;
		}
		dtnode.focus();
		dtnode.activate();
		return dtnode;
	},

	loadKeyPath: function(keyPath, callback) {
		var segList = keyPath.split(this.options.keyPathSeparator);
		// Remove leading '/'
		if(segList[0] === ""){
			segList.shift();
		}
		// Remove leading system root key
		if(segList[0] == this.tnRoot.data.key){
			this.logDebug("Removed leading root key.");
			segList.shift();
		}
		keyPath = segList.join(this.options.keyPathSeparator);
		return this.tnRoot._loadKeyPath(keyPath, callback);
	},

	selectKey: function(key, select) {
		var dtnode = this.getNodeByKey(key);
		if( !dtnode ){
			return null;
		}
		dtnode.select(select);
		return dtnode;
	},

	enableUpdate: function(bEnable) {
		if ( this.bEnableUpdate==bEnable ){
			return bEnable;
		}
		this.bEnableUpdate = bEnable;
		if ( bEnable ){
			this.redraw();
		}
		return !bEnable; // return previous value
	},

	count: function() {
		return this.tnRoot.countChildren();
	},

	visit: function(fn, includeRoot) {
		return this.tnRoot.visit(fn, includeRoot);
	},

	_createFromTag: function(parentTreeNode, $ulParent) {
		// Convert a <UL>...</UL> list into children of the parent tree node.
		var self = this;
/*
TODO: better?
		this.$lis = $("li:has(a[href])", this.element);
		this.$tabs = this.$lis.map(function() { return $("a", this)[0]; });
 */
		$ulParent.find(">li").each(function() {
			var $li = $(this),
				$liSpan = $li.find(">span:first"),
				$liA = $li.find(">a:first"),
				title,
				href = null,
				target = null,
				tooltip;
			if( $liSpan.length ) {
				// If a <li><span> tag is specified, use it literally.
				title = $liSpan.html();
			} else if( $liA.length ) {
				title = $liA.html();
				href = $liA.attr("href");
				target = $liA.attr("target");
				tooltip = $liA.attr("title");
			} else {
				// If only a <li> tag is specified, use the trimmed string up to
				// the next child <ul> tag.
				title = $li.html();
				var iPos = title.search(/<ul/i);
				if( iPos >= 0 ){
					title = $.trim(title.substring(0, iPos));
				}else{
					title = $.trim(title);
				}
//				self.logDebug("%o", title);
			}
			// Parse node options from ID, title and class attributes
			var data = {
				title: title,
				tooltip: tooltip,
				isFolder: $li.hasClass("folder"),
				isLazy: $li.hasClass("lazy"),
				expand: $li.hasClass("expanded"),
				select: $li.hasClass("selected"),
				activate: $li.hasClass("active"),
				focus: $li.hasClass("focused"),
				noLink: $li.hasClass("noLink")
			};
			if( href ){
				data.href = href;
				data.target = target;
			}
			if( $li.attr("title") ){
				data.tooltip = $li.attr("title"); // overrides <a title='...'>
			}
			if( $li.attr("id") ){
				data.key = $li.attr("id");
			}
			// If a data attribute is present, evaluate as a JavaScript object
			if( $li.attr("data") ) {
				var dataAttr = $.trim($li.attr("data"));
				if( dataAttr ) {
					if( dataAttr.charAt(0) != "{" ){
						dataAttr = "{" + dataAttr + "}";
					}
					try {
						$.extend(data, eval("(" + dataAttr + ")"));
					} catch(e) {
						throw ("Error parsing node data: " + e + "\ndata:\n'" + dataAttr + "'");
					}
				}
			}
			var childNode = parentTreeNode.addChild(data);
			// Recursive reading of child nodes, if LI tag contains an UL tag
			var $ul = $li.find(">ul:first");
			if( $ul.length ) {
				self._createFromTag(childNode, $ul); // must use 'self', because 'this' is the each() context
			}
		});
	},

	_checkConsistency: function() {
//		this.logDebug("tree._checkConsistency() NOT IMPLEMENTED - %o", this);
	},

	_setDndStatus: function(sourceNode, targetNode, helper, hitMode, accept) {
		// hitMode: 'after', 'before', 'over', 'out', 'start', 'stop'
		var $source = sourceNode ? $(sourceNode.span) : null,
			$target = $(targetNode.span);
		if( !this.$dndMarker ) {
			this.$dndMarker = $("<div id='dynatree-drop-marker'></div>")
				.hide()
				.prependTo($(this.divTree).parent());
//				.prependTo("body");
//			logMsg("Creating marker: %o", this.$dndMarker);
		}
/*
		if(hitMode === "start"){
		}
		if(hitMode === "stop"){
//			sourceNode.removeClass("dynatree-drop-target");
		}
*/
//		this.$dndMarker.attr("class", hitMode);
		if(hitMode === "after" || hitMode === "before" || hitMode === "over"){
//			$source && $source.addClass("dynatree-drag-source");
			var pos = $target.offset();
			switch(hitMode){
			case "before":
				this.$dndMarker.removeClass("dynatree-drop-after dynatree-drop-over");
				this.$dndMarker.addClass("dynatree-drop-before");
				pos.top -= 8;
				break;
			case "after":
				this.$dndMarker.removeClass("dynatree-drop-before dynatree-drop-over");
				this.$dndMarker.addClass("dynatree-drop-after");
				pos.top += 8;
				break;
			default:
				this.$dndMarker.removeClass("dynatree-drop-after dynatree-drop-before");
				this.$dndMarker.addClass("dynatree-drop-over");
				$target.addClass("dynatree-drop-target");
				pos.left += 8;
			}
//			logMsg("Creating marker: %o", this.$dndMarker);
//			logMsg("    $target.offset=%o", $target);
//			logMsg("    pos/$target.offset=%o", pos);
//			logMsg("    $target.position=%o", $target.position());
//			logMsg("    $target.offsetParent=%o, ot:%o", $target.offsetParent(), $target.offsetParent().offset());
//			logMsg("    $(this.divTree).offset=%o", $(this.divTree).offset());
//			logMsg("    $(this.divTree).parent=%o", $(this.divTree).parent());

			this.$dndMarker.offset({left: pos.left, top: pos.top})
				.css({
					"z-index": 1000
				})
				.show();
//			helper.addClass("dynatree-drop-hover");
		} else {
//			$source && $source.removeClass("dynatree-drag-source");
			$target.removeClass("dynatree-drop-target");
			this.$dndMarker.hide();
//			helper.removeClass("dynatree-drop-hover");
		}
		if(hitMode === "after"){
			$target.addClass("dynatree-drop-after");
		} else {
			$target.removeClass("dynatree-drop-after");
		}
		if(hitMode === "before"){
			$target.addClass("dynatree-drop-before");
		} else {
			$target.removeClass("dynatree-drop-before");
		}
		if(accept === true){
			if($source){
				$source.addClass("dynatree-drop-accept");
			}
			$target.addClass("dynatree-drop-accept");
			helper.addClass("dynatree-drop-accept");
		}else{
			if($source){
				$source.removeClass("dynatree-drop-accept");
			}
			$target.removeClass("dynatree-drop-accept");
			helper.removeClass("dynatree-drop-accept");
		}
		if(accept === false){
			if($source){
				$source.addClass("dynatree-drop-reject");
			}
			$target.addClass("dynatree-drop-reject");
			helper.addClass("dynatree-drop-reject");
		}else{
			if($source){
				$source.removeClass("dynatree-drop-reject");
			}
			$target.removeClass("dynatree-drop-reject");
			helper.removeClass("dynatree-drop-reject");
		}
	},

	_onDragEvent: function(eventName, node, otherNode, event, ui, draggable) {
		/**
		 * Handles drag'n'drop functionality.
		 *
		 * A standard jQuery drag-and-drop process may generate these calls:
		 *
		 * draggable helper():
		 *     _onDragEvent("helper", sourceNode, null, event, null, null);
		 * start:
		 *     _onDragEvent("start", sourceNode, null, event, ui, draggable);
		 * drag:
		 *     _onDragEvent("leave", prevTargetNode, sourceNode, event, ui, draggable);
		 *     _onDragEvent("over", targetNode, sourceNode, event, ui, draggable);
		 *     _onDragEvent("enter", targetNode, sourceNode, event, ui, draggable);
		 * stop:
		 *     _onDragEvent("drop", targetNode, sourceNode, event, ui, draggable);
		 *     _onDragEvent("leave", targetNode, sourceNode, event, ui, draggable);
		 *     _onDragEvent("stop", sourceNode, null, event, ui, draggable);
		 */
//		if(eventName !== "over"){
//			this.logDebug("tree._onDragEvent(%s, %o, %o) - %o", eventName, node, otherNode, this);
//		}
		var opts = this.options;
		var dnd = this.options.dnd;
		var res = null;
		var nodeTag = $(node.span);
		var hitMode;

		switch (eventName) {
		case "helper":
			// Only event and node argument is available
			var helper = $("<div class='dynatree-drag-helper'><span class='dynatree-drag-helper-img' /></div>")
				.append($(event.target).closest('a').clone());
			// Attach node reference to helper object
			helper.data("dtSourceNode", node);
//			this.logDebug("helper.sourceNode=%o", helper.data("dtSourceNode"));
			res = helper;
			break;
		case "start":
			if(node.isStatusNode()) {
				res = false;
			} else if(dnd.onDragStart) {
				res = dnd.onDragStart(node);
			}
			if(res === false) {
				this.logDebug("tree.onDragStart() cancelled");
				//draggable._clear();
				// NOTE: the return value seems to be ignored (drag is not canceled, when false is returned)
				ui.helper.trigger("mouseup");
				ui.helper.hide();
			} else {
				nodeTag.addClass("dynatree-drag-source");
			}
			break;
		case "enter":
			res = dnd.onDragEnter ? dnd.onDragEnter(node, otherNode) : null;
			res = {
				over: (res !== false) && ((res === true) || (res === "over") || $.inArray("over", res) >= 0),
				before: (res !== false) && ((res === true) || (res === "before") || $.inArray("before", res) >= 0),
				after: (res !== false) && ((res === true) || (res === "after") || $.inArray("after", res) >= 0)
			};
			ui.helper.data("enterResponse", res);
//			this.logDebug("helper.enterResponse: %o", res);
			break;
		case "over":
			var enterResponse = ui.helper.data("enterResponse");
			hitMode = null;
			if(enterResponse === false){
				// Don't call onDragOver if onEnter returned false.
				break;
			} else if(typeof enterResponse === "string") {
				// Use hitMode from onEnter if provided.
				hitMode = enterResponse;
			} else {
				// Calculate hitMode from relative cursor position.
				var nodeOfs = nodeTag.offset();
//				var relPos = { x: event.clientX - nodeOfs.left,
//							y: event.clientY - nodeOfs.top };
//				nodeOfs.top += this.parentTop;
//				nodeOfs.left += this.parentLeft;
				var relPos = { x: event.pageX - nodeOfs.left,
							   y: event.pageY - nodeOfs.top };
				var relPos2 = { x: relPos.x / nodeTag.width(),
								y: relPos.y / nodeTag.height() };
//				this.logDebug("event.page: %s/%s", event.pageX, event.pageY);
//				this.logDebug("event.client: %s/%s", event.clientX, event.clientY);
//				this.logDebug("nodeOfs: %s/%s", nodeOfs.left, nodeOfs.top);
////				this.logDebug("parent: %s/%s", this.parentLeft, this.parentTop);
//				this.logDebug("relPos: %s/%s", relPos.x, relPos.y);
//				this.logDebug("relPos2: %s/%s", relPos2.x, relPos2.y);
				if( enterResponse.after && relPos2.y > 0.75 ){
					hitMode = "after";
				} else if(!enterResponse.over && enterResponse.after && relPos2.y > 0.5 ){
					hitMode = "after";
				} else if(enterResponse.before && relPos2.y <= 0.25) {
					hitMode = "before";
				} else if(!enterResponse.over && enterResponse.before && relPos2.y <= 0.5) {
					hitMode = "before";
				} else if(enterResponse.over) {
					hitMode = "over";
				}
				// Prevent no-ops like 'before source node'
				// TODO: these are no-ops when moving nodes, but not in copy mode
				if( dnd.preventVoidMoves ){
					if(node === otherNode){
//						this.logDebug("    drop over source node prevented");
						hitMode = null;
					}else if(hitMode === "before" && otherNode && node === otherNode.getNextSibling()){
//						this.logDebug("    drop after source node prevented");
						hitMode = null;
					}else if(hitMode === "after" && otherNode && node === otherNode.getPrevSibling()){
//						this.logDebug("    drop before source node prevented");
						hitMode = null;
					}else if(hitMode === "over" && otherNode
							&& otherNode.parent === node && otherNode.isLastSibling() ){
//						this.logDebug("    drop last child over own parent prevented");
						hitMode = null;
					}
				}
//				this.logDebug("hitMode: %s - %s - %s", hitMode, (node.parent === otherNode), node.isLastSibling());
				ui.helper.data("hitMode", hitMode);
			}
			// Auto-expand node (only when 'over' the node, not 'before', or 'after')
			if(hitMode === "over"
				&& dnd.autoExpandMS && node.hasChildren() !== false && !node.bExpanded) {
				node.scheduleAction("expand", dnd.autoExpandMS);
			}
			if(hitMode && dnd.onDragOver){
				res = dnd.onDragOver(node, otherNode, hitMode);
			}
			this._setDndStatus(otherNode, node, ui.helper, hitMode, res!==false);
			break;
		case "drop":
			hitMode = ui.helper.data("hitMode");
			if(hitMode && dnd.onDrop){
				dnd.onDrop(node, otherNode, hitMode, ui, draggable);
			}
			break;
		case "leave":
			// Cancel pending expand request
			node.scheduleAction("cancel");
			ui.helper.data("enterResponse", null);
			ui.helper.data("hitMode", null);
			this._setDndStatus(otherNode, node, ui.helper, "out", undefined);
			if(dnd.onDragLeave){
				dnd.onDragLeave(node, otherNode);
			}
			break;
		case "stop":
			nodeTag.removeClass("dynatree-drag-source");
			if(dnd.onDragStop){
				dnd.onDragStop(node);
			}
			break;
		default:
			throw "Unsupported drag event: " + eventName;
		}
		return res;
	},

	cancelDrag: function() {
		 var dd = $.ui.ddmanager.current;
		 if(dd){
			 dd.cancel();
		 }
	},

	// --- end of class
	lastentry: undefined
};

/*************************************************************************
 * Widget $(..).dynatree
 */

$.widget("ui.dynatree", {
/*
	init: function() {
		// ui.core 1.6 renamed init() to _init(): this stub assures backward compatibility
		_log("warn", "ui.dynatree.init() was called; you should upgrade to jquery.ui.core.js v1.8 or higher.");
		return this._init();
	},
 */
	_init: function() {
		if( parseFloat($.ui.version) < 1.8 ) {
			// jquery.ui.core 1.8 renamed _init() to _create(): this stub assures backward compatibility
			if(this.options.debugLevel >= 0){
				_log("warn", "ui.dynatree._init() was called; you should upgrade to jquery.ui.core.js v1.8 or higher.");
			}
			return this._create();
		}
		// jquery.ui.core 1.8 still uses _init() to perform "default functionality"
		if(this.options.debugLevel >= 2){
			_log("debug", "ui.dynatree._init() was called; no current default functionality.");
		}
	},

	_create: function() {
		var opts = this.options;
		if(opts.debugLevel >= 1){
			logMsg("Dynatree._create(): version='%s', debugLevel=%o.", $.ui.dynatree.version, this.options.debugLevel);
		}
		// The widget framework supplies this.element and this.options.
		this.options.event += ".dynatree"; // namespace event

		var divTree = this.element.get(0);
/*		// Clear container, in case it contained some 'waiting' or 'error' text
		// for clients that don't support JS
		if( opts.children || (opts.initAjax && opts.initAjax.url) || opts.initId )
			$(divTree).empty();
*/
		// Create the DynaTree object
		this.tree = new DynaTree(this);
		this.tree._load();
		this.tree.logDebug("Dynatree._init(): done.");
	},

	bind: function() {
		// Prevent duplicate binding
		this.unbind();

		var eventNames = "click.dynatree dblclick.dynatree";
		if( this.options.keyboard ){
			// Note: leading ' '!
			eventNames += " keypress.dynatree keydown.dynatree";
		}
		this.element.bind(eventNames, function(event){
			var dtnode = getDtNodeFromElement(event.target);
			if( !dtnode ){
				return true;  // Allow bubbling of other events
			}
			var tree = dtnode.tree;
			var o = tree.options;
			tree.logDebug("event(%s): dtnode: %s", event.type, dtnode);
			var prevPhase = tree.phase;
			tree.phase = "userEvent";
			try {
				switch(event.type) {
				case "click":
					return ( o.onClick && o.onClick.call(tree, dtnode, event)===false ) ? false : dtnode._onClick(event);
				case "dblclick":
					return ( o.onDblClick && o.onDblClick.call(tree, dtnode, event)===false ) ? false : dtnode._onDblClick(event);
				case "keydown":
					return ( o.onKeydown && o.onKeydown.call(tree, dtnode, event)===false ) ? false : dtnode._onKeydown(event);
				case "keypress":
					return ( o.onKeypress && o.onKeypress.call(tree, dtnode, event)===false ) ? false : dtnode._onKeypress(event);
				}
			} catch(e) {
				var _ = null; // issue 117
				tree.logWarning("bind(%o): dtnode: %o, error: %o", event, dtnode, e);
			} finally {
				tree.phase = prevPhase;
			}
		});

		// focus/blur don't bubble, i.e. are not delegated to parent <div> tags,
		// so we use the addEventListener capturing phase.
		// See http://www.howtocreate.co.uk/tutorials/javascript/domevents
		function __focusHandler(event) {
			// Handles blur and focus.
			// Fix event for IE:
			// doesn't pass JSLint:
//			event = arguments[0] = $.event.fix( event || window.event );
			// what jQuery does:
//			var args = jQuery.makeArray( arguments );
//			event = args[0] = jQuery.event.fix( event || window.event );
			event = $.event.fix( event || window.event );
			var dtnode = getDtNodeFromElement(event.target);
			return dtnode ? dtnode._onFocus(event) : false;
		}
		var div = this.tree.divTree;
		if( div.addEventListener ) {
			div.addEventListener("focus", __focusHandler, true);
			div.addEventListener("blur", __focusHandler, true);
		} else {
			div.onfocusin = div.onfocusout = __focusHandler;
		}
		// EVENTS
		// disable click if event is configured to something else
//		if (!(/^click/).test(o.event))
//			this.$tabs.bind("click.tabs", function() { return false; });

	},

	unbind: function() {
		this.element.unbind(".dynatree");
	},

/* TODO: we could handle option changes during runtime here (maybe to re-render, ...)
	setData: function(key, value) {
		this.tree.logDebug("dynatree.setData('" + key + "', '" + value + "')");
	},
*/
	enable: function() {
		this.bind();
		// Call default disable(): remove -disabled from css:
		$.Widget.prototype.enable.apply(this, arguments);
	},

	disable: function() {
		this.unbind();
		// Call default disable(): add -disabled to css:
		$.Widget.prototype.disable.apply(this, arguments);
	},

	// --- getter methods (i.e. NOT returning a reference to $)
	getTree: function() {
		return this.tree;
	},

	getRoot: function() {
		return this.tree.getRoot();
	},

	getActiveNode: function() {
		return this.tree.getActiveNode();
	},

	getSelectedNodes: function() {
		return this.tree.getSelectedNodes();
	},

	// ------------------------------------------------------------------------
	lastentry: undefined
});


// The following methods return a value (thus breaking the jQuery call chain):
if( parseFloat($.ui.version) < 1.8 ) {
	$.ui.dynatree.getter = "getTree getRoot getActiveNode getSelectedNodes";
}

/*******************************************************************************
 * Tools in ui.dynatree namespace
 */
$.ui.dynatree.version = "$Version: 1.2.0$";

/**
 * Return a DynaTreeNode object for a given DOM element
 */
$.ui.dynatree.getNode = function(el) {
	if(el instanceof DynaTreeNode){
		return el; // el already was a DynaTreeNode
	}
	// TODO: for some reason $el.parents("[dtnode]") does not work (jQuery 1.6.1)
	// maybe, because dtnode is a property, not an attribute
	var $el = el.selector === undefined ? $(el) : el,
//		parent = $el.closest("[dtnode]"),
		parent = $el.parents("[dtnode]").first(),
		node;
	if(typeof parent.prop == "function"){
		node = parent.prop("dtnode");
	}else{ // pre jQuery 1.6
		node = parent.attr("dtnode");
	}
	return node;
}

/**Return persistence information from cookies.*/
$.ui.dynatree.getPersistData = DynaTreeStatus._getTreePersistData;

/*******************************************************************************
 * Plugin default options:
 */
$.ui.dynatree.prototype.options = {
	title: "Dynatree", // Tree's name (only used for debug outpu)
	minExpandLevel: 1, // 1: root node is not collapsible
	imagePath: null, // Path to a folder containing icons. Defaults to 'skin/' subdirectory.
	children: null, // Init tree structure from this object array.
	initId: null, // Init tree structure from a <ul> element with this ID.
	initAjax: null, // Ajax options used to initialize the tree strucuture.
	autoFocus: true, // Set focus to first child, when expanding or lazy-loading.
	keyboard: true, // Support keyboard navigation.
	persist: false, // Persist expand-status to a cookie
	autoCollapse: false, // Automatically collapse all siblings, when a node is expanded.
	clickFolderMode: 3, // 1:activate, 2:expand, 3:activate and expand
	activeVisible: true, // Make sure, active nodes are visible (expanded).
	checkbox: false, // Show checkboxes.
	selectMode: 2, // 1:single, 2:multi, 3:multi-hier
	fx: null, // Animations, e.g. null or { height: "toggle", duration: 200 }
	noLink: false, // Use <span> instead of <a> tags for all nodes
	// Low level event handlers: onEvent(dtnode, event): return false, to stop default processing
	onClick: null, // null: generate focus, expand, activate, select events.
	onDblClick: null, // (No default actions.)
	onKeydown: null, // null: generate keyboard navigation (focus, expand, activate).
	onKeypress: null, // (No default actions.)
	onFocus: null, // null: set focus to node.
	onBlur: null, // null: remove focus from node.

	// Pre-event handlers onQueryEvent(flag, dtnode): return false, to stop processing
	onQueryActivate: null, // Callback(flag, dtnode) before a node is (de)activated.
	onQuerySelect: null, // Callback(flag, dtnode) before a node is (de)selected.
	onQueryExpand: null, // Callback(flag, dtnode) before a node is expanded/collpsed.

	// High level event handlers
	onPostInit: null, // Callback(isReloading, isError) when tree was (re)loaded.
	onActivate: null, // Callback(dtnode) when a node is activated.
	onDeactivate: null, // Callback(dtnode) when a node is deactivated.
	onSelect: null, // Callback(flag, dtnode) when a node is (de)selected.
	onExpand: null, // Callback(flag, dtnode) when a node is expanded/collapsed.
	onLazyRead: null, // Callback(dtnode) when a lazy node is expanded for the first time.
	onCustomRender: null, // Callback(dtnode) before a node is rendered. Return a HTML string to override.
	onCreate: null, // Callback(dtnode, nodeSpan) after a node was rendered for the first time.
	onRender: null, // Callback(dtnode, nodeSpan) after a node was rendered.

	// Drag'n'drop support
	dnd: {
		// Make tree nodes draggable:
		onDragStart: null, // Callback(sourceNode), return true, to enable dnd
		onDragStop: null, // Callback(sourceNode)
//		helper: null,
		// Make tree nodes accept draggables
		autoExpandMS: 1000, // Expand nodes after n milliseconds of hovering.
		preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
		onDragEnter: null, // Callback(targetNode, sourceNode)
		onDragOver: null, // Callback(targetNode, sourceNode, hitMode)
		onDrop: null, // Callback(targetNode, sourceNode, hitMode)
		onDragLeave: null // Callback(targetNode, sourceNode)
	},
	ajaxDefaults: { // Used by initAjax option
		cache: false, // false: Append random '_' argument to the request url to prevent caching.
		dataType: "json" // Expect json format and pass json object to callbacks.
	},
	strings: {
		loading: "Loading&#8230;",
		loadError: "Load error!"
	},
	generateIds: false, // Generate id attributes like <span id='dynatree-id-KEY'>
	idPrefix: "dynatree-id-", // Used to generate node id's like <span id="dynatree-id-<key>">.
	keyPathSeparator: "/", // Used by node.getKeyPath() and tree.loadKeyPath().
//    cookieId: "dynatree-cookie", // Choose a more unique name, to allow multiple trees.
	cookieId: "dynatree", // Choose a more unique name, to allow multiple trees.
	cookie: {
		expires: null //7, // Days or Date; null: session cookie
//		path: "/", // Defaults to current page
//		domain: "jquery.com",
//		secure: true
	},
	// Class names used, when rendering the HTML markup.
	// Note: if only single entries are passed for options.classNames, all other
	// values are still set to default.
	classNames: {
		container: "dynatree-container",
		node: "dynatree-node",
		folder: "dynatree-folder",
//		document: "dynatree-document",

		empty: "dynatree-empty",
		vline: "dynatree-vline",
		expander: "dynatree-expander",
		connector: "dynatree-connector",
		checkbox: "dynatree-checkbox",
		nodeIcon: "dynatree-icon",
		title: "dynatree-title",
		noConnector: "dynatree-no-connector",

		nodeError: "dynatree-statusnode-error",
		nodeWait: "dynatree-statusnode-wait",
		hidden: "dynatree-hidden",
		combinedExpanderPrefix: "dynatree-exp-",
		combinedIconPrefix: "dynatree-ico-",
		nodeLoading: "dynatree-loading",
//		disabled: "dynatree-disabled",
		hasChildren: "dynatree-has-children",
		active: "dynatree-active",
		selected: "dynatree-selected",
		expanded: "dynatree-expanded",
		lazy: "dynatree-lazy",
		focused: "dynatree-focused",
		partsel: "dynatree-partsel",
		lastsib: "dynatree-lastsib"
	},
	debugLevel: 1,

	// ------------------------------------------------------------------------
	lastentry: undefined
};
//
if( parseFloat($.ui.version) < 1.8 ) {
	$.ui.dynatree.defaults = $.ui.dynatree.prototype.options;
}

/*******************************************************************************
 * Reserved data attributes for a tree node.
 */
$.ui.dynatree.nodedatadefaults = {
	title: null, // (required) Displayed name of the node (html is allowed here)
	key: null, // May be used with activate(), select(), find(), ...
	isFolder: false, // Use a folder icon. Also the node is expandable but not selectable.
	isLazy: false, // Call onLazyRead(), when the node is expanded for the first time to allow for delayed creation of children.
	tooltip: null, // Show this popup text.
	icon: null, // Use a custom image (filename relative to tree.options.imagePath). 'null' for default icon, 'false' for no icon.
	addClass: null, // Class name added to the node's span tag.
	noLink: false, // Use <span> instead of <a> tag for this node
	activate: false, // Initial active status.
	focus: false, // Initial focused status.
	expand: false, // Initial expanded status.
	select: false, // Initial selected status.
	hideCheckbox: false, // Suppress checkbox display for this node.
	unselectable: false, // Prevent selection.
//  disabled: false,
	// The following attributes are only valid if passed to some functions:
	children: null, // Array of child nodes.
	// NOTE: we can also add custom attributes here.
	// This may then also be used in the onActivate(), onSelect() or onLazyTree() callbacks.
	// ------------------------------------------------------------------------
	lastentry: undefined
};

/*******************************************************************************
 * Drag and drop support
 */
function _initDragAndDrop(tree) {
	var dnd = tree.options.dnd || null;
	// Register 'connectToDynatree' option with ui.draggable
	if(dnd && (dnd.onDragStart || dnd.onDrop)) {
		_registerDnd();
	}
	// Attach ui.draggable to this Dynatree instance
	if(dnd && dnd.onDragStart ) {
		tree.$tree.draggable({
			addClasses: false,
			appendTo: "body",
			containment: false,
			delay: 0,
			distance: 4,
			revert: false,
			// Delegate draggable.start, drag, and stop events to our handler
			connectToDynatree: true,
			// Let source tree create the helper element
			helper: function(event) {
				var sourceNode = getDtNodeFromElement(event.target);
                if (sourceNode)
                    return sourceNode.tree._onDragEvent("helper", sourceNode, null, event, null, null);
                return null;
			},
			_last: null
		});
	}
	// Attach ui.droppable to this Dynatree instance
	if(dnd && dnd.onDrop) {
		tree.$tree.droppable({
			addClasses: false,
			tolerance: "intersect",
			greedy: false,
			_last: null
		});
	}
}

//--- Extend ui.draggable event handling --------------------------------------
var didRegisterDnd = false;
var _registerDnd = function() {
	if(didRegisterDnd){
		return;
	}
	$.ui.plugin.add("draggable", "connectToDynatree", {
		start: function(event, ui) {
			var draggable = $(this).data("draggable");
			var sourceNode = ui.helper.data("dtSourceNode") || null;
//			logMsg("draggable-connectToDynatree.start, %s", sourceNode);
//			logMsg("    this: %o", this);
//			logMsg("    event: %o", event);
//			logMsg("    draggable: %o", draggable);
//			logMsg("    ui: %o", ui);
			if(sourceNode) {
				// Adjust helper offset, so cursor is slightly outside top/left corner
//				draggable.offset.click.top -= event.target.offsetTop;
//				draggable.offset.click.left -= event.target.offsetLeft;
				draggable.offset.click.top = -2;
				draggable.offset.click.left = + 16;
//				logMsg("    draggable.offset.click FIXED: %s/%s", draggable.offset.click.left, draggable.offset.click.top);
				// Trigger onDragStart event
				// TODO: when called as connectTo..., the return value is ignored(?)
				return sourceNode.tree._onDragEvent("start", sourceNode, null, event, ui, draggable);
			}
		},
		drag: function(event, ui) {
			var draggable = $(this).data("draggable");
			var sourceNode = ui.helper.data("dtSourceNode") || null;
			var prevTargetNode = ui.helper.data("dtTargetNode") || null;
			var targetNode = getDtNodeFromElement(event.target);
//			logMsg("getDtNodeFromElement(%o): %s", event.target, targetNode);
			if(event.target && !targetNode){
				// We got a drag event, but the targetNode could not be found
				// at the event location. This may happen, if the mouse
				// jumped over the drag helper, in which case we ignore it:
				var isHelper = $(event.target).closest("div.dynatree-drag-helper,#dynatree-drop-marker").length > 0;
				if(isHelper){
//					logMsg("Drag event over helper: ignored.");
					return;
				}
			}
//			logMsg("draggable-connectToDynatree.drag: targetNode(from event): %s, dtTargetNode: %s", targetNode, ui.helper.data("dtTargetNode"));
			ui.helper.data("dtTargetNode", targetNode);
			// Leaving a tree node
			if(prevTargetNode && prevTargetNode !== targetNode ) {
				prevTargetNode.tree._onDragEvent("leave", prevTargetNode, sourceNode, event, ui, draggable);
			}
			if(targetNode){
				if(!targetNode.tree.options.dnd.onDrop) {
					// not enabled as drop target
					noop(); // Keep JSLint happy
				} else if(targetNode === prevTargetNode) {
					// Moving over same node
					targetNode.tree._onDragEvent("over", targetNode, sourceNode, event, ui, draggable);
				}else{
					// Entering this node first time
					targetNode.tree._onDragEvent("enter", targetNode, sourceNode, event, ui, draggable);
				}
			}
			// else go ahead with standard event handling
		},
		stop: function(event, ui) {
			var draggable = $(this).data("draggable");
			var sourceNode = ui.helper.data("dtSourceNode") || null;
			var targetNode = ui.helper.data("dtTargetNode") || null;
//			logMsg("draggable-connectToDynatree.stop: targetNode(from event): %s, dtTargetNode: %s", targetNode, ui.helper.data("dtTargetNode"));
//			logMsg("draggable-connectToDynatree.stop, %s", sourceNode);
			var mouseDownEvent = draggable._mouseDownEvent;
			var eventType = event.type;
//			logMsg("    type: %o, downEvent: %o, upEvent: %o", eventType, mouseDownEvent, event);
//			logMsg("    targetNode: %o", targetNode);
			var dropped = (eventType == "mouseup" && event.which == 1);
			if(!dropped){
				logMsg("Drag was cancelled");
			}
			if(targetNode) {
				if(dropped){
					targetNode.tree._onDragEvent("drop", targetNode, sourceNode, event, ui, draggable);
				}
				targetNode.tree._onDragEvent("leave", targetNode, sourceNode, event, ui, draggable);
			}
			if(sourceNode){
				sourceNode.tree._onDragEvent("stop", sourceNode, null, event, ui, draggable);
			}
		}
	});
	didRegisterDnd = true;
};

// ---------------------------------------------------------------------------
})(jQuery);
;
// jQuery Context Menu Plugin
//
// Version 1.01
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
//
// More info: http://abeautifulsite.net/2008/09/jquery-context-menu-plugin/
//
// Terms of Use
//
// This plugin is dual-licensed under the GNU General Public License
//   and the MIT License and is copyright A Beautiful Site, LLC.
//
if(jQuery)( function() {
	$.extend($.fn, {
		
		contextMenu: function(o, callback) {
			// Defaults
			if( o.menu == undefined ) return false;
			if( o.inSpeed == undefined ) o.inSpeed = 150;
			if( o.outSpeed == undefined ) o.outSpeed = 75;
			// 0 needs to be -1 for expected results (no fade)
			if( o.inSpeed == 0 ) o.inSpeed = -1;
			if( o.outSpeed == 0 ) o.outSpeed = -1;
			// Loop each context menu
			$(this).each( function() {
				var el = $(this);
				var offset = $(el).offset();
				// Add contextMenu class
				$('#' + o.menu).addClass('contextMenu');
				// Simulate a true right click
				$(this).mousedown( function(e) {
					var evt = e;
                    if( evt.button == 2 ) {
                        evt.stopPropagation();
                        $(this).mouseup( function(e) {
                            e.stopPropagation();
                            var srcElement = $(this);
                            $(this).unbind('mouseup');
							// Hide context menus that may be showing
							$(".contextMenu").hide();
							// Get this context menu
							var menu = $('#' + o.menu);
							
							if( $(el).hasClass('disabled') ) return false;
							
							// Detect mouse position
							var d = {}, x, y;
							if( self.innerHeight ) {
								d.pageYOffset = self.pageYOffset;
								d.pageXOffset = self.pageXOffset;
								d.innerHeight = self.innerHeight;
								d.innerWidth = self.innerWidth;
							} else if( document.documentElement &&
								document.documentElement.clientHeight ) {
								d.pageYOffset = document.documentElement.scrollTop;
								d.pageXOffset = document.documentElement.scrollLeft;
								d.innerHeight = document.documentElement.clientHeight;
								d.innerWidth = document.documentElement.clientWidth;
							} else if( document.body ) {
								d.pageYOffset = document.body.scrollTop;
								d.pageXOffset = document.body.scrollLeft;
								d.innerHeight = document.body.clientHeight;
								d.innerWidth = document.body.clientWidth;
							}
							(e.pageX) ? x = e.pageX : x = e.clientX + d.scrollLeft;
							(e.pageY) ? y = e.pageY : y = e.clientY + d.scrollTop;
							
							// Show the menu
							$(document).unbind('click');
							$(menu).css({ top: y, left: x }).fadeIn(o.inSpeed);
							// Hover events
							$(menu).find('A').mouseover( function() {
								$(menu).find('LI.hover').removeClass('hover');
								$(this).parent().addClass('hover');
							}).mouseout( function() {
								$(menu).find('LI.hover').removeClass('hover');
							});
							
							// Keyboard
							$(document).keypress( function(e) {
								switch( e.keyCode ) {
									case 38: // up
										if( $(menu).find('LI.hover').size() == 0 ) {
											$(menu).find('LI:last').addClass('hover');
										} else {
											$(menu).find('LI.hover').removeClass('hover').prevAll('LI:not(.disabled)').eq(0).addClass('hover');
											if( $(menu).find('LI.hover').size() == 0 ) $(menu).find('LI:last').addClass('hover');
										}
									break;
									case 40: // down
										if( $(menu).find('LI.hover').size() == 0 ) {
											$(menu).find('LI:first').addClass('hover');
										} else {
											$(menu).find('LI.hover').removeClass('hover').nextAll('LI:not(.disabled)').eq(0).addClass('hover');
											if( $(menu).find('LI.hover').size() == 0 ) $(menu).find('LI:first').addClass('hover');
										}
									break;
									case 13: // enter
										$(menu).find('LI.hover A').trigger('click');
									break;
									case 27: // esc
										$(document).trigger('click');
									break
								}
							});
							
							// When items are selected
							$('#' + o.menu).find('A').unbind('click');
							$('#' + o.menu).find('LI:not(.disabled) A').click( function() {
								$(document).unbind('click').unbind('keypress');
								$(".contextMenu").hide();
								// Callback
								if( callback ) callback( $(this).attr('href').substr(1), $(srcElement), {x: x - offset.left, y: y - offset.top, docX: x, docY: y} );
								return false;
							});
							
							// Hide bindings
							setTimeout( function() { // Delay for Mozilla
								$(document).click( function() {
									$(document).unbind('click').unbind('keypress');
									$(menu).fadeOut(o.outSpeed);
									return false;
								});
							}, 0);
                        });
                    }
				});
				
				// Disable text selection
				if( $.browser.mozilla ) {
					$('#' + o.menu).each( function() { $(this).css({ 'MozUserSelect' : 'none' }); });
				} else if( $.browser.msie ) {
					$('#' + o.menu).each( function() { $(this).bind('selectstart.disableTextSelect', function() { return false; }); });
				} else {
					$('#' + o.menu).each(function() { $(this).bind('mousedown.disableTextSelect', function() { return false; }); });
				}
				// Disable browser context menu (requires both selectors to work in IE/Safari + FF/Chrome)
				$(el).add($('UL.contextMenu')).bind('contextmenu', function() { return false; });
				
			});
			return $(this);
		},
		
		// Disable context menu items on the fly
		disableContextMenuItems: function(o) {
			if( o == undefined ) {
				// Disable all
				$(this).find('LI').addClass('disabled');
				return( $(this) );
			}
			$(this).each( function() {
				if( o != undefined ) {
					var d = o.split(',');
					for( var i = 0; i < d.length; i++ ) {
						$(this).find('A[href="' + d[i] + '"]').parent().addClass('disabled');
						
					}
				}
			});
			return( $(this) );
		},
		
		// Enable context menu items on the fly
		enableContextMenuItems: function(o) {
			if( o == undefined ) {
				// Enable all
				$(this).find('LI.disabled').removeClass('disabled');
				return( $(this) );
			}
			$(this).each( function() {
				if( o != undefined ) {
					var d = o.split(',');
					for( var i = 0; i < d.length; i++ ) {
						$(this).find('A[href="' + d[i] + '"]').parent().removeClass('disabled');
						
					}
				}
			});
			return( $(this) );
		},
		
		// Disable context menu(s)
		disableContextMenu: function() {
			$(this).each( function() {
				$(this).addClass('disabled');
			});
			return( $(this) );
		},
		
		// Enable context menu(s)
		enableContextMenu: function() {
			$(this).each( function() {
				$(this).removeClass('disabled');
			});
			return( $(this) );
		},
		
		// Destroy context menu(s)
		destroyContextMenu: function() {
			// Destroy specified context menus
			$(this).each( function() {
				// Disable action
				$(this).unbind('mousedown').unbind('mouseup');
			});
			return( $(this) );
		}
		
	});
})(jQuery);
;
/*
 * jQuery AjaxQ - AJAX request queueing for jQuery
 *
 * Version: 0.0.1
 * Date: July 22, 2008
 *
 * Copyright (c) 2008 Oleg Podolsky (oleg.podolsky@gmail.com)
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 *
 * http://plugins.jquery.com/project/ajaxq
 * http://code.google.com/p/jquery-ajaxq/
 */

jQuery.ajaxq = function (queue, options)
{
	// Initialize storage for request queues if it's not initialized yet
	if (typeof document.ajaxq == "undefined") document.ajaxq = {q:{}, r:null};

	// Initialize current queue if it's not initialized yet
	if (typeof document.ajaxq.q[queue] == "undefined") document.ajaxq.q[queue] = [];
	
	if (typeof options != "undefined") // Request settings are given, enqueue the new request
	{
		// Copy the original options, because options.complete is going to be overridden

		var optionsCopy = {};
		for (var o in options) optionsCopy[o] = options[o];
		options = optionsCopy;
		
		// Override the original callback

		var originalCompleteCallback = options.complete;

		options.complete = function (request, status)
		{
			// Dequeue the current request
			document.ajaxq.q[queue].shift ();
			document.ajaxq.r = null;
			
			// Run the original callback
			if (originalCompleteCallback) originalCompleteCallback (request, status);

			// Run the next request from the queue
			if (document.ajaxq.q[queue].length > 0) document.ajaxq.r = jQuery.ajax (document.ajaxq.q[queue][0]);
		};

		// Enqueue the request
		document.ajaxq.q[queue].push (options);

		// Also, if no request is currently running, start it
		if (document.ajaxq.q[queue].length == 1) document.ajaxq.r = jQuery.ajax (options);
	}
	else // No request settings are given, stop current request and clear the queue
	{
		if (document.ajaxq.r)
		{
			document.ajaxq.r.abort ();
			document.ajaxq.r = null;
		}

		document.ajaxq.q[queue] = [];
	}
};
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_edit-version"]=a(function(a,b,c,d,e){function m(a,b){var d="",e;d+='\n    <b>[Editing version]</b>\n    <a href="javascript:" class="set-default simple-button ',e=a.IS_DEV,e=c["if"].call(a,e,{hash:{},inverse:i.program(4,o,b),fn:i.program(2,n,b)});if(e||e===0)d+=e;d+=' action-gradient">\n      ',e=a.IS_DEV,e=c["if"].call(a,e,{hash:{},inverse:i.program(8,q,b),fn:i.program(6,p,b)});if(e||e===0)d+=e;return d+="\n    </a>\n  ",d}function n(a,b){return"green"}function o(a,b){return"orange"}function p(a,b){return"\n        Commit local changes\n      "}function q(a,b){return"\n        Publish to website\n      "}function r(a,b){return"<b>[Currently live version]</b>"}function s(a,b){return"disabled"}function t(a,b){return"disabled"}c=c||a.helpers;var f="",g,h,i=this,j="function",k=this.escapeExpression,l=c.blockHelperMissing;f+='<div style="padding-bottom: 5px; font-size: 120%;">\n  <b><a href="/?version=',h=c.number,h?g=h.call(b,{hash:{}}):(g=b.number,g=typeof g===j?g():g),f+=k(g)+'">Version #',h=c.number,h?g=h.call(b,{hash:{}}):(g=b.number,g=typeof g===j?g():g),f+=k(g)+"</a>:</b>\n  ",h=c.edit,h?g=h.call(b,{hash:{},inverse:i.noop,fn:i.program(1,m,e)}):(g=b.edit,g=typeof g===j?g():g),c.edit||(g=l.call(b,g,{hash:{},inverse:i.noop,fn:i.program(1,m,e)}));if(g||g===0)f+=g;f+="\n  ",h=c["default"],h?g=h.call(b,{hash:{},inverse:i.noop,fn:i.program(10,r,e)}):(g=b["default"],g=typeof g===j?g():g),c["default"]||(g=l.call(b,g,{hash:{},inverse:i.noop,fn:i.program(10,r,e)}));if(g||g===0)f+=g;f+='\n  <div id="topictree-queue-progress-wrapper"><div id="topictree-queue-progress-bar"></div><div id="topictree-queue-progress-text"></div></div>\n  <a href="/api/v1/topicversion/edit/topictree" class="simple-button green action-gradient">Export to file</a>\n  <a href="javascript:" class="show-versions simple-button green action-gradient">View all versions</a>\n</div>\n<div>\n  <b>Title:</b> <input type="text" name="title" value="',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===j?g():g),f+=k(g)+'" ',g=b.edit,g=c.unless.call(b,g,{hash:{},inverse:i.noop,fn:i.program(12,s,e)});if(g||g===0)f+=g;f+='></input>\n  <b>Description:</b> <input type="text" name="description" value="',h=c.description,h?g=h.call(b,{hash:{}}):(g=b.description,g=typeof g===j?g():g),f+=k(g)+'" ',g=b.edit,g=c.unless.call(b,g,{hash:{},inverse:i.noop,fn:i.program(14,t,e)});if(g||g===0)f+=g;return f+="></input>\n  <b>Created:</b> ",h=c.created_on,h?g=h.call(b,{hash:{}}):(g=b.created_on,g=typeof g===j?g():g),f+=k(g)+"\n  <b>Updated:</b> ",h=c.updated_on,h?g=h.call(b,{hash:{}}):(g=b.updated_on,g=typeof g===j?g():g),f+=k(g)+" by ",h=c.last_edited_by,h?g=h.call(b,{hash:{}}):(g=b.last_edited_by,g=typeof g===j?g():g),f+=k(g)+"\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_edit-topic"]=a(function(a,b,c,d,e){function k(a,b){return'\n          <td colspan="2">Changes are saved to the <strong>editing version</strong> of the site when you click the Save button above.</td>\n        '}function l(a,b){return'\n          <td colspan="2">Changes cannot be made to this version. Only the editing version can be changed.</td>\n        '}function m(a,b){return"checked"}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<div>\n  <img src="/images/leaf.png" width="49" height="43" style="vertical-align: middle">\n  <input type="text" name="title" class="node-title simple-input ui-corner-all blur-on-esc" value="',g=b.model,g=g==null||g===!1?g:g.title,g=typeof g===h?g():g,f+=i(g)+'">\n  <a href="javascript:" data-id="save" class="save-button item-action simple-button disabled action-gradient">Save</a>\n</div>\n\n<div>\n  <a href="javascript:" data-id="add_new_topic" class="item-action left-align simple-button blue action-gradient">Add subtopic</a>\n\n  <a href="javascript:" data-id="add_new_video" class="item-action left-align separated simple-button blue action-gradient">Add new video</a>\n  <a href="javascript:" data-id="add_existing_video" class="item-action left-align simple-button blue action-gradient">Add existing video</a>\n\n  <a href="javascript:" data-id="add_new_exercise" class="item-action left-align separated simple-button blue action-gradient">Add new exercise</a>\n  <a href="javascript:" data-id="add_existing_exercise" class="item-action left-align simple-button blue action-gradient">Add existing exercise</a>\n\n  <a href="javascript:" data-id="add_new_url" class="item-action left-align separated simple-button blue action-gradient">Add new URL</a>\n\n  <a href="javascript:" data-id="delete_topic" class="item-action left-align separated simple-button blue action-gradient">Delete topic</a>\n  <a href="javascript:" data-id="ungroup_topic" class="item-action left-align separated simple-button blue action-gradient">Ungroup topic</a>\n</div>\n<div style="clear: both" />\n\n<div style="padding: 9px 23px;">\n  <div>\n    <table class="node-properties">\n\n      <tr>\n        ',g=b.version,g=g==null||g===!1?g:g.edit,g=c["if"].call(b,g,{hash:{},inverse:j.program(3,l,e),fn:j.program(1,k,e)});if(g||g===0)f+=g;f+='\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">View</td>\n        <td style="padding-bottom:9px;">\n          <a href="',g=b.model,g=g==null||g===!1?g:g.ka_url,g=typeof g===h?g():g,f+=i(g)+'" target="_blank">Open ',g=b.model,g=g==null||g===!1?g:g.title,g=typeof g===h?g():g,f+=i(g)+' in new tab</a>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Standalone Title</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="standalone_title" value="',g=b.model,g=g==null||g===!1?g:g.standalone_title,g=typeof g===h?g():g,f+=i(g)+'" maxlength="128"/><br/>\n          <em>Title that is displayed when this topic is displayed on its own, not in the context of the topic tree.</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Slug</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="id" value="',g=b.model,g=g==null||g===!1?g:g.id,g=typeof g===h?g():g,f+=i(g)+'" class="short" maxlength="32"/><br/>\n          <em>Short identifier used as a key for the API and in URLs linking to this topic</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Hidden</td>\n        <td style="padding-bottom:9px;">\n          <input type="checkbox" name="hide" ',g=b.model,g=g==null||g===!1?g:g.hide,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(5,m,e)});if(g||g===0)f+=g;return f+=' /><br/>\n          <em>If checked, this topic will not be visible on the site.</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Description</td>\n        <td style="padding-bottom:9px;">\n          <textarea name="description" rows = 5 cols=60>',g=b.model,g=g==null||g===!1?g:g.description,g=typeof g===h?g():g,f+=i(g)+'</textarea><br/>\n          <em>Description text visible in topic listings</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Tags</td>\n        <td style="padding-bottom:9px;">\n          <div class="tags-list"></div>\n\n          <input class="add-tag" type="text" value="" maxlength="32" placeholder="- Add tag" class="placeholder short" /> \n          <a href="javascript:" data-id="add-tag" class="item-action simple-button action-gradient">Add</a>\n        </td>\n      </tr>\n\n    </table>\n  </div>\n</div>\n',f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_create-video"]=a(function(a,b,c,d,e){return c=c||a.helpers,'<div class="create-video modal fade hide">\n    <div class="modal-header">\n        <span class="title">Add video</span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n\n      <div>\n        <label for="youtube_id" style="font-weight: bold;">Youtube ID</label>\n        <input type="text" name="youtube_id" size="40" />\n      </div>\n\n      <div class="create-video-preview">\n        Enter a YouTube ID to look up a video.\n      </div>\n\n      <a class="ok-button simple-button disabled action-gradient" href="javascript:void(0)" style="float: right">Add video</a>\n\n    </div>\n</div>\n'})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_create-video-preview"]=a(function(a,b,c,d,e){function l(a,b){return"\n<div>\n  <em>Video already exists in library. A new reference will be created.</em>\n</div>\n"}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='<object id="idOVideo" name="idOVideo" width="400" height="240" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">\n    <param name="movie" value="http://www.youtube.com/v/',h=c.youtube_id,h?g=h.call(b,{hash:{}}):(g=b.youtube_id,g=typeof g===i?g():g),f+=j(g)+'&hl=en_US&fs=1&rel=0&hd=1&border=0&enablejsapi=1">\n    <param name="allowFullScreen" value="true">\n    <param name="allowScriptAccess" value="always">\n    <param name="wmode" value="transparent">\n    <embed id="idPlayer" name="idPlayer" wmode="transparent" src="http://www.youtube.com/v/',h=c.youtube_id,h?g=h.call(b,{hash:{}}):(g=b.youtube_id,g=typeof g===i?g():g),f+=j(g)+'&hl=en_US&fs=1&rel=0&hd=1&border=0&enablejsapi=1" type="application/x-shockwave-flash" allowScriptAccess="always" allowfullscreen="true" width="400" height="240">\n</object>\n\n',g=b.existing,g=c["if"].call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;return f+="\n\n<div>\n  <b>Title:</b> ",h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===i?g():g),f+=j(g)+"\n</div>\n\n<div>\n  <b>Slug:</b> ",h=c.readable_id,h?g=h.call(b,{hash:{}}):(g=b.readable_id,g=typeof g===i?g():g),f+=j(g)+"\n</div>\n\n<div>\n  <b>Description:</b> ",h=c.description,h?g=h.call(b,{hash:{}}):(g=b.description,g=typeof g===i?g():g),f+=j(g)+"\n</div>\n\n<div>\n  <b>Keywords:</b> ",h=c.keywords,h?g=h.call(b,{hash:{}}):(g=b.keywords,g=typeof g===i?g():g),f+=j(g)+"\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_edit-video"]=a(function(a,b,c,d,e){function k(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.title,d=typeof d===h?d():d,c+=i(d)+'" maxlength="32"/></span><br/>',c}function l(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.readable_id,d=typeof d===h?d():d,c+=i(d)+'" maxlength="64"/></span><br/>',c}function m(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.youtube_id,d=typeof d===h?d():d,c+=i(d)+'" maxlength="11" class="short"/></span><br/>',c}function n(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.description,d=typeof d===h?d():d,c+=i(d)+'" maxlength="256"/></span><br/>',c}function o(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.keywords,d=typeof d===h?d():d,c+=i(d)+'" maxlength="256"/></span><br/>',c}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<div>\n  <img src="/images/video-camera-icon-shadow.png" width="48" height="48" style="vertical-align: middle">\n  <input type="text" name="title" class="node-title simple-input ui-corner-all blur-on-esc" value="',g=b.model,g=g==null||g===!1?g:g.title,g=typeof g===h?g():g,f+=i(g)+'">\n  <a href="javascript:" data-id="save" class="save-button item-action simple-button disabled action-gradient">Save</a>\n</div>\n\n',g=b.oldValues,g=g==null||g===!1?g:g.title,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(1,k,e)});if(g||g===0)f+=g;f+='\n    \n<div>\n  <a href="javascript:" data-id="remove_item" class="item-action left-align simple-button blue action-gradient">Remove from topic</a>\n</div>\n<div style="clear: both" />\n\n<div style="padding: 9px 23px;">\n  <div>\n    <table class="node-properties">\n\n      <tr>\n        <td colspan="2">Changes are saved to the <strong>editing version</strong> of the site when you click the Save button above.</td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">View</td>\n        <td style="padding-bottom:9px;">\n          <a href="',g=b.model,g=g==null||g===!1?g:g.ka_url,g=typeof g===h?g():g,f+=i(g)+'" target="_blank">Open ',g=b.model,g=g==null||g===!1?g:g.title,g=typeof g===h?g():g,f+=i(g)+' in new tab</a>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Slug</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="readable_id" value="',g=b.model,g=g==null||g===!1?g:g.readable_id,g=typeof g===h?g():g,f+=i(g)+'" maxlength="64"/><br/>\n          ',g=b.oldValues,g=g==null||g===!1?g:g.readable_id,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(3,l,e)});if(g||g===0)f+=g;f+='\n          <em>Short identifier used as a key for the API and in URLs linking to this video</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">YouTube ID</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="youtube_id" value="',g=b.model,g=g==null||g===!1?g:g.youtube_id,g=typeof g===h?g():g,f+=i(g)+'" maxlength="11" class="short" /><br/>\n          ',g=b.oldValues,g=g==null||g===!1?g:g.youtube_id,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(5,m,e)});if(g||g===0)f+=g;f+='\n          <em>ID of this video on YouTube</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Description</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="description" value="',g=b.model,g=g==null||g===!1?g:g.description,g=typeof g===h?g():g,f+=i(g)+'" maxlength="256"/><br/>\n          ',g=b.oldValues,g=g==null||g===!1?g:g.description,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(7,n,e)});if(g||g===0)f+=g;f+='\n          <em>Description text visible in topic listings</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Keywords</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="keywords" value="',g=b.model,g=g==null||g===!1?g:g.keywords,g=typeof g===h?g():g,f+=i(g)+'" maxlength="256"/><br/>\n          ',g=b.oldValues,g=g==null||g===!1?g:g.keywords,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(9,o,e)});if(g||g===0)f+=g;return f+="\n          <em>Terms to include when indexing this video for searching</em>\n        </td>\n      </tr>\n\n    </table>\n  </div>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_create-exercise"]=a(function(a,b,c,d,e){return c=c||a.helpers,'<div class="create-exercise modal fade hide">\n    <div class="modal-header">\n        <span class="title">Add exercise</span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n\n      <div>\n        <label for="name" style="font-weight: bold;">Name (file name without .html)</label>\n        <input type="text" name="name" size="40" />\n      </div>\n\n      <a class="ok-button simple-button green action-gradient" href="javascript:void(0)" style="float: right">Add exercise</a>\n\n    </div>\n</div>\n'})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_edit-exercise"]=a(function(a,b,c,d,e){function k(a,b){return'checked="checked"'}function l(a,b){return'checked="checked"'}function m(a,b){var d="",e;d+='<span class="old-value">Old value: <input type="text" disabled value="',e=a.oldValues,e=e==null||e===!1?e:e.live,e=c["if"].call(a,e,{hash:{},inverse:h.program(8,o,b),fn:h.program(6,n,b)});if(e||e===0)d+=e;return d+='"/></span><br/>',d}function n(a,b){return"Live"}function o(a,b){return"Developers Only"}function p(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.short_display_name,d=typeof d===i?d():d,c+=j(d)+'" maxlength="11"/></span><br/>',c}function q(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.v_position,d=typeof d===i?d():d,c+=j(d)+'" class="short"/></span><br/>',c}function r(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.h_position,d=typeof d===i?d():d,c+=j(d)+'" class="short"/></span><br/>',c}function s(a,b){var d="",e;d+="\n                    ",e=a.oldValues,e=e==null||e===!1?e:e.prerequisites,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.program(17,t,b)});if(e||e===0)d+=e;return d+="\n                  ",d}function t(a,b){var c="";return c+='\n                      <span class="old-value">Old value: <input type="text" disabled value="',a=typeof a===i?a():a,c+=j(a)+'" maxlength="256"/></span><br/>\n                    ',c}function u(a,b){var d="",e;d+="\n                    ",e=a.oldValues,e=e==null||e===!1?e:e.covers,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.program(20,v,b)});if(e||e===0)d+=e;return d+="\n                  ",d}function v(a,b){var c="";return c+='\n                      <span class="old-value">Old value: <input type="text" disabled value="',a=typeof a===i?a():a,c+=j(a)+'" maxlength="256"/></span><br/>\n                    ',c}function w(a,b){var d="",e;d+="\n                    ",e=a.oldValues,e=e==null||e===!1?e:e.related_video_readable_ids,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.program(23,x,b)});if(e||e===0)d+=e;return d+="\n                  ",d}function x(a,b){var c="";return c+='\n                      <span class="old-value">Old value: <input type="text" disabled value="',a=typeof a===i?a():a,c+=j(a)+'" maxlength="256"/></span><br/>\n                    ',c}function y(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.description,d=typeof d===i?d():d,c+=j(d)+'" maxlength="256"/></span><br/>',c}function z(a,b){var d="",e;d+="\n                    ",e=a.oldValues,e=e==null||e===!1?e:e.tags,e=c.each.call(a,e,{hash:{},inverse:h.noop,fn:h.program(28,A,b)});if(e||e===0)d+=e;return d+="\n                  ",d}function A(a,b){var c="";return c+='\n                      <span class="old-value">Old value: <input type="text" disabled value="',a=typeof a===i?a():a,c+=j(a)+'" maxlength="256"/></span><br/>\n                    ',c}c=c||a.helpers;var f="",g,h=this,i="function",j=this.escapeExpression;f+='<div>\n  <img src="/images/generic-exercise-icon-shadow.png" width="48" height="48" style="vertical-align: middle">\n  <span class="node-title">',g=b.model,g=g==null||g===!1?g:g.display_name,g=typeof g===i?g():g,f+=j(g)+'</span>\n  <a href="javascript:" data-id="save" class="save-button item-action simple-button disabled action-gradient">Save</a>\n</div>\n\n<div>\n  <a href="javascript:" data-id="remove_item" class="item-action left-align simple-button blue action-gradient">Remove from topic</a>\n</div>\n<div style="clear: both" />\n\n<div style="padding: 9px 23px;">\n    <div>\n        <table class="node-properties">\n\n          <tr>\n            <td colspan="2">Changes are saved to the <strong>editing version</strong> of the site when you click the Save button above.</td>\n          </tr>\n\n            <tr>\n                <td style="font-weight:bold;">View</td>\n                <td style="padding-bottom:9px;">\n                    <a href="',g=b.model,g=g==null||g===!1?g:g.relative_url,g=typeof g===i?g():g,f+=j(g)+'" target="_blank">Open ',g=b.model,g=g==null||g===!1?g:g.display_name,g=typeof g===i?g():g,f+=j(g)+' in new tab</a>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Status</td>\n                <td style="padding-bottom:9px;">\n                    <label for="live_yes">Live&nbsp;</label><input type="radio" id="live_yes" name="live" value="true" ',g=b.model,g=g==null||g===!1?g:g.live,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(1,k,e)});if(g||g===0)f+=g;f+='/>\n                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                    <label for="live_no">Developers only&nbsp;</label><input type="radio" id="live_no" name="live" value="false" ',g=b.model,g=g==null||g===!1?g:g.live,g=c.unless.call(b,g,{hash:{},inverse:h.noop,fn:h.program(3,l,e)});if(g||g===0)f+=g;f+="/>\n                    <br/>\n                    ",g=b.oldValues,g=g==null||g===!1?g:g.live,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(5,m,e)});if(g||g===0)f+=g;f+='\n                    <em>Non-live exercises are completely hidden from normal users.</em>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Short name</td>\n                <td style="padding-bottom:9px;">\n                    <input type="text" name="short_display_name" value="',g=b.model,g=g==null||g===!1?g:g.short_display_name,g=typeof g===i?g():g,f+=j(g)+'" maxlength="11"/><br/>\n                    ',g=b.oldValues,g=g==null||g===!1?g:g.short_display_name,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(10,p,e)});if(g||g===0)f+=g;f+='\n                    <em>Short name is used in some UI elements that are too small to display the full exercise name (11 chars max).</em>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Horizontal position</td>\n                <td style="padding-bottom:9px;">\n                    <input type="text" name="v_position" value="',g=b.model,g=g==null||g===!1?g:g.v_position,g=typeof g===i?g():g,f+=j(g)+'" class="short" /></br>\n                    ',g=b.oldValues,g=g==null||g===!1?g:g.v_position,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(12,q,e)});if(g||g===0)f+=g;f+='\n                    <em>Bigger numbers move this exercise to the right on the knowledge map.</em>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Vertical position</td>\n                <td style="padding-bottom:9px;">\n                    <input type="text" name="h_position" value="',g=b.model,g=g==null||g===!1?g:g.h_position,g=typeof g===i?g():g,f+=j(g)+'" class="short" /></br>\n                    ',g=b.oldValues,g=g==null||g===!1?g:g.h_position,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(14,r,e)});if(g||g===0)f+=g;f+='\n                    <em>Bigger numbers move this exercise down the knowledge map.</em>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Prerequisites</td>\n                <td style="padding-bottom:9px;">\n                    <div class="exercise-prereqs-list"></div>\n\n                    <a href="javascript:" data-id="add-prereq" class="item-action simple-button action-gradient">Add prerequisite exercise</a>\n                    <br/>\n\n                    <em>This exercise will be suggested once these prereqs are completed.</em><br/>\n                  ',g=b.oldValues,g=g==null||g===!1?g:g.prerequisites,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(16,s,e)});if(g||g===0)f+=g;f+='\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Covered exercises</td>\n                <td style="padding-bottom:9px;">\n                    <div class="exercise-covers-list"></div>\n\n                    <a href="javascript:" data-id="add-cover" class="item-action simple-button action-gradient">Add a covered exercise</a>\n                    <br/>\n\n                    <em>Achieving proficiency in this exercise will give proficiency in all covered exercises.</em>\n                  ',g=b.oldValues,g=g==null||g===!1?g:g.covers,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(19,u,e)});if(g||g===0)f+=g;f+='\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Related Videos</td>\n                <td style="padding-bottom:9px;">\n                    <div class="exercise-videos-list"></div>\n\n                    <div><a href="javascript:" data-id="add-video" class="item-action simple-button action-gradient">Add a related video</a></div>\n\n                    <em>If the student is struggling on this exercise, we refer them to these related videos.</em>\n                  ',g=b.oldValues,g=g==null||g===!1?g:g.related_video_readable_ids,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(22,w,e)});if(g||g===0)f+=g;f+='\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Description</td>\n                <td style="padding-bottom:9px;">\n                <input type="text" name="description" value="',g=b.model,g=g==null||g===!1?g:g.description,g=typeof g===i?g():g,f+=j(g)+'" maxlength="256"/><br/>\n                ',g=b.oldValues,g=g==null||g===!1?g:g.description,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(25,y,e)});if(g||g===0)f+=g;f+='\n                <em>Description text visible in topic listings</em>\n                </td>\n            </tr>\n\n            <tr>\n                <td style="font-weight:bold;">Tags</td>\n                <td style="padding-bottom:9px;">\n                    <div class="tags-list"></div>\n\n                    <input class="add-tag" type="text" value="" maxlength="32" placeholder="- Add tag" class="placeholder short" /> \n                    <a href="javascript:" data-id="add-tag" class="item-action simple-button action-gradient">Add</a>\n                  ',g=b.oldValues,g=g==null||g===!1?g:g.tags,g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(27,z,e)});if(g||g===0)f+=g;return f+="\n                </td>\n            </tr>\n\n\n            </table>\n\n    </div>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_add-existing-item"]=a(function(a,b,c,d,e){return c=c||a.helpers,'<div class="add-existing-item modal fade hide">\n    <div class="modal-header">\n        <span class="title"></span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n        <a class="show-recent simple-button action-gradient" href="javascript:void(0)">Show Recent</a>\n        <input name="item-search" type="text" /> <a class="do-search simple-button action-gradient" href="javascript:void(0)">Search</a>\n<br />\n        <span class="search-description"></span> <br />\n        <select class="search-results" size="20"></select> <br />\n        <a class="ok-button simple-button green action-gradient" href="javascript:void(0)" style="float: right">Select</a>\n        <div style="clear: both"></div>\n    </div>\n</div>\n'})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_create-url"]=a(function(a,b,c,d,e){return c=c||a.helpers,'<div class="create-url modal fade hide">\n    <div class="modal-header">\n        <span class="title">Add external URL</span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n\n      <div>\n        <label for="title" style="font-weight: bold;">Title</label>\n        <input type="text" name="title" size="256" style="width: 300px;" />\n      </div>\n\n      <div>\n        <label for="url" style="font-weight: bold;">URL</label>\n        <input type="text" name="url" size="256" style="width: 500px;" />\n      </div>\n\n      <a class="ok-button simple-button green action-gradient" href="javascript:void(0)" style="float: right">Add URL</a>\n\n    </div>\n</div>\n'})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_edit-url"]=a(function(a,b,c,d,e){function k(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.title,d=typeof d===h?d():d,c+=i(d)+'" maxlength="32"/></span><br/>',c}function l(a,b){var c="",d;return c+='<span class="old-value">Old value: <input type="text" disabled value="',d=a.oldValues,d=d==null||d===!1?d:d.url,d=typeof d===h?d():d,c+=i(d)+'" maxlength="256"/></span><br/>',c}function m(a,b){var d="",e;d+="\n            ",e=a.oldValues,e=e==null||e===!1?e:e.tags,e=c.each.call(a,e,{hash:{},inverse:j.noop,fn:j.program(6,n,b)});if(e||e===0)d+=e;return d+="\n          ",d}function n(a,b){var c="";return c+='\n              <span class="old-value">Old value: <input type="text" disabled value="',a=typeof a===h?a():a,c+=i(a)+'" maxlength="256"/></span><br/>\n            ',c}c=c||a.helpers;var f="",g,h="function",i=this.escapeExpression,j=this;f+='<div>\n  <img src="/images/link-icon.png" width="75" height="64" style="vertical-align: middle">\n  <input type="text" name="title" class="node-title simple-input ui-corner-all blur-on-esc" value="',g=b.model,g=g==null||g===!1?g:g.title,g=typeof g===h?g():g,f+=i(g)+'">\n  <a href="javascript:" data-id="save" class="save-button item-action simple-button disabled action-gradient">Save</a>\n</div>\n\n',g=b.oldValues,g=g==null||g===!1?g:g.title,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(1,k,e)});if(g||g===0)f+=g;f+='\n\n<div>\n  <a href="javascript:" data-id="remove_item" class="item-action left-align simple-button blue action-gradient">Remove from topic</a>\n</div>\n<div style="clear: both" />\n\n<div style="padding: 9px 23px;">\n  <div>\n    <table class="node-properties">\n\n      <tr>\n        <td colspan="2">Changes are saved to the <b>live version</b> of the site when you click the Save button above.</td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">View</td>\n        <td style="padding-bottom:9px;">\n          <a href="',g=b.model,g=g==null||g===!1?g:g.url,g=typeof g===h?g():g,f+=i(g)+'" target="_blank">Open ',g=b.model,g=g==null||g===!1?g:g.title,g=typeof g===h?g():g,f+=i(g)+' in new tab</a>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">URL</td>\n        <td style="padding-bottom:9px;">\n          <input type="text" name="url" value="',g=b.model,g=g==null||g===!1?g:g.url,g=typeof g===h?g():g,f+=i(g)+'" maxlength="256"/><br/>\n          ',g=b.oldValues,g=g==null||g===!1?g:g.url,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(3,l,e)});if(g||g===0)f+=g;f+='\n          <em>URL to link to</em>\n        </td>\n      </tr>\n\n      <tr>\n        <td style="font-weight:bold;">Tags</td>\n        <td style="padding-bottom:9px;">\n          <div class="tags-list"></div>\n\n          <input class="add-tag" type="text" value="" maxlength="32" placeholder="- Add tag" class="placeholder short" /> \n          <a href="javascript:" data-id="add-tag" class="item-action simple-button action-gradient">Add</a>\n          <br/>\n\n          ',g=b.oldValues,g=g==null||g===!1?g:g.tags,g=c["if"].call(b,g,{hash:{},inverse:j.noop,fn:j.program(5,m,e)});if(g||g===0)f+=g;return f+="\n\n          <em>Terms to include when indexing this video for searching</em>\n        </td>\n      </tr>\n\n    </table>\n  </div>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_list-versions"]=a(function(a,b,c,d,e){return c=c||a.helpers,'<div class="list-versions modal fade hide">\n    <div class="modal-header">\n        <span class="title">View topic tree versions</span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n        <div class="version-list">\n            Loading...\n        </div>\n        <div style="clear: both"></div>\n    </div>\n</div>\n'})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_list-versions-item"]=a(function(a,b,c,d,e){function m(a,b){return"\n      <strong>[Editing version]</strong>\n    "}function n(a,b){return"<strong>[Currently live version]</strong>"}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this,l=c.blockHelperMissing;f+='<div>\n  <a href="javascript:" class="edit-version simple-button green action-gradient" style="float: right">View this version</a>\n  <div><strong>Version #',h=c.number,h?g=h.call(b,{hash:{}}):(g=b.number,g=typeof g===i?g():g),f+=j(g)+':</strong> "',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===i?g():g),f+=j(g)+'"\n    ',h=c.edit,h?g=h.call(b,{hash:{},inverse:k.noop,fn:k.program(1,m,e)}):(g=b.edit,g=typeof g===i?g():g),c.edit||(g=l.call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,m,e)}));if(g||g===0)f+=g;f+="\n    ",h=c["default"],h?g=h.call(b,{hash:{},inverse:k.noop,fn:k.program(3,n,e)}):(g=b["default"],g=typeof g===i?g():g),c["default"]||(g=l.call(b,g,{hash:{},inverse:k.noop,fn:k.program(3,n,e)}));if(g||g===0)f+=g;return f+='\n  </div>\n  <div style="margin-left: 20px;"><strong>Description:</strong> ',h=c.description,h?g=h.call(b,{hash:{}}):(g=b.description,g=typeof g===i?g():g),f+=j(g)+'</div>\n  <div style="margin-left: 20px;"><strong>Created:</strong> ',h=c.created_on,h?g=h.call(b,{hash:{}}):(g=b.created_on,g=typeof g===i?g():g),f+=j(g)+'</div>\n  <div style="margin-left: 20px;"><strong>Updated:</strong> ',h=c.updated_on,h?g=h.call(b,{hash:{}}):(g=b.updated_on,g=typeof g===i?g():g),f+=j(g)+" by ",h=c.last_edited_by,h?g=h.call(b,{hash:{}}):(g=b.last_edited_by,g=typeof g===i?g():g),f+=j(g)+"</div>\n</div>\n",f})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_search-topics"]=a(function(a,b,c,d,e){return c=c||a.helpers,'<div style="width: 500px" id="topic-search-bar">\n  <img class="search-button" src="/images/jquery-mobile/icon-search-black.png" width="16" height="16">\n  <div class="search-panel" style="display: none;">\n    <input value="" style="width: 150px; height: 14px; margin-top: 2px;"></input>\n    <img class="next-button" src="/images/vote-down-gray.png" width="18" height="13" style="float: right; margin-top: 5px;">\n    <img class="prev-button" src="/images/vote-up-gray.png" width="18" height="13" style="float: right; margin-top: 5px;">\n  </div>\n</div>\n'})})();
(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["topicsadmin-package_import-export"]=a(function(a,b,c,d,e){function i(a,b){return"Import topic into tree"}function j(a,b){return"Export topic"}function k(a,b){return"Paste exported topic data here:<br />"}function l(a,b){return"Import"}function m(a,b){return"Close"}c=c||a.helpers;var f="",g,h=this;f+='<div class="import-export modal fade hide">\n    <div class="modal-header">\n        <span class="title">',g=b["import"],g=c["if"].call(b,g,{hash:{},inverse:h.program(3,j,e),fn:h.program(1,i,e)});if(g||g===0)f+=g;f+='</span> <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n        ',g=b["import"],g=c["if"].call(b,g,{hash:{},inverse:h.noop,fn:h.program(5,k,e)});if(g||g===0)f+=g;f+='\n        <textarea class="topic-data" cols="80" rows="30" /><br />\n        <a class="ok-button simple-button green action-gradient" href="javascript:void(0)" style="float: right">',g=b["import"],g=c["if"].call(b,g,{hash:{},inverse:h.program(9,m,e),fn:h.program(7,l,e)});if(g||g===0)f+=g;return f+='</a>\n        <div style="clear: both"></div>\n    </div>\n</div>\n',f})})();
// Creates & handles events for the topic tree

var debugNodeIDs = false;

var TopicTreeEditor = {

    dynatree: null,
    topicTree: null,
    boundList: [],
    maxProgressLength: 0,
    currentVersion: null,
    versionEditTemplate: Templates.get("topicsadmin.edit-version"),
    searchView: null,

    currentEditor: null,
    itemCopyBuffer: null,

    createEditor: function(kind) {
        if (kind == "Topic") {
            return new TopicTreeEditor.TopicEditor();
        } else if (kind == "Video") {
            return new TopicTreeEditor.VideoEditor();
        } else if (kind == "Exercise") {
            return new TopicTreeEditor.ExerciseEditor();
        } else if (kind == "Url") {
            return new TopicTreeEditor.UrlEditor();
        }
        return null;
    },

    // Initialize the Dynatree view of the given TopicVersion's topic tree.
    init: function(version) {
        this.topicTree = version.getTopicTree();
        this.currentVersion = version;

        // Attach the dynatree widget to an existing <div id="tree"> element
        // and pass the tree options as an argument to the dynatree() function:
        $("#topic_tree").dynatree({
            imagePath: "/images/",

            onActivate: function(node) {
                KAConsole.log("Activated: ", node);

                if (TopicTreeEditor.currentEditor) {
                    TopicTreeEditor.currentEditor.hide();
                    TopicTreeEditor.currentEditor = null;
                }

                if (node.data.kind != "Topic" || node.data.id != "root") {
                    TopicTreeEditor.currentEditor = TopicTreeEditor.createEditor(node.data.kind);
                }

                if (TopicTreeEditor.currentEditor) {
                    TopicTreeEditor.currentEditor.init(node);
                    TopicTreeEditor.currentEditor.show();
                } else {
                    $("#details-view").html("");
                }
            },

            onCreate: function(node, span) {
                if (node.data.kind == "Topic") {
                    $(span).contextMenu({menu: "topic_context_menu"}, function(action, el, pos) {
                        TopicTreeEditor.topicTree.fetchByID(node.data.id, function() {
                            TopicTreeEditor.createEditor(node.data.kind)
                                .init(node)
                                .handleAction(action);
                        });
                    });
                }
                if (_.include(["Video", "Exercise", "Url"], node.data.kind)) {
                    if (node.parent.data.key == "ChangedContent") {
                        var menu_name = "content_change_context_menu"
                    } else {
                        var menu_name = "item_context_menu"
                    }
                    $(span).contextMenu({menu: menu_name}, function(action, el, pos) {
                        TopicTreeEditor.createEditor(node.data.kind)
                            .init(node)
                            .setParentModel(TopicTreeEditor.topicTree.get(node.parent.data.id))
                            .handleAction(action);
                    });
                }
            },

            onExpand: function(flag, node) {
                if (flag) {
                    node.activate();
                }
            },

            onLazyRead: function(node) {
                if (node.data.key == "UnrefContent") {
                    $.ajaxq("topics-admin", {
                        url: "/api/v1/topicversion/" + TopicTreeEditor.currentVersion.get("number") + "/unused_content",
                        success: function(json) {
                            node.removeChildren();

                            childNodes = [];
                            _.each(json, function(item) {
                                var childWrapper = new TopicChild(item);
                                childNodes.push(TopicTreeEditor.createChild(childWrapper));
                            });
                            node.addChild(childNodes);
                        },
                        error: TopicTreeEditor.handleError
                    });
                } else if (node.data.key == "ChangedContent") {
                    $.ajaxq("topics-admin", {
                        url: "/api/v1/topicversion/" + TopicTreeEditor.currentVersion.get("number") + "/changelist",
                        success: function(json) {
                            node.removeChildren();

                            childNodes = [];
                            _.each(json, function(item) {
                                var childWrapper = new TopicChild(item.content);

                                var oldValues = {};
                                _.each(item.content_changes, function(value, key) {
                                    if (_.isArray(item.content[key]) || _.isArray(value)) {
                                        if (item.content[key] && item.content[key].length > 0) {
                                            oldValues[key] = item.content[key];
                                        } else {
                                            oldValues[key] = ["(No old values)"];
                                        }
                                    } else {
                                        if (item.content[key]) {
                                            oldValues[key] = item.content[key];
                                        } else {
                                            oldValues[key] = "NULL";
                                        }
                                    }
                                });
                                childWrapper.model.oldValues = oldValues;
                                childWrapper.model.changeUser = item.last_edited_by;
                            
                                childNodes.push(TopicTreeEditor.createChild(childWrapper));
                            });
                            node.addChild(childNodes);
                        },
                        error: TopicTreeEditor.handleError
                    });
                } else {
                    TopicTreeEditor.topicTree.fetchByID(node.data.id, TopicTreeEditor.refreshTreeNode);
                }
            },

            dnd: {
                onDragStart: function(node) {
                    return TopicTreeEditor.currentVersion.get("edit");
                },

                onDragEnter: function(node, sourceNode) {
                    if (node.data.key == "UnrefContent" ||
                        node.parent.data.key == "UnrefContent" ||
                        node.data.key == "ChangedContent" ||
                        node.parent.data.key == "ChangedContent") {
                        return [];
                    }

                    if (node.data.kind != "Topic") {
                        return ["before", "after"];
                    }

                    return ["over", "before", "after"];
                },
                onDragLeave: function(node, sourceNode) {
                },
                onDragOver: function(node, sourceNode, hitMode) {
                },

                onDrop: function(node, sourceNode, hitMode, ui, draggable) {
                    var oldParent = sourceNode.parent;

                    sourceNode.move(node, hitMode);

                    var newParent = sourceNode.parent;

                    if (oldParent.data.key == "UnrefContent" ||
                        oldParent.data.key == "ChangedContent") {
                        TopicTreeEditor.addItemToTopic(sourceNode.data.kind, sourceNode.data.id, sourceNode.data.title, newParent, TopicTreeEditor.topicTree.get(newParent.data.id), _.indexOf(newParent.childList, sourceNode));
                    } else {
                        var data = {
                            kind: sourceNode.data.kind,
                            id: sourceNode.data.id,
                            new_parent_id: newParent.data.id,
                            new_parent_pos: _.indexOf(newParent.childList, sourceNode)
                        };
                        TopicTreeEditor.moveItem(oldParent.data.id, data);
                    }
                }
            },

            children: [
                {
                    title: "Loading...",
                    key: "Topic/root",
                    id: "root",
                    kind: "Topic",
                    isFolder: true,
                    isLazy: true,
                    icon: "topictree-icon-small.png"
                }, {
                    title: "Unreferenced Content",
                    key: "UnrefContent",
                    id: "",
                    kind: "",
                    isFolder: true,
                    isLazy: true,
                    icon: "topictree-icon-small.png"
                }, {
                    title: "Changed Content",
                    key: "ChangedContent",
                    id: "",
                    kind: "",
                    isFolder: true,
                    isLazy: true,
                    icon: "topictree-icon-small.png"
                }
            ]
        });
        TopicTreeEditor.dynatree = $("#topic_tree").dynatree("getTree");
        $("#topic_tree").bind("mousedown", function(e) { e.preventDefault(); });

        $("#details-view").html("");

        $("#topicversion-editor")
            //.html(TopicTreeEditor.versionEditTemplate(_.extend({IS_DEV:window.KA_IS_DEV}, version.toJSON())))
            .html(TopicTreeEditor.versionEditTemplate(_.extend({IS_DEV:false}, version.toJSON())))
            .delegate( "a.set-default", "click", TopicTreeEditor.setTreeDefault )
            .delegate( "a.show-versions", "click", TopicTreeEditor.showVersionList );

        $("#topicversion-editor").delegate("input[type=\"text\"]", "change", function() {
            if (TopicTreeEditor.currentVersion.get("edit")) {
                var field = $(this).attr("name");
                if (field) {
                    var value = $(this).val();

                    var attrs = {};
                    attrs[field] = value;

                    version.save(attrs);
                }
            }
        });

        $("#topictree-queue-progress-bar").progressbar({ value: 0, disable: true });
        $("#topictree-queue-progress-text").html("");

        if (!this.searchView) {
            this.searchView = new TopicTreeEditor.SearchView();
            $(this.searchView.el).appendTo(document.body);
        }

        var self = this;
        $(window).resize(function() { self.resize(); } );
        this.resize();

        // Get the data for the topic tree (may fire callbacks immediately)

        TopicTreeEditor.topicTree.bind("add", this.treeUpdate, TopicTreeEditor.topicTree);
        TopicTreeEditor.topicTree.bind("remove", this.treeUpdate, TopicTreeEditor.topicTree);
        TopicTreeEditor.topicTree.bind("clear", this.treeUpdate, TopicTreeEditor.topicTree);

        var root = TopicTreeEditor.topicTree.getRoot();
        root.bind("change", this.refreshTreeNode);
        if (root.__inited) {
            this.refreshTreeNode.call(null, root);
        }

        this.updateProgressBar();
    },

    updateProgressBar: function() {
        if (document.ajaxq && document.ajaxq.q["topics-admin"] &&
            document.ajaxq.q["topics-admin"].length > 0) {
            $("#topictree-queue-progress-bar").progressbar("enable");

            var remaining = document.ajaxq.q["topics-admin"].length;
            if (TopicTreeEditor.maxProgressLength < remaining) {
                TopicTreeEditor.maxProgressLength = remaining;
            }

            var progress_percentage = (1 - (remaining / TopicTreeEditor.maxProgressLength)) * 100;
            var progress = TopicTreeEditor.maxProgressLength - remaining + 1;

            $("#topictree-queue-progress-bar").progressbar("value", progress_percentage);
            $("#topictree-queue-progress-text").html("Updating (" + progress + " / " + TopicTreeEditor.maxProgressLength + ")");

        } else {
            if (TopicTreeEditor.maxProgressLength > 0) {
                $("#topictree-queue-progress-text").html("Done updating.");
                $("#topictree-queue-progress-bar").progressbar("value", 100);
                TopicTreeEditor.maxProgressLength = 0; // 1 second delay before we wipe the progress
            } else {
                $("#topictree-queue-progress-bar").progressbar({ value: 0, disable: true });
            }
        }

        setTimeout(TopicTreeEditor.updateProgressBar, 1000);
    },

    resize: function() {
        var containerHeight = $(window).height();
        var yTopPadding = $("#topic_tree").offset().top;
        var newHeight = containerHeight - (yTopPadding + 42);

        $("#topic_tree").height(newHeight);
        $("#details-view").height(newHeight);

        $(this.searchView.el).offset($("#topic_tree").offset());
    },

    createChild: function(child) {
        var iconTable = {
            Topic: "leaf-icon-small.png",
            Video: "video-camera-icon-full-small.png",
            Exercise: "exercise-icon-small.png",
            Url: "link-icon-small.png"
        };
        var data = {
            title: child.title,
            key:  child.kind + "/" + child.id,
            id: child.id,
            kind: child.kind,
            icon: iconTable[child.kind],
            oldValues: child.model ? child.model.oldValues : null
        };
        if (debugNodeIDs) {
            data.title += " [(" + child.id + ")]";
        }
        if (child.model && child.model.changeUser) {
            data.title += " (by " + child.model.changeUser + ")";
        }
        if (child.kind === "Topic") {
            data.isFolder = true;
            data.isLazy = true;
            if (child.hide) {
                data.addClass = "hidden-topic";
                data.title = child.title + " [Hidden]";
            }
        }
        data.original = child;
        return data;
    },

    refreshTreeNode: function(model) {
        node = TopicTreeEditor.dynatree.getNodeByKey(model.get("kind") + "/" + model.id);
        if (!node) {
            return;
        }

        var newData = model.toJSON();

        if (_.isEqual(newData, node.data.original)) {
            KAConsole.log("Model " + model.id + " has not changed. Not refreshing.");
            return;
        }

        KAConsole.log("Refreshing " + model.id);

        node.data = TopicTreeEditor.createChild(newData);
        node.render();

        // Update the parent so we don't unnecessarily refresh all the sibling nodes
        if (model.id != "root") {
            var parentOriginalChild = _.find(node.parent.data.original.children, function(child) {
                if (child.id == model.id)
                    return child;
                return null;
            });
            parentOriginalChild.title = model.get("title");
            parentOriginalChild.hide = model.get("hide");
        }

        node.removeChildren();
        if (model.get("children")) {
            childNodes = [];
            _.each(model.get("children"), function(child) {
                childNodes.push(TopicTreeEditor.createChild(child));
            });
            node.addChild(childNodes);
        }

        if (model.id == "root") {
            node.expand();
        }
    },

    handleChange: function(model, oldID) {
        var modelWrapper = new TopicChild(model);

        KAConsole.log("Model of type " + modelWrapper.kind + " changed ID: " + oldID + " -> " + model.id);

        TopicTreeEditor.topicTree.each(function(topic) {
            var found = false;
            var children = _.map(topic.get("children"), function(child) {
                if (child.kind == modelWrapper.kind && child.id == oldID) {
                    var new_child = {
                        id: model.id,
                        kind: modelWrapper.kind,
                        title: modelWrapper.title,
                        hide: child.hide
                    };

                    found = true;

                    return new_child;
                } else {
                    return child;
                }
            });
            if (found) {
                topic.set({children: children});
            }
        });
    },

    // Called with TopicTree as "this"
    treeUpdate: function() {
        this.each(function(childModel) {
            var found = false;
            _.each(TopicTreeEditor.boundList, function(childId) {
                if (childId == childModel.id) {
                    found = true;
                }
            });
            if (!found) {
                //KAConsole.log("Binding: " + childModel.id);
                childModel.bind("change", TopicTreeEditor.refreshTreeNode);
                TopicTreeEditor.boundList.push(childModel.id);
            }
        });
    },

    setTreeDefault: function() {
        var confirmationMessage = {
                buttons: [
                    { title: "Yes", action: TopicTreeEditor.doSetTreeDefault },
                    { title: "No", action: hideGenericMessageBox }
                ]};

        //if (window.KA_IS_DEV) {
        if (false) {
            // local edits are not as worrysome
            $.extend(confirmationMessage, {
                title: "Commit local topic tree?",
                message: "Clicking 'yes' here will only publish your changes locally. If you'd like to push your changes to the site, export this tree and import it on khanacademy.org.",
            });
        } else {
            // edits on appspot actually, you know, matter
            $.extend(confirmationMessage, {
                title: "Publish this Topic Tree?",
                message: "Marking this version of the topic tree default will publish all changes to the live version of the website. Are you sure?",
            });
        }
        popupGenericMessageBox(confirmationMessage);
    },

    doSetTreeDefault: function() {
        hideGenericMessageBox();
        popupGenericMessageBox({
            title: "Publishing topic tree",
            message: "Publishing topic tree. Please wait...",
            buttons: []
        });
        $.ajaxq("topics-admin", {
            url: "/api/v1/topicversion/edit/setdefault",
            success: function() {
                hideGenericMessageBox();
                popupGenericMessageBox({
                    title: "Topic tree publish begun",
                    message: "Topic tree publish is now in progress. This may take a few minutes...",
                    buttons: []
                });
                setTimeout(TopicTreeEditor.waitForTreeDefault, 15000);
            },
            error: TopicTreeEditor.handleError
        });
    },

    waitForTreeDefault: function() {
        $.ajax({
            url: "/api/v1/dev/task_message",
            success: function(message) {
                if (message != "Publish: finished successfully") {
                    hideGenericMessageBox();
                    popupGenericMessageBox({
                        title: "Topic tree publish begun",
                        message: "Topic tree publish is now in progress. This may take a few minutes...<br/>Current Status - " + message,
                        buttons: []
                    });
                    setTimeout(TopicTreeEditor.waitForTreeDefault, 15000);
                } else {
                    hideGenericMessageBox();
                    popupGenericMessageBox({
                        title: "Topic tree publish complete",
                        message: "Topic tree has been published to the live site. The page will now refresh.",
                        buttons: [
                            { title: "OK", action: function() { location.reload(true); } }
                        ]
                    });
                }
            },
            error: function() {
                setTimeout(TopicTreeEditor.waitForTreeDefault, 15000);
            }
        });
    },

    showVersionList: function() {
        TopicTreeEditor.versionListView = new TopicTreeEditor.VersionListView().show();
    },

    editVersion: function(versionNumber) {
        if (TopicTreeEditor.versionListView) {
            TopicTreeEditor.versionListView.hide();
        }

        version = getTopicVersionList().get(versionNumber);
        if (version) {
            version.getTopicTree().reset();
            TopicTreeEditor.init(version);
        }
    },

    handleError: function(xhr, queryObject) {
        popupGenericMessageBox({
            title: "Server error",
            message: "There has been a server error:<br /><span style=\"color: #900;\">" + (queryObject.responseText? queryObject.responseText : xhr.responseText) + "</span><br />The topic tree will now refresh.",
            buttons: [
                { title: "OK", action: function() { hideGenericMessageBox(); TopicTreeEditor.editVersion(TopicTreeEditor.currentVersion.get("number")); } }
            ]
        });
    },

    addItemToTopic: function(kind, id, title, parent_node, parent_model, parent_pos) {

        if (parent_pos < 0) {
            parent_pos = parent_model.get("children").length;
        }

        KAConsole.log("Adding " + kind + " " + id + " to Topic " + parent_model.get("title"));

        var newChild = {
            kind: kind,
            id: id,
            title: title
        };
        children = parent_model.get("children").slice(0);
        children.splice(parent_pos, 0, newChild);
        parent_model.set({ children: children });

        parent_node.reloadChildren();
        parent_node.getChildren()[parent_pos].activate();

        var data = {
            kind: kind,
            id: id,
            pos: parent_pos
        };
        $.ajaxq("topics-admin", {
            url: "/api/v1/topicversion/edit/topic/" + parent_model.id + "/addchild",
            type: "POST",
            data: data,
            success: function(json) {
                KAConsole.log("Added item successfully.");
            },
            error: TopicTreeEditor.handleError
        });
    },

    moveItem: function(oldParentID, moveData) {
        // Apply the change to the model data first
        var old_parent = TopicTreeEditor.topicTree.get(oldParentID)
        var child = old_parent.removeChild(moveData.kind, moveData.id);
        TopicTreeEditor.refreshTreeNode(old_parent)
        var new_parent = TopicTreeEditor.topicTree.fetchByID(moveData.new_parent_id, function(model) {
            model.addChild(child, moveData.new_parent_pos);

            var parent_node = TopicTreeEditor.dynatree.getNodeByKey("Topic/" + moveData.new_parent_id);
            parent_node.expand();
            parent_node.reloadChildren();
            parent_node.getChildren()[moveData.new_parent_pos].activate();

            $.ajaxq("topics-admin", {
                url: "/api/v1/topic/" + oldParentID + "/movechild",
                type: "POST",
                data: moveData,
                success: function() {
                },
                error: TopicTreeEditor.handleError
            });
        });
    },

    ungroupTopic: function(node, topic) {
        var children = topic.get("children");
        var new_parent = TopicTreeEditor.topicTree.fetchByID(node.parent.data.id, function(model) {
            var child_list = model.get("children").slice(0);
            var child_index = _.indexOf(child_list, _.find(child_list, function(child) { return child.id === topic.id; }));

            splice_args = [child_index, 1].concat(children);
            [].splice.apply(child_list, splice_args);

            model.set({"children": child_list});

            $.ajaxq("topics-admin", {
                url: "/api/v1/topic/" + topic.id + "/ungroup",
                type: "POST",
                success: function() {
                },
                error: TopicTreeEditor.handleError
            });
        });
    }
};

// Utility function for comparing arrays of strings only (type coercion/null/undefined values are not relevant)
function stringArraysEqual(ar1, ar2) {
    return !(ar1 < ar2 || ar1 > ar2);
}

// Details view common code

(function(editor) {
    editor.NodeEditor = function(node) {
        this.node = null;
        this.model = null;
        this.parentModel = null;
        this.modelKind = null;
        this.template = null;
        this.visible = false;
        this.el = null;
    };

    editor.NodeEditor.prototype.init = function(node) {
        this.node = node;
        _.bindAll(this, "modelLoaded", "handleChange", "render", "deleteTag");
        return this;
    };

    editor.NodeEditor.prototype.setParentModel = function(parentModel) {
        this.parentModel = parentModel;
        return this;
    };

    editor.NodeEditor.prototype.show = function() {
        if (!this.visible) {
            this.visible = true;
            this.render();

            if (this.model) {
                this.model.bind("change", this.render);
            }
        }
    };

    editor.NodeEditor.prototype.hide = function() {
        if (this.model) {
            this.model.unbind("change", this.render);
        }
        this.visible = false;
    };

    editor.NodeEditor.prototype.modelLoaded = function(model) {
        this.modelKind = model.get('kind');
        this.model = model;
        this.parentModel = editor.topicTree.get(this.node.parent.data.id);
        this.template = Templates.get("topicsadmin.edit-" + model.get('kind').toLowerCase());

        if (this.visible) {
            this.render();
            this.model.bind("change", this.render);
        }

        return this;
    };

    editor.NodeEditor.prototype.render = function() {
        var self = this;

        if (this.model) {
            js = this.model.toJSON();
            oldValues = this.node.data.oldValues || {};

            html = this.template({version: editor.currentVersion.toJSON(), model: js, oldValues: oldValues});

            this.el = $("#details-view")
                .html(html)
                .find("input, textarea")
                    .change(this.handleChange)
                    .end()
                .find("a.item-action")
                    .click(function() { self.handleAction($(this).attr("data-id")); })
                    .end()
                .find(".character-count")
                    .each(function() {
                        var counter = this;
                        var suffix = $(counter).html();
                        var params = $(counter).attr("data-id").split(" ");
                        var maxLength = -1;
                        if (params.length > 1) {
                            maxLength = params[1];
                        }

                        var keyUpFn = function() {
                            var cnt = $(this).val().length;
                            $(counter).html(cnt + suffix);
                            $(counter).toggleClass("character-count-over", (cnt > maxLength));
                        };

                        $("#details-view").find(params[0])
                            .bind("keyup", keyUpFn)
                            .each(keyUpFn);
                    })
                    .end();
        } else {
            this.el = $("#details-view")
                .html("<div style=\"left: 350px; position: relative; width: 10px;\"><div class=\"dialog-progress-bar\"></div></div>")
                .find(".dialog-progress-bar")
                    .progressbar({ enable: true, value: 100 })
                    .end();
        }
    };

    editor.NodeEditor.prototype.handleChange = function() {
        var self = this;
        unsavedChanges = this.hasUnsavedChanges();
        $("input[type=\"text\"]", this.el)
            .add("input[type=\"radio\"]:checked", this.el)
            .add("input[type=\"checkbox\"]", this.el)
            .add("textarea", this.el)
            .each(function() {
                var field = $(this).attr("name");
                if (field) {
                    var value = ( this.type == "checkbox" ) ?  $( this ).is( ":checked" ) : $( this ).val();
                    if (String(self.model.get(field)) != String(value)) {
                        unsavedChanges = true;
                    }
                }
            });
        if (unsavedChanges) {
            $(".save-button", this.el).removeClass("disabled").addClass("green");
        } else {
            $(".save-button", this.el).addClass("disabled").removeClass("green");
        }
    };

    editor.NodeEditor.prototype.hasUnsavedChanges = function() {
        return this.tags && !stringArraysEqual(this.tags, this.model.get("tags"));
    };

    editor.NodeEditor.prototype.serializeChanges = function(attrs) {
        if (this.tags && !stringArraysEqual(this.tags, this.model.get("tags"))) {
            attrs.tags = this.tags;
        }
    };
    
    editor.NodeEditor.prototype.updateTags = function() {
        var self = this;
        var elements = [];
        _.each( this.tags, function( tag ) {
            elements.push(
                $("<div>" + tag + " <a href=\"javascript:\">(remove)</a></div>")
                    .delegate( "a", "click", function() { self.deleteTag(tag); } )
            );
        });
        $(".tags-list", this.el).children().remove();
        _.each( elements, function( element ) { element.appendTo(".tags-list", this.el); } );
    };

    editor.NodeEditor.prototype.deleteTag = function(tag) {
        var idx = _.indexOf(this.tags, tag);
        if (idx >= 0) {
            this.tags.splice(idx, 1);
            this.updateTags();
            this.handleChange();
        }
    };

    editor.NodeEditor.prototype.handleAction = function(action) {
        var self = this;

        if (action == "save") {
            var attrs = {};
            $("input[type=\"text\"]", this.el)
                .add("input[type=\"radio\"]:checked", this.el)
                .add("input[type=\"checkbox\"]", this.el)
                .add("textarea")
                .each(function() {
                    var field = $(this).attr("name");
                    if (field) {
                        var value = ( this.type == "checkbox" ) ?  $( this ).is( ":checked" ) : $( this ).val();
                        if (String(self.model.get(field)) != String(value)) {
                            attrs[field] = value;
                        }
                    }
                });
            this.serializeChanges(attrs);

            if (attrs != {}) {
                Throbber.show($(".save-button", this.el), true);

                // We do special things on save because of the potential ID change
                var oldID = this.model.id;
                this.model.save(attrs, {
                    url: self.model.url(), // URL with the old slug value
                    success: function() {
                        editor.handleChange(self.model, oldID);
                        Throbber.hide();
                    },
                    error: TopicTreeEditor.handleError
                });
            }
        } else if (action == "add-tag") {
            var tag = escape($(".add-tag", this.el).val());
            var idx = _.indexOf(this.tags, tag);
            if (tag && idx < 0) {
                this.tags.push(tag);
                this.updateTags();
                this.handleChange();
            }

            $(".add-tag", this.el).val("");
        }
    };

})(TopicTreeEditor);

// Details view & editing functions for topics

(function(editor) {
    editor.TopicEditor = function() {
        this.existingItemView = null;
        this.newExerciseView = null;
        this.newVideoView = null;
        this.newUrlView = null;
        this.importView = null;
        this.exportView = null;
        this.contextNode = null;
        this.contextModel = null;
        this.itemCopyBuffer = null;
    };

    editor.TopicEditor.prototype = new TopicTreeEditor.NodeEditor();

    editor.TopicEditor.prototype.init = function(node) {
        editor.NodeEditor.prototype.init.call(this, node);

        editor.topicTree.fetchByID(this.node.data.id, this.modelLoaded);
        return this;
    };

    editor.TopicEditor.prototype.render = function() {
        editor.NodeEditor.prototype.render.call(this);

        if (this.model) {
            this.tags = this.model.get("tags").slice(0);
            this.updateTags();
        }

        if (!TopicTreeEditor.currentVersion.get("edit")) {
            $("input", this.el).attr("disabled", "disabled");
        }

    };

    editor.TopicEditor.prototype.handleAction = function(action) {
        var self = this;

        if (!TopicTreeEditor.currentVersion.get("edit"))
            return;

        if (action == "add_new_topic") {
            var topic = new Topic();
            KAConsole.log("Creating new topic...");
            topic.save({}, {
                success: function() {
                    KAConsole.log("Created new topic:", topic.id);
                    var data = {
                        kind: "Topic",
                        id: topic.id,
                        pos: self.model.get("children").length
                    };
                    $.ajaxq("topics-admin", {
                        url: "/api/v1/topicversion/edit/topic/" + self.model.id + "/addchild",
                        type: "POST",
                        data: data,
                        success: function(json) {
                            KAConsole.log("Added topic successfully.");
                            self.model.set(json);

                            self.node.expand();
                            self.node.reloadChildren()
                            self.node.getChildren()[data.pos].activate();
                        },
                        error: TopicTreeEditor.handleError
                    });
                }
            });

        } else if (action == "add_new_video") {
            this.newVideoView = this.newVideoView || new TopicTreeEditor.CreateVideoView();
            this.newVideoView.show(this.node, this.model);

        } else if (action == "add_existing_video") {
            this.existingItemView = this.existingItemView || new TopicTreeEditor.AddExistingItemView();
            this.existingItemView.show("video", editor.addItemToTopic, this.node, this.model);

        } else if (action == "add_new_exercise") {
            this.newExerciseView = this.newExerciseView || new TopicTreeEditor.CreateExerciseView();
            this.newExerciseView.show(this.node, this.model);

        } else if (action == "add_existing_exercise") {
            this.existingItemView = this.existingItemView || new TopicTreeEditor.AddExistingItemView();
            this.existingItemView.show("exercise", editor.addItemToTopic, this.node, this.model);

        } else if (action == "add_new_url") {
            this.newUrlView = this.newUrlView || new TopicTreeEditor.CreateUrlView();
            this.newUrlView.show(this.node, this.model);

        } else if (action == "export_topic") {
            this.exportView = this.exportView || new TopicTreeEditor.ImportExportView({ import: false });
            this.exportView.show(this.model.id);

        } else if (action == "import_topic") {
            this.importView = this.importView || new TopicTreeEditor.ImportExportView({ import: true });
            this.importView.show(this.model.id);

        } else if (action == "ungroup_topic") {
            var self = this;
            popupGenericMessageBox({
                title: "Confirm ungroup topic",
                message: "Ungrouping this topic will delete it and move all its children to the parent topic. Are you sure?",
                buttons: [
                    { title: "Yes", action: function() { TopicTreeEditor.ungroupTopic(self.node, self.model); hideGenericMessageBox(); } },
                    { title: "No", action: hideGenericMessageBox }
                ]
            });

        } else if (action == "paste_item") {

            if (!editor.itemCopyBuffer) {
                return;
            }

            if (editor.itemCopyBuffer.type == "copy") {
                editor.addItemToTopic(editor.itemCopyBuffer.kind, editor.itemCopyBuffer.id, editor.itemCopyBuffer.title, this.node, this.model, -1);

            } else if (editor.itemCopyBuffer.type == "cut") {
                var moveData = {
                    kind: editor.itemCopyBuffer.kind,
                    id: editor.itemCopyBuffer.id,
                    new_parent_id: self.model.id,
                    new_parent_pos: self.model.get("children").length
                };
                TopicTreeEditor.moveItem(editor.itemCopyBuffer.originalParent, moveData);
            }

        } else if (action == "delete_topic") {
            var deleteData = {
                kind: "Topic",
                id: self.model.id
            };
            $.ajaxq("topics-admin", {
                url: "/api/v1/topic/" + self.parentModel.id + "/deletechild",
                type: "POST",
                data: deleteData,
                success: function(json) {
                    self.parentModel.removeChild("Topic", self.model.id);
                    TopicTreeEditor.refreshTreeNode(self.parentModel)
                },
                error: TopicTreeEditor.handleError
            });
        } else {
            editor.NodeEditor.prototype.handleAction.call(this, action);
        }
    };

})(TopicTreeEditor);

// Details view common code for videos/exercises

(function(editor) {
    editor.ItemEditor = function() {
    };

    editor.ItemEditor.prototype = new TopicTreeEditor.NodeEditor();

    editor.ItemEditor.prototype.handleAction = function(action) {
        var self = this;

        if (!TopicTreeEditor.currentVersion.get("edit")) {
            editor.NodeEditor.prototype.handleAction.call(this, action);
            return;
        }

        if (action == "copy_item") {
            editor.itemCopyBuffer = {
                type: "copy",
                kind: this.node.data.kind,
                id: this.node.data.id,
                title: this.node.data.title,
                originalParent: this.parentModel.id
            };

        } else if (action == "cut_item") {
            editor.itemCopyBuffer = {
                type: "cut",
                kind: this.node.data.kind,
                id: this.node.data.id,
                title: this.node.data.title,
                originalParent: this.parentModel.id,
                originalPosition: _.indexOf(this.node.parent.childList, this.node)
            };

        } else if (action == "paste_after_item") {

            var new_position = _.indexOf(this.node.parent.childList, this.node) + 1;

            if (!editor.itemCopyBuffer) {
                return;
            }

            if (editor.itemCopyBuffer.type == "copy") {
                if (this.parentModel.id == editor.itemCopyBuffer.originalParent) {
                    return;
                }

                editor.addItemToTopic(editor.itemCopyBuffer.kind, editor.itemCopyBuffer.id, editor.itemCopyBuffer.title, this.node.parent, this.parentModel, new_position);

            } else if (editor.itemCopyBuffer.type == "cut") {
                if (this.parentModel.id == editor.itemCopyBuffer.originalParent &&
                    new_position > editor.itemCopyBuffer.originalPosition) {
                    new_position--;
                }

                var moveData = {
                    kind: editor.itemCopyBuffer.kind,
                    id: editor.itemCopyBuffer.id,
                    new_parent_id: this.parentModel.id,
                    new_parent_pos: new_position
                };
                editor.moveItem(editor.itemCopyBuffer.originalParent, moveData);
            }

        } else if (action == "remove_item") {
            var deleteData = {
                kind: this.node.data.kind,
                id: this.node.data.id
            };
            $.ajaxq("topics-admin", {
                url: "/api/v1/topic/" + this.parentModel.id + "/deletechild",
                type: "POST",
                data: deleteData,
                success: function(json) {
                    self.parentModel.removeChild(self.node.data.kind, self.node.data.id);
                    TopicTreeEditor.refreshTreeNode(self.parentModel)
                },
                error: TopicTreeEditor.handleError
            });
        } else if (action == "undo_changes") {
            var deleteData = {
                kind: this.node.data.kind,
                id: this.node.data.id
            };               
            $.ajaxq("topics-admin", {
                url: "/api/v1/topicversion/edit/deletechange",
                type: "POST",
                data: deleteData,
                success: function(json) {
                    self.node.parent.removeChild(self.node);
                },
                error: TopicTreeEditor.handleError
            });
        } else {
            editor.NodeEditor.prototype.handleAction.call(this, action);
        }
    };

})(TopicTreeEditor);

// Details view for exercises

(function(editor) {
    editor.ExerciseEditor = function() {
        this.existingItemView = null;
        this.covers = null;
        this.prereqs = null;
        this.videos = null;
    };

    editor.ExerciseEditor.prototype = new TopicTreeEditor.ItemEditor();

    editor.ExerciseEditor.prototype.init = function(node) {
        editor.ItemEditor.prototype.init.call(this, node);
        _.bindAll(this, "addCover", "deleteCover", "addPrereq", "deletePrereq", "addVideo", "deleteVideo");

        getExerciseList().fetchByID(node.data.id, this.modelLoaded);

        return this;
    };

    editor.ExerciseEditor.prototype.render = function() {
        editor.ItemEditor.prototype.render.call(this);

        if (this.model) {
            this.tags = this.model.get("tags").slice(0);
            this.updateTags();

            this.prereqs = this.model.get("prerequisites").slice(0);
            this.updatePrereqs();

            this.covers = this.model.get("covers").slice(0);
            this.updateCovers();

            this.videos = (this.model.get("related_video_readable_ids") || []).slice(0);
            this.updateVideos();
        }
    };

    editor.ExerciseEditor.prototype.hasUnsavedChanges = function()  {
        var ret = editor.ItemEditor.prototype.hasUnsavedChanges.call(this);
        return ret || !(
            stringArraysEqual(this.prereqs, this.model.get("prerequisites")) &&
            stringArraysEqual(this.covers, this.model.get("covers")) &&
            stringArraysEqual(this.videos, this.model.get("related_video_readable_ids"))
        );
    };

    editor.ExerciseEditor.prototype.serializeChanges = function(attrs) {
        editor.ItemEditor.prototype.serializeChanges.call(this, attrs);

        if (this.prereqs && !stringArraysEqual(this.prereqs, this.model.get("prerequisites"))) {
            attrs.prerequisites = this.prereqs;
        }

        if (this.covers && !stringArraysEqual(this.covers, this.model.get("covers"))) {
            attrs.covers = this.covers;
        }

        if (this.videos && !stringArraysEqual(this.videos, this.model.get("related_video_readable_ids"))) {
            attrs.related_video_readable_ids = this.videos;
        }
    };

    editor.ExerciseEditor.prototype.updateCovers = function() {
        var self = this;
        var elements = [];
        _.each(this.covers, function(cover) {
            elements.push(
                $("<div>" + cover + " <a href=\"javascript:\">(remove)</a></div>")
                    .delegate("a", "click", function() { self.deleteCover(cover); })
            );
        });
        $(".exercise-covers-list", this.el).children().remove();
        _.each(elements, function(element) { element.appendTo(".exercise-covers-list", this.el); });
    };
    editor.ExerciseEditor.prototype.addCover = function(kind, id, title) {
        if (id) {
            this.covers.push(id);
            this.updateCovers();
            this.handleChange();
        }
    };
    editor.ExerciseEditor.prototype.deleteCover = function(cover) {
        var idx = _.indexOf(this.covers, cover);
        if (idx >= 0) {
            this.covers.splice(idx, 1);
            this.updateCovers();
            this.handleChange();
        }
    };

    editor.ExerciseEditor.prototype.updatePrereqs = function() {
        var self = this;
        var elements = [];
        _.each(this.prereqs, function(prereq) {
            elements.push(
                $("<div>" + prereq + " <a href=\"javascript:\">(remove)</a></div>")
                    .delegate("a", "click", function() { self.deletePrereq(prereq); })
            );
        });
        $(".exercise-prereqs-list", this.el).children().remove();
        _.each(elements, function(element) { element.appendTo(".exercise-prereqs-list", this.el); });
    };
    editor.ExerciseEditor.prototype.addPrereq = function(kind, id, title) {
        if (id) {
            this.prereqs.push(id);
            this.updatePrereqs();
            this.handleChange();
        }
    };
    editor.ExerciseEditor.prototype.deletePrereq = function(prereq) {
        var idx = _.indexOf(this.prereqs, prereq);
        if (idx >= 0) {
            this.prereqs.splice(idx, 1);
            this.updatePrereqs();
            this.handleChange();
        }
    };

    editor.ExerciseEditor.prototype.updateVideos = function() {
        var self = this;
        var elements = [];
        _.each(this.videos, function(video) {
            elements.push(
                $("<div id='related-video-" + video + "'>" + video + " <a href=\"javascript:\">(remove)</a></div>")
                    .delegate("a", "click", function() { self.deleteVideo(video); })
            );
        });
        $(".exercise-videos-list", this.el).children().remove();
        _.each(elements, function(element) { element.appendTo(".exercise-videos-list", this.el); });
        $(".exercise-videos-list", this.el).sortable({
            update: $.proxy(function(event, ui) {
                this.videos = $(".exercise-videos-list", this.el)
                    .sortable("toArray").map(function(id){
                        return id.substring(14);
                    })
            }, this)   
        })
    };
    editor.ExerciseEditor.prototype.addVideo = function(kind, id, title) {
        if (id) {
            this.videos.push(id);
            this.updateVideos();
            this.handleChange();
        }
    };
    editor.ExerciseEditor.prototype.deleteVideo = function(video) {
        var idx = _.indexOf(this.videos, video);
        if (idx >= 0) {
            this.videos.splice(idx, 1);
            this.updateVideos();
            this.handleChange();
        }
    };

    editor.ExerciseEditor.prototype.handleAction = function(action) {
        if (action == "add-prereq") {
            this.existingItemView = this.existingItemView || new TopicTreeEditor.AddExistingItemView();
            this.existingItemView.show("exercise", this.addPrereq);

        } else if (action == "add-cover") {
            this.existingItemView = this.existingItemView || new TopicTreeEditor.AddExistingItemView();
            this.existingItemView.show("exercise", this.addCover);

        } else if (action == "add-video") {
            this.existingItemView = this.existingItemView || new TopicTreeEditor.AddExistingItemView();
            this.existingItemView.show("video", this.addVideo);

        } else {
            editor.ItemEditor.prototype.handleAction.call(this, action);
        }
    };

})(TopicTreeEditor);


// Details view for videos

(function(editor) {
    editor.VideoEditor = function() {
    };

    editor.VideoEditor.prototype = new TopicTreeEditor.ItemEditor();

    editor.VideoEditor.prototype.init = function(node) {
        editor.ItemEditor.prototype.init.call(this, node);

        getVideoList().fetchByID(node.data.id, this.modelLoaded);

        return this;
    };

})(TopicTreeEditor);

// Details view for external links

(function(editor) {
    editor.UrlEditor = function() {
    };

    editor.UrlEditor.prototype = new TopicTreeEditor.ItemEditor();

    editor.UrlEditor.prototype.init = function(node) {
        editor.ItemEditor.prototype.init.call(this, node);

        getUrlList().fetchByID(node.data.id, this.modelLoaded);

        return this;
    };

    editor.UrlEditor.prototype.render = function() {
        editor.ItemEditor.prototype.render.call(this);

        if (this.model) {
            this.tags = this.model.get("tags").slice(0);
            this.updateTags();
        }
    };

})(TopicTreeEditor);

// Add existing video/exercise dialog box

TopicTreeEditor.AddExistingItemView = Backbone.View.extend({
    template: Templates.get("topicsadmin.add-existing-item"),
    loaded: false,
    type: "",
    results: {},
    callback: null,
    contextNode: null,
    contextModel: null,

    initialize: function() {
        _.bindAll(this, "showResults");
        this.render();
    },

    events: {
        "click .do-search": "doSearch",
        "click .show-recent": "showRecent",
        "click .ok-button": "selectItem"
    },

    render: function() {
        var el = $(this.template({type: this.type})).appendTo(document.body).get(0);
        this.setElement(el);
        this.delegateEvents();
        return this;
    },

    show: function(type, callback, node, model) {
        $(this.el).modal({
            keyboard: true,
            backdrop: true,
            show: true
        });

        if (type != this.type) {
            this.loaded = false;
        }
        this.type = type;
        this.callback = callback;
        this.contextNode = node;
        this.contextModel = model;

        $(this.el).find(".title").html("Choose " + type + ":");

        if (!this.loaded) {
            this.showRecent();
        }
    },

    showResults: function(json) {
        var elements = [];
        var self = this;
        this.results = {};
        _.each(json, function(item) {
            if (self.type == "video") {
                elements.push($('<option value="' + item.id + '">' + item.title + '</option>'));
                self.results[item.id] = item.title;
            } else {
                elements.push($('<option value="' + item.name + '">' + item.display_name + '</option>'));
                self.results[item.name] = item.display_name;
            }
        });

        var resultsElement = $("select.search-results", this.el);
        resultsElement.html("");
        _.each(elements, function(element) { element.appendTo(resultsElement.get(0)); });
    },

    showRecent: function() {
        var self = this;

        if (this.type == "video") {
            $(this.el).find(".search-description").html("Most recent videos:");
        } else {
            $(this.el).find(".search-description").html("Most recent exercises:");
        }
        self.showResults([{
            readable_id: "_",
            name: "_",
            title: "Loading...",
            display_name: "Loading..."
        }]);

        var url;
        if (this.type == "video") {
            url = "/api/v1/videos/recent";
        } else {
            url = "/api/v1/exercises/recent";
        }
        $.ajax({
            url: url,

            success: function(json) {
                self.loaded = true;
                self.showResults(json);
            }
        });
    },

    doSearch: function() {
        var searchText = $(this.el).find("input[name=\"item-search\"]").val();
        var self = this;

        if (this.type == "video") {
            $(this.el).find(".search-description").html("Videos matching \"" + searchText + "\":");
        } else {
            $(this.el).find(".search-description").html("Exercises matching \"" + searchText + "\":");
        }
        self.showResults([{
            readable_id: "",
            name: "",
            title: "Loading...",
            display_name: "Loading..."
        }]);

        $.ajax({
            url: "/api/v1/autocomplete?q=" + encodeURIComponent(searchText),

            success: function(json) {
                self.loaded = true;
                if (self.type == "video") {
                    self.showResults(json.videos);
                } else {
                    self.showResults(json.exercises);
                }
            }
        });
    },

    selectItem: function() {
        var itemID = $(this.el).find("select.search-results option:selected").val();
        if (!itemID || itemID === "_") {
            return;
        }

        this.hide();

        var kind;
        if (this.type == "video") {
            kind = "Video";
        } else {
            kind = "Exercise";
        }

        this.callback(kind, itemID, this.results[itemID], this.contextNode, this.contextModel, -1);
    },

    hide: function() {
        return $(this.el).modal("hide");
    }
});

// Add a new exercise dialog box

TopicTreeEditor.CreateExerciseView = Backbone.View.extend({
    template: Templates.get("topicsadmin.create-exercise"),
    contextNode: null,
    contextModel: null,

    initialize: function() {
        this.render();
    },

    events: {
        "click .ok-button": "createExercise"
    },

    render: function() {
        var el = $( this.template( {type: this.type} ) ).appendTo(document.body).get(0);
        this.setElement(el);
        this.delegateEvents();
        return this;
    },

    show: function(node, model) {
        $(this.el).modal({
            keyboard: true,
            backdrop: true,
            show: true
        });

        this.contextNode = node;
        this.contextModel = model;
    },

    createExercise: function() {
        var self = this;
        var name = $(this.el).find("input[name=\"name\"]").val();
        var exercise = new Exercise({ name: name });

        exercise.save({}, {
            success: function() {
                TopicTreeEditor.addItemToTopic("Exercise", name, exercise.get("display_name"), self.contextNode, self.contextModel, -1);
            }
        });
        this.hide();
    },

    hide: function() {
        return $(this.el).modal("hide");
    }
});

// Add a new video dialog box

TopicTreeEditor.CreateVideoView = Backbone.View.extend({
    template: Templates.get( "topicsadmin.create-video" ),
    previewTemplate: Templates.get( "topicsadmin.create-video-preview" ),
    contextNode: null,
    contextModel: null,

    youtubeID: null,
    readableID: null,
    title: null,

    initialize: function() {
        _.bindAll(this, "doVideoSearch", "queueVideoSearch");
        this.render();
    },

    events: {
        "click .ok-button": "createVideo",
        "change input[name=\"youtube_id\"]": "doVideoSearch",
        "keydown input[name=\"youtube_id\"]": "queueVideoSearch"
    },

    render: function() {
        var el = $(this.template({type: this.type})).appendTo(document.body).get(0);
        this.setElement(el);
        this.delegateEvents();
        return this;
    },

    show: function(node, model) {
        this.contextNode = node;
        this.contextModel = model;

        $(this.el).modal({
            keyboard: true,
            backdrop: true,
            show: true
        });

        this.youtubeID = null;
        $(this.el).find("input[name=\"youtube_id\"]").val("");
        $(this.el).find(".create-video-preview").html("Enter a YouTube ID to look up a video.");
        $(self.el).find(".ok-button").addClass("disabled").removeClass("green");
    },

    createVideo: function() {
        var self = this;

        if (this.readableID) {
            TopicTreeEditor.addItemToTopic("Video", this.readableID, this.title, this.contextNode, this.contextModel, -1);
        } else {
            if (!this.youtubeID) {
                return;
            }

            var video = new Video({ youtube_id: this.youtubeID });
            video.save({}, {
                success: function(model) {
                    TopicTreeEditor.addItemToTopic("Video", model.get("readable_id"), model.get("title"), self.contextNode, self.contextModel, -1);
                }
            });
        }
        this.hide();
    },

    doVideoSearch: function() {
        var youtubeID = $(this.el).find("input[name=\"youtube_id\"]").val();
        var self = this;
        $.ajax({
            url: "/api/v1/videos/" + youtubeID + "/youtubeinfo",
            success: function(json) {
                self.youtubeID = youtubeID;
                if (json.existing) {
                    self.readableID = json.readable_id;
                    self.title = json.title;
                } else {
                    self.readableID = null;
                }
                $(self.el).find(".create-video-preview").html(self.previewTemplate(json));
                $(self.el).find(".ok-button").removeClass("disabled").addClass("green");
            },
            error: function(json) {
                self.youtubeID = null;
                self.readableID = null;
                $(self.el).find(".create-video-preview").html("Video not found.");
                $(self.el).find(".ok-button").addClass("disabled").removeClass("green");
            }
        });
    },

    queueVideoSearch: function() {
        this.queueVideoSearchFn = this.queueVideoSearchFn || _.debounce(this.doVideoSearch, 1000);
        this.queueVideoSearchFn();
    },

    hide: function() {
        return $(this.el).modal("hide");
    }
});

// Add a new url dialog box

TopicTreeEditor.CreateUrlView = Backbone.View.extend({
    template: Templates.get( "topicsadmin.create-url" ),
    contextNode: null,
    contextModel: null,

    initialize: function() {
        this.render();
    },

    events: {
        "click .ok-button": "createUrl"
    },

    render: function() {
        var el = $(this.template({type: this.type})).appendTo(document.body).get(0);
        this.setElement(el);
        this.delegateEvents();
        return this;
    },

    show: function(node, model) {
        this.contextNode = node;
        this.contextModel = model;

        $(this.el).modal({
            keyboard: true,
            backdrop: true,
            show: true
        });

        $(this.el).find("input[name=\"url\"]").val("");
    },

    createUrl: function() {
        var self = this;
        var url = $(this.el).find("input[name=\"url\"]").val();
        var title = $(this.el).find("input[name=\"title\"]").val();
        var urlObject = new ExternalURL({ url: url, title: title });

        urlObject.save({}, {
            success: function(model) {
                TopicTreeEditor.addItemToTopic("Url", model.id, model.get("title"), self.contextNode, self.contextModel, -1);
            }
        });
        this.hide();
    },

    hide: function() {
        return $(this.el).modal("hide");
    }
});

// View versions list

TopicTreeEditor.VersionListView = Backbone.View.extend({
    template: Templates.get( "topicsadmin.list-versions" ),
    templateItem: Templates.get( "topicsadmin.list-versions-item" ),

    initialize: function() {
        this.render();
    },

    render: function() {
        var el = $(this.template({})).appendTo(document.body).get(0);
        this.setElement(el);
        this.delegateEvents();
        return this;
    },

    show: function( type ) {
        $( this.el ).modal({
            keyboard: true,
            backdrop: true,
            show: true
        });

        var self = this;
        getTopicVersionList().fetch({
            success: function() {
                var elements = [];
                _.each( getTopicVersionList().models, function( model ) {
                    elements.push(
                        $( self.templateItem( model.toJSON() ) )
                            .find( "a.edit-version" )
                                .click( function() { TopicTreeEditor.editVersion( model.get( "number" ) ); } )
                                .end()
                    );
                });
                _.each( elements, function( element ) { element.appendTo( $( ".version-list", self.el ).get( 0 ) ); } );
            }
        });
        return this;
    },

    hide: function() {
        return $(this.el).modal("hide");
    }
});

// Search popup

TopicTreeEditor.SearchView = Backbone.View.extend({
    template: Templates.get( "topicsadmin.search-topics" ),
    visible: false,
    matchingPaths: null,
    currentIndex: 0,

    events: {
        "click .search-button": "toggle",
        "change input": "doSearch",
        "click .prev-button": "goToPrev",
        "click .next-button": "goToNext"
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        var el = $(this.template({})).get(0);
        this.setElement(el);
        this.delegateEvents();
        return this;
    },

    toggle: function() {
        this.visible = !this.visible;
        if (this.visible) {
            this.show();
        } else {
            this.hide();
        }
    },

    show: function() {
        $(".search-button", this.el).attr("src", "/images/circled_cross.png");
        $(".search-panel", this.el).slideDown(100);
    },

    hide: function() {
        $(".search-button", this.el).attr("src", "/images/jquery-mobile/icon-search-black.png");
        $(".search-panel", this.el).slideUp(100);
    },

    doSearch: function() {
        this.clearResults();

        el = $("input", this.el);
        query = el.val();
        if (query !== "") {
            var self = this;
            Throbber.show(el);
            $.ajax({
                url: "/api/v1/topicversion/" + TopicTreeEditor.currentVersion.get("number") + "/search/" + query,
                success: function(json) {
                    Throbber.hide();

                    var nodes = { };
                    _.each(json.nodes, function(node) {
                        nodes[node.kind] = nodes[node.kind] || [];
                        nodes[node.kind].push(node);
                    });
                    TopicTreeEditor.topicTree.addInited(nodes.Topic);
                    getExerciseList().addInited(nodes.Exercise);
                    getVideoList().addInited(nodes.Video);
                    getUrlList().addInited(nodes.URL);

                    self.matchingPaths = json.paths;
                    if (self.matchingPaths.length > 0) {
                        self.currentIndex = 0;
                        self.goToResult(0);
                    }
                }
            });
        }
    },

    clearResults: function() {
        this.matchingPaths = [];
        $(".prev-button", this.el).attr("src", "/images/vote-up-gray.png");
        $(".next-button", this.el).attr("src", "/images/vote-down-gray.png");
    },

    goToResult: function(index) {
        var path = this.matchingPaths[index];
        var node = TopicTreeEditor.dynatree.getNodeByKey("Topic/root");
        var last_key = path[path.length-1] + "/" + path[path.length-2];

        _.each(path, function(key) {
            if (node) {
                var nextNode = null;

                node.expand(true);

                KAConsole.log("Opening " + key + "...");

                _.each(node.childList, function(childNode) {
                    if (childNode.data.key == last_key) {
                        childNode.activate();
                    } else if (childNode.data.key == ("Topic/"+key)) {
                        childNode.expand(true);
                        nextNode = childNode;
                    } else {
                        childNode.expand(false);
                    }
                });

                node = nextNode;
            }
        });

        this.currentIndex = index;
        $(".prev-button", this.el).attr("src", (this.currentIndex === 0) ? "/images/vote-up-gray.png" : "/images/vote-up.png");
        $(".next-button", this.el).attr("src", (this.currentIndex < this.matchingPaths.length - 1) ? "/images/vote-down.png" : "/images/vote-down-gray.png");
    },

    goToPrev: function() {
        if (this.currentIndex > 0) {
            this.goToResult(this.currentIndex - 1);
        }
    },
    goToNext: function() {
        if (this.currentIndex < this.matchingPaths.length - 1) {
            this.goToResult(this.currentIndex + 1);
        }
    }
});

// Import / export

TopicTreeEditor.ImportExportView = Backbone.View.extend({
    template: Templates.get("topicsadmin.import-export"),

    events: {
        "click .ok-button": "close"
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        var el = $(this.template({ import: this.options.import })).appendTo(document.body).get(0);
        this.setElement(el);
        this.delegateEvents();
        return this;
    },

    show: function(topicID) {
        var self = this;

        $(this.el).modal({
            keyboard: true,
            backdrop: true,
            show: true
        });

        this.topicID = topicID;

        if (!this.options.import) {
            $(this.el).find(".topic-data").html("Exporting topic data. Please wait.");
            $.ajax({
                url: "/api/v1/dev/topicversion/" + TopicTreeEditor.currentVersion.get("number") + "/topic/" + topicID + "/topictree",
                dataType: "html",
                success: function(text) {
                    $(self.el).find(".topic-data").html(text);
                }
            });
        }
        return this;
    },

    hide: function() {
        return $(this.el).modal("hide");
    },

    close: function() {
        var self = this;
        if (this.options.import) {
            this.hide();
            hideGenericMessageBox();
            popupGenericMessageBox({
                title: "Importing topic...",
                message: "Importing topic. Please wait...",
                buttons: []
            });
            $.ajax({
                url: "/api/v1/dev/topicversion/" + TopicTreeEditor.currentVersion.get("number") + "/topic/" + self.topicID + "/topictree",
                type: "PUT",
                contentType: "application/json",
                data:  $(self.el).find(".topic-data").val(),
                success: function() {
                    hideGenericMessageBox();
                }
            });
        } else {
            this.hide();
        }
    }
});
