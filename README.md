# chat-admin

使用技术 - vue3 + element-plus + vue-router + pinia + vue-i18n + ws

# 使用

1.  `npm install`

2.  `npm run dev`

3.  `npm run build:pro`

# 注项目运行

修改`node_modules/@vue/tsconfig/tsconfig.json` 内容为：

ts 的一些报错行为。

```
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "useDefineForClassFields": true,

    // Required in Vue projects
    "jsx": "preserve",

    // `"noImplicitThis": true` is part of `strict`
    // Added again here in case some users decide to disable `strict`.
    // This enables stricter inference for data properties on `this`.
    "noImplicitThis": true,
    "strict": true,

    // Required in Vite
    "isolatedModules": true,
    // For `<script setup>`
    // See <https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/#preserve-value-imports>
    "preserveValueImports": false,
    // A few notes:
    // - Vue 3 supports ES2016+
    // - For Vite, the actual compilation target is determined by the
    //   `build.target` option in the Vite config.
    //   So don't change the `target` field here. It has to be
    //   at least `ES2020` for dynamic `import()`s and `import.meta` to work correctly.
    // - If you are not using Vite, feel free to override the `target` field.
    "target": "ESNext",

    // Recommended
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    // See <https://github.com/vuejs/vue-cli/pull/5688>
    "skipLibCheck": true
  }
}
```

适配下划线用伪类

```
  .chat-item::after {
    position: absolute;
    content: '';
    left: 1vw;
    bottom: 0;
    width: 16vw;
    height: 1px;
    background-color: #dcdcdc;
  }
```

### 富文本

通过对比一下的富文本编辑器，最终敲定使用 CKEditor5 [文档](https://ckeditor.com/docs/ckeditor5/latest/features/index.html)

- CKEditor 5
- Quill
- tiptap
- Vue2Editor
- Vditor
- ProseMirror

### 时间

事件的处理工具在 utils/timeUtil

前段如果需要存储时间，需要按照 北京时间存储。 即 utcoffset（8）
