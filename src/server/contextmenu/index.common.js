Object.defineProperty(exports, '__esModule', { value: true })

var vue = require('vue')

var bind = function bind(el, binding) {
  var _binding$instance

  var contextmenuKey = binding.arg

  if (!contextmenuKey) {
    console.error('参数有误')
    return
  }

  var contextmenuOptions = binding.value
  var contextmenuRef = vue.isRef(contextmenuKey)
    ? contextmenuKey.value
    : (_binding$instance = binding.instance) === null || _binding$instance === void 0
    ? void 0
    : _binding$instance.$refs[contextmenuKey]

  if (!contextmenuRef) {
    console.error(
      '\u6CA1\u6709\u627E\u5230 '.concat(contextmenuKey, ' \u5BF9\u5E94\u7684\u5B9E\u4F8B')
    )
    return
  }

  if (typeof contextmenuRef.addReference !== 'function') {
    console.error(
      ''.concat(contextmenuKey, ' \u5BF9\u5E94\u7684\u5B9E\u4F8B\u4E0D\u662F VContextmenu')
    )
    return
  }

  el.$contextmenuKey = contextmenuKey
  contextmenuRef.addReference(el, contextmenuOptions)
}

var unbind = function unbind(el, binding) {
  var _binding$instance2

  var contextmenuKey = el.$contextmenuKey
  if (!contextmenuKey) return
  var contextmenuRef =
    (_binding$instance2 = binding.instance) === null || _binding$instance2 === void 0
      ? void 0
      : _binding$instance2.$refs[contextmenuKey]
  contextmenuRef === null || contextmenuRef === void 0 ? void 0 : contextmenuRef.removeReference(el)
}

var rebind = function rebind(el, binding) {
  unbind(el, binding)
  bind(el, binding)
}

var contextmenuDirective = {
  mounted: bind,
  updated: rebind,
  beforeUnmount: unbind
}

var CLASSES = {
  contextmenu: 'v-contextmenu',
  // 根元素
  contextmenuIcon: 'v-contextmenu-icon',
  // icon
  contextmenuInner: 'v-contextmenu-inner',
  // 菜单根元素
  contextmenuDivider: 'v-contextmenu-divider',
  // 分割线
  contextmenuItem: 'v-contextmenu-item',
  // 单个菜单
  contextmenuItemHover: 'v-contextmenu-item--hover',
  // 单个菜单激活状态
  contextmenuItemDisabled: 'v-contextmenu-item--disabled',
  // 单个菜单禁用状态
  contextmenuGroup: 'v-contextmenu-group',
  // 按钮组根元素
  contextmenuGroupTitle: 'v-contextmenu-group__title',
  // 按钮组标题
  contextmenuGroupMenus: 'v-contextmenu-group__menus',
  // 按钮组按钮容器
  contextmenuSubmenu: 'v-contextmenu-submenu',
  // 子菜单容器
  contextmenuSubmenuTitle: 'v-contextmenu-submenu__title',
  // 子菜单标题
  contextmenuSubmenuMenus: 'v-contextmenu-submenu__menus',
  // 子菜单
  contextmenuSubmenuMenusTop: 'v-contextmenu-submenu__menus--top',
  // 子菜单 Top
  contextmenuSubmenuMenusRight: 'v-contextmenu-submenu__menus--right',
  // 子菜单 Right
  contextmenuSubmenuMenusBottom: 'v-contextmenu-submenu__menus--bottom',
  // 子菜 Bottom单
  contextmenuSubmenuMenusLeft: 'v-contextmenu-submenu__menus--left',
  // 子菜单 Left
  contextmenuSubmenuArrow: 'v-contextmenu-submenu__arrow' // 子菜单标题 icon
}

function _isSlot(s) {
  return (
    typeof s === 'function' ||
    (Object.prototype.toString.call(s) === '[object Object]' && !vue.isVNode(s))
  )
}

var DEFAULT_REFERENCE_OPTIONS = {
  trigger: ['contextmenu']
}
var Contextmenu = vue.defineComponent({
  name: 'VContextmenu',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    autoAjustPlacement: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    teleport: {
      type: [String, Object],
      default: function _default() {
        return 'body'
      }
    } // destroyOnHide: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  emits: ['show', 'hide', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit
    var contextmenuRef = vue.ref(null)
    var visible = vue.ref(props.modelValue || false)

    var toggle = function toggle(value) {
      visible.value = value
      emit('update:modelValue', value)
    }

    var position = vue.ref({
      top: 0,
      left: 0
    })
    var style = vue.computed(function () {
      return {
        top: ''.concat(position.value.top, 'px'),
        left: ''.concat(position.value.left, 'px')
      }
    })
    var currentOptions = vue.ref(null)

    var show = function show(evt, options) {
      var targetOptions = evt instanceof Event ? options : evt
      var autoAjustPlacement =
        (targetOptions === null || targetOptions === void 0
          ? void 0
          : targetOptions.autoAjustPlacement) || props.autoAjustPlacement
      var targetPosition = {
        top: (targetOptions === null || targetOptions === void 0 ? void 0 : targetOptions.top) || 0,
        left:
          (targetOptions === null || targetOptions === void 0 ? void 0 : targetOptions.left) || 0
      }

      if (evt instanceof Event) {
        var _targetOptions$top, _targetOptions$left

        evt.preventDefault()
        targetPosition.top =
          (_targetOptions$top =
            targetOptions === null || targetOptions === void 0 ? void 0 : targetOptions.top) !==
            null && _targetOptions$top !== void 0
            ? _targetOptions$top
            : evt.pageY
        targetPosition.left =
          (_targetOptions$left =
            targetOptions === null || targetOptions === void 0 ? void 0 : targetOptions.left) !==
            null && _targetOptions$left !== void 0
            ? _targetOptions$left
            : evt.pageX
      }

      toggle(true)
      vue.nextTick(function () {
        if (autoAjustPlacement) {
          var el = contextmenuRef.value
          if (!el) return
          var width = el.clientWidth
          var height = el.clientHeight

          if (height + targetPosition.top >= window.innerHeight + window.scrollY) {
            var targetTop = targetPosition.top - height

            if (targetTop > window.scrollY) {
              targetPosition.top = targetTop
            }
          }

          if (width + targetPosition.left >= window.innerWidth + window.scrollX) {
            var targetWidth = targetPosition.left - width

            if (targetWidth > window.scrollX) {
              targetPosition.left = targetWidth
            }
          }
        }

        position.value = targetPosition // TODO: 添加回掉参数
        debugger
        emit('show', '111')
      })
    }

    var hide = function hide() {
      currentOptions.value = null
      toggle(false) // TODO: 添加回掉参数

      emit('hide')
    }

    var references = vue.reactive(new Map())
    var currentReference = vue.ref()
    var currentReferenceOptions = vue.computed(function () {
      return currentReference.value && references.get(currentReference.value)
    })

    var addReference = function addReference(el, options) {
      var triggers = (function () {
        if (options !== null && options !== void 0 && options.trigger) {
          return Array.isArray(options.trigger) ? options.trigger : [options.trigger]
        }

        return DEFAULT_REFERENCE_OPTIONS.trigger
      })()

      var handler = function handler(evt) {
        if (props.disabled) return
        currentReference.value = el
        show(evt, {})
      }

      triggers.forEach(function (eventType) {
        el.addEventListener(eventType, handler)
      })
      references.set(el, {
        triggers: triggers,
        handler: handler
      })
    }

    var removeReference = function removeReference(el) {
      var options = references.get(el)
      if (!options) return
      options.triggers.forEach(function (eventType) {
        el.removeEventListener(eventType, options.handler)
      })
      references.delete(el)
    }

    var onBodyClick = function onBodyClick(evt) {
      if (!evt.target || !contextmenuRef.value || !currentReference.value) return
      var notOutside =
        contextmenuRef.value.contains(evt.target) ||
        (currentReferenceOptions.value &&
          currentReferenceOptions.value.triggers.includes('click') &&
          currentReference.value.contains(evt.target))

      if (!notOutside) {
        toggle(false)
      }
    } // watch(props.modelValue, (value) => {
    //   if (value !== visible.value) {
    //     toggle(value);
    //   }
    // });

    vue.watch(visible, function (value) {
      if (value) {
        document.addEventListener('click', onBodyClick)
      } else {
        document.removeEventListener('click', onBodyClick)
      }
    })
    vue.onBeforeUnmount(function () {
      document.removeEventListener('click', onBodyClick)
    })
    vue.provide('visible', visible)
    vue.provide('autoAjustPlacement', props.autoAjustPlacement)
    vue.provide('show', show)
    vue.provide('hide', hide)
    return {
      visible: visible,
      style: style,
      currentReferenceOptions: currentReferenceOptions,
      currentOptions: currentOptions,
      contextmenuRef: contextmenuRef,
      addReference: addReference,
      removeReference: removeReference,
      toggle: toggle,
      show: show,
      hide: hide
    }
  },
  methods: {
    renderContent: function renderContent() {
      var _this$$slots$default, _this$$slots

      return vue.withDirectives(
        vue.createVNode(
          'div',
          {
            class: CLASSES.contextmenu,
            ref: 'contextmenuRef',
            style: this.style
          },
          [
            vue.createVNode(
              'ul',
              {
                class: CLASSES.contextmenuInner
              },
              [
                (_this$$slots$default = (_this$$slots = this.$slots).default) === null ||
                _this$$slots$default === void 0
                  ? void 0
                  : _this$$slots$default.call(_this$$slots, {
                      triggerOptions: 'currentReferenceOptions',
                      options: 'currentOptions'
                    })
              ]
            )
          ]
        ),
        [[vue.vShow, 'visible']]
      )
    }
  },
  render: function render() {
    var _slot

    if (!this.visible) return null
    return this.teleport
      ? vue.createVNode(
          vue.Teleport,
          {
            to: this.teleport
          },
          _isSlot((_slot = this.renderContent()))
            ? _slot
            : {
                default: function _default() {
                  return [_slot]
                }
              }
        )
      : this.renderContent()
  }
})

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }

  return obj
}

var ContextmenuItem = vue.defineComponent({
  name: 'VContextmenuItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click', 'mouseenter', 'mouseleave'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit
    var rootHide = vue.inject('hide')
    var hover = vue.ref(false)
    var classes = vue.computed(function () {
      var _ref2

      return (
        (_ref2 = {}),
        _defineProperty(_ref2, CLASSES.contextmenuItem, true),
        _defineProperty(_ref2, CLASSES.contextmenuItemDisabled, props.disabled),
        _defineProperty(_ref2, CLASSES.contextmenuItemHover, hover.value),
        _ref2
      )
    })

    var handleClick = function handleClick(evt) {
      if (props.disabled) return
      emit('click', evt)
      props.hideOnClick && (rootHide === null || rootHide === void 0 ? void 0 : rootHide())
    }

    var handleMouseenter = function handleMouseenter(evt) {
      if (props.disabled) return
      hover.value = true
      emit('mouseenter', evt)
    }

    var handleMouseleave = function handleMouseleave(evt) {
      if (props.disabled) return
      hover.value = false
      emit('mouseleave', evt)
    }

    return {
      classes: classes,
      handleClick: handleClick,
      handleMouseenter: handleMouseenter,
      handleMouseleave: handleMouseleave
    }
  },
  render: function render() {
    var _this$$slots$default, _this$$slots

    return vue.createVNode(
      'li',
      {
        class: this.classes,
        onClick: this.handleClick,
        onMouseenter: this.handleMouseenter,
        onMouseleave: this.handleMouseleave
      },
      [
        (_this$$slots$default = (_this$$slots = this.$slots).default) === null ||
        _this$$slots$default === void 0
          ? void 0
          : _this$$slots$default.call(_this$$slots)
      ]
    )
  }
})

var ContextmenuDivider = vue.defineComponent({
  name: 'VContextmenuDivider',
  render: function render() {
    return vue.createVNode(
      'li',
      {
        class: CLASSES.contextmenuDivider
      },
      null
    )
  }
})

var ContextmenuIcon = vue.defineComponent({
  name: 'VContextmenuIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  render: function render() {
    return vue.createVNode(
      'i',
      {
        class: [CLASSES.contextmenuIcon, ''.concat(CLASSES.contextmenuIcon, '-').concat(this.name)]
      },
      null
    )
  }
})

var ContextmenuSubmenu = vue.defineComponent({
  name: 'VContextmenuSubmenu',
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['mouseenter', 'mouseleave'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit
    var submenuRef = vue.ref(null)
    var autoAjustPlacement = vue.inject('autoAjustPlacement')
    var placements = vue.ref(['top', 'right'])
    var hover = vue.ref(false)

    var handleMouseenter = function handleMouseenter(evt) {
      if (props.disabled) return
      hover.value = true
      emit('mouseenter', evt)
      vue.nextTick(function () {
        var targetPlacements = []

        if (autoAjustPlacement) {
          var target = evt.target
          var targetDimension = target.getBoundingClientRect()
          if (!submenuRef.value) return
          var submenuWidth = submenuRef.value.clientWidth
          var submenuHeight = submenuRef.value.clientHeight

          if (targetDimension.right + submenuWidth >= window.innerWidth) {
            targetPlacements.push('left')
          } else {
            targetPlacements.push('right')
          }

          if (targetDimension.bottom + submenuHeight >= window.innerHeight) {
            targetPlacements.push('bottom')
          } else {
            targetPlacements.push('top')
          }
        }

        placements.value = targetPlacements
      })
    }

    var handleMouseleave = function handleMouseleave(evt) {
      if (props.disabled) return
      hover.value = false
      emit('mouseleave', evt)
    }

    var titleClasses = vue.computed(function () {
      var _ref2

      return (
        (_ref2 = {}),
        _defineProperty(_ref2, CLASSES.contextmenuItem, true),
        _defineProperty(_ref2, CLASSES.contextmenuSubmenuTitle, true),
        _defineProperty(_ref2, CLASSES.contextmenuItemHover, hover.value),
        _defineProperty(_ref2, CLASSES.contextmenuItemDisabled, props.disabled),
        _ref2
      )
    })
    var menusClasses = vue.computed(function () {
      var _ref3

      return (
        (_ref3 = {}),
        _defineProperty(_ref3, CLASSES.contextmenu, true),
        _defineProperty(_ref3, CLASSES.contextmenuSubmenuMenus, true),
        _defineProperty(
          _ref3,
          CLASSES.contextmenuSubmenuMenusTop,
          placements.value.includes('top')
        ),
        _defineProperty(
          _ref3,
          CLASSES.contextmenuSubmenuMenusRight,
          placements.value.includes('right')
        ),
        _defineProperty(
          _ref3,
          CLASSES.contextmenuSubmenuMenusBottom,
          placements.value.includes('bottom')
        ),
        _defineProperty(
          _ref3,
          CLASSES.contextmenuSubmenuMenusLeft,
          placements.value.includes('left')
        ),
        _ref3
      )
    })
    return {
      hover: hover,
      submenuRef: submenuRef,
      titleClasses: titleClasses,
      menusClasses: menusClasses,
      handleMouseenter: handleMouseenter,
      handleMouseleave: handleMouseleave
    }
  },
  render: function render() {
    var _this$$slots$title, _this$$slots, _this$$slots$default, _this$$slots2

    return vue.createVNode(
      'li',
      {
        class: CLASSES.contextmenuSubmenu,
        onMouseenter: this.handleMouseenter,
        onMouseleave: this.handleMouseleave
      },
      [
        vue.createVNode(
          'div',
          {
            class: this.titleClasses
          },
          [
            ((_this$$slots$title = (_this$$slots = this.$slots).title) === null ||
            _this$$slots$title === void 0
              ? void 0
              : _this$$slots$title.call(_this$$slots)) || this.title,
            vue.createVNode(
              'span',
              {
                class: CLASSES.contextmenuSubmenuArrow
              },
              [
                vue.createVNode(
                  ContextmenuIcon,
                  {
                    name: 'right-arrow'
                  },
                  null
                )
              ]
            )
          ]
        ),
        this.hover
          ? vue.createVNode(
              'div',
              {
                ref: 'submenuRef',
                class: this.menusClasses
              },
              [
                vue.createVNode(
                  'ul',
                  {
                    class: CLASSES.contextmenuInner
                  },
                  [
                    (_this$$slots$default = (_this$$slots2 = this.$slots).default) === null ||
                    _this$$slots$default === void 0
                      ? void 0
                      : _this$$slots$default.call(_this$$slots2)
                  ]
                )
              ]
            )
          : null
      ]
    )
  }
})

var ContextmenuGroup = vue.defineComponent({
  name: 'VContextmenuGroup',
  props: {
    title: {
      type: String,
      default: undefined
    },
    maxWidth: {
      type: [Number, String],
      default: undefined
    }
  },
  setup: function setup(props) {
    var style = vue.computed(function () {
      if (!props.maxWidth) return
      return {
        'max-width':
          typeof props.maxWidth === 'number' ? ''.concat(props.maxWidth, 'px') : props.maxWidth,
        'overflow-x': 'auto'
      }
    })
    return {
      style: style
    }
  },
  methods: {
    renderTitle: function renderTitle() {
      var _this$$slots$title, _this$$slots

      var content =
        ((_this$$slots$title = (_this$$slots = this.$slots).title) === null ||
        _this$$slots$title === void 0
          ? void 0
          : _this$$slots$title.call(_this$$slots)) || this.title
      return content
        ? vue.createVNode(
            'div',
            {
              class: CLASSES.contextmenuGroupTitle
            },
            [content]
          )
        : null
    }
  },
  render: function render() {
    var _this$$slots$default, _this$$slots2

    return vue.createVNode(
      'li',
      {
        class: CLASSES.contextmenuGroup
      },
      [
        this.renderTitle(),
        vue.createVNode(
          'ul',
          {
            style: this.style,
            class: CLASSES.contextmenuGroupMenus
          },
          [
            (_this$$slots$default = (_this$$slots2 = this.$slots).default) === null ||
            _this$$slots$default === void 0
              ? void 0
              : _this$$slots$default.call(_this$$slots2)
          ]
        )
      ]
    )
  }
})

var version = '3.0.0'

var install = function install(app) {
  app.directive('contextmenu', contextmenuDirective)
  app.component(Contextmenu.name, Contextmenu)
  app.component(ContextmenuItem.name, ContextmenuItem)
  app.component(ContextmenuDivider.name, ContextmenuDivider)
  app.component(ContextmenuSubmenu.name, ContextmenuSubmenu)
  app.component(ContextmenuGroup.name, ContextmenuGroup)
}
var VContextmenu = {
  install: install,
  version: version
}

exports.Contextmenu = Contextmenu
exports.ContextmenuDivider = ContextmenuDivider
exports.ContextmenuGroup = ContextmenuGroup
exports.ContextmenuItem = ContextmenuItem
exports.ContextmenuSubmenu = ContextmenuSubmenu
exports.default = VContextmenu
exports.directive = contextmenuDirective
exports.install = install
exports.version = version
