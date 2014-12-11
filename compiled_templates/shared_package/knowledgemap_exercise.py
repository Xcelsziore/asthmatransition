from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def knowledgemap_exercise(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u'\n            <a href="'
    constant_7 = u'">\n\n        <span class="pan-to simple-button action-gradient" data-id="name" ><img src="/images/map-target.png" title="Show in map" alt="Show in map"></span>\n\n        <h4 class="skill-bar-title">\n            '
    constant_6 = u'<div class="exercise-badge">\n    <div class="skill-status" data-id="'
    constant_13 = u'</a>\n            <img class="exercise-goal-icon"  src="/images/flag.png">\n        </h4>\n        '
    constant_12 = u'">'
    constant_10 = u'" class="visited-no-recolor '
    constant_14 = u'\n    </div>\n</div>\n'

    def constant_8(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        inner = partials['shared_small-exercise-icon']
        scope = Scope(context, context)
        result.grow(inner(scope, helpers=helpers, partials=partials))
        return result
    
    def constant_11(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'disabled'

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
    value = helpers.get('name')
    if value is None:
        value = resolve(context, 'name')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'name', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_7)
    options = {'fn': partial(constant_8, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('with')
    if value is None:
        value = context.get('with')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "states"))
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
        value = value(this, options, resolve(context, "disabled"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_12)
    value = helpers.get('display_name')
    if value is None:
        value = resolve(context, 'display_name')
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'display_name', )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_13)
    value = helpers.get('skill-bar')
    if value is None:
        value = resolve(context, 'skill-bar')
    if callable(value):
        this = Scope(context, context)
        value = value(this, resolve(context, "progress"), 0, resolve(context, "states"))
    elif value is None:
        this = Scope(context, context)
        value = helpers.get('helperMissing')(this, 'skill-bar', resolve(context, "progress"), 0, resolve(context, "states"))
    if value is None: value = ''
    if type(value) is not strlist:
        value = unicode(value)
    result.grow(value)
    result.append(constant_14)
    return result
