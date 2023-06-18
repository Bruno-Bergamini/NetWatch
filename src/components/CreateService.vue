<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <div class="createServiceDialog">
      <v-card>
        <v-card-title class="text-center">
          <span> Create a new service </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="mb-12">
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  label="Title"
                  variant="solo"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  label="Description"
                  variant="solo"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="price"
                  label="Price"
                  type="number"
                  variant="solo"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6">
                <v-select
                  v-model="level"
                  label="Level"
                  variant="solo"
                  required
                  :items="['beginner', 'intermediate', 'advanced']"
                ></v-select>
              </v-col> -->
            </v-row>
            <!-- <service-content-form :contents="contents"></service-content-form> -->
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="closeDialogBtn" @click="closeDialog"> Close </v-btn>
          <v-btn class="saveServiceBtn" @click="saveService"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import type { IService } from '@/types/service'
import type { IErrorResponse } from '@/types/errors'
import ServiceContentForm from '@/components/ServiceContentForm.vue'

export default {
  components: {
    ServiceContentForm
  },

  props: {
    service: {
      type: Object,
      default: () => null
    }
  },

  data: () => ({
    dialog: false,
    id: '',
    title: '',
    description: '',
    price: null,
    contents: [],
  }),

  methods: {
    openDialog(service: any) {
      this.dialog = true

      if (service) {
        this.id = service.id
        this.title = service.title
        this.description = service.description
        this.price = service.price;
      }
    },
    closeDialog() {
      this.dialog = false

      this.id = ''
      this.title = ''
      this.description = ''
      this.price = null
    },
    verifyFields() {
      if (
        !this.title ||
        !this.description ||
        !this.price
      ) {
        this.$toast.error('Please fill all the fields')

        return false
      }

      return true
    },
    async saveService() {
      if (!this.verifyFields()) return;

      if (this.id) {
        this.$emit('editedService', {
        id: this.id,
        title: this.title,
        description: this.description,
        price: this.price,
      });
      this.dialog = false;
        return ;
      }

      const service:any = {
        id: Math.random(),
        title: this.title,
        description: this.description,
        price: this.price,
      }

      let list:any = JSON.parse(localStorage.getItem('services') ?? '[]');

      if (!list) {
        list = [service]
      } else {
        list.push(service);
      }

      localStorage.setItem('services', JSON.stringify(list));

      this.dialog = false;

      this.$emit('savedService');
    }
  }
}
</script>

<style scoped>
.createServiceDialog {
  overflow-y: auto;
}
.closeDialogBtn {
  background-color: #f44336 !important;
  color: #fff !important;
}

.saveServiceBtn {
  background-color: #4caf50 !important;
  color: #fff !important;
}
</style>
