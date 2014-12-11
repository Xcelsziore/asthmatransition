from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def skill_bar(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u'\n</div>\n'
    constant_6 = u'<div class="skill-bar">\n    '

    def constant_7(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'\n        <div class="fill green" style="width:100%;"></div>\n        <div class="fill gray" style="width:'
        constant_6 = u'\n        '
        constant_8 = u'%;"></div>\n        <div class="fill blue just-earned" style="width:100%;"></div>\n    '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        result.append(constant_7)
        value = helpers.get('multiply')
        if value is None:
            value = resolve(context, 'multiply')
        if callable(value):
            this = Scope(context, context)
            value = value(this, resolve(context, "start"), 100)
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'multiply', resolve(context, "start"), 100)
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_8)
        return result
    
    def constant_8(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'%;"></div>\n        <div class="fill gray" style="width:'
        constant_6 = u'\n        <div class="fill green" style="width:'
        constant_11 = u'\n    '
        constant_8 = u'%;"></div>\n        '

        def constant_9(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'\n            <div class="fill orange" style="width:100%;"></div>\n        '

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            return result
        
        def constant_10(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'\n            '
            constant_8 = u'\n        '

            def constant_7(context, helpers=None, partials=None):
                pybars = _pybars_

                # Begin constants
                constant_6 = u'\n                <div class="fill blue" style="width:100%;"></div>\n            '

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
            options['inverse'] = lambda this: None
            value = helper = helpers.get('if')
            if value is None:
                value = context.get('if')
            if helper and callable(helper):
                this = Scope(context, context)
                value = value(this, options, resolve(context, "proficient"))
            else:
                helper = helpers['blockHelperMissing']
                value = helper(context, options, value)
            if value is None: value = ''
            result.grow(value)
            result.append(constant_8)
            return result
        
        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = helpers.get('multiply')
        if value is None:
            value = resolve(context, 'multiply')
        if callable(value):
            this = Scope(context, context)
            value = value(this, resolve(context, "end"), 100)
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'multiply', resolve(context, "end"), 100)
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        value = helpers.get('multiply')
        if value is None:
            value = resolve(context, 'multiply')
        if callable(value):
            this = Scope(context, context)
            value = value(this, resolve(context, "start"), 100)
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'multiply', resolve(context, "start"), 100)
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_8)
        options = {'fn': partial(constant_9, helpers=helpers, partials=partials)}
        options['helpers'] = helpers
        options['partials'] = partials
        options['inverse'] = partial(constant_10, helpers=helpers, partials=partials)
        value = helper = helpers.get('if')
        if value is None:
            value = context.get('if')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "reviewing"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_11)
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
        value = value(this, options, resolve(context, "justEarnedProficiency"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_9)
    return result
