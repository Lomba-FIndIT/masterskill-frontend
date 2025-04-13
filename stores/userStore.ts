// stores/userStore.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    setUser(userData: any) {
      this.user = userData
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },
    async fetchUser() {
      try {
        const token = this.token || localStorage.getItem('token')
        const response = await fetch('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        this.setUser(data)
        return data
      } catch (error) {
        console.error('Failed to fetch user:', error)
        throw error
      }
    },
    async logoutUserFromAPI() {
        try {
          const token = this.token || localStorage.getItem('token')
          const response = await fetch('https://gastric-jeanna-zidanens-73211838.koyeb.app/api/logout', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          if (response.ok) {
            this.logout()
          } else {
            console.error('Logout failed from API')
          }
        } catch (error) {
          console.error('Error while logging out:', error)
        }
    },
  },
})
