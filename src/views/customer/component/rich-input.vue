<template>
  <div class="xr-editor-style">
    <ckeditor
        :editor="editor"
        v-model="content"
        :config="editorConfig"
        @ready="onReady"
        @input="onInput"
        style="width: 100%; height: 100%"
    />
  </div>
</template>

<script lang="ts" setup>
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {onMounted, reactive, ref, watch} from 'vue'
import {useHotKeyStore, useRichStore, useUserStore} from '@/stores'
import {REDUCED_MATERIAL_COLORS} from '@/api/rich-text-config'
//@ts-ignore
import XrEditor from '@xr-util/editor'
import type ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {EditorConfig} from '@ckeditor/ckeditor5-core'

const richStore = useRichStore()
const hotKeyStore = useHotKeyStore()
const editor = ref<any>(XrEditor)
//内容
const content = ref(richStore.textarea)

const emit = defineEmits(['sendMsg'])

onMounted(() => {
})
const CTRL_ENTER = 'Ctrl+Enter'
const ENTER = 'Enter'
const SHIFT_ENTER = 'Shift+Enter'
const codeList = [CTRL_ENTER, ENTER, SHIFT_ENTER]

const onReady = (editor: ClassicEditor) => {
  //进入页面。获取光标
  editor.focus()
  console.log(editor)
  setListenerNewLine(editor)
  editor.editing.view.document.on('paste', (evt: any) => {
    //阻止editor.默认粘贴行为
    evt.stop()
  })

  editor.editing.view.document.on('drop', (evt: any) => {
    //阻止editor,默认拖拽行为
    evt.stop()
  })
}

const onInput = (value: any) => {
  console.log(value)
  // getListerenSendKey(editor)
}

watch(
    () => content.value,
    () => {
      richStore.setTextArea(content.value)
    }
)
watch(
    () => richStore.textarea,
    (newValue) => {
      content.value = newValue
    }
)

const editorConfig: EditorConfig = reactive({
  toolbar: {
    shouldNotGroupWhenFull: true,
    items: [
      // --- Document-wide tools ----------------------------------------------------------------------
      'undo',
      'redo',
      '|',
      'findAndReplace',
      'selectAll',
      'wproofreader',
      '|',

      // --- "Insertables" ----------------------------------------------------------------------------

      'link',
      // 'insertImage',
      /* You must provide a valid token URL in order to use the CKBox application.
              After registering to CKBox, the fastest way to try out CKBox is to use the development token endpoint:
              https://ckeditor.com/docs/ckbox/latest/guides/configuration/authentication.html#token-endpoint*/
      // 'ckbox',
      'insertTable',
      'blockQuote',
      // 'mediaEmbed',
      'codeBlock',
      'pageBreak',
      'horizontalLine',
      'specialCharacters',

      // --- Block-level formatting -------------------------------------------------------------------
      'heading',
      'style',
      '|',

      // --- Basic styles, font and inline formatting -------------------------------------------------------
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      'highlight',
      // {
      //   label: 'Basic styles',
      //   icon: 'text',
      //   items: [
      //     'fontSize',
      //     'fontFamily',
      //     'fontColor',
      //     'fontBackgroundColor',
      //     'highlight',
      //     'superscript',
      //     'subscript',
      //     'code',
      //     '|',
      //     'textPartLanguage',
      //     '|'
      //   ]
      // },
      'removeFormat',
      '|',

      // --- Text alignment ---------------------------------------------------------------------------
      'alignment',
      '|',

      // --- Lists and indentation --------------------------------------------------------------------
      'bulletedList',
      'numberedList',
      'todoList',
      '|',
      'outdent',
      'indent'
    ]
  },
  fontFamily: {
    supportAllValues: true
  },
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22],
    supportAllValues: true
  },
  fontColor: {
    columns: 12,
    colors: REDUCED_MATERIAL_COLORS
  },
  fontBackgroundColor: {
    columns: 12,
    colors: REDUCED_MATERIAL_COLORS
  },
  htmlSupport: {
    allow: [
      // Enables all HTML features.
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true
      }
    ],
    disallow: [
      {
        attributes: [
          {key: /^on(.*)/i, value: true},
          {key: /.*/, value: /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i},
          {key: /.*/, value: /data:(?!image\/(png|jpeg|gif|webp))/i}
        ]
      },
      {name: 'script'}
    ]
  },
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'imageStyle:full'
    ]
  },
  pasteImage: false,
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  language:
      useUserStore().locale && useUserStore().locale.indexOf('zh') > -1
          ? 'zh-cn'
          : useUserStore()?.locale ?? 'en'
})


//设置 发送键 和 换行键
const setListenerNewLine = (editor: ClassicEditor) => {
  // let sendKey = hotKeyStore.sendKey
  const newLine = hotKeyStore.newLine
  const sendKey = hotKeyStore.sendKey

  //除了换行，其他都组织默认行为
  codeList
      .filter(shortcuts => shortcuts !== newLine && shortcuts !== sendKey)
      .forEach(shortcuts => {
        setUnUsed(editor, shortcuts)
      })
  setNewLine(editor, newLine)
  sendListen(editor, sendKey)
}
/**
 * 设置换行
 * @param editor
 * @param newLine
 */
const setNewLine = (editor: ClassicEditor, newLine: string) => {
  editor.keystrokes.set(`${newLine}`, (data: KeyboardEvent, cancel: () => void) => {
    editor.commands.execute("shiftEnter")
    cancel()
  })
}
/**
 * 设置无法监听
 * @param editor
 * @param other
 */
const setUnUsed = (editor: ClassicEditor, other: string) => {
  editor.keystrokes.set(`${other}`, (data: KeyboardEvent, cancel: () => void) => {
    cancel()
  })
}

const sendListen = (editor: ClassicEditor, other: string) => {
  editor.keystrokes.set(`${other}`, (data: KeyboardEvent, cancel: () => void) => {
    emit('sendMsg')
  })
}
</script>

<style lang="scss" scoped>
.xr-editor-style {
  width: 100%;
}

:deep(.ck-editor__main .ck-content) {
  min-height: 10vh;
}

:deep(.ck.ck-toolbar) {
  border: none !important;
}

:deep(.ck-editor__editable) {
  border: none !important;
}

:deep(.ck .ck-focused) {
  border: none !important;
  box-shadow: none !important;
}
</style>
