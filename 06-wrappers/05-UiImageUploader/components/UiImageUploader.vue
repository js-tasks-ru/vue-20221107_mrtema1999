<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isProcessing }"
      :style="isProcessed ? `--bg-url: url(${preview})` : '--bg-url'"
    >
      <span class="image-uploader__text">{{ description }}</span>
      <component
        :is="isProcessed ? 'button' : 'input'"
        ref="fileInput"
        type="file"
        v-bind="$attrs"
        accept="image/*"
        :disabled="isProcessing"
        class="image-uploader__input"
        @click="removeImage"
        @change="uploadImage"
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

  emits: ['upload', 'error', 'remove', 'select'],

  data() {
    return {
      state: null,
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

  created() {
    this.state = this.preview ? 'processed' : 'filling';
    this.image = this.preview ?? null;
  },

  methods: {
    uploadImage(event) {
      const [file] = event.target.files;

      this.$emit('select', file);

      if (this.uploader) {
        this.state = 'processing';
        this.asyncLoader(file);
      } else {
        this.$emit('upload', { image: URL.createObjectURL(file) });
        this.state = 'processed';
      }
    },

    removeImage() {
      this.$emit('remove');
      this.state = 'filling';
    },

    asyncLoader(file) {
      this.uploader(file)
        .then((data) => {
          this.$emit('upload', data);
          this.state = 'processed';
        })
        .catch((error) => {
          this.$emit('error', error);
          this.$refs['fileInput'].value = '';
          this.state = 'filling';
        });
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
