from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def root_topic_view(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u'\')"></div>\n        <div class="thumbnail_container">\n          <div class="thumbnail_label"><div class="thumbnail_desc">'
    constant_8 = u'" class="thumbnail_link modal-video">\n        <div class="thumb" style="background-image:url(\''
    constant_7 = u'" data-tag="Topic Page Root Featured" data-youtube-id="'
    constant_6 = u'<div>\n  <div data-role="header" class="main-header">\n    <div class="topic-video thumbnail_td">\n      <a href="'
    constant_13 = u'</div>\n    </div>\n  </div>\n  <div class="subtopic-header">Topics</div>\n  <div class="subtopic-list-container">\n  <div class="subtopics-list first">\n    '
    constant_12 = u"</div>\n      <div class='topic-desc'>"
    constant_11 = u'</div></div>\n        </div>\n      </a>\n    </div>\n    <div class="topic-info">\n      <div class=\'topic-title\'>'
    constant_10 = u'</div><div class="thumbnail_teaser">'
    constant_17 = u'\n  </div>\n  </div>\n</div>\n'
    constant_15 = u'\n  </div>\n  <div class="subtopics-list second">\n    '

    def constant_16(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'">\n        <a class="subtopic-link-and-scroll" data-tag="Topic Page Root Subtopic" href="/'
        constant_6 = u'\n      <div class="subtopic thumbnail_td '
        constant_16 = u' videos</div>\n        </div>  \n        </a>\n      </div>\n    '
        constant_13 = u'\')"></div>\n        <div class="topic-info">\n          <div class="topic-title">'
        constant_12 = u'">\n          <div class="thumb" style="background-image:url(\''
        constant_11 = u'" data-id="'
        constant_10 = u'/'
        constant_15 = u'</div>\n          <div class="topic-video-count">Browse '
        constant_14 = u'</div>\n          <div class="topic-description">'

        def constant_8(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'first'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            return result
        
        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'not-first'

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
            value = value(this, options, resolve(context, "notFirst"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_9)
        value = resolve(context, "__parent","topic_info","","extended_slug")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_10)
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
        result.append(constant_11)
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
        result.append(constant_12)
        value = resolve(context, "thumbnail_link","","thumb_urls","","hq")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_13)
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
        result.append(constant_14)
        value = helpers.get('ellipsis')
        if value is None:
            value = resolve(context, 'ellipsis')
        if callable(value):
            this = Scope(context, context)
            value = value(this, resolve(context, "description"), resolve(context, "description_truncate_length"))
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'ellipsis', resolve(context, "description"), resolve(context, "description_truncate_length"))
        if value is None: value = ''
        if type(value) is not strlist:
            value = unicode(value)
        result.grow(value)
        result.append(constant_15)
        value = helpers.get('child_count')
        if value is None:
            value = resolve(context, 'child_count')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'child_count', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_16)
        return result
    
    def constant_14(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'">\n        <a class="subtopic-link-and-scroll" data-tag="Topic Page Root Subtopic" href="/'
        constant_6 = u'\n      <div class="subtopic thumbnail_td '
        constant_16 = u' videos</div>\n        </div>  \n        </a>\n      </div>\n    '
        constant_13 = u'\')"></div>\n        <div class="topic-info">\n          <div class="topic-title">'
        constant_12 = u'">\n          <div class="thumb" style="background-image:url(\''
        constant_11 = u'" data-id="'
        constant_10 = u'/'
        constant_15 = u'</div>\n          <div class="topic-video-count">Browse '
        constant_14 = u'</div>\n          <div class="topic-description">'

        def constant_8(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'first'

            # End constants
            result = strlist()
            if helpers is None: helpers = {}
            helpers.update(pybars['helpers'])
            if partials is None: partials = {}
            result.append(constant_6)
            return result
        
        def constant_7(context, helpers=None, partials=None):
            pybars = _pybars_

            # Begin constants
            constant_6 = u'not-first'

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
            value = value(this, options, resolve(context, "notFirst"))
        else:
            helper = helpers['blockHelperMissing']
            value = helper(context, options, value)
        if value is None: value = ''
        result.grow(value)
        result.append(constant_9)
        value = resolve(context, "__parent","topic_info","","extended_slug")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_10)
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
        result.append(constant_11)
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
        result.append(constant_12)
        value = resolve(context, "thumbnail_link","","thumb_urls","","hq")
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_13)
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
        result.append(constant_14)
        value = helpers.get('ellipsis')
        if value is None:
            value = resolve(context, 'ellipsis')
        if callable(value):
            this = Scope(context, context)
            value = value(this, resolve(context, "description"), resolve(context, "description_truncate_length"))
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'ellipsis', resolve(context, "description"), resolve(context, "description_truncate_length"))
        if value is None: value = ''
        if type(value) is not strlist:
            value = unicode(value)
        result.grow(value)
        result.append(constant_15)
        value = helpers.get('child_count')
        if value is None:
            value = resolve(context, 'child_count')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'child_count', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_16)
        return result
    
    # End constants
    result = strlist()
    if helpers is None: helpers = {}
    helpers.update(pybars['helpers'])
    if partials is None: partials = {}
    result.append(constant_6)
    value = resolve(context, "topic_info","","marquee_video","","href")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_7)
    value = resolve(context, "topic_info","","marquee_video","","youtube_id")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_8)
    value = resolve(context, "topic_info","","marquee_video","","thumb_urls","","hq")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_9)
    value = resolve(context, "topic_info","","marquee_video","","desc_html")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = unicode(value)
    result.grow(value)
    result.append(constant_10)
    value = resolve(context, "topic_info","","marquee_video","","teaser_html")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = unicode(value)
    result.grow(value)
    result.append(constant_11)
    value = resolve(context, "topic_info","","topic","","title")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_12)
    value = resolve(context, "topic_info","","topic","","description")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = unicode(value)
    result.grow(value)
    result.append(constant_13)
    options = {'fn': partial(constant_14, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('each')
    if value is None:
        value = context.get('each')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "subtopicsA"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_15)
    options = {'fn': partial(constant_16, helpers=helpers, partials=partials)}
    options['helpers'] = helpers
    options['partials'] = partials
    options['inverse'] = lambda this: None
    value = helper = helpers.get('each')
    if value is None:
        value = context.get('each')
    if helper and callable(helper):
        this = Scope(context, context)
        value = value(this, options, resolve(context, "subtopicsB"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_17)
    return result
