from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def video_header(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u'\n    '
    constant_6 = u'<nav class="prev_next_nav desktop-only">\n    '
    constant_12 = u'\n    <div class="clear"></div>\n</nav>\n'

    def constant_7(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u"'>"
        constant_7 = u'/v/'
        constant_6 = u'\n    <label id="prev_video">\n      <a rel=prev class="previous-video" href="/'
        constant_8 = u'"><b>Previous Video:</b> <span class=\'vid-progress v'
        constant_10 = u'</span> </a>\n    </label>\n    '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = resolve(context, "topic","","extended_slug")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        value = resolve(context, "video","","previous_video","","readable_id")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_8)
        value = resolve(context, "video","","previous_video","","key_id")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_9)
        value = resolve(context, "video","","previous_video","","title")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_10)
        return result
    
    def constant_11(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n      '
        constant_8 = u'\n    '

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_9 = u'</a>\n        </label>\n      '
            constant_7 = u'/v/'
            constant_6 = u'\n        <label id="next_video">\n          <a rel=next class="next-video" href="/'
            constant_8 = u'"><b>Next Topic:</b> '

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            value = resolve(context, "topic","","next_topic_subtopic_slug")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_7)
            value = resolve(context, "topic","","next_topic_video")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_8)
            value = resolve(context, "topic","","next_topic_title")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_9)
            return result
        
        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        options = {'fn': partial(constant_7, helpers=helpers, partials=partials)}
        options['helpers'] = helpers
        options['partials'] = partials
        options['inverse'] = lambda this: None
        value = helper = helpers.get('if')
        if value is None:
            value = context.get('if')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "topic","","next_topic_video"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_8)
        return result
    
    def constant_8(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n      '
        constant_8 = u'\n    '

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_9 = u'</a>\n        </label>\n      '
            constant_7 = u'/v/'
            constant_6 = u'\n        <label id="prev_video">\n          <a rel=prev class="previous-video" href="/'
            constant_8 = u'"><b>Previous Topic:</b> '

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            value = resolve(context, "topic","","previous_topic_subtopic_slug")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_7)
            value = resolve(context, "topic","","previous_topic_video")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_8)
            value = resolve(context, "topic","","previous_topic_title")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_9)
            return result
        
        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        options = {'fn': partial(constant_7, helpers=helpers, partials=partials)}
        options['helpers'] = helpers
        options['partials'] = partials
        options['inverse'] = lambda this: None
        value = helper = helpers.get('if')
        if value is None:
            value = context.get('if')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "topic","","previous_topic_video"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_8)
        return result
    
    def constant_10(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u"'>"
        constant_7 = u'/v/'
        constant_6 = u'\n    <label id="next_video">\n      <a rel=next class="next-video" href="/'
        constant_8 = u'"><b>Next Video:</b>  <span class=\'vid-progress v'
        constant_10 = u'</span> </a>\n    </label>\n    '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = resolve(context, "topic","","extended_slug")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        value = resolve(context, "video","","next_video","","readable_id")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_8)
        value = resolve(context, "video","","next_video","","key_id")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_9)
        value = resolve(context, "video","","next_video","","title")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_10)
        return result
    
    # End constants
    result = strlist()
    if helpers is None: helpers = {}
    helpers.update(pybars['helpers'])
    if partials is None: partials = {}
    result.append(constant_6)
    options = {'fn': partial(constant_7, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = partial(constant_8, helpers=helpers, partials=partials)
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "video","","previous_video"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_9)
    options = {'fn': partial(constant_10, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = partial(constant_11, helpers=helpers, partials=partials)
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "video","","next_video"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_12)
    return result
