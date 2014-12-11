from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def video_description(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u'\n'
    constant_7 = u'\n'
    constant_16 = u'\n</h1>\n\n'
    constant_18 = u'\n\n'
    constant_13 = u'\n    <span itemprop="name" class="title desktop-only">'
    constant_11 = u'\n<h1 class="title-header">\n    '
    constant_14 = u'</span>\n'

    def constant_8(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'" class="practice simple-button action-gradient green desktop-only" title="Test your understanding with an exercise">Practice this concept</a>\n'
        constant_6 = u'\n<a href="'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = resolve(context, "video","","button_top_exercise","","url")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        return result
    
    def constant_6(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'/v/'
        constant_6 = u'\n<link itemprop="url" href="'
        constant_8 = u'">\n'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = resolve(context, "topic","","extended_slug")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_7)
        value = resolve(context, "video","","readable_id")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_8)
        return result
    
    def constant_12(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u"<img src='/images/throbber.gif' />"

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
        constant_6 = u'\n'
        constant_8 = u'\n'

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_7 = u'" class="practice simple-button action-gradient green desktop-only" title="Extend your understanding with an exploration">Explore this concept</a>\n'
            constant_6 = u'\n<a href="'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            value = resolve(context, "video","","extra_properties","","explore_url")
            if callable(value):
                this = Scope(context, context)
                value = value(this, )
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
            value = value(this, options, resolve(context, "video","","extra_properties","","explore_url"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_8)
        return result
    
    def constant_17(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_6 = u'\n<div class="related-content visited-no-recolor">\n  <span class="related-content-title">Related exercises:</span>\n  <ul class="related-exercise-list">\n    '
        constant_8 = u'\n  </ul>\n</div>\n'

        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_9 = u'</a>\n      '
            constant_7 = u'" title="'
            constant_6 = u'\n    <li>\n      <a href="'
            constant_11 = u'\n    </li>\n    '
            constant_8 = u'">'

            def constant_10(context, helpers=None, partials=None):
                pybars = _pybars_

                # Begin constants
                constant_6 = u'\n      <span class="separator">, </span>\n      '

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
            result.append(constant_9)
            options = {'fn': partial(constant_10, helpers=helpers, partials=partials)}
            options['helpers'] = helpers
            options['partials'] = partials
            options['inverse'] = lambda this: None
            value = helper = helpers.get('unless')
            if value is None:
                value = context.get('unless')
            if helper and callable(helper):
                this = Scope(context, context)
                value = value(this, options, resolve(context, "last"))
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
        options['inverse'] = lambda this: None
        value = helper = helpers.get('each')
        if value is None:
            value = context.get('each')
        if helper and callable(helper):
            this = Scope(context, context)
            value = value(this, options, resolve(context, "video","","related_exercises"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_8)
        return result
    
    def constant_15(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_7 = u'</span></span>\n'
        constant_6 = u'\n    <span class="long-description"><span class="desktop-only">: </span><span itemprop="description">'

        # End constants
        result = strlist()
        if helpers is None: helpers = {}
        helpers.update(pybars['helpers'])
        if partials is None: partials = {}
        result.append(constant_6)
        value = resolve(context, "video","","description")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
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
    options = {'fn': partial(constant_6, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "topic"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
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
        value = value(this, options, resolve(context, "video","","button_top_exercise"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_9)
    options = {'fn': partial(constant_10, helpers=helpers, partials=partials)}
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
    result.append(constant_11)
    options = {'fn': partial(constant_12, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "loading"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_13)
    value = resolve(context, "video","","title")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_14)
    options = {'fn': partial(constant_15, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "video","","description"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_16)
    options = {'fn': partial(constant_17, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('if')
    if value is None:
        value = context.get('if')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "video","","related_exercises"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_18)
    return result
