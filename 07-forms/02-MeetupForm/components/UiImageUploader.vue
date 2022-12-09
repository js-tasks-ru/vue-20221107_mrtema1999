<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isProcessing }"
      :style="isProcessed ? `--bg-url: url(${localImage})` : '--bg-url'"
    >
      <span class="image-uploader__text">{{ description }}</span>
      <input
        ref="fileInput"
        type="file"
        v-bind="$attrs"
        accept="image/*"
        class="image-uploader__input"
        @click="remove"
        @change.prevent="select"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['remove', 'select'],

  data() {
    return {
      state: this.preview ? 'processed' : 'filling',
      localImage: this.preview ? this.preview : null,
    };
  },

  computed: {
    isProcessing() {
      return this.state === 'processing';
    },

    isProcessed() {
      return this.state === 'processed';
    },

    description() {
      const descriptions = {
        filling: 'Загрузить изображение',
        processing: 'Загрузка...',
        processed: 'Удалить изображение',
      };

      return descriptions[this.state];
    },
  },

  methods: {
    select(event) {
      const [file] = event.target.files;
      this.localImage = URL.createObjectURL(file);

      this.$emit('select', this.localImage);
      this.changeState('processed');
    },

    remove(event) {
      if (this.state === 'processed') {
        event.preventDefault();

        this.localImage = null;
        this.$refs['fileInput'].value = '';

        this.$emit('remove');
        this.changeState('filling');
      }
    },

    changeState(state) {
      this.state = state;
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
