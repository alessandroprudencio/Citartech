<template>
                        <transition name="slide" mode="out-in">
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
                                          <v-select :items="reposUser" label="Selecione o Repositório" item-text="name"></v-select>
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
                                          </v-flex>
                                          <v-btn fab dark small color="blue">
                                              <v-icon @click="addRow()" dark>add</v-icon>
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
        }
    },
}
</script>
