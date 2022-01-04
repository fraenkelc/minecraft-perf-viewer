<template>
  <div
    class="dropzone"
    v-on:click="openFileSelection"
    v-on:dragover="onDragOver"
    v-on:dragleave="onDragLeave"
    v-on:drop="onDrop"
    v-bind:class="{ hightlight: hightlight, disabled: !enabled }"
  >
    <q-chip>
      <q-icon name="file_upload" />
      <div>Load file</div>
      <input
        ref="fileInput"
        class="file-input"
        type="file"
        multiple
        v-on:change="onFileChanged"
        accept="application/zip"
      />
    </q-chip>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'


const readFileAsync = (file: File) => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}


export default defineComponent({
  name: 'DropZone',
  props: {
    enabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      hightlight: false,
      mimeTypes: ['application/zip', 'application/x-zip', 'application/x-zip-compressed']
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fileAdded(payload: { file: ArrayBuffer }) {
      return true;
    }
  },
  methods: {
    onDragOver(event: DragEvent): void {
      if (!this.enabled) return;
      event.preventDefault();
      this.hightlight = true;
    },
    onDragLeave(): void {
      this.hightlight = false;
    },
    onDrop(event: DragEvent): void {
      if (!this.enabled) return;
      event.preventDefault();
      const files = event.dataTransfer?.files || new FileList();

      for (var i = 0; i < files.length; i++) {
        let file = files.item(i)
        if (file != null && this.mimeTypes.includes(file.type)) {
          readFileAsync(file).then((data) => this.$emit('fileAdded', data)).catch(e => console.error(e))
          break;
        }
      }
      this.hightlight = false;
    },
    openFileSelection(): void {
      if (!this.enabled) return;
      const element = (this.$refs.fileInput) as HTMLElement
      element.click();
    },
    onFileChanged(event: Event) {
      if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files?.length) {
        const files: FileList = (event.target as HTMLInputElement).files ?? new FileList;
        for (var i = 0; i < files.length; i++) {
          let file = files.item(i)
          if (file != null && this.mimeTypes.includes(file.type)) {
            readFileAsync(file).then((data) => this.$emit('fileAdded', data)).catch(e => console.error(e))

            break;
          }
        }
      }
    }
  },
})
</script>

<style scoped>
.dropzone {
  cursor: pointer;
}

.hightlight {
  background-color: #b3dbc9;
}

.disabled {
  border: 3px dashed grey;
  color: grey;
}

.file-input {
  display: none;
}
</style>