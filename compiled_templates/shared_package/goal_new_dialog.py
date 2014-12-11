from pybars._compiler import strlist, _pybars_, Scope, escape, resolve, partial

def goal_new_dialog(context, helpers=None, partials=None):
    pybars = _pybars_

    # Begin constants
    constant_7 = u'\n        </div>\n        <div style="clear: both"></div>\n    </div>\n</div>\n'
    constant_6 = u'<div class="goal-new modal fade hide">\n    <div class="modal-header">\n        <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n        <div class="viewcontents">\n            '

    # End constants
    result = strlist()
    if helpers is None: helpers = {}
    helpers.update(pybars['helpers'])
    if partials is None: partials = {}
    result.append(constant_6)
    inner = partials['shared_goal-new']
    scope = Scope(context, context)
    result.grow(inner(scope, helpers=helpers, partials=partials))
    result.append(constant_7)
    return result
