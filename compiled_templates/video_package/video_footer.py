from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def video_footer(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u'\n'
    constant_7 = u'\n'
    constant_6 = u'\n'
    constant_10 = u'\n\n'

    def constant_8(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n'
        constant_8 = u'\n'

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_7 = u'">smarthistory.khanacademy.org</a>\n</span>\n'
            constant_6 = u'\n<span>\nLearn more about this work of art in context at <a href="'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            value = resolve(context, "video","","extra_properties","","original_url")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = unicode(value)
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
            value = value(this, options, resolve(context, "video","","extra_properties","","original_url"))
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
    value = resolve(context, "video","","player_html")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = unicode(value)
    result.grow(value)
    result.append(constant_6)
    value = resolve(context, "video","","subtitles_html")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = unicode(value)
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
        value = value(this, options, resolve(context, "video","","extra_properties"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_9)
    value = resolve(context, "video","","discussion_html")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = unicode(value)
    result.grow(value)
    result.append(constant_10)
    return result
