<template>
   <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md12>
          <v-text-field
            label="Buscar Issues"
            prepend-icon="search"
            color="grey lighten-1"
            @change="buscaIssue"
          ></v-text-field>
        </v-flex>
        
         <v-flex xs12 sm10 offset-sm1>
      <v-card >
        <v-list three-line>
          <template  v-for="(item, index) in dados" >
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.title }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
            >
            
              <v-list-tile-avatar>
                <img :src="item.user.avatar_url">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title><span style="color:red">{{item.state}} </span>
                <span v-for="label in labels" :key="label.name"> {{label.name}} </span>
                <v-list-tile-sub-title v-html="item.user.login"></v-list-tile-sub-title>
              </v-list-tile-content>
              
            </v-list-tile>
            
          </template>
          
        </v-list>
        
      </v-card>
    </v-flex>

      </v-layout>
    </v-container>
   </v-form>

</template>

<script>
let urlPadrao = 'https://api.github.com/repos/'
let client_id = 'client_id=2c5af4efe6eb93041db9'
let client_secret='client_secret=c443e33b8cbb83fc070a884c94a8d80c9653a557'
let access_token = 'access_token=a5eb14a4d7b3288fc7948bd3fc97e279c85ceb70'

  export default {
    data: () => ({
         dados:{},
         labels:[],
         items: [
          { header: 'Today' },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          { divider: true, inset: true }
        ],
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader'
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify'
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify'
        }
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com'
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com'
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuetifyjs.com'
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs'
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify'
        }
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer'
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/layout/pre-defined'
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
        }

      ]
    }),
    methods:{
      buscaIssue(){
        axios.get(`${urlPadrao}frontendbr/vagas/issues?${client_id}&${client_secret}`)
        .then(res=>{
          this.dados = res.data

        })
      }
    }
  }
</script>

