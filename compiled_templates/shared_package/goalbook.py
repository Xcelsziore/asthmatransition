from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def goalbook(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u'goals">Goal History</a>\n    <a class="close-button">x</a>\n</div>\n'
    constant_6 = u'<div class="goals-area goals-personal fancy-scrollbar">\n    '
    constant_8 = u'\n</div>\n<div id="goalbook-controls">\n    <a class="new-goal simple-button action-gradient green" href="javascript:void(0)">New goal</a>\n    <a class="goal-history simple-button action-gradient seethrough" href="'

    def constant_7(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'\n    '
        constant_6 = u'\n    '

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        inner = partials['shared_goalbook-row']
        scope = Scope(context, context)
        result.grow(inner(scope, helpers=helpers, partials=partials))
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
    value = helper = helpers.get('goals')
    if value is None:
        value = context.get('goals')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, )
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_8)
    value = helpers.get('profileRoot')
    if value is None:
        value = resolve(context, 'profileRoot')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'profileRoot', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_9)
    return result
