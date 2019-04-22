  <template>
      <div>
          <v-form>
              <v-container>

                  <v-alert transition="scale-transition" :value="true" v-model="alert" :type="erro?'error':'info'" v-show="erro || dados<1" icon="new_releases" dismissible @click="alert = !alert">
                      {{erro ? erro : 'Nenhuma issue encontrada'}}
                  </v-alert>

                  <v-layout row justify-center wrap>

                      <v-flex xs12 sm6 md6>
                          <v-text-field label="Dono Repo" color="grey lighten-1" v-model="owner"></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm6 md6>
                          <v-text-field v-model="repo" label="Nome Repo" color="grey lighten-1"></v-text-field>
                      </v-flex>

                      <v-flex class="btnSearch" xs12 sm6 md2>
                          <v-btn @click="buscaIssue" small color="primary" class="white--text">
                              Buscar
                              <v-icon right> search</v-icon>
                          </v-btn>
                      </v-flex>
                      <v-flex xs12 sm10 offset-sm1>

                          <v-expansion-panel>

                              <v-expansion-panel-content v-for="item in dados" :key="item.id">
                                  <template v-slot:actions>
                                      <v-icon color="primary">$vuetify.icons.expand</v-icon>
                                  </template>
                                  <template v-slot:header>
                                      <div>
                                          <v-btn small color="#2cbe4e" class="white--text">
                                              Open
                                              <v-icon right> info</v-icon>
                                          </v-btn>
                                      </div>
                                      <h3>{{item.title}}</h3>
                                  </template>
                                  <v-card>
                                      <v-card-text class="grey lighten-3">
                                          <v-list-tile :key="item.title" avatar>
                                              <v-list-tile-avatar>
                                                  <img :src="item.user.avatar_url">
                                              </v-list-tile-avatar>
                                              <v-list-tile-content>
                                                  <v-list-tile-title v-html="item.user.login"></v-list-tile-title>

                                              </v-list-tile-content>
                                              {{item.created_at | moment("DD/MM/YYYY h:mm a")}}

                                          </v-list-tile>

                                          <v-divider></v-divider>
                                          <br> {{item.body}}

                                          <br>
                                          <br>

                                          <v-btn v-for="(label, index) in item.labels" :key="index.title" small :color="'#'+label.color">
                                              {{label.name}}
                                          </v-btn>
                                          <v-list>
                                          <v-list-tile>

                                              <v-list-tile-content>
                                              </v-list-tile-content>

                                              <v-list-tile-action>
                                                  <v-btn flat>
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

                      <v-layout row justify-center>
                                  <dialog-add v-if="dialog" :dialog="dialog"/>
                      </v-layout>

                    <v-layout>
                                <dialog-edit v-if="dialogRepo" :dialogRepo="dialogRepo"/>
                    </v-layout>
                     
                  </v-layout>

              </v-container>

          </v-form>

          <v-btn color="blue" @click="dialogRepo = !dialogRepo" dark fab fixed bottom left>
              <v-icon  dark>edit</v-icon>
          </v-btn>

          <v-btn color="blue" @click="dialog = !dialog"  dark fab fixed bottom right>
              <v-icon dark>add</v-icon>
          </v-btn>

      </div>

  </template>

  <script>


      export default {
          name:'HelloWorld',
          data: () => ({
              dados: {},
              owner: '',
              repo: '',
              labels: [],
              inputs: [1],
              erro: '',
              dialogRepo: false,
              username: 'alessandroprudencio',
              reposUser: [],
              alert: false,
              label: '',
              dialog: false,
          }),
          methods: {
                buscaIssue() {
                      axios.get(`${urlPadrao + this.owner + '/' + this.repo}/issues?${client_id}&${client_secret}&page=5`)
                          .then(res => {
                              this.dados = res.data
                              this.erro = ''
                          }).catch(err => {
                              this.erro = err.response.data.message
                          })
                  },


      
        
          }
      }
  </script>

  <style scoped>
      .fade-enter-active,
      .fade-leave-active {
          transition: opacity .5s;
      }

      .fade-enter,
      .fade-leave-to
      /* .fade-leave-active em versões anteriores a 2.1.8 */

      {
          opacity: 0;
      }

      .btn {
          color: aqua;
      }

      .btnSearch {
          margin-left: 5%;
      }
  </style>