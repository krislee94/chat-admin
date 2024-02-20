<template>
  <div class="vue3-emojipicker" :style="input ? 'width: 100%;' : 'max-width: max-content'">
    <div :class="`relative ${input ? 'w-full' : 'max-w-max'} font-sans`">
      <div
        :class="{ 'opacity-0 pointer-events-none': !opened }"
        class="absolute mx-auto overflow-hidden transition duration-200 transform -translate-y-full shadow-lg vue3-discord-emojipicker rounded-xl -top-4"
        v-click-outside="close"
        style="z-index: 9999; left: -13.75rem"
      >
        <header
          class="relative flex items-center px-5 pt-5 pb-2 shadow-lg bg-grey-400 z-1 bgroundblack"
        >
          <p
            v-if="apiKey"
            :class="{
              'hover:bg-opacity-100 hover:bg-grey-300 bg-grey-300': active === 'gif'
            }"
            class="hidden px-2 py-1 mr-3 text-sm font-bold text-white rounded-md cursor-pointer hover:bg-grey-300 hover:bg-opacity-40 w-max md:block"
            @click="active = 'gif'"
          >
            GIF
          </p>
          <p
            v-if="showEmoji"
            :class="{
              'hover:bg-opacity-100 hover:bg-grey-300 bg-grey-300': active === 'emoji'
            }"
            class="hidden px-2 py-1 text-sm font-bold text-white rounded-md cursor-pointer hover:bg-grey-300 hover:bg-opacity-40 w-max md:block"
            @click="active = 'emoji'"
          >
            Émoji
          </p>
        </header>
        <emoji-picker
          v-if="active === 'emoji'"
          :categories="categories"
          :emojis="emojis"
          :sources="$data.$sources"
          @send="({ emoji, send }) => this.send(emoji, send)"
        />
      </div>
      <div
        :class="{
          'bg-grey-400 rounded-xl justify-between pr-4 flex items-center emojibutton__active': input
        }"
        class="mt-4"
      >
        <upload-button v-if="showUpload" @click="$emit('upload')" />
        <Autocomplete
          v-if="input"
          :value="value"
          :placeholder="placeholder"
          :opened-picker="opened"
          :emojis="emojis.list"
          @change="(e) => $emit('update:value', e)"
          @send="send"
          @close="close"
        />
        <div class="flex items-center justify-center">
          <slot />
          <emoji-button v-if="showEmoji" :sources="$data.$sources" @click="open" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import clickOutside from '@/directives/click-outside.js'
import emojis from '@/assets/emojis.json'
import EmojiPicker from '@/components/emojis/EmojiPicker.vue'
import EmojiButton from '@/components/emojis/Button.vue'
// import GifButton from '@/components/gif/Button.vue';
import UploadButton from '@/components/upload/Button.vue'
import Autocomplete from '@/components/emojis/Autocomplete.vue'

export default defineComponent({
  components: {
    EmojiButton,
    Autocomplete,
    EmojiPicker,
    UploadButton
  },
  directives: {
    clickOutside
  },
  emits: ['update:value', 'emoji', 'gif', 'upload'],
  props: {
    categories: {
      type: Array,
      default() {
        return ['people', 'animals', 'foods', 'travel', 'activities', 'objects', 'symbols', 'flags']
      }
    },
    placeholder: {
      type: String,
      default: 'Type your message'
    },
    input: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: null
    },
    gifFormat: {
      type: String
    },
    apiKey: {
      type: String
    },
    showUpload: {
      type: Boolean,
      default: false
    },
    showEmoji: {
      type: Boolean,
      default: true
    },
    sources: {
      type: Object
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      opened: false,
      emojis,
      active: 'gif',
      $sources: {
        search: 'https://en-zo.dev/vue-discord-emojipicker/search.svg',
        gif: 'https://en-zo.dev/vue-discord-emojipicker/gif.svg',
        category: 'https://en-zo.dev/vue-discord-emojipicker/categories/%REPLACE%.svg',
        variation: 'https://en-zo.dev/vue-discord-emojipicker/variations/variation_%REPLACE%.svg',
        emoji:
          'https://user-images.githubusercontent.com/26591239/245385683-dcc0c225-a0e0-4117-92b8-b2bd6ce8078d.png'
      }
    }
  },
  created() {
    this.$data.$sources = {
      ...this.$data.$sources,
      ...this.sources
    }
  },
  methods: {
    close() {
      if (this.opened) {
        this.opened = false
      }
    },
    send(value, send = false, type = 'emoji') {
      if (type === 'gif') {
        value = this.formatGif(value)
        this.$emit('gif', value)
      }
      if (type === 'emoji') {
        value =
          value.variations && this.variation > 0 ? value.variations[this.variation] : value.emoji
        this.$emit('emoji', value)
        if (this.input && send) {
          this.$emit('update:value', `${this.value} ${value}`)
        }
      }
      if (!this.multiple || type === 'gif') {
        this.opened = false
      }
    },
    formatGif(url) {
      if (this.gifFormat === 'md') {
        url = `!(alt)[${url}]`
      }
      if (this.gifFormat === 'html') {
        url = `<img src="${url}" />`
      }
      return url
    },
    open(item = 'emoji') {
      if (this.active !== item) {
        this.active = item
        this.opened = true
        return
      }
      this.opened = !this.opened
    }
  }
})
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.vue3-discord-emojipicker {
  height: 25rem;
  width: 23.75rem;
}
@media (max-width: 768px) {
  .vue3-discord-emojipicker {
    width: 300px;
    height: 400px;
  }
}
.vue3-discord-emojipicker__tabs {
  min-width: 50px;
}
.vue3-discord-emojipicker__tabs::-webkit-scrollbar {
  display: none !important;
}
.vue3-discordpicker__container {
  height: calc(100% - 111px);
  background: #212224;
}
@media (max-width: 768px) {
  .vue3-discordpicker__container {
    height: 100%;
  }
}
.vue3-discordpicker__container ::-webkit-scrollbar {
  width: 10px;
}
.vue3-discordpicker__container ::-webkit-scrollbar-track {
  background: #2f3136;
  right: 5px;
}
.vue3-discordpicker__container ::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: #212224;
}
#vue3-discordpicker {
  scroll-behavior: smooth;
}
.emojibutton__active .vue3-discord-emojipicker__emojibutton {
  width: 28px;
}
.vue3-discord-emojipicker__emojibutton {
  background-position: -22px 0;
  background-size: 242px 88px;
  background-repeat: no-repeat;
  width: 23px;
  height: 22px;
  display: block;
}

.-z-1 {
  z-index: -1;
}
.z-1 {
  z-index: 1;
}
.bgroundblack {
  background: #212224;
}
</style>
