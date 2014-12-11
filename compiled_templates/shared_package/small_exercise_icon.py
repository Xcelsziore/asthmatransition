from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def small_exercise_icon(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_8 = u'\n'

    def constant_7(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'\n'
        constant_6 = u'\n\n'

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'\n\n<span class="small-exercise-icon node-review" data-desc="You\'ve earned proficiency in this skill. We think it\'s time for you to review it, because either it\'s been a while or you recently had some trouble."></span>\n\n'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            return result
        
        def constant_8(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_9 = u'\n'
            constant_6 = u'\n\n'

            def constant_7(context, helpers=None, partials=None):
                pybars = _pybars_

                # Begin constants
                constant_6 = u'\n\n<span class="small-exercise-icon node-complete" data-desc="You\'ve earned proficiency in this skill"></span>\n\n'

                # End constants
                result = strlist()
                if helpers is None: helpers = {}
                helpers.update(pybars['helpers'])
                if partials is None: partials = {}
                result.append(constant_6)
                return result
            
            def constant_8(context, helpers=None, partials=None):
                pybars = _pybars_

                # Begin constants
                constant_9 = u'\n'
                constant_6 = u'\n\n'

                def constant_7(context, helpers=None, partials=None):
                    pybars = _pybars_

                    # Begin constants
                    constant_6 = u'\n\n<span class="small-exercise-icon node-suggested" data-desc="You\'ve completed all the pre-requisites for this skill, so we think you\'re ready for it"></span>\n\n'

                    # End constants
                    result = strlist()
                    if helpers is None: helpers = {}
                    helpers.update(pybars['helpers'])
                    if partials is None: partials = {}
                    result.append(constant_6)
                    return result
                
                def constant_8(context, helpers=None, partials=None):
                    pybars = _pybars_

                    # Begin constants
                    constant_6 = u'\n\n<span class="small-exercise-icon node-not-started" data-desc="This is a skill you can practice"></span>\n\n'

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
                    value = value(this, options, resolve(context, "suggested"))
                else:
                    helper = helpers['blockHelperMissing']
                    value = helper(context, options, value)
                if value is None: value = ''
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
            options['inverse'] = partial(constant_8, helpers=helpers, partials=partials)
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
        options['inverse'] = partial(constant_8, helpers=helpers, partials=partials)
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
        result.append(constant_9)
        return result
    
    def constant_6(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n\n<span class="small-exercise-icon node-complete" data-desc="You just earned proficiency in this skill"></span>\n\n'

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
    options = {'fn': partial(constant_6, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = partial(constant_7, helpers=helpers, partials=partials)
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
    result.append(constant_8)
    return result
