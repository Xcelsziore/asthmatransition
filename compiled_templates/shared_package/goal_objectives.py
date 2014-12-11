from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def goal_objectives(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u' simple-button seethrough exercise-color '
    constant_8 = u'" class="objective '
    constant_21 = u'\n          '
    constant_7 = u'%">\n    <a data-id="'
    constant_6 = u'<li class="objective" style="width: '
    constant_28 = u'\n          </span>\n        </div>\n    </div>\n</li>\n'
    constant_23 = u'\n        </div>\n        <div class="goal-tooltip-status">\n          <span>Status:</span>\n          <span>\n            '
    constant_19 = u'\n          '
    constant_26 = u'\n            '
    constant_13 = u'</span>\n            '
    constant_12 = u'">\n            <span class="objective-description">'
    constant_11 = u'"\n        data-progress="'
    constant_10 = u'"\n        href="'
    constant_17 = u'\n          '
    constant_15 = u'\n    </a>\n    <div class="hover-data" style="display: none">\n        <div>\n          '

    def constant_20(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'</b>'
        constant_6 = u'Complete exercise <b>'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = helpers.get('description')
        if value is None:
            value = resolve(context, 'description')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'description', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        return result
    
    def constant_16(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'</b>'
        constant_6 = u'Watch video <b>'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = helpers.get('description')
        if value is None:
            value = resolve(context, 'description')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'description', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        return result
    
    def constant_22(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'Complete any exercise'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_18(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'Watch any video'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_27(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u' <span class="goal-tooltip-struggling">(Struggling)<span> '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_24(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n              Complete\n              '
        constant_8 = u'\n              '
        constant_10 = u'\n            '

        def constant_9(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_7 = u'</b>)'
            constant_6 = u' (<b>'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            value = helpers.get('description')
            if value is None:
                value = resolve(context, 'description')
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            elif value is None:
                this = Scope(context, context)
                value = helpers.get('helperMissing')(this, 'description', )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_7)
            return result
        
        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_7 = u'</b>)'
            constant_6 = u' (<b>'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            value = helpers.get('description')
            if value is None:
                value = resolve(context, 'description')
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            elif value is None:
                this = Scope(context, context)
                value = helpers.get('helperMissing')(this, 'description', )
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
        options['inverse'] = lambda this: None
        value = helper = helpers.get('if')
        if value is None:
            value = context.get('if')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "isAnyVideo"))
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
        value = helper = helpers.get('if')
        if value is None:
            value = context.get('if')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "isAnyExercise"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_10)
        return result
    
    def constant_25(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'\n            '
        constant_6 = u'\n              '

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_7 = u'%) '
            constant_6 = u' In progress ('

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
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
            result.append(constant_7)
            return result
        
        def constant_8(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u' Not started '

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
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
            value = value(this, options, resolve(context, "progress"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_9)
        return result
    
    def constant_14(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'px"></span>\n            '
        constant_6 = u'\n            <span class="objective-progress-meter" style="height: '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = helpers.get('iconFillHeight')
        if value is None:
            value = resolve(context, 'iconFillHeight')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'iconFillHeight', )
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
    value = helpers.get('objectiveWidth')
    if value is None:
        value = resolve(context, 'objectiveWidth')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'objectiveWidth', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_7)
    value = helpers.get('objectiveID')
    if value is None:
        value = resolve(context, 'objectiveID')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'objectiveID', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_8)
    value = helpers.get('type')
    if value is None:
        value = resolve(context, 'type')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'type', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_9)
    value = helpers.get('status')
    if value is None:
        value = resolve(context, 'status')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'status', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_10)
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
    result.append(constant_11)
    value = helpers.get('progress')
    if value is None:
        value = resolve(context, 'progress')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'progress', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_12)
    value = helpers.get('description')
    if value is None:
        value = resolve(context, 'description')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'description', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_13)
    options = {'fn': partial(constant_14, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('unless')
    if value is None:
        value = context.get('unless')
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
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "isVideo"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_17)
    options = {'fn': partial(constant_18, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "isAnyVideo"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_19)
    options = {'fn': partial(constant_20, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "isExercise"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_21)
    options = {'fn': partial(constant_22, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "isAnyExercise"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_23)
    options = {'fn': partial(constant_24, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = partial(constant_25, helpers=helpers, partials=partials)
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
    result.append(constant_26)
    options = {'fn': partial(constant_27, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "struggling"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_28)
    return result
