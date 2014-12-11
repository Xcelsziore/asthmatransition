from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def content_topic_videos(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_9 = u'\')"></div>\n        <div class="thumbnail_label"><div class="thumbnail_desc">'
    constant_8 = u'" class="thumbnail_link modal-video">\n        <div class="thumb" style="background-image:url(\''
    constant_7 = u'" data-tag="Topic Page Subtopic Featured" data-youtube-id="'
    constant_6 = u'<div>\n  <div data-role="header" class="main-header">\n    <div class="topic-video thumbnail_td">\n      <a href="'
    constant_13 = u'</div>\n    </div>\n  </div>\n  <div class="videos-list">\n    <div class="videos-header">Videos</div>\n    <ol class="first">\n    '
    constant_12 = u"</div>\n      <div class='topic-desc'>"
    constant_11 = u'</div></div>\n      </a>\n    </div>\n    <div class="topic-info">\n      <div class=\'topic-title\'>'
    constant_10 = u'</div><div class="thumbnail_teaser">'
    constant_17 = u'\n    </ol>\n  </div>\n</div>\n'
    constant_15 = u'\n    </ol>\n    <ol>\n    '

    def constant_16(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'</span></span></a></li>\n    '
        constant_7 = u'" data-tag="Topic Page Subtopic Library"><span class="indent"><span class=\'vid-progress v'
        constant_6 = u'\n      <li class="video-link"><a href="'
        constant_8 = u"'>"

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
        value = helpers.get('key_id')
        if value is None:
            value = resolve(context, 'key_id')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'key_id', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_8)
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
        result.append(constant_9)
        return result
    
    def constant_14(context, helpers=None, partials=None):
        pybars = _pybars_

        # Begin constants
        constant_9 = u'</span></span></a></li>\n    '
        constant_7 = u'" data-tag="Topic Page Subtopic Library"><span class="indent"><span class=\'vid-progress v'
        constant_6 = u'\n      <li class="video-link"><a href="'
        constant_8 = u"'>"

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
        value = helpers.get('key_id')
        if value is None:
            value = resolve(context, 'key_id')
        if callable(value):
            this = Scope(context, context)
            value = value(this, )
        elif value is None:
            this = Scope(context, context)
            value = helpers.get('helperMissing')(this, 'key_id', )
        if value is None: value = ''
        if type(value) is not strlist:
            value = escape(unicode(value))
        result.grow(value)
        result.append(constant_8)
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
        result.append(constant_9)
        return result
    
    # End constants
    result = strlist()
    if helpers is None: helpers = {}
    helpers.update(pybars['helpers'])
    if partials is None: partials = {}
    result.append(constant_6)
    value = resolve(context, "topic","","thumbnail_link","","href")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_7)
    value = resolve(context, "topic","","thumbnail_link","","youtube_id")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_8)
    value = resolve(context, "topic","","thumbnail_link","","thumb_urls","","hq")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_9)
    value = resolve(context, "topic","","thumbnail_link","","desc_html")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = unicode(value)
    result.grow(value)
    result.append(constant_10)
    value = resolve(context, "topic","","thumbnail_link","","teaser_html")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = unicode(value)
    result.grow(value)
    result.append(constant_11)
    value = resolve(context, "topic","","title")
    if callable(value):
        this = Scope(context, context)
        value = value(this, )
    if value is None: value = ''
    if type(value) is not strlist:
        value = escape(unicode(value))
    result.grow(value)
    result.append(constant_12)
    value = resolve(context, "topic","","description")
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
        value = value(this, options, resolve(context, "childrenCol1"))
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
        value = value(this, options, resolve(context, "childrenCol2"))
    else:
        helper = helpers['blockHelperMissing']
        value = helper(context, options, value)
    if value is None: value = ''
    result.grow(value)
    result.append(constant_17)
    return result
