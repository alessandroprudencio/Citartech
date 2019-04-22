<template>
                        <transition name="slide" mode="out-in">

                          <v-dialog v-model="dialogRepo" fullscreen hide-overlay transition="dialog-bottom-transition">
                              <v-card>
                                  <v-toolbar dark color="primary">
                                      <v-btn icon dark @click="dialogRepo = false">
                                          <v-icon>close</v-icon>
                                      </v-btn>
                                      <v-toolbar-title>Editar nova Issue</v-toolbar-title>
                                      <v-spacer></v-spacer>
                                      <v-toolbar-items>
                                          <v-btn type="submit" dark flat @click="dialogRepo = false">Salvar</v-btn>
                                      </v-toolbar-items>
                                  </v-toolbar>

                                  <v-list three-line subheader>

                                      <v-subheader></v-subheader>

                                        <v-list-tile>
                                          <v-select  @change="selecinou" v-model="selecionado" :items="reposUser" label="Selecione o Repositório" item-text="name"></v-select>
                                      </v-list-tile>

                                      <v-list-tile>
                                          <v-select v-model="selected" :items="issuesUser" label="Selecione a Issue" item-text="title"></v-select>
                                      </v-list-tile>

                              
                                      <v-list-tile>
                                          <v-flex xs12>
                                              <v-text-field v-model="editIssue.tile" :disabled="!reposUser" label="Nome da Issue" required></v-text-field>
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
                                          </v-flex>
                                          <v-btn fab dark small color="blue">
                                              <v-icon dark>add</v-icon>
                                          </v-btn>
                                      </v-list-tile>

                                  </v-list>

                              </v-card>
                          </v-dialog>
                          </transition>

</template>

<script>
export default {
    props:['dialogRepo'],    
    data(){
        return{
            issuesUser:[],
            reposUser:[],
            selecionado:'',
            selected:'',
            inputs:[],
            editIssue:{},
            nameIssue:'',
            owner :'frontendbr'
        }
    },
    mounted(){
                      axios.get(`${urlGetRepo + 'users/' + this.owner}/repos?${client_id}&${client_secret}`)
                          .then(res => {
                              this.reposUser = res.data
                              this.erro = ''
                          }).catch(err => {
                              this.erro = err.response.data.message
                          })
                  },
                  methods:{
                      selecinou(){
                           axios.get(`${urlPadrao + this.owner + '/' + this.selecionado}/issues?${client_id}&${client_secret}`)
                          .then(res => {
                              this.issuesUser = res.data
                              this.editIssue = this.issuesUser
                          }).catch(err => {
                            console.log(err.response.data.message)
                          })
                  },
                  }

}
</script>
