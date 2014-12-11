from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def video_nav(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u'</a>\n<span class="breadcrumb-separator">&#187;</span>\n<span id="video_dropdown" style="display:none;" class="selected">\n  <a href="/'
    constant_8 = u'">'
    constant_7 = u'\n<a href="'
    constant_12 = u'</a>\n  <div id="video_menu">\n    <ol>\n      '
    constant_11 = u'">'
    constant_10 = u'/v/'
    constant_14 = u'\n    </ol>\n  </div>\n</span>\n\n'

    def constant_6(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'\n'
        constant_6 = u'\n'

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_7 = u'">'
            constant_6 = u'\n<a href="'
            constant_8 = u'</a>\n<span class="breadcrumb-separator">&#187;</span>\n'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            value = resolve(context, "","","url")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_7)
            value = resolve(context, "","","title")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_8)
            return result
        
        def constant_8(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_7 = u'</span>\n<span class="breadcrumb-separator">&#187;</span>\n'
            constant_6 = u'\n<span>'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            value = resolve(context, "","","title")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_7)
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
            value = value(this, options, resolve(context, "","","url"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_9)
        return result
    
    def constant_13(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'"><span class=\'vid-progress v'
        constant_7 = u'\'><a href="/'
        constant_6 = u"\n      <li data-selected='"
        constant_11 = u'</span></a></li>\n      '
        constant_8 = u'/v/'
        constant_10 = u"'>"

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = helpers.get('selected')
        if value is None:
            value = resolve(context, 'selected')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'selected', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        value = resolve(context, "__parent","topic","","extended_slug")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_8)
        value = helpers.get('readable_id')
        if value is None:
            value = resolve(context, 'readable_id')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'readable_id', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_9)
        value = helpers.get('key_id')
        if value is None:
            value = resolve(context, 'key_id')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'key_id', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_10)
        value = helpers.get('title')
        if value is None:
            value = resolve(context, 'title')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'title', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_11)
        return result
    
    # End constants
    result = strlist()
    if helpers is None: helpers = {}
    helpers.update(pybars['helpers'])
    if partials is None: partials = {}
    options = {'fn': partial(constant_6, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('each')
    if value is None:
        value = context.get('each')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "topic","","ancestor_topics"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_7)
    value = resolve(context, "topic","","url")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_8)
    value = resolve(context, "topic","","title")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_9)
    value = resolve(context, "topic","","extended_slug")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_10)
    value = resolve(context, "video","","readable_id")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_11)
    value = resolve(context, "video","","title")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_12)
    options = {'fn': partial(constant_13, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('each')
    if value is None:
        value = context.get('each')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "topic","","videos"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_14)
    return result
