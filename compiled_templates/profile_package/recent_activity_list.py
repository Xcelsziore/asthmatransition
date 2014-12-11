from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def recent_activity_list(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_8 = u'\n\n'

    def constant_7(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n    Recent <a href="/#browse">video</a>, <a href="/exercisedashboard">exercise</a>, and <a href="#achievements">badge</a> activity will show up here.\n'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        return result
    
    def constant_6(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n    <div class="activity-list">\n        <ul>\n            '
        constant_8 = u'\n        </ul>\n    </div>\n'

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'\n            '
            constant_8 = u'\n            '

            def constant_7(context, helpers=None, partials=None):
                pybars = _pybars_

                # Begin constants

                # End constants
                result = strlist()
                if helpers is None: helpers = {}
                helpers.update(pybars['helpers'])
                if partials is None: partials = {}
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
            value = helper = helpers.get('renderActivity')
            if value is None:
                value = context.get('renderActivity')
            if helper and callable(helper):
                this = Scope(context, context)
                value = value(this, options, resolve(context, ""))
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
        options = {'fn': partial(constant_7, helpers=helpers, partials=partials)}
        options['helpers'] = helpers
        options['partials'] = partials
        options['inverse'] = lambda this: None
        value = helper = helpers.get('each')
        if value is None:
            value = context.get('each')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, ""))
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
    options = {'fn': partial(constant_6, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = partial(constant_7, helpers=helpers, partials=partials)
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, ""))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_8)
    return result
