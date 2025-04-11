<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    const discussionId = ref(route.params.id);
    const discussions = ref([
    { id: 1, title: "Review Alat & Bahan Jahit", author: "Halima", date: "Senin, 10 Maret 2025", comments: 1, views: 3 },
    { id: 2, title: "Makanan Untuk Berbuka Puasa", author: "Halima", date: "Senin, 10 Maret 2025", comments: 2, views: 5 },
    { id: 3, title: "Berkebun: Menanam Tanaman Hias", author: "Halima", date: "Senin, 10 Maret 2025", comments: 3, views: 7 },
    { id: 4, title: "Tips Menjahit Pakaian Muslim", author: "Rina", date: "Selasa, 11 Maret 2025", comments: 4, views: 10 },
    { id: 5, title: "Pembuatan Pola Dasar untuk Pemula", author: "Dian", date: "Rabu, 12 Maret 2025", comments: 5, views: 12 },
    ]);



    const discussionTitle = computed(() => {
    const discussion = discussions.value.find(d => d.id === Number(discussionId.value));
        return discussion ? discussion.title : "Diskusi Tidak Ditemukan";
    });
  
    const mainPost = ref(null);
    const allReplies = ref([]);
    const replyDialog = ref(false);
    const replyText = ref('');
    const replyingTo = ref(null);
    const replyingToUser = ref('');
    const replyingToId = ref(null);
    const snackbar = ref(false);
    const currentUser = ref({
        name: 'Anda',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
    });
  
    // Counter to generate unique IDs for new replies
    const nextReplyId = ref(1000);
    
    // Compute top level replies (direct replies to the main post)
    const topLevelReplies = computed(() => {
        return allReplies.value.filter(reply => reply.parentId === mainPost.value?.id || reply.parentId === 'main');
    });
  
    // Function to get nested replies for a given parent
    const getNestedReplies = (parentId) => {
        return allReplies.value.filter(reply => reply.parentId === parentId);
    };
    
    onMounted(async () => {
        // Fetch data based on the ID
        await fetchDiscussionData();
    });
    
    const fetchDiscussionData = async () => {
        try {
        // In a real application, you would make an API call here
        // For now, we'll use mock data based on the ID
        
        // Mock data for discussion ID 1 (review alat jahit)
        if (discussionId.value === '1') {
            mainPost.value = {
            id: 1,
            author: 'By Halima',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            date: 'Senin, 10 Maret 2025',
            title: 'Judul: Mesin Jahit Portable vs. Mesin Jahit Industri, Mana yang Lebih Worth It?',
            content: 'Halo semua! Aku baru mulai belajar menjahit dan mau beli mesin jahit. Lagi bingung antara mesin jahit portable (kayak Butterfly atau Singer) vs. mesin jahit industri (Juki, Typical). Ada yang bisa kasih saran? Aku rencana buat jahit baju sederhana dulu.'
            };
            
            allReplies.value = [
            {
                id: 2,
                parentId: 1, // Main post ID
                author: 'By FitraTailor',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                date: 'Senin, 10 Maret 2025',
                content: 'Kalau baru mulai, mesin jahit portable udah cukup kok! Lebih fleksibel dan nggak terlalu ribet buat pemula. Tapi kalau nantinya buat produksi banyak, lebih baik langsung ke mesin industri karena lebih kuat dan cepat.'
            },
            {
                id: 3,
                parentId: 1, // Main post ID
                author: 'By SitiUpcycle',
                avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                date: 'Senin, 10 Maret 2025',
                content: 'Jangan lupa perhatiin fitur mesin ya! Mesin portable banyak yang udah ada jahitan zigzag, sementara mesin industri biasanya cuma jahitan lurus tapi lebih awet.'
            }
            ];
        } else {
            // Example for other IDs - can extend this with more mock discussions
            mainPost.value = {
            id: parseInt(discussionId.value),
            author: 'By User',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
            date: 'Senin, 10 Maret 2025',
            title: `Discussion Topic #${discussionId.value}`,
            content: 'This is an example discussion content for this topic.'
            };
            
            allReplies.value = [
            {
                id: 100,
                parentId: parseInt(discussionId.value),
                author: 'By Responder',
                avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
                date: 'Senin, 10 Maret 2025',
                content: 'This is a sample reply to the discussion.'
            }
            ];
        }
        } catch (error) {
        console.error('Error fetching discussion data:', error);
        }
    };
  
    const openReplyDialog = (target, userName, parentId) => {
        replyingTo.value = target;
        replyingToUser.value = userName;
        replyingToId.value = parentId;
        replyDialog.value = true;
        replyText.value = '';
    };
    
    const getCurrentDate = () => {
        const now = new Date();
        const day = now.getDate();
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();
        
        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayName = dayNames[now.getDay()];
        
        return `${dayName}, ${day} ${month} ${year}`;
    };
  
    const submitReply = () => {
        if (!replyText.value.trim()) return;
        
        // Create new reply object
        const newReply = {
        id: nextReplyId.value++,
        parentId: replyingToId.value,
        author: currentUser.value.name,
        avatar: currentUser.value.avatar,
        date: getCurrentDate(),
        content: replyText.value,
        isUserReply: true
        };
    
        // Add the new reply to the list
        allReplies.value.push(newReply);
        
        // In a real application, you would call an API endpoint to save the reply
        console.log(`Submitting reply to ${replyingTo.value} (ID: ${replyingToId.value}): ${replyText.value}`);
        
        replyDialog.value = false;
        snackbar.value = true;
        replyText.value = '';
    };
</script>

<template>
    <v-container class="pa-4 pt-10">
        <!-- Main post -->
        <div class="text-h4 text-center mb-6 font-weight-bold purple-text">{{ discussionTitle }}</div>
      
        <v-card v-if="mainPost" class="mb-4 pa-4 custom-card" color="black" rounded="lg" variant="outlined">
            <v-row no-gutters align="center">
                <v-col cols="auto" class="mr-3">
                    <v-avatar size="40">
                        <v-img :src="mainPost.avatar"></v-img>
                    </v-avatar>
                </v-col>
                <v-col>
                    <div class="font-weight-bold">{{ mainPost.author }}</div>
                    <div class="text-caption">{{ mainPost.date }}</div>
                </v-col>
            </v-row>
    
            <div class="font-weight-bold mt-3">{{ mainPost.title }}</div>
            
            <div class="mt-2">{{ mainPost.content }}</div>
    
            <div class="text-right mt-3">
                <v-btn color="#50478A" class="white--text" @click="openReplyDialog('main', mainPost.author, mainPost.id)">Reply</v-btn>
            </div>
        </v-card>
  
        <!-- Top level replies with their nested replies -->
        <div v-for="reply in topLevelReplies" :key="reply.id">
            <!-- Main reply -->
            <v-card class="mb-4 pa-4 ml-6 custom-card" color="black" rounded="lg" variant="outlined">
            <v-row no-gutters align="center">
                <v-col cols="auto" class="mr-3">
                    <v-avatar size="40">
                        <v-img :src="reply.avatar"></v-img>
                    </v-avatar>
                </v-col>
                <v-col>
                    <div class="font-weight-bold">{{ reply.isUserReply ? '' : 'Re: ' }}{{ reply.author }}</div>
                    <div class="text-caption">{{ reply.date }}</div>
                </v-col>
            </v-row>
            
            <div class="mt-2">{{ reply.content }}</div>
    
            <div class="text-right mt-3">
                <v-btn 
                    color="#50478A" 
                    class="white--text" 
                    @click="openReplyDialog(`reply`, reply.author, reply.id)" 
                    :disabled="reply.author === currentUser.name"
                    >
                    Reply
                </v-btn>
            </div>
            </v-card>
    
            <!-- Nested replies to this reply -->
            <v-card 
                v-for="nestedReply in getNestedReplies(reply.id)" 
                :key="nestedReply.id"
                class="mb-4 pa-4 ml-12 custom-card" 
                rounded="lg"
                color="black" 
                variant="outlined"
                >
                <v-row no-gutters align="center">
                    <v-col cols="auto" class="mr-3">
                        <v-avatar size="40">
                            <v-img :src="nestedReply.avatar"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col>
                        <div class="font-weight-bold">{{ nestedReply.isUserReply ? '' : 'Re: ' }}{{ nestedReply.author }}</div>
                        <div class="text-caption">{{ nestedReply.date }}</div>
                    </v-col>
                </v-row>
                
                <div class="mt-2">{{ nestedReply.content }}</div>
        
                <div class="text-right mt-3">
                    <v-btn color="#50478A" class="white--text" @click="openReplyDialog(`nested-reply`, nestedReply.author, nestedReply.id)" :disabled="nestedReply.author === currentUser.name">Reply</v-btn>
                </div>
            </v-card>
        </div>
  
        <!-- Reply Dialog -->
        <v-dialog v-model="replyDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Balas komentar</span>
                </v-card-title>
                <v-card-text>
                    <div v-if="replyingToUser" class="mb-3 text-body-2">
                        Membalas ke: {{ replyingToUser }}
                    </div>
                    <v-textarea
                        v-model="replyText"
                        label="Tulis balasan kamu di sini"
                        outlined
                        rows="5"
                    ></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text @click="replyDialog = false">Batal</v-btn>
                    <v-btn color="primary" @click="submitReply">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  
        <!-- Submission Confirmation -->
        <v-snackbar v-model="snackbar" :timeout="3000" color="success">
            Balasan kamu telah dikirim!
            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbar = false">Tutup</v-btn>
            </template>
        </v-snackbar>
    </v-container>
  </template>
  
  <style scoped>
  .purple-text {
    color: #50478A;
  }

  .custom-card {
    background-color: rgba(253, 230, 98, 0.2); /* #FDE662 with 20% opacity */
  }
  </style>