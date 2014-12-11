from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def videolist(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_7 = u'\n'

    def constant_6(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'>\n<a href="'
        constant_7 = u'"'
        constant_6 = u'\n<li class="m'
        constant_13 = u'</span>\n</a>\n</li>\n'
        constant_12 = u'">'
        constant_10 = u'" data-tag="Homepage Library" class="vl">\n<span class="vid-progress'

        def constant_8(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_7 = u'px"'
            constant_6 = u' style="margin-top:-'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            value = resolve(context, "__parent","__parent","colHeight")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_7)
            return result
        
        def constant_11(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u' v'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
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
            return result
        
        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = helpers.get('col')
        if value is None:
            value = resolve(context, 'col')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'col', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        options = {'fn': partial(constant_8, helpers=helpers, partials=partials)}
        options['helpers'] = helpers
        options['partials'] = partials
        options['inverse'] = lambda this: None
        value = helper = helpers.get('if')
        if value is None:
            value = context.get('if')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "firstInCol"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_9)
        value = helpers.get('url')
        if value is None:
            value = resolve(context, 'url')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'url', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_10)
        options = {'fn': partial(constant_11, helpers=helpers, partials=partials)}
        options['helpers'] = helpers
        options['partials'] = partials
        options['inverse'] = lambda this: None
        value = helper = helpers.get('if')
        if value is None:
            value = context.get('if')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "key_id"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_12)
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
        result.append(constant_13)
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
        value = value(this, options, resolve(context, "children"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_7)
    return result
