from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def suggested_activity(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_6 = u'<!-- TODO(marcia): Clean up to involve less copy paste action, also ach-text\'s is more of a container and not achievement text.-->\n<div class="activity-list">\n    <ul>\n    '
    constant_8 = u'\n\n    '
    constant_10 = u'\n    </ul>\n</div>\n'

    def constant_9(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'">\n                    '
        constant_7 = u'">\n                    <span></span>\n                </a>\n                <a class="ellipsis foreground-link" title="'
        constant_6 = u'\n        <li class="activity-video clearfix">\n            <div class="ach-text">\n                <span class="activity-image"></span>\n                <a class="covering-link" href="'
        constant_11 = u'</div>\n                <div class="suggested-activity-controls">\n                    <a class="foreground-link" href="'
        constant_8 = u'" href="'
        constant_12 = u'">\n                        <span class="simple-button action-gradient">Watch on</span>\n                    </a>\n                 </div>\n            </div>\n        </li>\n    '
        constant_10 = u'\n                </a>\n                <div class="skill-bar-container">'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
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
        result.append(constant_7)
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
        result.append(constant_8)
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
        result.append(constant_9)
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
        result.append(constant_10)
        value = helpers.get('skill-bar')
        if value is None:
            value = resolve(context, 'skill-bar')
        if callable(value):
            this = Scope(context, context)
            value = value(this, resolve(context, "progress"))
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'skill-bar', resolve(context, "progress"))
        if value is None: value = ''
        if type(value) is not strlist:
            value = unicode(value)
        result.grow(value)
        result.append(constant_11)
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
        result.append(constant_12)
        return result
    
    def constant_7(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'">\n                    '
        constant_7 = u'">\n                    <span></span>\n                </a>\n                <a class="ellipsis foreground-link" title="'
        constant_6 = u'\n        <li class="activity-exercise clearfix">\n            <div class="ach-text">\n                <span class="activity-image"></span>\n                <a class="covering-link"  href="'
        constant_11 = u'</div>\n                <div class="suggested-activity-controls">\n                    <a class="foreground-link" href="'
        constant_8 = u'" href="'
        constant_12 = u'">\n                        <span class="simple-button action-gradient">Rock out</span>\n                    </a>\n                </div>\n            </div>\n        </li>\n    '
        constant_10 = u'\n                </a>\n                <div class="skill-bar-container">'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
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
        result.append(constant_7)
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
        result.append(constant_8)
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
        result.append(constant_9)
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
        result.append(constant_10)
        value = helpers.get('skill-bar')
        if value is None:
            value = resolve(context, 'skill-bar')
        if callable(value):
            this = Scope(context, context)
            value = value(this, resolve(context, "progress"))
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'skill-bar', resolve(context, "progress"))
        if value is None: value = ''
        if type(value) is not strlist:
            value = unicode(value)
        result.grow(value)
        result.append(constant_11)
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
        result.append(constant_12)
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
        value = value(this, options, resolve(context, "exercises"))
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
    value = helper = helpers.get('each')
    if value is None:
        value = context.get('each')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "videos"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_10)
    return result
