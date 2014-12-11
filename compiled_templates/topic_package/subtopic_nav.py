from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def subtopic_nav(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_7 = u'" data-id="">\n      <h2 class=\'topic-heading\'>'
    constant_6 = u'<ul>\n  <li data-id="">\n    <a class="subtopic-link" data-tag="Topic Page Nav Root Topic" href="/'
    constant_8 = u'</h2>\n      <div class="right-arrow"></div>\n    </a>\n  </li>\n  '
    constant_10 = u'\n</ul>\n\n'

    def constant_9(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n  <li class="subheading"><span>Topics</span></li>\n  '
        constant_8 = u'\n  '

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_9 = u'" data-id="'
            constant_7 = u'">\n      <a class="subtopic-link" data-tag="Topic Page Nav Subtopic" href="/'
            constant_6 = u'\n    <li data-id="'
            constant_11 = u'\n        <div class="right-arrow"></div>\n      </a>\n    </li>\n  '
            constant_8 = u'/'
            constant_10 = u'">\n        '

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
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
            result.append(constant_7)
            value = resolve(context, "__parent","__parent","topic_info","","extended_slug")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
            if value is None: value = ''
            if type(value) is not strlist:
                value = escape(unicode(value))
            result.grow(value)
            result.append(constant_8)
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
            result.append(constant_9)
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
            result.append(constant_10)
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
        options['inverse'] = lambda this: None
        value = helper = helpers.get('each')
        if value is None:
            value = context.get('each')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "topic_info","","subtopics"))
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
    value = resolve(context, "topic_info","","extended_slug")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_7)
    value = resolve(context, "topic_info","","topic","","standalone_title")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
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
        value = value(this, options, resolve(context, "topic_info","","subtopics"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_10)
    return result
