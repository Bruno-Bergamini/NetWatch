<template>
  <div>
    <h2 class="mb-6">Contents</h2>
    <div style="padding: 3px">
      <template v-if="contents.length === 0">
        <h2>No contents registered yet</h2>
      </template>
      <template v-else v-for="(content, i) in contents" v-key="i">
        <div style="margin-bottom: 20px">
          <service-content-item
            :content-item="content"
            @remove-item="removeServiceContent(i)"
          ></service-content-item>
        </div>
      </template>
      <div class="d-flex flex-end">
        <v-icon
          style="
            background-color: green;
            color: white;
            width: 30px;
            height: 30px;
            margin-left: auto;
            border-radius: 50%;
          "
          @click="addServiceContent"
          >mdi-plus</v-icon
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ServiceContentItem from '@/components/ServiceContentItem.vue'
export default {
    name: 'ServiceContentForm',
    props: {
        contents: {
            type: Array,
            required: true
        }
    },
    components: {
        ServiceContentItem
    },
    methods: {
        addServiceContent() {
            this.contents.push({})
        },
        removeServiceContent(index: number) {
            this.contents.splice(index, 1);
        }
    }
}
</script>