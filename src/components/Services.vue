<template>
  <div class="tableContent">
    <v-toolbar class="tableToolbar">
      <v-btn
        class="addServiceBtn text-white"
        rounded="lg"
        @click="openCreateDialog"
      >
        Add Service
      </v-btn>
    </v-toolbar>
    <v-table fixed-header hover class="serviceTable">
      <template v-if="services.length > 0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pageServices[currentPage]" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.price }}</td>
            <td class="actionsButtons">
              <v-btn text @click="openEditDialog(item.id)" class="editBtn">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn text @click="openDeleteDialog(item.id)" class="deleteBtn">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
      <template v-else>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
          <tr>
            <td :colspan="4" style="text-align: center; padding: 20px">
              <h2>No services registered yet</h2>
            </td>
          </tr>
        </tbody>
      </template>
    </v-table>
    <CreateService
      ref="createService"
      @savedService="addService"
      @editedService="editService"
    />
    <DeleteItemConfirmation ref="deleteItem" @confirmed="deleteService" />
  </div>
</template>

<script lang="ts">
import CreateService from '@/components/CreateService.vue'
import DeleteItemConfirmation from '@/components/DeleteItemConfirmation.vue'

import { useAuthStore } from '@/stores/auth'

import type { IErrorResponse } from '@/types/errors'

export default {
  name: 'ServicesComponent',

  components: {
    CreateService,
    DeleteItemConfirmation
  },

  async created() {
    this.fetchServices()
  },

  data() {
    return {
      services: [],
      isLoading: false,
      totalPages: 1,
      currentPage: 1,
      numberOfnewElements: 0,
    }
  },

  computed: {
    pageServices() {
      const services: any = this.pageServices ?? {};
      const offset = (this.currentPage - 1) * 10
      if (this.services.length > 0) {
        services[this.currentPage] = this.services.slice(Math.min(this.services.length-this.numberOfnewElements, offset), offset+10)
      }
      return services;
    }, 
    role() {
      const authStore = useAuthStore()

      return authStore.role || ''
    }
  },

  methods: {
    openCreateDialog(): void {
      (this.$refs.createService as any).openDialog();
    },
    openEditDialog(id: string): void {
      const service = this.services.find((service) => service.id === id);
      (this.$refs.createService as any).openDialog(service)
    },
    openDeleteDialog(id: string): void {
      (this.$refs.deleteItem as any).openDialog(id)
    },
    async addService() {
      this.fetchServices();
    },
    async editService(service: any) {
      const index = this.services.indexOf(this.services.find((s:any) => s.id === service.id))
      this.services[index] = service;
      localStorage.setItem('services', JSON.stringify(this.services) ?? '[]');
      this.fetchServices();
    },
    async deleteService(id: string) {
      const filteredList = this.services.filter((service:any) => service.id !== id);
      localStorage.setItem('services', JSON.stringify(filteredList) ?? '[]');
      this.fetchServices();
    },
    fetchServices() {
      this.services = JSON.parse(localStorage.getItem('services')) ?? [];
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  overflow-y: auto;
}

.tableContent {
  width: 100%;
  height: 100%;
  padding: 2rem;
}

.serviceTable {
  border-radius: 4px;
  height: 90%;
}

td,
th {
  min-width: 300px;
  text-align: center !important;
}

.tableToolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background-color: transparent;
}

.addServiceBtn {
  font-size: 1rem;
  height: 3rem;
  width: 10rem;
  background-color: rgb(62, 120, 252);
  margin: 0 !important;
}

.actionsButtons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.editBtn {
  color: lightgray;
  background-color: orange;
  margin-right: 0.5rem;
}

.deleteBtn {
  color: lightgray;
  background-color: red;
}
</style>
