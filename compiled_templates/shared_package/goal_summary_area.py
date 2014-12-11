from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def goal_summary_area(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u' &middot; '
    constant_7 = u' &middot; '
    constant_6 = u'<a id="goals-drawer" href="javascript:void(0)">'
    constant_8 = u'/'
    constant_10 = u'%</a>\n<span class="separator"></span>\n'

    # End constants
    result = strlist()
    if helpers is None: helpers = {}
    helpers.update(pybars['helpers'])
    if partials is None: partials = {}
    result.append(constant_6)
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
    result.append(constant_7)
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
    result.append(constant_8)
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
    result.append(constant_9)
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
    result.append(constant_10)
    return result
