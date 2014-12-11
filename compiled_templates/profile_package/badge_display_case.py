from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def badge_display_case(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_7 = u'\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n<div class="achievement-badge compact badge-overlay"></div>\n</a>\n<div class="main-case fancy-scrollbar"></div>\n<div class="badge-picker fancy-scrollbar"></div>\n\n'
    constant_6 = u'<a class="display-case-cover" href="javascript:void(0)">\n'

    # End constants
    result = strlist()
    if helpers is None: helpers = {}
    helpers.update(pybars['helpers'])
    if partials is None: partials = {}
    result.append(constant_6)
    result.append(constant_7)
    return result
