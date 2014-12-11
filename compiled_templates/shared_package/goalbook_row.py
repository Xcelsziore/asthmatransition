from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def goalbook_row(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_8 = u' '
    constant_6 = u'\n<div class="goal pulls '
    constant_12 = u'</span>\n        <span class="summary-light">\n            '
    constant_11 = u'">\n    <p class="goal-description">\n        <span class="goal-title">'
    constant_10 = u'" data-id="'
    constant_17 = u'\n    </ul>\n    <div class="clear"></div>\n</div>\n'
    constant_15 = u'\n        </span>\n        <span class="goal-controls">\n            <a class="simple-button action-gradient archive" href="javascript:void(0)">Archive Completed Goal</a>\n        </span>\n    </p>\n    <ul class="inline-list objective-list">\n    '

    def constant_9(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'recently-completed'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_7(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'active'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_16(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'\n    '
        constant_6 = u'\n        '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        inner = partials['shared_goal-objectives']
        scope = Scope(context, context)
        result.grow(inner(scope, helpers=helpers, partials=partials))
        result.append(constant_7)
        return result
    
    def constant_13(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'Complete!'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_14(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'%</span>\n            '
        constant_7 = u'/'
        constant_6 = u'\n            <span class="objectives-complete">'
        constant_8 = u'</span>\n            &middot;\n            <span class="percent-complete">'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = helpers.get('objectiveProgress')
        if value is None:
            value = resolve(context, 'objectiveProgress')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'objectiveProgress', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        value = helpers.get('arrayLength')
        if value is None:
            value = resolve(context, 'arrayLength')
        if callable(value):
            this = Scope(context, context)
            value = value(this, resolve(context, "objectives"))
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'arrayLength', resolve(context, "objectives"))
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_8)
        value = helpers.get('progressStr')
        if value is None:
            value = resolve(context, 'progressStr')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'progressStr', )
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
    value = helper = helpers.get('active')
    if value is None:
        value = context.get('active')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, )
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_8)
    options = {'fn': partial(constant_9, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('complete')
    if value is None:
        value = context.get('complete')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, )
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_10)
    value = helpers.get('id')
    if value is None:
        value = resolve(context, 'id')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'id', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_11)
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
    result.append(constant_12)
    options = {'fn': partial(constant_13, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = partial(constant_14, helpers=helpers, partials=partials)
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "complete"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_15)
    options = {'fn': partial(constant_16, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('each')
    if value is None:
        value = context.get('each')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "objectives"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_17)
    return result
