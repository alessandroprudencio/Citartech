<template>
  <div>
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

          <v-expansion-panel>
    <v-expansion-panel-content  v-for="item in dados" :key="item.id" >
      <template v-slot:actions>
        <v-icon color="primary">$vuetify.icons.expand</v-icon>
      </template>
      <template v-slot:header >
          <div>
             <v-btn
        small
      color="#2cbe4e"
      class="white--text"
    >
       Open
      <v-icon right> info</v-icon>
    </v-btn>
          </div>
         <h3>{{item.title}}</h3>
      </template>
      <v-card>
        <v-card-text class="grey lighten-3">
             <v-list-tile
              :key="item.title"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="item.user.avatar_url">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.user.login"></v-list-tile-title>
               

              </v-list-tile-content>
                   {{item.created_at | moment("DD/MM/YYYY h:mm:ss a")}}

            </v-list-tile>

                  <v-divider></v-divider><br>
               

                {{item.body}}<br><br>
                  
                   <v-btn
                      v-for="(label, index) in item.labels"
                      :key="index.title"
                      small
                    :color="'#'+label.color"
                  >
                    {{label.name}}
                  </v-btn
                    <v-list>
                         <v-list-tile>
                
                      <v-list-tile-content>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-btn flat >
                            <h3>{{item.comments }}</h3>
                      <v-icon :color="item.comments ? 'teal' : 'grey'">chat_bubble</v-icon>
                        </v-btn>
                      </v-list-tile-action>

                    </v-list-tile>
                  </v-list>
          </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>

      
        </v-flex>

        
      </v-layout>
    </v-container>
   </v-form>

  </div>
  

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

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
.btn{
  color: aqua;
}

</style>
