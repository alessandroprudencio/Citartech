  <template>
      <div>
          <v-form>
              <v-container>

                  <v-alert transition="scale-transition" :value="true" v-model="alert" type="error" v-show="erro" icon="new_releases" dismissible @click="alert = !alert">
                      {{erro}}
                  </v-alert>

                  <v-layout row justify-center wrap>

                      <v-flex xs12 sm6 md6>
                          <v-text-field label="Dono Repo" color="grey lighten-1" v-model="owner"></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm6 md6>
                          <v-text-field v-model="repo" label="Nome Repo" append-icon="search" color="grey lighten-1" @change="buscaIssue"></v-text-field>
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
                                              {{item.created_at | moment("DD/MM/YYYY h:mm:ss a")}}

                                          </v-list-tile>

                                          <v-divider></v-divider>
                                          <br> {{item.body}}

                                          <br>
                                          <br>

                                          <v-btn v-for="(label, index) in item.labels" :key="index.title" small :color="'#'+label.color">
                                              {{label.name}}
                                          </v-btn <v-list>
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
                          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                              <v-card>
                                  <v-toolbar dark color="primary">
                                      <v-btn icon dark @click="dialog = false">
                                          <v-icon>close</v-icon>
                                      </v-btn>
                                      <v-toolbar-title>Criar nova Issue</v-toolbar-title>
                                      <v-spacer></v-spacer>
                                      <v-toolbar-items>
                                          <v-btn type="submit" dark flat @click="dialog = false">Criar</v-btn>
                                      </v-toolbar-items>
                                  </v-toolbar>

                                  <v-list three-line subheader>

                                      <v-subheader></v-subheader>

                                      
                                      <v-list-tile>
                                          <v-select
                                          :items="reposUser"
                                          label="Selecione o Repositório"
                                          item-text="name"
                                        ></v-select>
                                      </v-list-tile>
                                      <v-list-tile>
                                          <v-flex xs12>
                                              <v-text-field :disabled="!reposUser" label="Nome da Issue" required></v-text-field>
                                          </v-flex>
                                      </v-list-tile>

                                      <v-list-tile>
                                          <v-flex xs12>
                                              <v-text-field :disabled="!reposUser" label="Descrição da Issue"></v-text-field>
                                          </v-flex>
                                      </v-list-tile>
                                      <br>
                                      <br>

                                      <v-list-tile>
                                          <v-flex xs1 v-for="input in inputs" :key="input.id">
                                              <v-text-field :disabled="!reposUser" v-model="input.label" :label="input == 1 ? 'Label 0' : input.label">

                                              </v-text-field>
                                              <!-- <v-btn fab dark small color="red">
                      <v-icon @click="removeRow(input)"  dark>remove</v-icon>
                    </v-btn> -->
                                          </v-flex>
                                          <v-btn fab dark small color="blue">
                                              <v-icon @click="addRow()" dark>add</v-icon>
                                          </v-btn>
                                      </v-list-tile>

                                  </v-list>

                              </v-card>
                          </v-dialog>
                      </v-layout>

                  </v-layout>

              </v-container>

          </v-form>
          <v-card-text style="height: 100px; position: relative">
              <v-fab-transition>
                  <v-btn color="blue" dark fab fixed bottom right>
                      <v-icon @click="getRepo" dark>add</v-icon>
                  </v-btn>
              </v-fab-transition>
          </v-card-text>
      </div>

  </template>

  <script>
      let urlPadrao = 'https://api.github.com/repos/'
      let urlGetRepo = 'https://api.github.com/'
      let client_id = 'client_id=2c5af4efe6eb93041db9'
      let client_secret = 'client_secret=c443e33b8cbb83fc070a884c94a8d80c9653a557'
      let access_token = 'access_token=a5eb14a4d7b3288fc7948bd3fc97e279c85ceb70'

      export default {
          data: () => ({
              dados: {},
              owner: '',
              repo: '',
              labels: [],
              inputs: [1],
              erro: '',
              username:'alessandroprudencio',
              reposUser:[],
              alert: false,
              label: '',
              dialog: false,
              notifications: false,
              sound: true,
              widgets: false
          }),
          methods: {
              buscaIssue() {
                      axios.get(`${urlPadrao + this.owner + '/' + this.repo}/issues?${client_id}&${client_secret}`)
                          .then(res => {
                              this.dados = res.data
                              this.erro = ''
                          }).catch(err => {
                              this.erro = err.response.data.message
                          })
                  },
              addRow() {
                  this.inputs.push({
                      label: 'Label ' + this.inputs.length,
                  })
              },
              removeRow(input) {
                  //console.log(input)
                  //this.inputs.splice(input, 1)
              },
              getRepo(){
                this.dialog = true
                  axios.get(`${urlGetRepo + 'users/' + this.username}/repos?${client_id}&${client_secret}`)
                          .then(res => {
                              this.reposUser = res.data
                              this.erro = ''
                          }).catch(err => {
                              this.erro = err.response.data.message
                          })
              }
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
  </style>